export function safeSerialize(value: any, seen = new WeakSet()): any {
  const type = typeof value;

  if (value instanceof Error) {
    const errorData: Record<string, any> = {};

    for (const key of Object.getOwnPropertyNames(value)) {
      try {
        errorData[key] = (value as any)[key];
      } catch {
        errorData[key] = "[Unserializable]";
      }
    }

    return errorData;
  }

  if (value === null || type === "string" || type === "number" || type === "boolean") {
    return value;
  }

  if (type === "bigint") return "BigInt [Unserializable]";
  if (type === "function") return "Function [Unserializable]";
  if (type === "symbol") return "Symbol [Unserializable]";

  if (Buffer.isBuffer(value)) return `[Buffer: ${value.length} bytes]`;
  if (value instanceof Date || value instanceof RegExp) return value.toString();

  // Arrays
  if (Array.isArray(value)) {
    if (seen.has(value)) return "Circular [Unserializable]";
    seen.add(value);

    return value.map((item) => {
      try {
        return safeSerialize(item, seen);
      } catch {
        return "[Item Unserializable]";
      }
    });
  }

  // Objetos
  if (type === "object") {
    if (seen.has(value)) return "Circular [Unserializable]";
    seen.add(value);

    const result: Record<string, any> = {};
    for (const key in value) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) continue;

      const prop = value[key];
      const propType = typeof prop;

      if (propType === "function") {
        result[key] = "Function [Unserializable]";
      } else if (propType === "symbol") {
        result[key] = "Symbol [Unserializable]";
      } else {
        try {
          result[key] = safeSerialize(prop, seen);
        } catch {
          result[key] = `${propType.charAt(0).toUpperCase() + propType.slice(1)} [Unserializable]`;
        }
      }
    }

    return result;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return `${type.charAt(0).toUpperCase() + type.slice(1)} [Unserializable]`;
  }
}
