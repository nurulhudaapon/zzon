import { zonData } from "./data.ts" with { type: "macro" };

console.log(zonData()); // data is parsed and inlined in build time