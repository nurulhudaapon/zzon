/**
 * Represents the type/category of a token.
 * Mirrors the Zig Token.Tag enum.
 */
export const TokenTag = {
  Invalid: 'Invalid',
  InvalidPeriodAsterisks: 'InvalidPeriodAsterisks',
  Identifier: 'Identifier',
  StringLiteral: 'StringLiteral',
  MultilineStringLiteralLine: 'MultilineStringLiteralLine',
  CharLiteral: 'CharLiteral',
  Eof: 'Eof',
  Builtin: 'Builtin',
  Bang: 'Bang', // !
  Pipe: 'Pipe', // |
  PipePipe: 'PipePipe', // ||
  PipeEqual: 'PipeEqual', // |=
  Equal: 'Equal', // =
  EqualEqual: 'EqualEqual', // ==
  EqualAngleBracketRight: 'EqualAngleBracketRight', // =>
  BangEqual: 'BangEqual', // !=
  LParen: 'LParen', // (
  RParen: 'RParen', // )
  Semicolon: 'Semicolon', // ;
  Percent: 'Percent', // %
  PercentEqual: 'PercentEqual', // %=
  LBrace: 'LBrace', // {
  RBrace: 'RBrace', // }
  LBracket: 'LBracket', // [
  RBracket: 'RBracket', // ]
  Period: 'Period', // .
  PeriodAsterisk: 'PeriodAsterisk', // .*
  Ellipsis2: 'Ellipsis2', // ..
  Ellipsis3: 'Ellipsis3', // ...
  Caret: 'Caret', // ^
  CaretEqual: 'CaretEqual', // ^=
  Plus: 'Plus', // +
  PlusPlus: 'PlusPlus', // ++
  PlusEqual: 'PlusEqual', // +=
  PlusPercent: 'PlusPercent', // +%
  PlusPercentEqual: 'PlusPercentEqual', // +%=
  PlusPipe: 'PlusPipe', // +|
  PlusPipeEqual: 'PlusPipeEqual', // +|=
  Minus: 'Minus', // -
  MinusEqual: 'MinusEqual', // -=
  MinusPercent: 'MinusPercent', // -%
  MinusPercentEqual: 'MinusPercentEqual', // -%=
  MinusPipe: 'MinusPipe', // -|
  MinusPipeEqual: 'MinusPipeEqual', // -|=
  Asterisk: 'Asterisk', // *
  AsteriskEqual: 'AsteriskEqual', // *=
  AsteriskAsterisk: 'AsteriskAsterisk', // **
  AsteriskPercent: 'AsteriskPercent', // *%
  AsteriskPercentEqual: 'AsteriskPercentEqual', // *%=
  AsteriskPipe: 'AsteriskPipe', // *|
  AsteriskPipeEqual: 'AsteriskPipeEqual', // *|=
  Arrow: 'Arrow', // ->
  Colon: 'Colon', // :
  Slash: 'Slash', // /
  SlashEqual: 'SlashEqual', // /=
  Comma: 'Comma', // ,
  Ampersand: 'Ampersand', // &
  AmpersandEqual: 'AmpersandEqual', // &=
  QuestionMark: 'QuestionMark', // ?
  AngleBracketLeft: 'AngleBracketLeft', // <
  AngleBracketLeftEqual: 'AngleBracketLeftEqual', // <=
  AngleBracketAngleBracketLeft: 'AngleBracketAngleBracketLeft', // <<
  AngleBracketAngleBracketLeftEqual: 'AngleBracketAngleBracketLeftEqual', // <<=
  AngleBracketAngleBracketLeftPipe: 'AngleBracketAngleBracketLeftPipe', // <<|
  AngleBracketAngleBracketLeftPipeEqual: 'AngleBracketAngleBracketLeftPipeEqual', // <<|=
  AngleBracketRight: 'AngleBracketRight', // >
  AngleBracketRightEqual: 'AngleBracketRightEqual', // >=
  AngleBracketAngleBracketRight: 'AngleBracketAngleBracketRight', // >>
  AngleBracketAngleBracketRightEqual: 'AngleBracketAngleBracketRightEqual', // >>=
  Tilde: 'Tilde', // ~
  NumberLiteral: 'NumberLiteral',
  DocComment: 'DocComment', // ///
  ContainerDocComment: 'ContainerDocComment', // //!

  KeywordAddrspace: 'KeywordAddrspace',
  KeywordAlign: 'KeywordAlign',
  KeywordAllowzero: 'KeywordAllowzero',
  KeywordAnd: 'KeywordAnd',
  KeywordAnyframe: 'KeywordAnyframe',
  KeywordAnytype: 'KeywordAnytype',
  KeywordAsm: 'KeywordAsm',
  KeywordAsync: 'KeywordAsync',
  KeywordAwait: 'KeywordAwait',
  KeywordBreak: 'KeywordBreak',
  KeywordCallconv: 'KeywordCallconv',
  KeywordCatch: 'KeywordCatch',
  KeywordComptime: 'KeywordComptime',
  KeywordConst: 'KeywordConst',
  KeywordContinue: 'KeywordContinue',
  KeywordDefer: 'KeywordDefer',
  KeywordElse: 'KeywordElse',
  KeywordEnum: 'KeywordEnum',
  KeywordErrdefer: 'KeywordErrdefer',
  KeywordError: 'KeywordError',
  KeywordExport: 'KeywordExport',
  KeywordExtern: 'KeywordExtern',
  KeywordFn: 'KeywordFn',
  KeywordFor: 'KeywordFor',
  KeywordIf: 'KeywordIf',
  KeywordInline: 'KeywordInline',
  KeywordNoalias: 'KeywordNoalias',
  KeywordNoinline: 'KeywordNoinline',
  KeywordNosuspend: 'KeywordNosuspend',
  KeywordOpaque: 'KeywordOpaque',
  KeywordOr: 'KeywordOr',
  KeywordOrelse: 'KeywordOrelse',
  KeywordPacked: 'KeywordPacked',
  KeywordPub: 'KeywordPub',
  KeywordResume: 'KeywordResume',
  KeywordReturn: 'KeywordReturn',
  KeywordLinksection: 'KeywordLinksection',
  KeywordStruct: 'KeywordStruct',
  KeywordSuspend: 'KeywordSuspend',
  KeywordSwitch: 'KeywordSwitch',
  KeywordTest: 'KeywordTest',
  KeywordThreadlocal: 'KeywordThreadlocal',
  KeywordTry: 'KeywordTry',
  KeywordUnion: 'KeywordUnion',
  KeywordUnreachable: 'KeywordUnreachable',
  KeywordUsingnamespace: 'KeywordUsingnamespace',
  KeywordVar: 'KeywordVar',
  KeywordVolatile: 'KeywordVolatile',
  KeywordWhile: 'KeywordWhile',
} as const;

export type TokenTag = (typeof TokenTag)[keyof typeof TokenTag];

