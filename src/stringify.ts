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
export function stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
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

  const addValue = (value: any, isLast: boolean) => {
    if (typeof value === 'object' || value === null || value === undefined) zon += stringify(value);
    else zon += `${JSON.stringify(value)}`;

    if (!isLast) zon += ',';
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
        entries.forEach(([key, value], index) => {
          if (!isArray) addKey(key);
          addValue(value, index === entriesLength - 1);
        });
        endObject();
      }
      break;
    case 'undefined':
      zon += 'undefined';
      break;
    case 'boolean':
      zon += value ? 'true' : 'false';
      break;
    case 'number':
      zon += `${value}`;
      break;
    case 'string':
      zon += `"${value}"`;
      break;
    default:
      zon += value;
  }

  return zon.toString();
}
