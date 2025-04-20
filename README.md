# Zig ZON › zzon

<p align="center">
 <img alt="zzon logo" src="https://raw.githubusercontent.com/nurulhudaapon/zzon/refs/heads/main/asset/zzon.png" width="350" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zzon"><img alt="npm" src="https://img.shields.io/npm/v/zzon.svg?style=flat-square" /></a>
  <a href="https://github.com/nurulhudaapon/zzon/actions/workflows/release.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/nurulhudaapon/zzon/release.yml?style=flat-square&branch=main" /></a>
</p>


A fast, spec-compliant ZON parser and serializer for JavaScript.


[ZON](https://github.com/ziglang/zig/pull/20271) is a compact, human-readable, and easy-to-parse data format from the Zig programming language that is similar to JSON in JavaScript.


The API is similar to the native [`JSON` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

[Try it in the Playground](https://nurulhudaapon.github.io/zzon/)

## Installation

```bash
npm install zzon
```

## Usage

#### Stringify

```ts id="stringify"
import { ZON } from 'zzon';

const zon = ZON.stringify({"a":1,"b":"abc","c":true});
console.log(zon); // .{.a=1,.b="abc",.c=true}
```

#### Parse

```ts id="parse"
import { ZON } from 'zzon';

const json = ZON.parse(`.{.a=1,.b="abc",.c=true}`);
console.log(json); // {"a":1,"b":"abc","c":true}
```

## [Playground](https://nurulhudaapon.github.io/zzon/)


![zzon playground demo](https://raw.githubusercontent.com/nurulhudaapon/zzon/refs/heads/main/asset/playground.gif)

## Benchmarks

Performance comparison between ZON and JSON (benchmark source: [test/index.test.ts](test/index.test.ts)):

| Operation | JSON | ZON | Difference |
|-----------|------|-----|------------|
| Parse | 313.62ms | 2591.57ms | 2277.94ms (8.26x slower) |
| Stringify | 210.16ms | 1042.47ms | 832.30ms (4.96x slower) |

Hardware: Apple M1 Pro  
Platform: darwin 24.4.0 (arm64)

*Last updated: 2025-04-20T18:58:33.116Z*
## License

[MIT](https://github.com/nurulhudaapon/zzon/blob/main/LICENSE)
