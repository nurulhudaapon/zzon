import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

const zonString = `
.{
  .name = "test", // item name
  .value = 123_456,
  .nested = .{ // nested structure
      .flag = true,
      .list = .{
          1, // first
          2, // second
          3, // third
      }, // trailing comma in list ok
      .empty_struct = .{},
  }, // trailing comma in struct ok
  .array_like = .{ "a", "b", "c"},
}
`;

const zsonStringWithArray = `
.{
  .array = .{1, 2, 3},
  .obj_array = .{
    .{
      .name = "test",
      .value = 123_456,
    },
    
  }
}
`;

const zonEnumLiteral = `
.{
  .{
    .kind = .keyword
  },
  .{
    .kind = .word
  },
  .{
    .kind = .sentance
  },
  .{
    .kind = .paragraph
  },
  .{
    .kind = .section
  },
}
`;

describe('parse', () => {
  const parsed = ZON.parse(zonString);
  const expectedObject = {
    name: 'test',
    value: 123456,
    nested: {
      flag: true,
      list: [1, 2, 3],
      empty_struct: [],
    },
    array_like: ['a', 'b', 'c'],
  };

  it('should parse the zon string', () => {
    expect(parsed).toEqual(expectedObject);
  });

  it('should parse the zson string with array', () => {
    const parsed = ZON.parse(zsonStringWithArray);
    expect(parsed).toEqual({ array: [1, 2, 3], obj_array: [{ name: 'test', value: 123456 }] });
  });

  const simpleValueZon = `"a simple string"`;
  expect(ZON.parse(simpleValueZon)).toBe('a simple string');

  const arrayZon = `.{10, false, "hello"}`;
  const parsedArray = ZON.parse(arrayZon);
  expect(parsedArray).toEqual([10, false, 'hello']);

  it('should parse all primitive types', () => {
    const primitiveZon = `
.{
  .string = "hello world",
  .single_char = 'a',
  .number = 123_456,
  .float = 123.456,
  .boolean_true = true,
  .boolean_false = false,
  .null = null,
  .empty_string = "",
  .zero = 0,
  .negative = -123,
  .scientific = 1.23e4
}`;

    const expected = {
      string: 'hello world',
      single_char: 'a',
      number: 123456,
      float: 123.456,
      boolean_true: true,
      boolean_false: false,
      null: null,
      empty_string: '',
      zero: 0,
      negative: -123,
      scientific: 1.23e4,
    };

    expect(ZON.parse(primitiveZon)).toEqual(expected);
  });

  it('should parse enum literal', () => {
    const parsed = ZON.parse(zonEnumLiteral);
    expect(parsed).toEqual([
      { kind: 'keyword' },
      { kind: 'word' },
      { kind: 'sentance' },
      { kind: 'paragraph' },
      { kind: 'section' },
    ]);
  });

  it('should parse nested structures', () => {
    const nestedZon = `
.{
  .outer = .{
    .middle = .{
      .inner = .{
        .value = "deeply nested"
      }
    },
    .array = .{
      .{
        .name = "first"
      },
      .{
        .name = "second"
      }
    }
  },
  .mixed = .{
    .numbers = .{1, 2, 3},
    .strings = .{"a", "b", "c"},
    .booleans = .{true, false},
    .mixed = .{1, "two", true, null}
  }
}`;

    const expected = {
      outer: {
        middle: {
          inner: {
            value: 'deeply nested',
          },
        },
        array: [{ name: 'first' }, { name: 'second' }],
      },
      mixed: {
        numbers: [1, 2, 3],
        strings: ['a', 'b', 'c'],
        booleans: [true, false],
        mixed: [1, 'two', true, null],
      },
    };

    expect(ZON.parse(nestedZon)).toEqual(expected);
  });

  it('should parse empty structures as arrays', () => {
    const emptyZon = `
.{
  .empty_object = .{},
  .empty_array = .{},
  .nested_empty = .{
    .empty = .{},
    .array = .{}
  }
}`;

    const expected = {
      empty_object: [],
      empty_array: [],
      nested_empty: {
        empty: [],
        array: [],
      },
    };

    expect(ZON.parse(emptyZon)).toEqual(expected);
  });

  it('should parse with comments', () => {
    const commentZon = `
.{
  // This is a line comment
  .name = "test", // inline comment
  .value = 123,
  .nested = .{ // nested comment
    .flag = true, // another comment
  }
}`;

    const expected = {
      name: 'test',
      value: 123,
      nested: {
        flag: true,
      },
    };

    expect(ZON.parse(commentZon)).toEqual(expected);
  });

  it('should parse with trailing commas', () => {
    const trailingCommaZon = `
.{
  .array = .{1, 2, 3,},
  .object = .{
    .a = 1,
    .b = 2,
    .c = 3,
  },
  .nested = .{
    .array = .{1, 2, 3,},
    .object = .{
      .a = 1,
      .b = 2,
      .c = 3,
    },
  },
}`;

    const expected = {
      array: [1, 2, 3],
      object: {
        a: 1,
        b: 2,
        c: 3,
      },
      nested: {
        array: [1, 2, 3],
        object: {
          a: 1,
          b: 2,
          c: 3,
        },
      },
    };

    expect(ZON.parse(trailingCommaZon)).toEqual(expected);
  });

  it('should parse with whitespace variations', () => {
    const whitespaceZon = `
.{
  .compact = .{1,2,3},
  .spaced = .{ 1 , 2 , 3 },
  .newlines = .{
    1
    ,
    2
    ,
    3
  },
  .mixed = .{ 1,2 , 3 }
}`;

    const expected = {
      compact: [1, 2, 3],
      spaced: [1, 2, 3],
      newlines: [1, 2, 3],
      mixed: [1, 2, 3],
    };

    expect(ZON.parse(whitespaceZon)).toEqual(expected);
  });
});

describe('⚡️ parse', () => {
  it('should parse ~10KB under 1ms', () => {
    const ALLOWED_TIME_MS = 1;
    const iterations = 1000;

    const largeZonString = `.{ ${Array(100).fill(zonString).join(',')} }`;
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      ZON.parse(largeZonString);
    }
    const end = performance.now();

    const avgTime = (end - start) / iterations;
    // console.log('⏱️ ',`Average: ${avgTime}ms`, `Total: ${end - start}ms`);
    expect(avgTime).toBeLessThan(ALLOWED_TIME_MS);

    Bun.write('test/files/simple-parsed.zon', ZON.stringify(ZON.parse(zonString)));
    Bun.write('test/files/simple-parsed.json', JSON.stringify(ZON.parse(zonString)));
  });
});
