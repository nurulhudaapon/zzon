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

describe('parse', () => {
  const parsed = ZON.parse(zonString);
  const expectedObject = {
    name: 'test',
    value: 123456,
    nested: {
      flag: true,
      list: [1, 2, 3],
      empty_struct: {},
    },
    array_like: ['a', 'b', 'c'],
  };

  it('should parse the zon string', () => {
    expect(parsed).toEqual(expectedObject);
  });

  const simpleValueZon = `"a simple string"`;
  expect(ZON.parse(simpleValueZon)).toBe('a simple string');

  const arrayZon = `.{10, false, "hello"}`;
  const parsedArray = ZON.parse(arrayZon);
  expect(parsedArray).toEqual([10, false, 'hello']);
});

describe('⚡️ parse', () => {
  it('should serialize 12KB in 0.4ms', () => {
    const ALLOWED_TIME_MS = 0.4;
    const iterations = 1000;

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      ZON.parse(zonString);
    }
    const end = performance.now();

    const avgTime = (end - start) / iterations;
    console.log(`Average time per stringify: ${avgTime} milliseconds`);
    console.log(`Total time for ${iterations} iterations: ${end - start} milliseconds`);
    expect(avgTime).toBeLessThan(ALLOWED_TIME_MS);

    Bun.write('test/files/simple-parsed.zon', ZON.stringify(ZON.parse(zonString)));
    Bun.write('test/files/simple-parsed.json', JSON.stringify(ZON.parse(zonString)));
  });
});
