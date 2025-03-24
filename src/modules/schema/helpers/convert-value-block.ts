import { SchemaMethod } from "../../types";
import { isArray, isBuffer, isDate, isObject, isString } from "../../utils";

export const convertValueBlock = (oldBlock: SchemaMethod[], nextBlock: SchemaMethod[], currentValue: any): any => {
  if (nextBlock.some((m) => m.method === "string")) {
    try {
      if (isArray(currentValue)) {
        return JSON.stringify(currentValue);
      } else if (isObject(currentValue)) {
        return JSON.stringify(currentValue, (_key: string, value: any) => {
          if (typeof value === "bigint") {
            return value.toString() + "n";
          }

          if (value instanceof Buffer) {
            return value.toString("base64");
          }

          if (typeof value === "function") {
            return value.name ? `[Function ${value.name}]` : "[Function anonymous]";
          }

          return value;
        });
      } else if (isDate(currentValue) && oldBlock.some((m) => m.method === "date")) {
        return currentValue.toISOString();
      }

      return String(currentValue);
    } catch {
      return currentValue;
    }
  }

  if (nextBlock.some((m) => m.method === "boolean")) {
    try {
      if (isString(currentValue)) {
        const lower = currentValue.toLowerCase();
        if (lower === "true") return true;
        if (lower === "false") return false;
      }
      return Boolean(currentValue);
    } catch (error) {
      return currentValue;
    }
  }

  if (nextBlock.some((m) => m.method === "number")) {
    try {
      const parsed = Number(currentValue);
      return Number.isNaN(parsed) ? currentValue : parsed;
    } catch (error) {
      return currentValue;
    }
  }

  if (nextBlock.some((m) => m.method === "bigInt")) {
    try {
      return BigInt(currentValue);
    } catch {
      return currentValue;
    }
  }

  if (nextBlock.some((m) => m.method === "buffer")) {
    try {
      return Buffer.from(currentValue);
    } catch {
      return currentValue;
    }
  }

  if (nextBlock.some((m) => m.method === "date")) {
    try {
      if (isDate(currentValue)) {
        return currentValue;
      }

      const d = new Date(currentValue);
      if (!Number.isNaN(d.getTime())) {
        return d;
      }
    } catch {
      return currentValue;
    }
  }

  if (nextBlock.some((m) => m.method === "array")) {
    try {
      if (isArray(currentValue)) {
        return currentValue;
      } else if (isString(currentValue)) {
        const parsed = JSON.parse(currentValue);
        if (isArray(parsed)) {
          return parsed;
        }
      } else if (isBuffer(currentValue)) {
        const parsed = JSON.parse(String(currentValue));
        if (isArray(parsed)) {
          return parsed;
        }
      }
      return currentValue;
    } catch {
      return currentValue;
    }
  }

  if (nextBlock.some((m) => m.method === "object")) {
    try {
      if (isObject(currentValue)) {
        return currentValue;
      } else if (isString(currentValue)) {
        const parsed = JSON.parse(currentValue);
        if (isObject(parsed)) {
          return parsed;
        }
      } else if (isBuffer(currentValue)) {
        const parsed = JSON.parse(String(currentValue));
        if (isObject(parsed)) {
          return parsed;
        }
      }
      return currentValue;
    } catch {
      return currentValue;
    }
  }

  return currentValue;
};
