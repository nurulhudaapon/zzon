# Zig ZON › zzon

<p align="center">
 <img alt="zzon logo" src="https://raw.githubusercontent.com/nurulhudaapon/zzon/refs/heads/main/asset/zzon.png" width="350" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zzon"><img alt="npm" src="https://img.shields.io/npm/v/zzon.svg?style=flat-square" /></a>
  <a href="https://github.com/nurulhudaapon/zzon/actions/workflows/release.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/nurulhudaapon/zzon/release.yml?style=flat-square&branch=main" /></a>
</p>

[Try it in the Playground](https://nurulhudaapon.github.io/zzon/)

A fast, spec-compliant ZON parser and serializer for JavaScript.

[ZON](https://github.com/ziglang/zig/pull/20271) is a compact, human-readable, and easy-to-parse data format from the Zig programming language that is similar to JSON in JavaScript.

The API is similar to the native [`JSON` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

## Installation

```bash
npm install zzon
```

## Usage

#### Stringify

```ts
import { ZON } from 'zzon';

const zon = ZON.stringify({
  a: 1,
  b: 'a',
  c: true,
  d: false,
  e: null,
  f: undefined,
  g: 'token',
});
console.log(zon); // .{.a=1,.b='a',.c=true,.d=false,.e=null,.g="token"}
```

#### Parse

```ts
import { ZON } from 'zzon';

const json = ZON.parse(`.{.a=1,.b='a',.c=true,.d=false,.e=null,.g="token"}`);
console.log(json); // { a: 1,b: "a",c: true, d: false, e: null, g: "token" }
```

## License

[MIT](https://github.com/nurulhudaapon/zzon/blob/main/LICENSE)
