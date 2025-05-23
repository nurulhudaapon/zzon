# ZON in Bun

### Run the example

```bash
cd example/bun
bun run index.ts
```

### Install bun-plugin-zon

```bash
bun add -D bun-plugin-zon
```

### Add the plugin to your bunfig.toml

```toml
preload = ["bun-plugin-zon"]
```

### Run the example

Create a `data.zon` file:

```zon
{
    name = "example",
    version = "1.0.0",
    dependencies = {
        "bun" = "latest"
    }
}
```

Create an `index.ts` file:

```ts
import data from './data.zon';

console.log(data);
```

Run the example:

```bash
bun run index.ts
```

### Type Errors

If you're using TypeScript, you may get an error like this:

```
// TypeScript error
// Cannot find module './data.zon' or its corresponding type declarations.
This can be fixed by creating *.d.ts file anywhere in your project (any name will work) with the following contents:
```

```ts
declare module '*.zon' {
  const content: string | number | boolean | null | JSON[] | { [key: string]: JSON };
  export default content;
}
```
This tells TypeScript that any default imports from .zon should be treated as all possible JSON values.