/**
 * Represents the location (start and end offset) of a token in the source buffer.
 */
export interface TokenLocation {
  start: number;
  end: number;
}

/**
 * Represents a token identified by the Tokenizer.
 */
export interface Token {
  tag: TokenTag;
  loc: TokenLocation;
  // It's often useful to store the actual string value for identifiers, literals etc.
  value: string;
}

/**
 * Map of Zig keywords to their corresponding TokenTag.
 */
export const KEYWORDS = new Map<string, TokenTag>([
  ['addrspace', TokenTag.KeywordAddrspace],
  ['align', TokenTag.KeywordAlign],
  ['allowzero', TokenTag.KeywordAllowzero],
  ['and', TokenTag.KeywordAnd],
  ['anyframe', TokenTag.KeywordAnyframe],
  ['anytype', TokenTag.KeywordAnytype],
  ['asm', TokenTag.KeywordAsm],
  ['async', TokenTag.KeywordAsync],
  ['await', TokenTag.KeywordAwait],
  ['break', TokenTag.KeywordBreak],
  ['callconv', TokenTag.KeywordCallconv],
  ['catch', TokenTag.KeywordCatch],
  ['comptime', TokenTag.KeywordComptime],
  ['const', TokenTag.KeywordConst],
  ['continue', TokenTag.KeywordContinue],
  ['defer', TokenTag.KeywordDefer],
  ['else', TokenTag.KeywordElse],
  ['enum', TokenTag.KeywordEnum],
  ['errdefer', TokenTag.KeywordErrdefer],
  ['error', TokenTag.KeywordError],
  ['export', TokenTag.KeywordExport],
  ['extern', TokenTag.KeywordExtern],
  ['fn', TokenTag.KeywordFn],
  ['for', TokenTag.KeywordFor],
  ['if', TokenTag.KeywordIf],
  ['inline', TokenTag.KeywordInline],
  ['noalias', TokenTag.KeywordNoalias],
  ['noinline', TokenTag.KeywordNoinline],
  ['nosuspend', TokenTag.KeywordNosuspend],
  ['opaque', TokenTag.KeywordOpaque],
  ['or', TokenTag.KeywordOr],
  ['orelse', TokenTag.KeywordOrelse],
  ['packed', TokenTag.KeywordPacked],
  ['pub', TokenTag.KeywordPub],
  ['resume', TokenTag.KeywordResume],
  ['return', TokenTag.KeywordReturn],
  ['linksection', TokenTag.KeywordLinksection],
  ['struct', TokenTag.KeywordStruct],
  ['suspend', TokenTag.KeywordSuspend],
  ['switch', TokenTag.KeywordSwitch],
  ['test', TokenTag.KeywordTest],
  ['threadlocal', TokenTag.KeywordThreadlocal],
  ['try', TokenTag.KeywordTry],
  ['union', TokenTag.KeywordUnion],
  ['unreachable', TokenTag.KeywordUnreachable],
  ['usingnamespace', TokenTag.KeywordUsingnamespace],
  ['var', TokenTag.KeywordVar],
  ['volatile', TokenTag.KeywordVolatile],
  ['while', TokenTag.KeywordWhile],
]);

/**
 * Returns the TokenTag for a given keyword string, or undefined if it's not a keyword.
 */
export function getKeywordTag(identifier: string): TokenTag | undefined {
  return KEYWORDS.get(identifier);
}

