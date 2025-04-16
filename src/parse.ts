/**
 * Converts a Zig Object Notation (ZON) string into an object.
 * @param text A valid ZON string.
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 */
export function parse(text: string, reviver?: (this: any, key: string, value: any) => any): any {
  throw new Error('Not implemented');
}
