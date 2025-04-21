import { ZON } from '../src/index';
import { describe, it, expect } from 'bun:test';

// Update based on CPU performance
const PARSE_ALLOWED_X_SLOWER = +(process.env.PARSE_ALLOWED_X_SLOWER || 15); // ~10x on M1 Pro
const STRINGIFY_ALLOWED_X_SLOWER = +(process.env.STRINGIFY_ALLOWED_X_SLOWER || 7.5); // ~5x on M1 Pro

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

describe('Performance JSON/ZON', () => {
  const isBench = process.env.BENCH === 'true';
  const testDataObject = {
    name: 'Test Object',
    value: 42,
    nested: {
      array: [1, 2, 3],
      boolean: true,
      while: false,
      how: 'if',
    },
  };

  const testData = Array(100).fill(testDataObject);

  const iterations = isBench ? 10000 : 1000;

  it('should compare parse performance', () => {
    const jsonString = JSON.stringify(testData);
    let parsedZon = null;

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
      parsedZon = ZON.parse(zonString);
    }
    const zonEnd = performance.now();
    const zonTime = zonEnd - zonStart;

    const parseResults = {
      jsonTime: jsonTime.toFixed(2),
      zonTime: zonTime.toFixed(2),
      diff: (zonTime - jsonTime).toFixed(2),
      slower: (zonTime / jsonTime).toFixed(2),
    };

    if (isBench) {
      console.log(`\n${colors.bright}${colors.cyan}Parse Performance Comparison:${colors.reset}`);
      console.log(`${colors.dim}---------------------------${colors.reset}`);
      console.log(
        `${colors.green}JSON.parse:${colors.reset} ${colors.yellow}${parseResults.jsonTime}ms${colors.reset}`,
      );
      console.log(`${colors.blue}ZON.parse:${colors.reset}  ${colors.yellow}${parseResults.zonTime}ms${colors.reset}`);
      console.log(
        `${colors.magenta}Difference:${colors.reset} ${colors.yellow}${parseResults.diff}ms${colors.reset} (${colors.red}${parseResults.slower}x slower${colors.reset})`,
      );

      // Write results to a temporary file
      const { writeFileSync } = require('fs');
      const { join } = require('path');
      writeFileSync(join(process.cwd(), 'asset', 'benchmark.json'), JSON.stringify({ parse: parseResults }, null, 2));
    }

    expect(+parseResults.slower).toBeLessThan(PARSE_ALLOWED_X_SLOWER);
    expect(parsedZon).toEqual(testData);
  });

  it('should compare stringify performance', () => {
    let stringifiedZon = null;
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
      stringifiedZon = ZON.stringify(testData);
    }
    const zonEnd = performance.now();
    const zonTime = zonEnd - zonStart;

    const stringifyResults = {
      jsonTime: jsonTime.toFixed(2),
      zonTime: zonTime.toFixed(2),
      diff: (zonTime - jsonTime).toFixed(2),
      slower: (zonTime / jsonTime).toFixed(2),
    };

    if (isBench) {
      console.log(`\n${colors.bright}${colors.cyan}Stringify Performance Comparison:${colors.reset}`);
      console.log(`${colors.dim}------------------------------${colors.reset}`);
      console.log(
        `${colors.green}JSON.stringify:${colors.reset} ${colors.yellow}${stringifyResults.jsonTime}ms${colors.reset}`,
      );
      console.log(
        `${colors.blue}ZON.stringify:${colors.reset}  ${colors.yellow}${stringifyResults.zonTime}ms${colors.reset}`,
      );
      console.log(
        `${colors.magenta}Difference:${colors.reset} ${colors.yellow}${stringifyResults.diff}ms${colors.reset} (${colors.red}${stringifyResults.slower}x slower${colors.reset})`,
      );

      // Append stringify results to the temporary file
      const { readFileSync, writeFileSync } = require('fs');
      const { join } = require('path');
      const resultsPath = join(process.cwd(), 'asset', 'benchmark.json');
      const results = JSON.parse(readFileSync(resultsPath, 'utf-8'));
      results.stringify = stringifyResults;
      writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    }

    expect(+stringifyResults.slower).toBeLessThan(STRINGIFY_ALLOWED_X_SLOWER);
    expect(ZON.parse(stringifiedZon!)).toEqual(testData);
  });
});
