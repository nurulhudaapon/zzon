# zzon - Zig ZON

A fast, spec compliant, ZON parser and serializer for JavaScript.

ZON is a compact, human-readable, and easy-to-parse data format from the Zig programming language that is similar to JSON from JavaScript.

The API is similar to the native `JSON` API.

## Installation

```bash
npm install zzon
```

## Usage

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
console.log(zon); // .{a=1,b="a",c=true,d=false,e=null,f=undefined}
```
