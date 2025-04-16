import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

const equal = (a: any, b: string, msg?: string) => {
  expect(ZON.stringify(a), msg).toBe(b);
};

describe('stringify', () => {
  it('primitive', () => {
    equal(1, '1');
    equal('a', "'a'", 'should single quote one character');
    equal('abc', '"abc"', 'should double quote multiple characters');
    equal(true, 'true');
    equal(false, 'false');
    equal(null, 'null');
    equal(undefined, '');
  });

  it('object', () => {
    equal(
      { a: 1, b: 'a', bb: 'ab', c: true, d: false, e: null, f: undefined },
      `.{.a=1,.b='a',.bb="ab",.c=true,.d=false,.e=null}`,
    );
  });

  it('array', () => {
    equal([1, 'a', 'ab', true, false, null, undefined], `.{1,'a',"ab",true,false,null}`);
  });

  it('nested object', () => {
    equal({ a: { b: 1, c: 'a' } }, `.{.a=.{.b=1,.c='a'}}`);
  });
});

describe('⚡️ stringify', () => {
  it('should serialize 12KB in 0.4ms', () => {
    const ALLOWED_TIME_MS = 0.4;
    const iterations = 1000;
    const complexObject = {
      a: { b: 1, c: 'a', d: [1, 2, 3], e: { f: true, g: null } },
      b: [1, 'b', true, { h: 'i' }],
      c: { j: { k: { l: 'm' } } },
      d: undefined,
      e: null,
    };

    const largeArray = Array(100).fill(complexObject);
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      ZON.stringify(largeArray);
    }
    const end = performance.now();

    const avgTime = (end - start) / iterations;
    // console.log(`Average time per stringify: ${avgTime} milliseconds`);
    // console.log(`Total time for ${iterations} iterations: ${end - start} milliseconds`);
    expect(avgTime).toBeLessThan(ALLOWED_TIME_MS);

    Bun.write('test/files/simple.zon', ZON.stringify(complexObject));
    Bun.write('test/files/simple.json', JSON.stringify(complexObject));
  });
});
