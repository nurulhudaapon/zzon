import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

const equal = (a: any, b: string) => {
  expect(ZON.stringify(a)).toBe(b);
};

describe('stringify', () => {
  it('primitive', () => {
    equal(1, '1');
    equal('a', '"a"');
    equal(true, 'true');
    equal(false, 'false');
    equal(null, 'null');
    equal(undefined, 'undefined');
  });

  it('object', () => {
    equal(
      { a: 1, b: 'a', c: true, d: false, e: null, f: undefined },
      '.{.a=1,.b="a",.c=true,.d=false,.e=null,.f=undefined}',
    );
  });

  it('array', () => {
    equal([1, 'a', true, false, null, undefined], '.{1,"a",true,false,null,undefined}');
  });

  it('nested object', () => {
    equal({ a: { b: 1, c: 'a' } }, '.{.a=.{.b=1,.c="a"}}');
  });
});
