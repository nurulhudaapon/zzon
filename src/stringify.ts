/**
 * Converts a Zig value to a Zig Object Notation (ZON) string.
 * @param value A Zig value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value ZON text to make it easier to read.
 */
export function stringify(
  value: any,
  /** @deprecated Support is not yet implemented. */
  replacer?: (this: any, key: string, value: any) => any,
  /**  @deprecated Full support is not yet implemented. */
  space?: string | number,
): string;
/**
 * Converts a Zig value to a Zig Object Notation (ZON) string.
 * @param value A Zig value, usually an object or array, to be converted.
 * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the return-value ZON text to make it easier to read.
 */
export function stringify(
  value: any,
  /** @deprecated Support is not yet implemented. */
  replacer?: (number | string)[] | null,

  /**  @deprecated Full support is not yet implemented. */
  space?: string | number,
): string;
export function stringify(
  value: any,
  replacer?: ((number | string)[] | null) | ((this: any, key: string, value: any) => any),
  space?: string | number,
): string {
  let zon = new String();

  // Utility functions
  const addSpace = () => {
    if (typeof space === 'number') {
      zon += ' '.repeat(space);
      zon += '\n';
    } else if (typeof space === 'string') {
      zon += space;
      zon += '\n';
    }
  };

  const beginObject = () => {
    zon = '.{';
    addSpace();
  };

  const endObject = () => {
    zon += '}';
    addSpace();
  };

  const addKey = (key: string) => {
    zon += `.${key}=`;
    addSpace();
  };

  const addValue = (value: any) => {
    if (typeof value === 'object' || value === null || value === undefined) zon += stringify(value);
    else if (typeof value === 'string' && value.length === 1) zon += `'${value}'`;
    else zon += `${JSON.stringify(value)}`;
  };

  const addComma = () => {
    zon += ',';
  };

  // Handle primitive values
  switch (typeof value) {
    case 'object':
      if (value === null) {
        zon += 'null';
      } else {
        // Handle objects
        beginObject();
        const entries = Object.entries(value);
        const entriesLength = entries.length;
        const isArray = Array.isArray(value);
        let added = 0;

        entries.forEach(([key, value], index) => {
          const isUndefined = value === undefined;

          const shouldAddKey = !isArray && !isUndefined;
          const shouldAddValue = !isUndefined;
          if (shouldAddKey || shouldAddValue) added++;
          const isStartOfObject = added === 1;
          const shouldAddComma = !isStartOfObject && (shouldAddValue || shouldAddKey);

          if (shouldAddComma) addComma();
          if (shouldAddKey) addKey(key);
          if (shouldAddValue) addValue(value);
        });

        endObject();
      }
      break;
    case 'undefined':
      zon += '';
      break;
    case 'boolean':
      zon += value ? 'true' : 'false';
      break;
    case 'number':
      zon += `${value}`;
      break;
    case 'string':
      zon += value.length === 1 ? `'${value}'` : `"${value}"`;
      break;
    default:
      zon += value;
  }

  return zon.toString();
}
