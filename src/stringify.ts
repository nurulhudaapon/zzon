/**
 * Converts a Zig value to a Zig Object Notation (ZON) string.
 * @param value A Zig value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value ZON text to make it easier to read.
 */
export function stringify(
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
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
  replacer?: (number | string)[] | null,
  space?: string | number,
): string;
export function stringify(
  value: any,
  replacer?: ((number | string)[] | null) | ((this: any, key: string, value: any) => any),
  space?: string | number,
): string {
  let indent = '';
  let newline = '';

  // Handle space parameter
  if (typeof space === 'number') {
    indent = ' '.repeat(space);
    newline = '\n';
  } else if (typeof space === 'string') {
    indent = space;
    newline = '\n';
  }

  const stringifyValue = (value: any, level: number = 0): string => {
    switch (typeof value) {
      case 'object':
        if (value === null) {
          return 'null';
        }
        
        const entries = Object.entries(value);
        const isArray = Array.isArray(value);
        let result = '.{';
        
        if (entries.length > 0) {
          result += newline;
        }

        let validEntries = -1;
        entries.forEach(([key, value]) => {
          if (value === undefined) return;
          validEntries++;

          // Apply replacer if it's a function
          if (typeof replacer === 'function') {
            value = replacer.call(value, key, value);
          }
          
          // Skip if replacer is an array and key is not included
          if (Array.isArray(replacer) && !replacer.includes(key)) return;
          
          // Add comma for subsequent entries
          if (validEntries > 0) {
            result += ',';
            result += newline;
          }
          
          // Add indentation
          if (indent) {
            result += indent.repeat(level + 1);
          }
          
          // Add key for non-array objects
          if (!isArray) {
            result += `.${key}${indent ? ' = ' : '='}`;
          }
          
          // Add value
          if (typeof value === 'object' && value !== null) {
            result += stringifyValue(value, level + 1);
          } else if (typeof value === 'string' && value.length === 1) {
            result += `'${value}'`;
          } else {
            result += JSON.stringify(value);
          }
        });
        
        if (validEntries > 0) {
          if (indent) result += ',';
          result += newline;
          if (indent) {
            result += indent.repeat(level);
          }
        }

        result += '}';
        return result;

      case 'undefined':
        return '';
      case 'boolean':
        return value ? 'true' : 'false';
      case 'number':
        return `${value}`;
      case 'string':
        return value.length === 1 ? `'${value}'` : `"${value}"`;
      default:
        return `${value}`;
    }
  };

  return stringifyValue(value);
}
