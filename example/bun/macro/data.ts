import { ZON } from "zzon";
import { readFileSync } from "node:fs";

export const zonData = () => ZON.parse(readFileSync("data.zon", "utf-8"));

