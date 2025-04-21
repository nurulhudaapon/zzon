import { ZON } from 'zzon';
import data from './../data.zon' with { type: 'text' }; // see zon.d.ts which sets imported data type, remove loader from bunfig.toml to make this work

console.log(ZON.parse(data));
