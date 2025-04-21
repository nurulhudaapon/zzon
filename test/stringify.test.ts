import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

const equal = (a: any, b: string, msg?: string) => {
  expect(ZON.stringify(a), msg).toBe(b);
};

describe('ZON Stringify', () => {
  describe('primitives', () => {
    it('should stringify numbers', () => {
      equal(1, '1');
      equal(42, '42');
      equal(0, '0');
    });

    it('should stringify strings', () => {
      equal('a', "'a'", 'should single quote one character');
      equal('abc', '"abc"', 'should double quote multiple characters');
      equal('', '""', 'should handle empty string');
    });

    it('should stringify booleans', () => {
      equal(true, 'true');
      equal(false, 'false');
    });

    it('should stringify null and undefined', () => {
      equal(null, 'null');
      equal(undefined, '');
    });
  });

  describe('objects', () => {
    it('should stringify simple objects', () => {
      equal({ a: 1 }, `.{.a=1}`);
      equal({ b: 'a' }, `.{.b='a'}`);
      equal({ c: true }, `.{.c=true}`);
      equal({ d: false }, `.{.d=false}`);
      equal({ e: null }, `.{.e=null}`);
    });

    it('should stringify objects with multiple properties', () => {
      equal(
        { a: 1, b: 'a', bb: 'ab', c: true, d: false, e: null, f: undefined },
        `.{.a=1,.b='a',.bb="ab",.c=true,.d=false,.e=null}`,
      );
    });

    it('should stringify nested objects', () => {
      equal({ a: { b: 1 } }, `.{.a=.{.b=1}}`);
      equal({ z: undefined, a: 1, b: 1 }, `.{.a=1,.b=1}`);
      equal({ a: { b: 1, c: 'a' } }, `.{.a=.{.b=1,.c='a'}}`);
    });
  });

  describe('arrays', () => {
    it('should stringify simple arrays', () => {
      equal([1], `.{1}`);
      equal(['a'], `.{'a'}`);
      equal([true], `.{true}`);
      equal([false], `.{false}`);
      equal([null], `.{null}`);
    });

    it('should stringify arrays with multiple elements', () => {
      equal([1, 'a', 'ab', true, false, null, undefined], `.{1,'a',"ab",true,false,null}`);
    });
  });

  describe('space parameter', () => {
    it('should handle numeric space parameter', () => {
      const obj = { a: 1, b: { c: 2 } };
      expect(ZON.stringify(obj, null, 2)).toBe(`.{\n  .a = 1,\n  .b = .{\n    .c = 2},\n}`);
    });

    it('should handle string space parameter', () => {
      const obj = { a: 1, b: { c: 2 } };
      expect(ZON.stringify(obj, null, '\t')).toBe('.{\n\t.a = 1,\n\t.b = .{\n\t\t.c = 2},\n}');
    });

    it('should handle zero space parameter', () => {
      const obj = { a: 1, b: { c: 2 } };
      expect(ZON.stringify(obj, null, 0)).toBe('.{\n.a=1,\n.b=.{\n.c=2}\n}');
    });
  });

  describe('keyword field names', () => {
    it('should handle keyword parameter', () => {
      const obj = { test: 1, b: { c: 2 } };
      expect(ZON.stringify(obj, null, 0)).toBe('.{\n.@"test"=1,\n.b=.{\n.c=2}\n}');
    });

    it('should handle invalid identifiers with @""', () => {
      const obj = {
        '123': 1,
        'hello-world': 2,
        'with spaces': 3,
        '-start': 4,
        'middle-hyphen': 5,
        'end-': 6,
        'multiple-hyphens-in-key': 7,
        '--double-hyphen': 8,
        'hyphen-123': 9,
      };
      expect(ZON.stringify(obj, null, 0)).toBe(
        '.{\n.@"123"=1,\n.@"hello-world"=2,\n.@"with spaces"=3,\n.@"-start"=4,\n.@"middle-hyphen"=5,\n.@"end-"=6,\n.@"multiple-hyphens-in-key"=7,\n.@"--double-hyphen"=8,\n.@"hyphen-123"=9\n}',
      );
    });
  });

  describe('replacer parameter', () => {
    it('should handle array replacer', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(ZON.stringify(obj, ['a', 'c'])).toBe('.{.a=1,.c=3}');
    });

    it('should handle function replacer', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const replacer = (key: string, value: any) => {
        if (typeof value === 'number') {
          return value * 2;
        }
        return value;
      };
      expect(ZON.stringify(obj, replacer)).toBe('.{.a=2,.b=4,.c=6}');
    });

    it('should handle nested objects with replacer', () => {
      const obj = { a: 1, b: { c: 2, d: 3 } };
      const replacer = (key: string, value: any) => {
        if (key === 'c') return undefined;
        return value;
      };
      expect(ZON.stringify(obj, replacer)).toBe('.{.a=1,.b=.{.c=undefined,.d=3}}');
    });
  });
});

describe('stringify', () => {
  it('performance', () => {
    it('should serialize ~10KB under 1ms', () => {
      const ALLOWED_TIME_MS = 1;
      const iterations = 1000;
      const complexObject = {
        a: { b: 1, c: 'a', d: [1, 2, 3], e: { f: true, g: null } },
        b: [1, 'b', true, { h: 'i' }],
        c: { j: { k: { l: 'm' } } },
        d: undefined,
        e: null,
        while: true,
      };

      const largeArray = Array(100).fill(complexObject);
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        ZON.stringify(largeArray);
      }
      const end = performance.now();

      const avgTime = (end - start) / iterations;
      expect(avgTime).toBeLessThan(ALLOWED_TIME_MS);

      Bun.write('test/files/simple.zon', ZON.stringify(complexObject));
      Bun.write('test/files/simple.json', JSON.stringify(complexObject));
    });
  });
});
