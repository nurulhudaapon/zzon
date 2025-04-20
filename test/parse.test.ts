import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

describe('ZON Parser', () => {
  describe('Basic Types', () => {
    it('should parse strings', () => {
      expect(ZON.parse('"hello world"')).toBe('hello world');
      expect(ZON.parse("'a'")).toBe('a');
      expect(ZON.parse('""')).toBe('');
    });

    it('should parse numbers', () => {
      expect(ZON.parse('123_456')).toBe(123456);
      expect(ZON.parse('123.456')).toBe(123.456);
      expect(ZON.parse('0')).toBe(0);
      expect(ZON.parse('-123')).toBe(-123);
      expect(ZON.parse('1.23e4')).toBe(1.23e4);
    });

    it('should parse booleans', () => {
      expect(ZON.parse('true')).toBe(true);
      expect(ZON.parse('false')).toBe(false);
    });

    it('should parse null', () => {
      expect(ZON.parse('null')).toBe(null);
    });

    it('should parse enum value with keyword', () => {
      expect(ZON.parse('.{ .kind = .@"test" }')).toEqual({ kind: 'test' });
      expect(ZON.parse('.{ .kind = .@"if" }')).toEqual({ kind: 'if' });
    });

    it('should parse enum field with keyword', () => {
      expect(ZON.parse('.{ .@"while" = true }')).toEqual({ while: true });
      expect(ZON.parse('.{ .@"if" = true }')).toEqual({ if: true });
    });

    it('should throw error with empty field name', () => {
      expect(() => ZON.parse('.{ .= true }')).toThrow();
      expect(() => ZON.parse('.{ .@"" = true }')).toThrow();
    });
  });

  describe('Arrays', () => {
    it('should parse simple arrays', () => {
      expect(ZON.parse('.{1, 2, 3}')).toEqual([1, 2, 3]);
      expect(ZON.parse('.{"a", "b", "c"}')).toEqual(['a', 'b', 'c']);
      expect(ZON.parse('.{true, false}')).toEqual([true, false]);
      expect(ZON.parse('.{1, "two", true, null}')).toEqual([1, 'two', true, null]);
    });

    it('should parse arrays with trailing commas', () => {
      expect(ZON.parse('.{1, 2, 3,}')).toEqual([1, 2, 3]);
    });

    it('should parse empty arrays', () => {
      expect(ZON.parse('.{}')).toEqual([]);
    });
  });

  describe('Objects', () => {
    it('should parse simple objects', () => {
      const zonString = `
.{
  .name = "test",
  .value = 123_456,
  .flag = true
}`;
      expect(ZON.parse(zonString)).toEqual({
        name: 'test',
        value: 123456,
        flag: true,
      });
    });

    it('should parse objects with trailing commas', () => {
      const zonString = `
.{
  .a = 1,
  .b = 2,
  .c = 3,
}`;
      expect(ZON.parse(zonString)).toEqual({
        a: 1,
        b: 2,
        c: 3,
      });
    });

    it('should parse empty objects', () => {
      expect(ZON.parse('.{}')).toEqual([]);
    });
  });

  describe('Nested Structures', () => {
    it('should parse deeply nested objects', () => {
      const nestedZon = `
.{
  .outer = .{
    .middle = .{
      .inner = .{
        .value = "deeply nested"
      }
    }
  }
}`;
      expect(ZON.parse(nestedZon)).toEqual({
        outer: {
          middle: {
            inner: {
              value: 'deeply nested',
            },
          },
        },
      });
    });

    it('should parse arrays of objects', () => {
      const zonString = `
.{
  .array = .{
    .{
      .name = "first"
    },
    .{
      .name = "second"
    }
  }
}`;
      expect(ZON.parse(zonString)).toEqual({
        array: [{ name: 'first' }, { name: 'second' }],
      });
    });
  });

  describe('Special Cases', () => {
    it('should parse enum literals', () => {
      const zonEnumLiteral = `
.{
  .{
    .kind = .keyword
  },
  .{
    .kind = .word
  }
}`;
      expect(ZON.parse(zonEnumLiteral)).toEqual([{ kind: 'keyword' }, { kind: 'word' }]);
    });

    it('should ignore comments', () => {
      const commentZon = `
.{
  // This is a line comment
  .name = "test", // inline comment
  .value = 123
}`;
      expect(ZON.parse(commentZon)).toEqual({
        name: 'test',
        value: 123,
      });
    });

    it('should handle whitespace variations', () => {
      expect(ZON.parse('.{1,2,3}')).toEqual([1, 2, 3]);
      expect(ZON.parse('.{ 1 , 2 , 3 }')).toEqual([1, 2, 3]);
      expect(ZON.parse('.{1,2 , 3}')).toEqual([1, 2, 3]);
    });
  });

  describe('Performance', () => {
    it('should parse ~10KB under 1ms', () => {
      const ALLOWED_TIME_MS = 1;
      const iterations = 1000;
      const largeZonString = `.{ ${Array(100).fill('.{ .name = "test" }').join(',')} }`;

      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        ZON.parse(largeZonString);
      }
      const end = performance.now();

      const avgTime = (end - start) / iterations;
      expect(avgTime).toBeLessThan(ALLOWED_TIME_MS);
    });
  });
});
