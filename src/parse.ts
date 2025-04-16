import { Tokenizer, type Token, TokenTag } from './zig';
/**
 * Converts a Zig Object Notation (ZON) string into an object.
 * @param text A valid ZON string.
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 */
export function parse(source: string, reviver?: (this: any, key: string, value: any) => any): any {
  const tokenizer = new Tokenizer(source);
  const state: ParserState = {
    tokenizer: tokenizer,
    currentToken: null,
    peekedToken: null,
  };

  // --- Helper Functions ---

  function isComment(tag: TokenTag): boolean {
    // LineComment (`//`) is skipped by the tokenizer's Start state,
    // so we only need to check for DocComment tokens here.
    return tag === TokenTag.DocComment || tag === TokenTag.ContainerDocComment;
  }

  // Advance the stream to the next non-comment token
  function advance(currentState: ParserState): Token {
    if (currentState.peekedToken) {
      // Use the peeked token if available
      currentState.currentToken = currentState.peekedToken;
      currentState.peekedToken = null; // Clear peek cache
    } else {
      // Otherwise, get the next token from the tokenizer
      do {
        currentState.currentToken = currentState.tokenizer.next();
      } while (currentState.currentToken && isComment(currentState.currentToken.tag));
    }

    if (!currentState.currentToken) {
      throw new Error('Advanced past EOF unexpectedly.');
    }
    return currentState.currentToken;
  }

  // Look at the next non-comment token without consuming it
  function peek(currentState: ParserState): Token {
    if (!currentState.peekedToken) {
      let nextToken: Token | null = null;
      // Peek ahead, skipping comments
      do {
        nextToken = currentState.tokenizer.next(); // Note: This consumes from the tokenizer iterator
      } while (nextToken && isComment(nextToken.tag));

      if (!nextToken) {
        throw new Error('Peeked past EOF unexpectedly.');
      }
      currentState.peekedToken = nextToken;
      // Important: Since tokenizer.next() was called, the tokenizer's internal state
      // has advanced. Subsequent calls to tokenizer.next() *inside advance()*
      // will retrieve tokens *after* the one we just peeked. This is handled
      // by `advance` using `currentState.peekedToken` first.
    }
    if (!currentState.peekedToken) {
      throw new Error('Peek failed unexpectedly.'); // Should be unreachable
    }
    return currentState.peekedToken;
  }

  // Consume the current token, optionally checking its type, and advance
  function consume(currentState: ParserState, expectedTag?: TokenTag): Token {
    const consumedToken = currentState.currentToken;
    if (!consumedToken) {
      throw new Error(
        `Cannot consume token: stream is at EOF or not initialized. Expected ${expectedTag ?? 'any token'}.`,
      );
    }
    if (expectedTag !== undefined && consumedToken.tag !== expectedTag) {
      throw new Error(
        `Expected token ${expectedTag} but found ${consumedToken.tag} ('${consumedToken.value}') at index ${consumedToken.loc.start}`,
      );
    }
    advance(currentState);
    return consumedToken;
  }

  // --- Recursive Parsing Logic ---

  // Parses any ZON value (struct, string, number, boolean)
  function parseValue(currentState: ParserState): any {
    if (!currentState.currentToken) throw new Error('Unexpected EOF while parsing value');

    switch (currentState.currentToken.tag) {
      case TokenTag.Period:
        // Check if it's the start of a struct literal '.{'
        const nextToken = peek(currentState);
        if (nextToken.tag === TokenTag.LBrace) {
          consume(currentState, TokenTag.Period); // Consume '.'
          return parseStructLiteral(currentState);
        } else {
          throw new Error(
            `Unexpected token after '.': ${nextToken.tag} at index ${nextToken.loc.start}. Expected '{' for struct literal.`,
          );
        }

      case TokenTag.StringLiteral:
        const strValue = currentState.currentToken.value;
        consume(currentState);
        // Remove surrounding quotes. Assumes tokenizer includes them.
        // Handles potential @"..." syntax if tokenizer produces it.
        const unquotedValue = strValue.startsWith('@"') ? strValue.slice(2, -1) : strValue.slice(1, -1);
        // NOTE: Does not handle escape sequences within the string (e.g., \n, \").
        // A production parser would need unescaping logic here or in the tokenizer.
        return unquotedValue;

      case TokenTag.NumberLiteral:
        const numStr = currentState.currentToken.value;
        consume(currentState);
        // Remove Zig's underscores for JS parsing compatibility
        const cleanedNumStr = numStr.replace(/_/g, '');
        const parsedNum = Number(cleanedNumStr);
        if (isNaN(parsedNum)) {
          throw new Error(
            `Invalid number literal format: "${numStr}" at index ${currentState.currentToken?.loc.start ?? 'unknown'}`,
          );
        }
        return parsedNum;

      case TokenTag.Identifier:
        const identValue = currentState.currentToken.value;
        if (identValue === 'true') {
          consume(currentState);
          return true;
        }
        if (identValue === 'false') {
          consume(currentState);
          return false;
        }
        // Zig's `null` keyword could be handled here if needed:
        // if (identValue === 'null') { consume(currentState); return null; }
        throw new Error(
          `Unexpected identifier '${identValue}' found as value at index ${currentState.currentToken.loc.start}`,
        );

      default:
        throw new Error(
          `Unexpected token '${currentState.currentToken.value}' (${currentState.currentToken.tag}) when parsing value at index ${currentState.currentToken.loc.start}`,
        );
    }
  }

  // Parses a ZON struct literal: .{ .field = value, ... } or .{ elem1, elem2, ... }
  function parseStructLiteral(currentState: ParserState): any {
    consume(currentState, TokenTag.LBrace); // Consume '{'

    let result: any = undefined; // Use undefined to detect type (object/array) on first element

    while (currentState.currentToken && currentState.currentToken.tag !== TokenTag.RBrace) {
      if (currentState.currentToken.tag === TokenTag.Period) {
        // --- Object Field ---
        if (result === undefined) result = {};
        else if (Array.isArray(result))
          throw new Error(
            `Expected array element but found object field starting with '.' at index ${currentState.currentToken.loc.start}`,
          );

        consume(currentState, TokenTag.Period); // Consume '.'
        const fieldNameToken = consume(currentState, TokenTag.Identifier);
        consume(currentState, TokenTag.Equal); // Consume '='
        result[fieldNameToken.value] = parseValue(currentState);
      } else {
        // --- Array Element ---
        if (result === undefined) result = [];
        else if (!Array.isArray(result))
          throw new Error(
            `Expected object field (starting with '.') but found array element at index ${currentState.currentToken.loc.start}`,
          );

        result.push(parseValue(currentState));
      }

      // After a field/element, expect a comma or the closing brace
      if (currentState.currentToken?.tag === TokenTag.Comma) {
        consume(currentState); // Consume ','
        // Handle trailing comma: If next is '}', loop condition breaks anyway
        // @ts-expect-error - This is a valid check

        if (currentState.currentToken?.tag === TokenTag.RBrace) {
          break;
        }
        // @ts-expect-error - This is a valid check
      } else if (currentState.currentToken?.tag !== TokenTag.RBrace) {
        throw new Error(
          `Expected ',' or '}' after element/field, but found ${currentState.currentToken?.tag} '${currentState.currentToken?.value}' at index ${currentState.currentToken?.loc.start}`,
        );
      }
    } // End while loop

    consume(currentState, TokenTag.RBrace); // Consume '}'

    // Handle empty struct `.{}` -> return empty object by default
    return result === undefined ? {} : result;
  }

  // --- Start Parsing ---
  advance(state); // Load the first non-comment token

  if (!state.currentToken || state.currentToken.tag === TokenTag.Eof) {
    throw new Error('Input ZON string is empty or contains only comments.');
  }

  const finalResult = parseValue(state);

  // Ensure all tokens (except EOF) were consumed
  // @ts-expect-error - This is a valid check
  if (state.currentToken?.tag !== TokenTag.Eof) {
    throw new Error(
      `Parsing finished, but unexpected token remained: ${state.currentToken?.tag} '${state.currentToken?.value}' at index ${state.currentToken?.loc.start}`,
    );
  }

  return JSON.parse(JSON.stringify(finalResult), reviver);
}

interface ParserState {
  tokenizer: Tokenizer;
  currentToken: Token | null;
  // Simple lookahead: Store the next token after skipping comments
  peekedToken: Token | null;
}
