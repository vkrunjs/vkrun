import { LoadEnvError } from "../../errors";
import { isArray, isObject } from "../../utils";

export const parseValue = (value: string): any => {
  const trimmedValue = value.trim();

  // Handle quoted strings
  if (/^".*"$|^'.*'$/.test(trimmedValue)) {
    return trimmedValue.slice(1, -1);
  }

  // Handle booleans
  if (trimmedValue === "true") return true;
  if (trimmedValue === "false") return false;

  // Handle numbers
  const numberValue = Number(trimmedValue);
  if (!isNaN(numberValue)) return numberValue;

  // Handle JSON objects or arrays
  if (trimmedValue.startsWith("{") || trimmedValue.startsWith("[")) {
    try {
      const jsonValue = JSON.parse(trimmedValue);
      if (isObject(jsonValue) || isArray(jsonValue)) {
        return jsonValue;
      }
    } catch {
      throw new LoadEnvError(`invalid object or array ${trimmedValue}`);
    }
  }

  // Return as plain string
  return trimmedValue;
};
