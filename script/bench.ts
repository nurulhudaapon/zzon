import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { platform, release, arch, cpus } from 'os';

const readmePath = join(process.cwd(), 'README.md');
const resultsPath = join(process.cwd(), 'asset', 'benchmark.json');

// Read the current README content
const readmeContent = readFileSync(readmePath, 'utf-8');

// Read the benchmark results
const results = JSON.parse(readFileSync(resultsPath, 'utf-8'));

// Get hardware information
const cpuModel = cpus()[0].model;
const platformInfo = `${platform()} ${release()} (${arch()})`;

// Create the benchmark section
const benchmarkSection = `## Benchmarks

Performance comparison between ZON and JSON (source: [test/index.test.ts](test/index.test.ts)):

| Operation | JSON | ZON | Difference |
|-----------|------|-----|------------|
| Parse | ${results.parse.jsonTime}ms | ${results.parse.zonTime}ms | ${results.parse.diff}ms (${results.parse.slower}x slower) |
| Stringify | ${results.stringify.jsonTime}ms | ${results.stringify.zonTime}ms | ${results.stringify.diff}ms (${results.stringify.slower}x slower) |

Hardware: ${cpuModel}  
Platform: ${platformInfo}

*Last updated: ${new Date().toISOString()}*
`;

// Update the README content
let updatedContent = readmeContent;

// Check if benchmark section already exists
if (readmeContent.includes('## Benchmarks')) {
  // Replace existing benchmark section
  updatedContent = readmeContent.replace(
    /## Benchmarks[\s\S]*?(?=##|$)/,
    benchmarkSection
  );
} else {
  // Add benchmark section before License section
  updatedContent = readmeContent.replace(
    /## License/,
    `${benchmarkSection}\n\n## License`
  );
}

// Write the updated content back to README.md
writeFileSync(readmePath, updatedContent);

console.log('Benchmark section updated in README.md'); 