// Helper function to get the fixed string representation (lexeme) of a token tag
export function getTokenTagLexeme(tag: TokenTag): string | null {
  switch (tag) {
    case TokenTag.Invalid:
    case TokenTag.Identifier:
    case TokenTag.StringLiteral:
    case TokenTag.MultilineStringLiteralLine:
    case TokenTag.CharLiteral:
    case TokenTag.Eof:
    case TokenTag.Builtin:
    case TokenTag.NumberLiteral:
    case TokenTag.DocComment:
    case TokenTag.ContainerDocComment:
      return null; // These have variable lexemes

    case TokenTag.InvalidPeriodAsterisks:
      return '.**';
    case TokenTag.Bang:
      return '!';
    case TokenTag.Pipe:
      return '|';
    case TokenTag.PipePipe:
      return '||';
    case TokenTag.PipeEqual:
      return '|=';
    case TokenTag.Equal:
      return '=';
    case TokenTag.EqualEqual:
      return '==';
    case TokenTag.EqualAngleBracketRight:
      return '=>';
    case TokenTag.BangEqual:
      return '!=';
    case TokenTag.LParen:
      return '(';
    case TokenTag.RParen:
      return ')';
    case TokenTag.Semicolon:
      return ';';
    case TokenTag.Percent:
      return '%';
    case TokenTag.PercentEqual:
      return '%=';
    case TokenTag.LBrace:
      return '{';
    case TokenTag.RBrace:
      return '}';
    case TokenTag.LBracket:
      return '[';
    case TokenTag.RBracket:
      return ']';
    case TokenTag.Period:
      return '.';
    case TokenTag.PeriodAsterisk:
      return '.*';
    case TokenTag.Ellipsis2:
      return '..';
    case TokenTag.Ellipsis3:
      return '...';
    case TokenTag.Caret:
      return '^';
    case TokenTag.CaretEqual:
      return '^=';
    case TokenTag.Plus:
      return '+';
    case TokenTag.PlusPlus:
      return '++';
    case TokenTag.PlusEqual:
      return '+=';
    case TokenTag.PlusPercent:
      return '+%';
    case TokenTag.PlusPercentEqual:
      return '+%=';
    case TokenTag.PlusPipe:
      return '+|';
    case TokenTag.PlusPipeEqual:
      return '+|=';
    case TokenTag.Minus:
      return '-';
    case TokenTag.MinusEqual:
      return '-=';
    case TokenTag.MinusPercent:
      return '-%';
    case TokenTag.MinusPercentEqual:
      return '-%=';
    case TokenTag.MinusPipe:
      return '-|';
    case TokenTag.MinusPipeEqual:
      return '-|=';
    case TokenTag.Asterisk:
      return '*';
    case TokenTag.AsteriskEqual:
      return '*=';
    case TokenTag.AsteriskAsterisk:
      return '**';
    case TokenTag.AsteriskPercent:
      return '*%';
    case TokenTag.AsteriskPercentEqual:
      return '*%=';
    case TokenTag.AsteriskPipe:
      return '*|';
    case TokenTag.AsteriskPipeEqual:
      return '*|=';
    case TokenTag.Arrow:
      return '->';
    case TokenTag.Colon:
      return ':';
    case TokenTag.Slash:
      return '/';
    case TokenTag.SlashEqual:
      return '/=';
    case TokenTag.Comma:
      return ',';
    case TokenTag.Ampersand:
      return '&';
    case TokenTag.AmpersandEqual:
      return '&=';
    case TokenTag.QuestionMark:
      return '?';
    case TokenTag.AngleBracketLeft:
      return '<';
    case TokenTag.AngleBracketLeftEqual:
      return '<=';
    case TokenTag.AngleBracketAngleBracketLeft:
      return '<<';
    case TokenTag.AngleBracketAngleBracketLeftEqual:
      return '<<=';
    case TokenTag.AngleBracketAngleBracketLeftPipe:
      return '<<|';
    case TokenTag.AngleBracketAngleBracketLeftPipeEqual:
      return '<<|=';
    case TokenTag.AngleBracketRight:
      return '>';
    case TokenTag.AngleBracketRightEqual:
      return '>=';
    case TokenTag.AngleBracketAngleBracketRight:
      return '>>';
    case TokenTag.AngleBracketAngleBracketRightEqual:
      return '>>=';
    case TokenTag.Tilde:
      return '~';
    case TokenTag.KeywordAddrspace:
      return 'addrspace';
    case TokenTag.KeywordAlign:
      return 'align';
    case TokenTag.KeywordAllowzero:
      return 'allowzero';
    case TokenTag.KeywordAnd:
      return 'and';
    case TokenTag.KeywordAnyframe:
      return 'anyframe';
    case TokenTag.KeywordAnytype:
      return 'anytype';
    case TokenTag.KeywordAsm:
      return 'asm';
    case TokenTag.KeywordAsync:
      return 'async';
    case TokenTag.KeywordAwait:
      return 'await';
    case TokenTag.KeywordBreak:
      return 'break';
    case TokenTag.KeywordCallconv:
      return 'callconv';
    case TokenTag.KeywordCatch:
      return 'catch';
    case TokenTag.KeywordComptime:
      return 'comptime';
    case TokenTag.KeywordConst:
      return 'const';
    case TokenTag.KeywordContinue:
      return 'continue';
    case TokenTag.KeywordDefer:
      return 'defer';
    case TokenTag.KeywordElse:
      return 'else';
    case TokenTag.KeywordEnum:
      return 'enum';
    case TokenTag.KeywordErrdefer:
      return 'errdefer';
    case TokenTag.KeywordError:
      return 'error';
    case TokenTag.KeywordExport:
      return 'export';
    case TokenTag.KeywordExtern:
      return 'extern';
    case TokenTag.KeywordFn:
      return 'fn';
    case TokenTag.KeywordFor:
      return 'for';
    case TokenTag.KeywordIf:
      return 'if';
    case TokenTag.KeywordInline:
      return 'inline';
    case TokenTag.KeywordNoalias:
      return 'noalias';
    case TokenTag.KeywordNoinline:
      return 'noinline';
    case TokenTag.KeywordNosuspend:
      return 'nosuspend';
    case TokenTag.KeywordOpaque:
      return 'opaque';
    case TokenTag.KeywordOr:
      return 'or';
    case TokenTag.KeywordOrelse:
      return 'orelse';
    case TokenTag.KeywordPacked:
      return 'packed';
    case TokenTag.KeywordPub:
      return 'pub';
    case TokenTag.KeywordResume:
      return 'resume';
    case TokenTag.KeywordReturn:
      return 'return';
    case TokenTag.KeywordLinksection:
      return 'linksection';
    case TokenTag.KeywordStruct:
      return 'struct';
    case TokenTag.KeywordSuspend:
      return 'suspend';
    case TokenTag.KeywordSwitch:
      return 'switch';
    case TokenTag.KeywordTest:
      return 'test';
    case TokenTag.KeywordThreadlocal:
      return 'threadlocal';
    case TokenTag.KeywordTry:
      return 'try';
    case TokenTag.KeywordUnion:
      return 'union';
    case TokenTag.KeywordUnreachable:
      return 'unreachable';
    case TokenTag.KeywordUsingnamespace:
      return 'usingnamespace';
    case TokenTag.KeywordVar:
      return 'var';
    case TokenTag.KeywordVolatile:
      return 'volatile';
    case TokenTag.KeywordWhile:
      return 'while';
    default:
      // Ensure all tags are handled (useful for catching missing cases)
      const _exhaustiveCheck: never = tag;
      return null;
  }
}

// Helper function to get a human-readable symbol name for a token tag
export function getTokenTagSymbol(tag: TokenTag): string {
  const lexeme = getTokenTagLexeme(tag);
  if (lexeme !== null) {
    return `\`${lexeme}\``;
  }
  switch (tag) {
    case TokenTag.Invalid:
      return 'invalid token';
    case TokenTag.Identifier:
      return 'an identifier';
    case TokenTag.StringLiteral:
      return 'a string literal';
    case TokenTag.MultilineStringLiteralLine:
      return 'a multiline string literal line';
    case TokenTag.CharLiteral:
      return 'a character literal';
    case TokenTag.Eof:
      return 'end of file';
    case TokenTag.Builtin:
      return 'a builtin function';
    case TokenTag.NumberLiteral:
      return 'a number literal';
    case TokenTag.DocComment:
      return 'a documentation comment';
    case TokenTag.ContainerDocComment:
      return 'a container documentation comment';
    // Add cases for other non-lexeme tags if needed, otherwise assume it has a lexeme
    default:
      return '<?>'; // Should ideally not happen if getTokenTagLexeme is comprehensive
  }
}

// Internal state for the tokenizer's state machine
enum State {
  Start,
  ExpectNewline,
  Identifier,
  Builtin,
  StringLiteral,
  StringLiteralBackslash,
  MultilineStringLiteralLine,
  CharLiteral,
  CharLiteralBackslash,
  Backslash,
  Equal,
  Bang,
  Pipe,
  Minus,
  MinusPercent,
  MinusPipe,
  Asterisk,
  AsteriskPercent,
  AsteriskPipe,
  Slash,
  LineCommentStart,
  LineComment,
  DocCommentStart,
  DocComment,
  Int,
  IntExponent,
  IntPeriod,
  Float,
  FloatExponent,
  Ampersand,
  Caret,
  Percent,
  Plus,
  PlusPercent,
  PlusPipe,
  AngleBracketLeft,
  AngleBracketAngleBracketLeft,
  AngleBracketAngleBracketLeftPipe,
  AngleBracketRight,
  AngleBracketAngleBracketRight,
  Period,
  Period2,
  PeriodAsterisk,
  SawAtSign,
  Invalid,
}

