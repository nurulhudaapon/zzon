import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

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

describe('Performance Comparison', () => {
  const testData = {
    name: 'Test Object',
    value: 42,
    nested: {
      array: [1, 2, 3],
      boolean: true,
    }
  };

  const iterations = 10000;

  it('should compare parse performance', () => {
    const jsonString = JSON.stringify(testData);
    
    // Time JSON.parse
    const jsonStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      JSON.parse(jsonString);
    }
    const jsonEnd = performance.now();
    const jsonTime = jsonEnd - jsonStart;

    // Time ZON.parse
    const zonString = ZON.stringify(testData);
    const zonStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      ZON.parse(zonString);
    }
    const zonEnd = performance.now();
    const zonTime = zonEnd - zonStart;

    console.log(`\n${colors.bright}${colors.cyan}Parse Performance Comparison:${colors.reset}`);
    console.log(`${colors.dim}---------------------------${colors.reset}`);
    console.log(`${colors.green}JSON.parse:${colors.reset} ${colors.yellow}${jsonTime.toFixed(2)}ms${colors.reset} (${colors.dim}${(jsonTime/iterations).toFixed(4)}ms per operation${colors.reset})`);
    console.log(`${colors.blue}ZON.parse:${colors.reset}  ${colors.yellow}${zonTime.toFixed(2)}ms${colors.reset} (${colors.dim}${(zonTime/iterations).toFixed(4)}ms per operation${colors.reset})`);
    console.log(`${colors.magenta}Difference:${colors.reset} ${colors.yellow}${(zonTime - jsonTime).toFixed(2)}ms${colors.reset} (${colors.red}${(zonTime/jsonTime).toFixed(2)}x slower${colors.reset})`);
  });

  it('should compare stringify performance', () => {
    // Time JSON.stringify
    const jsonStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      JSON.stringify(testData);
    }
    const jsonEnd = performance.now();
    const jsonTime = jsonEnd - jsonStart;

    // Time ZON.stringify
    const zonStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      ZON.stringify(testData);
    }
    const zonEnd = performance.now();
    const zonTime = zonEnd - zonStart;

    console.log(`\n${colors.bright}${colors.cyan}Stringify Performance Comparison:${colors.reset}`);
    console.log(`${colors.dim}------------------------------${colors.reset}`);
    console.log(`${colors.green}JSON.stringify:${colors.reset} ${colors.yellow}${jsonTime.toFixed(2)}ms${colors.reset} (${colors.dim}${(jsonTime/iterations).toFixed(4)}ms per operation${colors.reset})`);
    console.log(`${colors.blue}ZON.stringify:${colors.reset}  ${colors.yellow}${zonTime.toFixed(2)}ms${colors.reset} (${colors.dim}${(zonTime/iterations).toFixed(4)}ms per operation${colors.reset})`);
    console.log(`${colors.magenta}Difference:${colors.reset} ${colors.yellow}${(zonTime - jsonTime).toFixed(2)}ms${colors.reset} (${colors.red}${(zonTime/jsonTime).toFixed(2)}x slower${colors.reset})`);
  });
});
