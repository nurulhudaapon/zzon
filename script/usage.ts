import { ZON } from '../src';

// Read the README.md file
const readmePath = new URL('../README.md', import.meta.url).pathname;
let readmeContent = await Bun.file(readmePath).text();

// Example 1: Stringify
const stringifyExample = {
  a: 1,
  b: 'abc',
  c: true,
};
const stringifyInput = JSON.stringify(stringifyExample);
const stringifyResult = ZON.stringify(stringifyExample);

// Example 2: Parse
const parseInput = stringifyResult;
const parseResult = ZON.parse(parseInput);

// Update the README with actual results
readmeContent = readmeContent.replace(
  /```ts id="stringify"\n[\s\S]*?```/,
  `\`\`\`ts id="stringify"\nimport { ZON } from 'zzon';\n\nconst zon = ZON.stringify(${stringifyInput});\nconsole.log(zon); // ${stringifyResult}\n\`\`\``,
);

readmeContent = readmeContent.replace(
  /```ts id="parse"\n[\s\S]*?```/,
  `\`\`\`ts id="parse"\nimport { ZON } from 'zzon';\n\nconst json = ZON.parse(\`${parseInput}\`);\nconsole.log(json); // ${JSON.stringify(parseResult)}\n\`\`\``,
);

// Write the updated README back to file
await Bun.write(readmePath, readmeContent);

console.log('README updated with actual evaluation results!');