// Character code constants
const CHAR_CODE_0 = '0'.charCodeAt(0);
const CHAR_CODE_9 = '9'.charCodeAt(0);
const CHAR_CODE_a = 'a'.charCodeAt(0);
const CHAR_CODE_z = 'z'.charCodeAt(0);
const CHAR_CODE_A = 'A'.charCodeAt(0);
const CHAR_CODE_Z = 'Z'.charCodeAt(0);
const CHAR_CODE_UNDERSCORE = '_'.charCodeAt(0);
const CHAR_CODE_AT = '@'.charCodeAt(0);
const CHAR_CODE_BACKSLASH = '\\'.charCodeAt(0);
const CHAR_CODE_SINGLE_QUOTE = "'".charCodeAt(0);
const CHAR_CODE_DOUBLE_QUOTE = '"'.charCodeAt(0);
const CHAR_CODE_NEWLINE = '\n'.charCodeAt(0);
const CHAR_CODE_CARRIAGE_RETURN = '\r'.charCodeAt(0);
const CHAR_CODE_TAB = '\t'.charCodeAt(0);
const CHAR_CODE_SPACE = ' '.charCodeAt(0);
const CHAR_CODE_SLASH = '/'.charCodeAt(0);
const CHAR_CODE_ASTERISK = '*'.charCodeAt(0);
const CHAR_CODE_DOT = '.'.charCodeAt(0);
const CHAR_CODE_BANG = '!'.charCodeAt(0);

function isIdentifierStart(charCode: number): boolean {
  return (
    (charCode >= CHAR_CODE_a && charCode <= CHAR_CODE_z) ||
    (charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z) ||
    charCode === CHAR_CODE_UNDERSCORE
  );
}

function isIdentifierChar(charCode: number): boolean {
  return isIdentifierStart(charCode) || (charCode >= CHAR_CODE_0 && charCode <= CHAR_CODE_9);
}

function isDigit(charCode: number): boolean {
  return charCode >= CHAR_CODE_0 && charCode <= CHAR_CODE_9;
}

function isWhitespace(charCode: number): boolean {
  return (
    charCode === CHAR_CODE_SPACE ||
    charCode === CHAR_CODE_NEWLINE ||
    charCode === CHAR_CODE_TAB ||
    charCode === CHAR_CODE_CARRIAGE_RETURN
  );
}

function isControlChar(charCode: number): boolean {
  // 0x00 - 0x1F and 0x7F
  return (charCode >= 0x00 && charCode <= 0x1f) || charCode === 0x7f;
}

/**
 * Zig Tokenizer implementation in TypeScript.
 * Processes an input string and yields Tokens based on Zig's lexical rules.
 */
export class Tokenizer {
  private buffer: string;
  private index: number;
  private len: number;

  constructor(buffer: string) {
    this.buffer = buffer;
    this.len = buffer.length;
    // Skip UTF-8 BOM if present
    this.index = buffer.startsWith('\uFEFF') ? 1 : 0;
    // Adjust index if BOM was actually \xEF\xBB\xBF (represented as 3 chars in JS string)
    if (
      buffer.length >= 3 &&
      buffer.charCodeAt(0) === 0xef &&
      buffer.charCodeAt(1) === 0xbb &&
      buffer.charCodeAt(2) === 0xbf
    ) {
      this.index = 3;
    } else if (buffer.startsWith('\uFEFF')) {
      // Standard JS BOM
      this.index = 1;
    } else {
      this.index = 0;
    }
  }

