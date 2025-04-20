import { Tokenizer, type Token, TokenTag } from './zig';

class ZonParser {
  #tokenizer: Tokenizer;
  #currentToken: Token | null;
  #peekedToken: Token | null;

  constructor(source: string) {
    this.#tokenizer = new Tokenizer(source);
    this.#currentToken = null;
    this.#peekedToken = null;
  }

  #isComment(tag: TokenTag): boolean {
    return tag === TokenTag.DocComment || tag === TokenTag.ContainerDocComment;
  }

  #isTokenTag<T extends TokenTag>(token: Token | null, tag: T): token is Token & { tag: T } {
    return token?.tag === tag;
  }

  #advance(): Token {
    if (this.#peekedToken) {
      this.#currentToken = this.#peekedToken;
      this.#peekedToken = null;
    } else {
      do {
        this.#currentToken = this.#tokenizer.next();
      } while (this.#currentToken && this.#isComment(this.#currentToken.tag));
    }

    if (!this.#currentToken) {
      throw new Error('Advanced past EOF unexpectedly.');
    }
    return this.#currentToken;
  }

  #peek(): Token {
    if (!this.#peekedToken) {
      let nextToken: Token | null = null;
      do {
        nextToken = this.#tokenizer.next();
      } while (nextToken && this.#isComment(nextToken.tag));

      if (!nextToken) {
        throw new Error('Peeked past EOF unexpectedly.');
      }
      this.#peekedToken = nextToken;
    }
    if (!this.#peekedToken) {
      throw new Error('Peek failed unexpectedly.');
    }
    return this.#peekedToken;
  }

  #consume(expectedTag?: TokenTag): Token {
    const consumedToken = this.#currentToken;
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
    this.#advance();
    return consumedToken;
  }

  #parseValue(): any {
    if (!this.#currentToken) throw new Error('Unexpected EOF while parsing value');

    switch (this.#currentToken.tag) {
      case TokenTag.Period:
        const nextTokenForPeriod = this.#peek();
        if (nextTokenForPeriod.tag === TokenTag.LBrace) {
          this.#consume(TokenTag.Period);
          return this.#parseStructLiteral();
        } else if (nextTokenForPeriod.tag === TokenTag.Identifier || nextTokenForPeriod.tag === TokenTag.StringLiteral) {
          this.#consume(TokenTag.Period);
          const enumValueToken = this.#consume(nextTokenForPeriod.tag);
          const enumValue = enumValueToken.tag === TokenTag.StringLiteral
            ? (enumValueToken.value.startsWith('@"')
                ? enumValueToken.value.slice(2, -1)
                : enumValueToken.value.slice(1, -1))
            : enumValueToken.value;
          return `${enumValue}`;
        } else {
          throw new Error(
            `Unexpected token after '.': ${nextTokenForPeriod.tag} at index ${nextTokenForPeriod.loc.start}. Expected '{' for struct literal or identifier/string for enum value.`,
          );
        }

      case TokenTag.StringLiteral:
        const strValue = this.#currentToken.value;
        this.#consume();
        const unquotedValue = strValue.startsWith('@"') ? strValue.slice(2, -1) : strValue.slice(1, -1);
        return unquotedValue;

      case TokenTag.CharLiteral:
        const charValue = this.#currentToken.value;
        this.#consume();
        return charValue.slice(1, -1);

      case TokenTag.NumberLiteral:
        const numStr = this.#currentToken.value;
        this.#consume();
        const cleanedNumStr = numStr.replace(/_/g, '');
        const parsedNum = Number(cleanedNumStr);
        if (isNaN(parsedNum)) {
          throw new Error(
            `Invalid number literal format: "${numStr}" at index ${this.#currentToken?.loc.start ?? 'unknown'}`,
          );
        }
        return parsedNum;

      case TokenTag.Minus:
        this.#consume(TokenTag.Minus);
        const nextTokenForMinus = this.#currentToken;
        if (nextTokenForMinus?.tag === TokenTag.NumberLiteral) {
          const numStr = nextTokenForMinus.value;
          this.#consume();
          const cleanedNumStr = numStr.replace(/_/g, '');
          const parsedNum = Number(cleanedNumStr);
          if (isNaN(parsedNum)) {
            throw new Error(`Invalid number literal format: "-${numStr}" at index ${nextTokenForMinus.loc.start}`);
          }
          return -parsedNum;
        }
        throw new Error(`Expected number after '-' at index ${this.#currentToken?.loc.start ?? 'unknown'}`);

      case TokenTag.Identifier:
        const identValue = this.#currentToken.value;
        if (identValue === 'true') {
          this.#consume();
          return true;
        }
        if (identValue === 'false') {
          this.#consume();
          return false;
        }
        if (identValue === 'null') {
          this.#consume();
          return null;
        }
        throw new Error(
          `Unexpected identifier '${identValue}' found as value at index ${this.#currentToken.loc.start}`,
        );

      default:
        throw new Error(
          `Unexpected token '${this.#currentToken.value}' (${this.#currentToken.tag}) when parsing value at index ${this.#currentToken.loc.start}`,
        );
    }
  }

  #parseStructLiteral(): any {
    this.#consume(TokenTag.LBrace);

    let result: any = undefined;
    let isArray = false;
    const seenFields = new Set<string>();

    if (this.#isTokenTag(this.#currentToken, TokenTag.RBrace)) {
      this.#consume(TokenTag.RBrace);
      return [];
    }

    while (this.#currentToken && !this.#isTokenTag(this.#currentToken, TokenTag.RBrace)) {
      if (this.#currentToken.tag === TokenTag.Period) {
        const nextToken = this.#peek();

        switch (nextToken.tag) {
          case TokenTag.Identifier:
          case TokenTag.StringLiteral: {
            if (result === undefined) {
              result = {};
              isArray = false;
            } else if (isArray) {
              throw new Error(
                `Expected array element but found object field starting with '.' at index ${this.#currentToken.loc.start}`,
              );
            }

            this.#consume(TokenTag.Period);
            const fieldNameToken = this.#consume(nextToken.tag);
            const fieldName = fieldNameToken.tag === TokenTag.StringLiteral 
              ? (fieldNameToken.value.startsWith('@"') 
                  ? fieldNameToken.value.slice(2, -1) // Remove @" and closing quote
                  : fieldNameToken.value.slice(1, -1)) // Remove regular quotes
              : fieldNameToken.value;
            if (!fieldName) {
              throw new Error(`Invalid field empty: ${fieldNameToken.value} at index ${fieldNameToken.loc.start}`);
            }
            if (seenFields.has(fieldName)) {
              throw new Error(`Duplicate field name '${fieldName}' found at index ${fieldNameToken.loc.start}`);
            }
            seenFields.add(fieldName);
            this.#consume(TokenTag.Equal);
            result[fieldName] = this.#parseValue();
            break;
          }

          case TokenTag.LBrace: {
            if (result === undefined) {
              result = [];
              isArray = true;
            } else if (!isArray) {
              throw new Error(
                `Expected object field (starting with '.') but found array element at index ${this.#currentToken.loc.start}`,
              );
            }

            this.#consume(TokenTag.Period);
            result.push(this.#parseStructLiteral());
            break;
          }

          default:
            throw new Error(`Unexpected token after '.': ${nextToken.tag} at index ${nextToken.loc.start}`);
        }
      } else {
        if (result === undefined) {
          result = [];
          isArray = true;
        } else if (!isArray) {
          throw new Error(
            `Expected object field (starting with '.') but found array element at index ${this.#currentToken.loc.start}`,
          );
        }

        result.push(this.#parseValue());
      }

      if (this.#isTokenTag(this.#currentToken, TokenTag.Comma)) {
        this.#consume();
        if (this.#isTokenTag(this.#currentToken, TokenTag.RBrace)) {
          break;
        }
      } else if (!this.#isTokenTag(this.#currentToken, TokenTag.RBrace)) {
        throw new Error(
          `Expected ',' or '}' after element/field, but found ${this.#currentToken.tag} '${this.#currentToken.value}' at index ${this.#currentToken.loc.start}`,
        );
      }
    }

    this.#consume(TokenTag.RBrace);
    return result === undefined ? [] : result;
  }

  public parse(reviver?: (this: any, key: string, value: any) => any): any {
    this.#advance();

    if (!this.#currentToken || this.#isTokenTag(this.#currentToken, TokenTag.Eof)) {
      throw new Error('Input ZON string is empty or contains only comments.');
    }

    const finalResult = this.#parseValue();

    if (this.#currentToken && !this.#isTokenTag(this.#currentToken, TokenTag.Eof)) {
      throw new Error(
        `Parsing finished, but unexpected token remained: ${this.#currentToken.tag} '${this.#currentToken.value}' at index ${this.#currentToken.loc.start}`,
      );
    }

    if (!reviver) return finalResult;
    return JSON.parse(JSON.stringify(finalResult), reviver);
  }
}

/**
 * Converts a Zig Object Notation (ZON) string into an object.
 * @param text A valid ZON string.
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 */
export function parse(source: string, reviver?: (this: any, key: string, value: any) => any): any {
  const parser = new ZonParser(source);
  return parser.parse(reviver);
}
