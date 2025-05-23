import { Tokenizer } from '../src/zig';
import { describe, it, expect } from 'bun:test';

const zonStr = `
.{
    .a = .{ .b = 1, .c = 'a', .d = .{ 1, 2, 3 }, .e = .{ .f = true, .g = null } },
    .b = .{ 1, 'b', true, .{ .h = 'i' } },
    .c = .{ .j = .{ .k = .{ .l = 'm' } } },
    .e = null,
    .@"while" = true,
}
    

`;

const zonTokens = [
  'Period',
  'LBrace',
  'Period',
  'Identifier',
  'Equal',
  'Period',
  'LBrace',
  'Period',
  'Identifier',
  'Equal',
  'NumberLiteral',
  'Comma',
  'Period',
  'Identifier',
  'Equal',
  'CharLiteral',
  'Comma',
  'Period',
  'Identifier',
  'Equal',
  'Period',
  'LBrace',
  'NumberLiteral',
  'Comma',
  'NumberLiteral',
  'Comma',
  'NumberLiteral',
  'RBrace',
  'Comma',
  'Period',
  'Identifier',
  'Equal',
  'Period',
  'LBrace',
  'Period',
  'Identifier',
  'Equal',
  'Identifier',
  'Comma',
  'Period',
  'Identifier',
  'Equal',
  'Identifier',
  'RBrace',
  'RBrace',
  'Comma',
  'Period',
  'Identifier',
  'Equal',
  'Period',
  'LBrace',
  'NumberLiteral',
  'Comma',
  'CharLiteral',
  'Comma',
  'Identifier',
  'Comma',
  'Period',
  'LBrace',
  'Period',
  'Identifier',
  'Equal',
  'CharLiteral',
  'RBrace',
  'RBrace',
  'Comma',
  'Period',
  'Identifier',
  'Equal',
  'Period',
  'LBrace',
  'Period',
  'Identifier',
  'Equal',
  'Period',
  'LBrace',
  'Period',
  'Identifier',
  'Equal',
  'Period',
  'LBrace',
  'Period',
  'Identifier',
  'Equal',
  'CharLiteral',
  'RBrace',
  'RBrace',
  'RBrace',
  'Comma',
  'Period',
  'Identifier',
  'Equal',
  'Identifier',
  'Comma',
  'Period',
  'StringLiteral',
  'Equal',
  'Identifier',
  'Comma',
  'RBrace',
  'Eof',
];

describe('Zig Tokenizer', () => {
  it('keyword keys', () => {
    const tokenizer = new Tokenizer(zonStr);
    const tokens = tokenizer.tokens();
    const totalTokens = tokens.toArray();

    expect(totalTokens.map((t) => String(t.tag))).toEqual(zonTokens);
  });
});
