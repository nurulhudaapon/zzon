import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

describe('ZON', () => {
  it('ZON should have parse method', () => {
    expect(ZON.parse).toBeDefined();
    expect(ZON.parse).toBeFunction();
    expect(ZON.parse).toBeTypeOf('function');
  });

  it('ZON should have stringify method', () => {
    expect(ZON.stringify).toBeDefined();
    expect(ZON.stringify).toBeFunction();
    expect(ZON.stringify).toBeTypeOf('function');
  });

  it('ZON should not have other methods than parse and stringify', () => {
    expect(ZON).toHaveProperty('parse');
    expect(ZON).toHaveProperty('stringify');
    expect(ZON).not.toHaveProperty('otherMethod');
    const zonFields = Object.keys(ZON);
    expect(zonFields).toEqual(['parse', 'stringify']);
  });
});