  /**
   * Returns the next token from the input buffer.
   * Returns an EOF token when the end of the buffer is reached.
   */
  public next(): Token {
    let state = State.Start;
    let tokenStart = this.index;

    while (this.index <= this.len) {
      // Use <= to handle EOF properly
      const currentCharCode = this.index < this.len ? this.buffer.charCodeAt(this.index) : 0; // 0 represents EOF

      switch (state) {
        case State.Start:
          tokenStart = this.index; // Reset token start each time we skip whitespace/comments
          if (this.index >= this.len) return this.createToken(TokenTag.Eof, tokenStart); // EOF check

          if (isWhitespace(currentCharCode)) {
            this.index++;
            continue; // Skip whitespace
          }

          switch (currentCharCode) {
            case CHAR_CODE_DOUBLE_QUOTE:
              state = State.StringLiteral;
              this.index++;
              continue;
            case CHAR_CODE_SINGLE_QUOTE:
              state = State.CharLiteral;
              this.index++;
              continue;
            case CHAR_CODE_AT:
              state = State.SawAtSign;
              this.index++;
              continue;
            case '='.charCodeAt(0):
              state = State.Equal;
              this.index++;
              continue;
            case CHAR_CODE_BANG:
              state = State.Bang;
              this.index++;
              continue;
            case '|'.charCodeAt(0):
              state = State.Pipe;
              this.index++;
              continue;
            case '('.charCodeAt(0):
              return this.createToken(TokenTag.LParen, tokenStart, 1);
            case ')'.charCodeAt(0):
              return this.createToken(TokenTag.RParen, tokenStart, 1);
            case '['.charCodeAt(0):
              return this.createToken(TokenTag.LBracket, tokenStart, 1);
            case ']'.charCodeAt(0):
              return this.createToken(TokenTag.RBracket, tokenStart, 1);
            case ';'.charCodeAt(0):
              return this.createToken(TokenTag.Semicolon, tokenStart, 1);
            case ','.charCodeAt(0):
              return this.createToken(TokenTag.Comma, tokenStart, 1);
            case '?'.charCodeAt(0):
              return this.createToken(TokenTag.QuestionMark, tokenStart, 1);
            case ':'.charCodeAt(0):
              return this.createToken(TokenTag.Colon, tokenStart, 1);
            case '%'.charCodeAt(0):
              state = State.Percent;
              this.index++;
              continue;
            case CHAR_CODE_ASTERISK:
              state = State.Asterisk;
              this.index++;
              continue;
            case '+'.charCodeAt(0):
              state = State.Plus;
              this.index++;
              continue;
            case '<'.charCodeAt(0):
              state = State.AngleBracketLeft;
              this.index++;
              continue;
            case '>'.charCodeAt(0):
              state = State.AngleBracketRight;
              this.index++;
              continue;
            case '^'.charCodeAt(0):
              state = State.Caret;
              this.index++;
              continue;
            case CHAR_CODE_BACKSLASH:
              state = State.Backslash;
              this.index++;
              continue;
            case '{'.charCodeAt(0):
              return this.createToken(TokenTag.LBrace, tokenStart, 1);
            case '}'.charCodeAt(0):
              return this.createToken(TokenTag.RBrace, tokenStart, 1);
            case '~'.charCodeAt(0):
              return this.createToken(TokenTag.Tilde, tokenStart, 1);
            case CHAR_CODE_DOT:
              state = State.Period;
              this.index++;
              continue;
            case '-'.charCodeAt(0):
              state = State.Minus;
              this.index++;
              continue;
            case CHAR_CODE_SLASH:
              state = State.Slash;
              this.index++;
              continue;
            case '&'.charCodeAt(0):
              state = State.Ampersand;
              this.index++;
              continue;
            default:
              if (isIdentifierStart(currentCharCode)) {
                state = State.Identifier;
                this.index++;
                continue;
              }
              if (isDigit(currentCharCode)) {
                state = State.Int;
                this.index++;
                continue;
              }
              // Handle null byte explicitly if needed, otherwise fall through to Invalid
              if (currentCharCode === 0 && this.index < this.len) {
                state = State.Invalid;
                continue; // Consume null byte and go to invalid state handling
              }

              state = State.Invalid; // Unrecognized character
              continue;
          }

        // @ts-expect-error - This is a valid state
        case State.ExpectNewline:
          this.index++;
          if (this.index >= this.len) {
            return this.createToken(TokenTag.Invalid, tokenStart); // Invalid state reached EOF
          }
          if (currentCharCode === CHAR_CODE_NEWLINE) {
            state = State.Start; // Found newline, reset state
            continue;
          }
          state = State.Invalid; // Expected newline, found something else
          continue;

        case State.Invalid:
          // Consume characters until a newline or EOF is found
          this.index++;
          if (this.index >= this.len || currentCharCode === CHAR_CODE_NEWLINE) {
            return this.createToken(TokenTag.Invalid, tokenStart);
          }
          continue; // Keep consuming in invalid state

        case State.SawAtSign:
          if (this.index >= this.len || currentCharCode === CHAR_CODE_NEWLINE)
            return this.createToken(TokenTag.Invalid, tokenStart);
          if (currentCharCode === CHAR_CODE_DOUBLE_QUOTE) {
            // @"ident" - treat as identifier
            state = State.StringLiteral;
            this.index++;
            continue;
          }
          if (isIdentifierStart(currentCharCode)) {
            state = State.Builtin;
            this.index++;
            continue;
          }
          state = State.Invalid; // Invalid character after @
          continue;

        case State.Identifier:
          if (isIdentifierChar(currentCharCode)) {
            this.index++;
            continue;
          } else {
            // End of identifier
            const value = this.buffer.substring(tokenStart, this.index);
            const keywordTag = getKeywordTag(value);
            return this.createFinalToken(keywordTag ?? TokenTag.Identifier, tokenStart);
          }

        case State.Builtin: // Similar to identifier but started with @
          if (isIdentifierChar(currentCharCode)) {
            this.index++;
            continue;
          } else {
            // End of builtin identifier (e.g., @import)
            return this.createFinalToken(TokenTag.Builtin, tokenStart);
          }

        case State.StringLiteral:
          if (this.index >= this.len) return this.createToken(TokenTag.Invalid, tokenStart); // Unterminated string
          switch (currentCharCode) {
            case CHAR_CODE_DOUBLE_QUOTE: // End of string
              this.index++;
              return this.createFinalToken(TokenTag.StringLiteral, tokenStart);
            case CHAR_CODE_BACKSLASH:
              state = State.StringLiteralBackslash;
              this.index++;
              continue;
            case CHAR_CODE_NEWLINE: // Newline invalid in single-line string
            case CHAR_CODE_CARRIAGE_RETURN:
              state = State.Invalid; // Mark as invalid
              continue;
            case 0: // Null byte check within string
              if (this.index < this.len) {
                state = State.Invalid;
                continue;
              } else {
                return this.createToken(TokenTag.Invalid, tokenStart); // EOF after partial string
              }
            default:
              // Check for invalid control chars (excluding allowed like tab)
              if (isControlChar(currentCharCode) && currentCharCode !== CHAR_CODE_TAB) {
                state = State.Invalid;
                continue;
              }
              this.index++; // Consume character
              continue;
          }

        case State.StringLiteralBackslash:
          if (this.index >= this.len) return this.createToken(TokenTag.Invalid, tokenStart); // Unterminated escape
          // Any character after backslash is valid in Zig string literal, consumes the escape sequence
          state = State.StringLiteral;
          this.index++;
          continue;

        case State.CharLiteral:
          if (this.index >= this.len) return this.createToken(TokenTag.Invalid, tokenStart); // Unterminated char literal
          switch (currentCharCode) {
            case CHAR_CODE_SINGLE_QUOTE: // End of char literal
              this.index++;
              // Check if empty ' ' which is valid
              if (this.index === tokenStart + 2) {
                return this.createFinalToken(TokenTag.CharLiteral, tokenStart);
              }
              // Check if content is valid (single char or escape)
              // Simple check: length should be 3 ('x') or 4 ('\n')
              // More complex validation (like \u{}) needed for full correctness
              if (this.index - tokenStart > 2) {
                return this.createFinalToken(TokenTag.CharLiteral, tokenStart);
              } else {
                state = State.Invalid; // Invalid char literal content like '''
                continue;
              }

            case CHAR_CODE_BACKSLASH:
              state = State.CharLiteralBackslash;
              this.index++;
              continue;
            case CHAR_CODE_NEWLINE: // Newline invalid in char literal
            case CHAR_CODE_CARRIAGE_RETURN:
              state = State.Invalid;
              continue;
            case 0: // Null byte check
              if (this.index < this.len) {
                state = State.Invalid;
                continue;
              } else {
                return this.createToken(TokenTag.Invalid, tokenStart); // EOF
              }
            default:
              // Check for invalid control chars
              if (isControlChar(currentCharCode) && currentCharCode !== CHAR_CODE_TAB) {
                state = State.Invalid;
                continue;
              }
              this.index++; // Consume character
              // In Zig, char literal should contain exactly one codepoint after escapes are processed
              // We don't fully validate here, just consume. Parser should validate content.
              continue; // Stay in CharLiteral state to catch the closing quote
          }

        case State.CharLiteralBackslash:
          if (this.index >= this.len) return this.createToken(TokenTag.Invalid, tokenStart); // Unterminated escape
          // Consume the escaped character, then expect the closing quote
          if (currentCharCode === CHAR_CODE_NEWLINE || currentCharCode === CHAR_CODE_CARRIAGE_RETURN) {
            state = State.Invalid;
            continue;
          }
          if (isControlChar(currentCharCode) && currentCharCode !== CHAR_CODE_TAB) {
            state = State.Invalid;
            continue;
          }
          state = State.CharLiteral; // Go back to expecting closing quote
          this.index++;
          continue;

        case State.Backslash: // Start of a multi-line string `\`
          if (this.index >= this.len) return this.createToken(TokenTag.Invalid, tokenStart);
          if (currentCharCode === CHAR_CODE_BACKSLASH) {
            state = State.MultilineStringLiteralLine;
            this.index++;
            continue;
          }
          // Single backslash not followed by another is invalid outside string/char literals
          state = State.Invalid;
          continue;

        case State.MultilineStringLiteralLine: // Consuming `\\ ... \n`
          if (this.index >= this.len) return this.createToken(TokenTag.Invalid, tokenStart); // Unterminated

          switch (currentCharCode) {
            case CHAR_CODE_NEWLINE:
              this.index++; // Consume newline
              return this.createFinalToken(TokenTag.MultilineStringLiteralLine, tokenStart);
            case CHAR_CODE_CARRIAGE_RETURN:
              // Allow \r\n sequence
              if (this.peekCharCode() === CHAR_CODE_NEWLINE) {
                this.index += 2; // Consume both \r and \n
                return this.createFinalToken(TokenTag.MultilineStringLiteralLine, tokenStart);
              } else {
                state = State.Invalid; // Stray \r
                continue;
              }
            case CHAR_CODE_TAB: // Tab is invalid here per Zig spec
              state = State.Invalid;
              continue;
            case 0: // Null byte check
              if (this.index < this.len) {
                state = State.Invalid;
                continue;
              } else {
                return this.createToken(TokenTag.Invalid, tokenStart); // EOF
              }
            default:
              // Check for other invalid control chars
              if (isControlChar(currentCharCode)) {
                state = State.Invalid;
                continue;
              }
              this.index++; // Consume char
              continue; // Stay in this state
          }

        case State.Equal:
          switch (currentCharCode) {
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.EqualEqual, tokenStart, 2);
            case '>'.charCodeAt(0):
              return this.createToken(TokenTag.EqualAngleBracketRight, tokenStart, 2);
            default:
              return this.createFinalToken(TokenTag.Equal, tokenStart); // Single '='
          }

        case State.Bang:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.BangEqual, tokenStart, 2);
          }
          return this.createFinalToken(TokenTag.Bang, tokenStart); // Single '!'

