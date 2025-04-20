import { ZON } from '../src';

// Read the README.md file
const readmePath = new URL('../README.md', import.meta.url).pathname;
let readmeContent = await Bun.file(readmePath).text();

// Example 1: Stringify
const stringifyExample = {
  a: 1,
  b: 'a',
  c: true,
  d: false,
  e: null,
  f: undefined,
  g: 'token',
};
const stringifyResult = ZON.stringify(stringifyExample);

// Example 2: Parse
const parseInput = `.{.a=1,.b='a',.c=true,.d=false,.e=null,.g="token"}`;
const parseResult = ZON.parse(parseInput);

// Update the README with actual results
readmeContent = readmeContent.replace(
  /```ts id="stringify"\n[\s\S]*?```/,
  `\`\`\`ts id="stringify"\nimport { ZON } from 'zzon';\n\nconst zon = ZON.stringify({\n  a: 1,\n  b: 'a',\n  c: true,\n  d: false,\n  e: null,\n  f: undefined,\n  g: 'token',\n});\nconsole.log(zon); // ${stringifyResult}\n\`\`\``
);

readmeContent = readmeContent.replace(
  /```ts id="parse"\n[\s\S]*?```/,
  `\`\`\`ts id="parse"\nimport { ZON } from 'zzon';\n\nconst json = ZON.parse(\`${parseInput}\`);\nconsole.log(json); // ${JSON.stringify(parseResult)}\n\`\`\``
);

// Write the updated README back to file
await Bun.write(readmePath, readmeContent);

console.log('README updated with actual evaluation results!');
