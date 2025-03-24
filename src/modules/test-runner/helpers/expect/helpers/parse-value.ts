import { dim, green, red } from "../../output-colors";
import { printSafe } from "../../print-safe";
import {
  isWeakMap,
  isWeakSet,
  isDataView,
  isMap,
  isSet,
  isUint8Array,
  isInt8Array,
  isFloat32Array,
  isUint32Array,
  isArrayBuffer,
  isSharedArrayBuffer,
  isPromise,
  isRegExp,
  isFunction,
  isString,
  isObject,
  isArray,
  isBuffer,
  isDate,
} from "../../../../utils";

export const parseValue = (value: any, type?: "expected" | "received"): string => {
  const color = type === "received" ? red : green;

  if (typeof value === "symbol" || Number.isNaN(value) || isRegExp(value) || Number.isNaN(value)) {
    return color(printSafe(value.toString()));
  } else if (typeof value === "bigint") {
    return color(`${value.toString()}n`);
  } else if (isFunction(value)) {
    return color(`[Function ${value?.name}]`);
  } else if (isWeakMap(value)) {
    return dim("WeakMap ") + color("{}");
  } else if (isWeakSet(value)) {
    return dim("WeakSet ") + color("{}");
  } else if (isDataView(value)) {
    return dim("DataView ") + color("[]");
  } else if (isMap(value)) {
    const entries = [...value.entries()]
      .map(([key, val]) => {
        return color(`\n       "${key}" => `) + parseValue(val, type);
      })
      .join(color(","));

    return dim("Map ") + color("{") + printSafe(entries) + color("\n    }");
  } else if (isSet(value)) {
    const formatted = [...value].map((item) => `       ${item}`).join(",\n");
    return dim("Set ") + color(`{ \n${printSafe(formatted)}\n    }`);
  } else if (isUint8Array(value) || isInt8Array(value) || isFloat32Array(value) || isUint32Array(value)) {
    let typeLabel = "";

    if (isUint8Array(value)) {
      typeLabel = "Uint8Array ";
    } else if (isInt8Array(value)) {
      typeLabel = "Int8Array ";
    } else if (isFloat32Array(value)) {
      typeLabel = "Float32Array ";
    } else if (isUint32Array(value)) {
      typeLabel = "Uint32Array ";
    }

    const formatted = [...value].map((item) => `      ${item}`).join(",\n");
    return dim(typeLabel) + color(`[\n${printSafe(formatted)}\n    ]`);
  } else if (isArrayBuffer(value)) {
    return dim("ArrayBuffer ") + color("[]");
  } else if (isSharedArrayBuffer(value)) {
    return dim("SharedArrayBuffer ") + color("{}");
  } else if (isString(value)) {
    return color(JSON.stringify(printSafe(value), null, 2));
  } else if (isObject(value) || isArray(value) || isBuffer(value)) {
    const typeLabel = isArray(value) ? "Array " : isBuffer(value) ? "Buffer " : "Object ";

    const lines = JSON.stringify(value, null, 2).split("\n");

    const formatted = lines
      .map((line, index) => {
        if (index === 0) return line;
        if (index === lines.length - 1) return "    " + line;
        return "     " + line;
      })
      .join("\n");

    return dim(typeLabel) + color(printSafe(formatted));
  } else if (isDate(value)) {
    return color(printSafe(value.toISOString()));
  } else if (isPromise(value)) {
    return color(printSafe("Promise"));
  } else if (value instanceof Error) {
    return color(printSafe(`[${value}]`));
  }
  return color(printSafe(value));
};