        case State.Pipe:
          switch (currentCharCode) {
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.PipeEqual, tokenStart, 2);
            case '|'.charCodeAt(0):
              return this.createToken(TokenTag.PipePipe, tokenStart, 2);
            default:
              return this.createFinalToken(TokenTag.Pipe, tokenStart); // Single '|'
          }

        case State.Minus:
          switch (currentCharCode) {
            case '>'.charCodeAt(0):
              return this.createToken(TokenTag.Arrow, tokenStart, 2);
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.MinusEqual, tokenStart, 2);
            case '%'.charCodeAt(0):
              state = State.MinusPercent;
              this.index++;
              continue;
            case '|'.charCodeAt(0):
              state = State.MinusPipe;
              this.index++;
              continue;
            default:
              return this.createFinalToken(TokenTag.Minus, tokenStart); // Single '-'
          }

        case State.MinusPercent:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.MinusPercentEqual, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.MinusPercent, tokenStart, 2); // Just -%

        case State.MinusPipe:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.MinusPipeEqual, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.MinusPipe, tokenStart, 2); // Just -|

        case State.Asterisk:
          switch (currentCharCode) {
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.AsteriskEqual, tokenStart, 2);
            case CHAR_CODE_ASTERISK:
              return this.createToken(TokenTag.AsteriskAsterisk, tokenStart, 2);
            case '%'.charCodeAt(0):
              state = State.AsteriskPercent;
              this.index++;
              continue;
            case '|'.charCodeAt(0):
              state = State.AsteriskPipe;
              this.index++;
              continue;
            default:
              return this.createFinalToken(TokenTag.Asterisk, tokenStart); // Single '*'
          }

        case State.AsteriskPercent:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.AsteriskPercentEqual, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.AsteriskPercent, tokenStart, 2); // Just *%

        case State.AsteriskPipe:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.AsteriskPipeEqual, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.AsteriskPipe, tokenStart, 2); // Just *|

        case State.Slash:
          switch (currentCharCode) {
            case CHAR_CODE_SLASH:
              state = State.LineCommentStart;
              this.index++;
              continue;
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.SlashEqual, tokenStart, 2);
            default:
              return this.createFinalToken(TokenTag.Slash, tokenStart); // Single '/'
          }

        case State.LineCommentStart: // Just saw //
          if (this.index >= this.len) {
            state = State.Start;
            continue;
          } // EOF ends comment

          switch (currentCharCode) {
            case CHAR_CODE_BANG: // //! Container doc comment
              state = State.DocComment; // Treat same as /// for consumption
              this.index++;
              // Overwrite tokenStart to exclude '//!' prefix from value
              tokenStart = this.index;
              // We need to mark this specially though
              // Hack: Use a temporary state/flag or adjust token creation
              // Let's return ContainerDocComment directly from DocComment state
              continue;
            case CHAR_CODE_SLASH: // /// Doc comment
              state = State.DocCommentStart;
              this.index++;
              continue;
            case CHAR_CODE_NEWLINE:
              state = State.Start; // End of line comment
              this.index++;
              continue; // Restart token search

            // @ts-ignore - This is a valid state
            case CHAR_CODE_CARRIAGE_RETURN:
              // Handle \r\n
              if (this.peekCharCode() === CHAR_CODE_NEWLINE) {
                this.index++; // Consume \r, next loop consumes \n
              }
            // Fallthrough to treat \r as end of line/invalid based on next char
            case CHAR_CODE_TAB: // Invalid in comments
              state = State.Invalid;
              continue;
            case 0: // Null byte check
              if (this.index < this.len) {
                state = State.Invalid;
                continue;
              } else {
                state = State.Start; // EOF ends the comment
                continue;
              }
            default:
              // Check for other invalid control chars
              if (isControlChar(currentCharCode)) {
                state = State.Invalid;
                continue;
              }
              state = State.LineComment; // Regular line comment content
              this.index++;
              continue;
          }

        case State.DocCommentStart: // Just saw ///
          if (this.index >= this.len) {
            // Ends /// doc comment immediately
            return this.createToken(TokenTag.DocComment, tokenStart, 3);
          }
          switch (currentCharCode) {
            case CHAR_CODE_NEWLINE:
            case CHAR_CODE_CARRIAGE_RETURN: // Handled like newline
            case 0: // EOF also terminates
              // The /// itself is the token
              return this.createToken(TokenTag.DocComment, tokenStart, 3);
            case CHAR_CODE_SLASH: // //// is a normal line comment
              state = State.LineComment;
              this.index++;
              continue;
            case CHAR_CODE_TAB: // Invalid
              state = State.Invalid;
              continue;
            default:
              // Check for other invalid control chars
              if (isControlChar(currentCharCode)) {
                state = State.Invalid;
                continue;
              }
              // Start of doc comment content
              state = State.DocComment;
              // Adjust token start to *after* the '///'
              tokenStart = this.index;
              this.index++;
              continue;
          }

        case State.LineComment:
          if (this.index >= this.len) {
            state = State.Start;
            continue;
          } // EOF ends comment

          switch (currentCharCode) {
            case CHAR_CODE_NEWLINE:
              state = State.Start; // End of line comment
              this.index++;
              continue; // Restart token search
            case CHAR_CODE_CARRIAGE_RETURN:
              // Handle \r\n
              if (this.peekCharCode() === CHAR_CODE_NEWLINE) {
                this.index++; // Consume \r, next loop consumes \n
              } else {
                state = State.Invalid; // Stray \r
              }
              continue;
            case CHAR_CODE_TAB: // Invalid
              state = State.Invalid;
              continue;
            case 0: // Null byte check
              if (this.index < this.len) {
                state = State.Invalid;
                continue;
              } else {
                state = State.Start; // EOF ends the comment
                continue;
              }
            default:
              // Check for other invalid control chars
              if (isControlChar(currentCharCode)) {
                state = State.Invalid;
                continue;
              }
              this.index++; // Consume comment character
              continue; // Stay in line comment state
          }

        case State.DocComment: // Consuming content after /// or //!
          const isContainer = this.buffer.startsWith('//!', tokenStart - 3); // Check if we started with //!

          if (this.index >= this.len) {
            // EOF ends comment
            return this.createFinalToken(isContainer ? TokenTag.ContainerDocComment : TokenTag.DocComment, tokenStart);
          }

          switch (currentCharCode) {
            case CHAR_CODE_NEWLINE:
              this.index++; // Consume newline
              return this.createFinalToken(
                isContainer ? TokenTag.ContainerDocComment : TokenTag.DocComment,
                tokenStart,
              );
            case CHAR_CODE_CARRIAGE_RETURN:
              // Allow \r\n
              if (this.peekCharCode() === CHAR_CODE_NEWLINE) {
                this.index++; // Consume \r, next loop consumes \n
                continue; // Stay in DocComment, handle \n on next iteration
              } else {
                state = State.Invalid; // Stray \r
                continue;
              }
            case CHAR_CODE_TAB: // Invalid
              state = State.Invalid;
              continue;
            case 0: // Null byte check
              if (this.index < this.len) {
                state = State.Invalid;
                continue;
              } else {
                // EOF ends comment
                return this.createFinalToken(
                  isContainer ? TokenTag.ContainerDocComment : TokenTag.DocComment,
                  tokenStart,
                );
              }
            default:
              // Check for other invalid control chars
              if (isControlChar(currentCharCode)) {
                state = State.Invalid;
                continue;
              }
              this.index++; // Consume comment character
              continue; // Stay in doc comment state
          }

        case State.Int: // Consuming integer part
          if (currentCharCode === CHAR_CODE_DOT) {
            // Could be float or range `1..`
            state = State.IntPeriod;
            this.index++;
            continue;
          }
          if (
            currentCharCode === 'e'.charCodeAt(0) ||
            currentCharCode === 'E'.charCodeAt(0) ||
            currentCharCode === 'p'.charCodeAt(0) ||
            currentCharCode === 'P'.charCodeAt(0)
          ) {
            // Potential float exponent
            state = State.IntExponent;
            this.index++;
            continue;
          }
          // Allow digits, hex chars (a-f, A-F), underscore
          // The Zig tokenizer allows chars other than b/o/x specifiers within the number,
          // parser validation handles if they are valid for the detected base (0x, 0b, 0o)
          if (
            isDigit(currentCharCode) ||
            (currentCharCode >= CHAR_CODE_a && currentCharCode <= CHAR_CODE_z) ||
            (currentCharCode >= CHAR_CODE_A && currentCharCode <= CHAR_CODE_Z) ||
            currentCharCode === CHAR_CODE_UNDERSCORE
          ) {
            this.index++;
            continue;
          }
          // End of integer literal
          return this.createFinalToken(TokenTag.NumberLiteral, tokenStart);

        case State.IntExponent: // Saw number then 'e', 'E', 'p', or 'P'
          if (currentCharCode === '+'.charCodeAt(0) || currentCharCode === '-'.charCodeAt(0)) {
            // Consume sign
            this.index++;
            state = State.Float; // Now definitely a float
            continue;
          }
          // If it's a digit or valid number char, it's part of the exponent/number
          if (
            isDigit(currentCharCode) ||
            (currentCharCode >= CHAR_CODE_a && currentCharCode <= CHAR_CODE_z) ||
            (currentCharCode >= CHAR_CODE_A && currentCharCode <= CHAR_CODE_Z) ||
            currentCharCode === CHAR_CODE_UNDERSCORE
          ) {
            state = State.Float; // Transition to float state
            this.index++;
            continue;
          }
          // 'e'/'p' not followed by sign/digit - treat as part of int (e.g. 0xBeef)
          state = State.Int;
          // Don't increment index, re-evaluate current char in Int state
          continue;

        case State.IntPeriod: // Saw integer then '.'
          if (currentCharCode === CHAR_CODE_DOT) {
            // Second dot `..`
            this.index--; // Backtrack to before the first dot
            return this.createFinalToken(TokenTag.NumberLiteral, tokenStart); // Emit number token
            // Next token will be Ellipsis2 or Ellipsis3 starting at the first dot
          }
          if (
            isDigit(currentCharCode) || // Start of fractional part
            (currentCharCode >= CHAR_CODE_a && currentCharCode <= CHAR_CODE_z) || // Hex float
            (currentCharCode >= CHAR_CODE_A && currentCharCode <= CHAR_CODE_Z) ||
            currentCharCode === CHAR_CODE_UNDERSCORE
          ) {
            state = State.Float;
            this.index++;
            continue;
          }
          if (
            currentCharCode === 'e'.charCodeAt(0) ||
            currentCharCode === 'E'.charCodeAt(0) ||
            currentCharCode === 'p'.charCodeAt(0) ||
            currentCharCode === 'P'.charCodeAt(0)
          ) {
            // Exponent directly after dot (e.g., 1.e2)
            state = State.FloatExponent;
            this.index++;
            continue;
          }

          // Just a period following a number, not part of the number
          this.index--; // Backtrack to the end of the number
          return this.createFinalToken(TokenTag.NumberLiteral, tokenStart); // Emit the number
        // The next token will be a Period

        case State.Float: // Consuming fractional part or exponent part
          if (
            currentCharCode === 'e'.charCodeAt(0) ||
            currentCharCode === 'E'.charCodeAt(0) ||
            currentCharCode === 'p'.charCodeAt(0) ||
            currentCharCode === 'P'.charCodeAt(0)
          ) {
            // Potential float exponent
            state = State.FloatExponent;
            this.index++;
            continue;
          }
          // Allow digits, hex chars, underscore
          if (
            isDigit(currentCharCode) ||
            (currentCharCode >= CHAR_CODE_a && currentCharCode <= CHAR_CODE_z) ||
            (currentCharCode >= CHAR_CODE_A && currentCharCode <= CHAR_CODE_Z) ||
            currentCharCode === CHAR_CODE_UNDERSCORE
          ) {
            this.index++;
            continue;
          }
          // End of float literal
          return this.createFinalToken(TokenTag.NumberLiteral, tokenStart);

        case State.FloatExponent: // Saw float chars then 'e', 'E', 'p', or 'P'
          if (currentCharCode === '+'.charCodeAt(0) || currentCharCode === '-'.charCodeAt(0)) {
            // Consume sign
            const nextChar = this.peekCharCode();
            // Exponent sign must be followed by a digit (or valid literal char)
            if (
              isDigit(nextChar) ||
              (nextChar >= CHAR_CODE_a && nextChar <= CHAR_CODE_z) ||
              (nextChar >= CHAR_CODE_A && nextChar <= CHAR_CODE_Z) ||
              nextChar === CHAR_CODE_UNDERSCORE
            ) {
              this.index++;
              state = State.Float; // Consume exponent digits in Float state
              continue;
            } else {
              // Invalid exponent like '1.0e+'
              state = State.Invalid;
              continue;
            }
          }
          // If it's a digit or valid number char, it's part of the exponent
          if (
            isDigit(currentCharCode) ||
            (currentCharCode >= CHAR_CODE_a && currentCharCode <= CHAR_CODE_z) ||
            (currentCharCode >= CHAR_CODE_A && currentCharCode <= CHAR_CODE_Z) ||
            currentCharCode === CHAR_CODE_UNDERSCORE
          ) {
            state = State.Float; // Consume exponent digits in Float state
            this.index++;
            continue;
          }
          // End of float literal (e.g. '1.0e' is invalid but lexer stops here)
          return this.createFinalToken(TokenTag.NumberLiteral, tokenStart);

        case State.Ampersand:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.AmpersandEqual, tokenStart, 2);
          }
          return this.createFinalToken(TokenTag.Ampersand, tokenStart); // Single '&'

        case State.Caret:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.CaretEqual, tokenStart, 2);
          }
          return this.createFinalToken(TokenTag.Caret, tokenStart); // Single '^'

        case State.Percent:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.PercentEqual, tokenStart, 2);
          }
          return this.createFinalToken(TokenTag.Percent, tokenStart); // Single '%'

        case State.Plus:
          switch (currentCharCode) {
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.PlusEqual, tokenStart, 2);
            case '+'.charCodeAt(0):
              return this.createToken(TokenTag.PlusPlus, tokenStart, 2);
            case '%'.charCodeAt(0):
              state = State.PlusPercent;
              this.index++;
              continue;
            case '|'.charCodeAt(0):
              state = State.PlusPipe;
              this.index++;
              continue;
            default:
              return this.createFinalToken(TokenTag.Plus, tokenStart); // Single '+'
          }

        case State.PlusPercent:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.PlusPercentEqual, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.PlusPercent, tokenStart, 2); // Just +%

        case State.PlusPipe:
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.PlusPipeEqual, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.PlusPipe, tokenStart, 2); // Just +|

        case State.AngleBracketLeft:
          switch (currentCharCode) {
            case '<'.charCodeAt(0):
              state = State.AngleBracketAngleBracketLeft;
              this.index++;
              continue;
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.AngleBracketLeftEqual, tokenStart, 2);
            default:
              return this.createFinalToken(TokenTag.AngleBracketLeft, tokenStart); // Single '<'
          }

        case State.AngleBracketAngleBracketLeft: // Saw <<
          switch (currentCharCode) {
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.AngleBracketAngleBracketLeftEqual, tokenStart, 3);
            case '|'.charCodeAt(0):
              state = State.AngleBracketAngleBracketLeftPipe;
              this.index++;
              continue;
            default:
              return this.createFinalToken(TokenTag.AngleBracketAngleBracketLeft, tokenStart, 2); // Just <<
          }

        case State.AngleBracketAngleBracketLeftPipe: // Saw <<|
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.AngleBracketAngleBracketLeftPipeEqual, tokenStart, 4);
          }
          return this.createFinalToken(TokenTag.AngleBracketAngleBracketLeftPipe, tokenStart, 3); // Just <<|

        case State.AngleBracketRight: // Saw >
          switch (currentCharCode) {
            case '>'.charCodeAt(0):
              state = State.AngleBracketAngleBracketRight;
              this.index++;
              continue;
            case '='.charCodeAt(0):
              return this.createToken(TokenTag.AngleBracketRightEqual, tokenStart, 2);
            default:
              return this.createFinalToken(TokenTag.AngleBracketRight, tokenStart); // Single '>'
          }

        case State.AngleBracketAngleBracketRight: // Saw >>
          if (currentCharCode === '='.charCodeAt(0)) {
            return this.createToken(TokenTag.AngleBracketAngleBracketRightEqual, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.AngleBracketAngleBracketRight, tokenStart, 2); // Just >>

        case State.Period: // Saw .
          switch (currentCharCode) {
            case CHAR_CODE_DOT:
              state = State.Period2;
              this.index++;
              continue;
            case CHAR_CODE_ASTERISK:
              state = State.PeriodAsterisk;
              this.index++;
              continue;
            default:
              return this.createFinalToken(TokenTag.Period, tokenStart); // Single '.'
          }

        case State.Period2: // Saw ..
          if (currentCharCode === CHAR_CODE_DOT) {
            return this.createToken(TokenTag.Ellipsis3, tokenStart, 3); // ...
          }
          return this.createFinalToken(TokenTag.Ellipsis2, tokenStart, 2); // Just ..

        case State.PeriodAsterisk: // Saw .*
          if (currentCharCode === CHAR_CODE_ASTERISK) {
            // .** is explicitly invalid
            return this.createToken(TokenTag.InvalidPeriodAsterisks, tokenStart, 3);
          }
          return this.createFinalToken(TokenTag.PeriodAsterisk, tokenStart, 2); // Just .*
      } // End Switch(State)
    } // End While Loop

    // Should only be reached if loop terminates unexpectedly (e.g., index > len)
    // Return EOF if at end, otherwise Invalid might be appropriate
    if (this.index >= this.len && state === State.Start) {
      return this.createToken(TokenTag.Eof, this.len);
    }
    // If we were in a state expecting more chars, it's likely invalid
    return this.createToken(TokenTag.Invalid, tokenStart);
  }

  // Helper to create a token where the length is explicitly known (usually 1 or 2 chars)
  private createToken(tag: TokenTag, start: number, length: number = 1): Token {
    this.index = start + length; // Consume the characters
    const end = this.index;
    return {
      tag: tag,
      loc: { start, end },
      value: this.buffer.substring(start, end),
    };
  }

  // Helper to create a token where the end is the current index
  private createFinalToken(tag: TokenTag, start: number, length?: number): Token {
    const end = length ? start + length : this.index;
    if (length) this.index = end; // Advance index if length provided
    return {
      tag: tag,
      loc: { start, end },
      value: this.buffer.substring(start, end),
    };
  }

  // Peek at the next character code without consuming
  private peekCharCode(offset: number = 1): number {
    const peekIndex = this.index + offset - 1; // -1 because current index points *at* next char
    if (peekIndex >= this.len) {
      return 0; // EOF
    }
    return this.buffer.charCodeAt(peekIndex);
  }

  public *tokens(): Generator<Token, void, undefined> {
    while (true) {
      const token = this.next();
      yield token;
      if (token.tag === TokenTag.Eof) {
        break;
      }
    }
  }
}
