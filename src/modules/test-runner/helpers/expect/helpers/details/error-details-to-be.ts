import { blue, dim, green, red } from "../../../output-colors";
import { printSafe } from "../../../print-safe";
import { getErrorContext } from "../get-error-context";
import { parseValue } from "../parse-value";
import {
  isArray,
  isArrayBuffer,
  isBuffer,
  isDataView,
  isDate,
  isFloat32Array,
  isInt8Array,
  isMap,
  isNotEqual,
  isObject,
  isPromise,
  isRegExp,
  isSet,
  isSharedArrayBuffer,
  isString,
  isUint32Array,
  isUint8Array,
  isWeakMap,
  isWeakSet,
} from "../../../../../utils";

export const errorDetailsToBe = ({
  expected,
  received,
  filename,
  flags,
}: {
  expected: any;
  received: any;
  filename: string;
  flags?: {
    not?: boolean;
    resolves?: boolean;
    rejects?: boolean;
    receivedIsPromise?: boolean;
    invalidReceivedPromise?: boolean;
  };
}) => {
  const not = flags?.not;
  const resolves = flags?.resolves;
  const rejects = flags?.rejects;
  const receivedIsPromise = flags?.receivedIsPromise;
  const invalidReceivedPromise = flags?.invalidReceivedPromise;
  let details = "";

  details += `\n    ${dim("expect(")}${red("received")}${dim(")")}`;
  if (resolves) details += ".resolves";
  if (rejects) details += ".rejects";
  if (not) details += ".not";
  details += `.toBe${dim("(")}${green("expected")}${dim(")")} ${dim("// Object.is equality")}\n\n`;

  if ((resolves || rejects) && !receivedIsPromise) {
    details += `    Matcher error: ${red("received")} value must be a promise\n\n`;
  }

  if (resolves && !rejects && receivedIsPromise && invalidReceivedPromise) {
    details += `    Received promise rejected instead of resolved\n`;
    if (!not) details += `    Rejected to value: ${parseValue(received, "received")}\n`;
  } else if (rejects && !resolves && receivedIsPromise && invalidReceivedPromise) {
    details += `    Received promise resolved instead of rejected\n`;
    if (!not) details += `    Resolved to value: ${parseValue(received, "received")}\n`;
  } else if (
    isWeakMap(expected) ||
    isWeakSet(expected) ||
    isMap(expected) ||
    isArrayBuffer(expected) ||
    isSharedArrayBuffer(expected) ||
    isDataView(expected) ||
    isBuffer(expected) ||
    isDate(expected) ||
    isArray(expected) ||
    isObject(expected) ||
    isPromise(expected) ||
    isRegExp(expected) ||
    expected instanceof Error ||
    typeof expected === "symbol"
  ) {
    details += `    Expected: ${not ? "not " : ""}${parseValue(expected)}\n`;
    if (!not) details += "    Received: serializes to the same string\n";
  } else if (isUint8Array(expected) || isInt8Array(expected) || isUint32Array(expected) || isFloat32Array(expected)) {
    if (not) {
      details += `    Expected: not ${parseValue(expected)}\n`;
    } else if (
      (isInt8Array(expected) && isInt8Array(received) && !isUint8Array(received) && !isUint8Array(received)) ||
      (isUint8Array(received) && isUint8Array(received) && !isInt8Array(expected) && !isInt8Array(received)) ||
      (isUint32Array(expected) && isUint32Array(received) && !isFloat32Array(expected) && !isFloat32Array(received)) ||
      (isFloat32Array(expected) && isFloat32Array(received) && !isUint32Array(expected) && !isUint32Array(received))
    ) {
      let differences = "";
      let countExpected = 0;
      let countReceived = 0;
      let labelType = "";
      if (isInt8Array(received)) labelType = "Uint8Array";
      if (isUint8Array(received)) labelType = "Int8Array";
      if (isUint32Array(received)) labelType = "Uint32Array";
      if (isFloat32Array(received)) labelType = "Float32Array";

      const iterateExpected =
        isUint8Array(expected) || isInt8Array(expected) || isUint32Array(expected) || isFloat32Array(expected)
          ? Array.from(expected)
          : isArray(expected) || isBuffer(expected)
            ? Array.from(expected)
            : [];

      const iterateReceived =
        isUint8Array(received) || isInt8Array(received) || isUint32Array(expected) || isFloat32Array(expected)
          ? Array.from(received)
          : isArray(expected) || isBuffer(received)
            ? Array.from(received)
            : [];

      iterateExpected.forEach((expectedValue, index) => {
        if (index >= iterateReceived.length) {
          differences += green("  -   ") + parseValue(expectedValue) + green(",") + "\n";
          countExpected++;
        } else {
          const receivedValue = iterateReceived[index];

          if (isNotEqual(expectedValue, receivedValue)) {
            differences += green("  -   ") + parseValue(expectedValue) + green(",") + "\n";
            differences += red("  +   ") + parseValue(receivedValue, "received") + red(",") + "\n";
            countExpected++;
            countReceived++;
          }
        }
      });

      iterateReceived.forEach((receivedValue, index) => {
        if (index >= iterateExpected.length) {
          differences += red("  +   ") + parseValue(receivedValue, "received") + red(",") + "\n";
          countReceived++;
        }
      });

      details += green(`    Expected: - ${countExpected}\n`);
      details += red(`    Received: + ${countReceived}\n`);

      if (differences.length > 0) {
        details += `\n    ${labelType} ${dim("[")}\n`;
        details += printSafe(differences);
        details += `\n    ${dim("]")}\n`;
      }
    } else {
      details += `    Expected: ${parseValue(expected)}\n`;
      if (!not) details += `    Received: ${parseValue(received, "received")}\n`;
    }
  } else if (isSet(expected)) {
    details += `    Expected: ${not ? "not " : ""}${parseValue(expected)}\n`;
    if (!not) details += `    Received: ${parseValue(received, "received")}\n`;
  } else if (isString(expected)) {
    details += `    Expected: ${not ? "not " : ""}${parseValue(expected)}\n`;
    if (!not) details += `    Received: ${parseValue(received, "received")}\n`;
  } else {
    details += `    Expected: ${not ? "not " : ""}${parseValue(expected)}\n`;
    if (!not) details += `    Received: ${parseValue(received, "received")}\n`;
  }

  details += `    ${getErrorContext(filename)}\n\n`;
  details += `    ${blue(filename)}\n`;
  return details;
};
