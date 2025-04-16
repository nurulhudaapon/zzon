# Zig ZON › zzon

<p align="center">
 <img alt="Build status" src="./asset/zzon.png" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zzon"><img alt="npm" src="https://img.shields.io/npm/v/zzon.svg?style=flat-square" /></a>
  <a href="https://github.com/nurulhudaapon/zzon/actions/workflows/release.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/nurulhudaapon/zzon/release.yml?style=flat-square&branch=main" /></a>
</p>

A fast, spec compliant, ZON parser and serializer for JavaScript.

ZON is a compact, human-readable, and easy-to-parse data format from the Zig programming language that is similar to JSON from JavaScript.

The API is similar to the native `JSON` API.

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
});
console.log({ zon }); // .{.a=1,.b='a',.c=true,.d=false,.e=null}
```

#### Parse

```ts
import { ZON } from 'zzon';

const json = ZON.parse(`.{.a=1,.b='a',.c=true,.d=false,.e=null}`);
console.log({ json }); // {"a":1,"b":"a","c":true,"d":false,"e":null}
```
