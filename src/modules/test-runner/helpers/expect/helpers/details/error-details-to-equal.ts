// import {
//   isArray,
//   isBuffer,
//   isDate,
//   isObject,
//   isString,
//   isPromise,
//   isNotEqual,
//   isFloat32Array,
//   isInt8Array,
//   isUint32Array,
//   isUint8Array,
//   isMap,
//   isWeakMap,
//   isWeakSet,
//   isRegExp,
//   isSet,
//   isArrayBuffer,
// } from "../../../../../utils";
// import { blue, dim, green, red } from "../../../output-colors";
// import { printSafe } from "../../../print-safe";
// import { getErrorContext } from "../get-error-context";
// import { parseValue } from "../parse-value";

// export const errorDetailsToEqual = ({
//   expected,
//   received,
//   filename,
//   flags,
// }: {
//   expected: any;
//   received: any;
//   filename: string;
//   flags?: {
//     not?: boolean;
//     resolves?: boolean;
//     rejects?: boolean;
//   };
// }) => {
//   const not = flags?.not;
//   const resolves = flags?.resolves;
//   const rejects = flags?.rejects;
//   let details = "";

//   details += `\n    ${dim("expect(")}${red("received")}${dim(")")}`;
//   if (resolves) details += ".resolves";
//   if (rejects) details += ".rejects";
//   if (not) details += ".not";
//   details += `.toEqual${dim("(")}${green("expected")}${dim(")")}${dim(" // equal values")}\n\n`;

//   if ((resolves || rejects) && !isPromise(received)) {
//     details += `Matcher error: ${red("received")} value must be a promise or a function returning a promise\n\n`;
//   }

//   if (typeof expected === "symbol" || Number.isNaN(expected) || isRegExp(expected)) {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received:  ${parseValue(received, "received")}\n`;
//   } else if (isWeakMap(expected)) {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received:  ${parseValue(received, "received")}\n`;
//   } else if (isWeakSet(expected)) {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received:  ${parseValue(received, "received")}\n`;
//   } else if (isMap(expected)) {
//     if (isMap(received)) {
//       let differences = "";
//       let countExpected = 0;
//       let countReceived = 0;

//       for (const [key, expectedValue] of expected.entries()) {
//         if (!received.has(key)) {
//           differences += red(`  -    "${key}" => `) + parseValue(expectedValue, "expected") + "\n";
//           countExpected++;
//         } else {
//           const receivedValue = received.get(key);
//           if (isNotEqual(expectedValue, receivedValue)) {
//             differences += red(`  -    "${key}" => `) + parseValue(expectedValue, "expected") + "\n";
//             differences += green(`  +    "${key}" => `) + parseValue(receivedValue, "received") + "\n";
//             countExpected++;
//             countReceived++;
//           }
//         }
//       }

//       for (const [key, receivedValue] of received.entries()) {
//         if (!expected.has(key)) {
//           differences += green(`  +    "${key}" => `) + parseValue(receivedValue, "received") + "\n";
//           countReceived++;
//         }
//       }

//       details += red(`    Expected: - ${countExpected}\n`);
//       details += green(`    Received: + ${countReceived}\n`);

//       if (differences.length > 0) {
//         details += `\n    ${dim("Map {")}\n`;
//         details += printSafe(differences);
//         details += `\n    ${dim("}")}\n`;
//       }
//     } else {
//       console.log({ expected, received });
//       details += `    Expected: ${not ? dim("not ") : ""}` + parseValue(expected) + "\n";
//       details += `    Received:  ${parseValue(received, "received")}\n`;
//     }
//   } else if (isSet(expected)) {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received: ${parseValue(received, "received")}\n`;
//   } else if (isArrayBuffer(expected)) {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received:  ${parseValue(received, "received")}\n`;
//   } else if (isString(expected)) {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received: ${parseValue(received, "received")}\n`;
//   } else if (isObject(expected) || isBuffer(expected)) {
//     if (not) {
//       details += `    Expected: ${dim("not ")}${parseValue(expected)}\n`;
//     }
//     if (isObject(received) || isBuffer(received)) {
//       let differences = "";
//       let countExpected = 0;
//       let countReceived = 0;
//       const parsedExpected = isBuffer(expected) ? JSON.parse(JSON.stringify(expected)) : expected;
//       const parsedReceived = isBuffer(received) ? JSON.parse(JSON.stringify(received)) : received;

//       Object.entries(parsedExpected).forEach(([key, expectedValue]) => {
//         if (!(key in received)) {
//           differences += red(`  -   ${key}: `) + parseValue(expectedValue, "expected") + "\n";
//           countExpected++;
//         } else {
//           const receivedValue = parsedReceived[key];

//           if (isNotEqual(expectedValue, receivedValue)) {
//             differences += red(`  -   ${key}: `) + parseValue(expectedValue, "expected") + "\n";
//             differences += green(`  +   ${key}: `) + parseValue(receivedValue, "received") + "\n";
//             countExpected++;
//             countReceived++;
//           }
//         }
//       });

//       // Adiciona as propriedades presentes em received mas não em expected
//       Object.entries(parsedReceived).forEach(([key, receivedValue]) => {
//         if (!(key in parsedExpected)) {
//           differences += green(`  +   ${key}: `) + parseValue(receivedValue, "received") + "\n";
//           countReceived++;
//         }
//       });

//       // Exibe as contagens de itens
//       details += red(`    Expected: - ${countExpected}\n`);
//       details += green(`    Received: + ${countReceived}\n`);

//       // Exibe as diferenças se houver
//       if (differences.length > 0) {
//         details += `\n    ${dim("{")}\n`;
//         details += printSafe(differences);
//         details += `\n    ${dim("}")}\n`;
//       }
//     } else {
//       details += `    Expected: ${parseValue(expected)}\n`;
//       details += `    Received: ${parseValue(received, "received")}\n`;
//     }
//   } else if (
//     isArray(expected) ||
//     isInt8Array(expected) ||
//     isUint8Array(expected) ||
//     isUint32Array(expected) ||
//     isFloat32Array(expected)
//   ) {
//     if (not) {
//       details += `    Expected: ${dim("not ")}${parseValue(expected)}\n`;
//     } else if (
//       (isArray(expected) && isArray(received)) ||
//       (isInt8Array(expected) && isInt8Array(received)) ||
//       (isUint8Array(received) && isUint8Array(received)) ||
//       (isUint32Array(expected) && isUint32Array(received)) ||
//       (isFloat32Array(expected) && isFloat32Array(received))
//     ) {
//       let differences = "";
//       let countExpected = 0;
//       let countReceived = 0;
//       let labelType = "";
//       if (isArray(expected)) labelType = "Array";
//       if (isInt8Array(received)) labelType = "Uint8Array";
//       if (isUint8Array(received)) labelType = "Int8Array";
//       if (isUint32Array(received)) labelType = "Uint32Array";
//       if (isFloat32Array(received)) labelType = "Float32Array";

//       const iterateExpected =
//         isUint8Array(expected) || isInt8Array(expected) || isUint32Array(expected) || isFloat32Array(expected)
//           ? Array.from(expected)
//           : isArray(expected) || isBuffer(expected)
//             ? Array.from(expected)
//             : [];

//       const iterateReceived =
//         isUint8Array(received) || isInt8Array(received) || isUint32Array(expected) || isFloat32Array(expected)
//           ? Array.from(received)
//           : isArray(expected) || isBuffer(received)
//             ? Array.from(received)
//             : [];

//       iterateExpected.forEach((expectedValue, index) => {
//         if (index >= iterateReceived.length) {
//           differences += green("  -   ") + parseValue(expected) + green(",") + "\n";
//           countExpected++;
//         } else {
//           const receivedValue = iterateReceived[index];

//           if (isNotEqual(expectedValue, receivedValue)) {
//             differences += green("  -   ") + parseValue(expected) + green(",") + "\n";
//             differences += red("  +   ") + parseValue(receivedValue, "received") + red(",") + "\n";
//             countExpected++;
//             countReceived++;
//           }
//         }
//       });

//       iterateReceived.forEach((receivedValue, index) => {
//         if (index >= iterateExpected.length) {
//           differences += red("  +   ") + parseValue(receivedValue, "received") + red(",") + "\n";
//           countReceived++;
//         }
//       });

//       details += green(`    Expected: - ${countExpected}\n`);
//       details += red(`    Received: + ${countReceived}\n`);

//       if (differences.length > 0) {
//         details += `\n    ${labelType} ${dim("[")}\n`;
//         details += printSafe(differences);
//         details += `\n    ${dim("]")}\n`;
//       }
//     } else {
//       details += `    Expected: ${parseValue(expected)}\n`;
//       details += `    Received: ${parseValue(received, "received")}\n`;
//     }
//   } else if (isDate(expected)) {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received:  ${parseValue(received, "received")}\n`;
//   } else {
//     details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
//     details += `    Received: ${parseValue(received, "received")}\n`;
//   }

//   details += `    ${getErrorContext(filename)}\n\n`;
//   details += `    ${blue(filename)}\n`;
//   return details;
// };

import {
  isArray,
  isBuffer,
  isDate,
  isObject,
  isString,
  isPromise,
  isNotEqual,
  isFloat32Array,
  isInt8Array,
  isUint32Array,
  isUint8Array,
  isMap,
  isWeakMap,
  isWeakSet,
  isRegExp,
  isSet,
  isArrayBuffer,
} from "../../../../../utils";
import { blue, dim, green, red } from "../../../output-colors";
import { printSafe } from "../../../print-safe";
import { getErrorContext } from "../get-error-context";
import { parseValue } from "../parse-value";

export const errorDetailsToEqual = ({
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
  details += `.toEqual${dim("(")}${green("expected")}${dim(")")}\n\n`;

  if ((resolves || rejects) && !receivedIsPromise) {
    details += `    Matcher error: ${red("received")} value must be a promise\n\n`;
  }

  if (resolves && !rejects && receivedIsPromise && invalidReceivedPromise) {
    details += `    Received promise rejected instead of resolved\n`;
    if (!not) details += `    Rejected to value: ${parseValue(received, "received")}\n`;
  } else if (rejects && !resolves && receivedIsPromise && invalidReceivedPromise) {
    details += `    Received promise resolved instead of rejected\n`;
    if (!not) details += `    Resolved to value: ${parseValue(received, "received")}\n`;
  } else if (isMap(expected) && isMap(received)) {
    let differences = "";
    let countExpected = 0;
    let countReceived = 0;

    for (const [key, expectedValue] of expected.entries()) {
      if (!received.has(key)) {
        differences += red(`  -    "${key}" => `) + parseValue(expectedValue, "received") + "\n";
        countExpected++;
      } else {
        const receivedValue = received.get(key);
        if (isNotEqual(expectedValue, receivedValue)) {
          differences += red(`  -    "${key}" => `) + parseValue(expectedValue, "received") + "\n";
          differences += green(`  +    "${key}" => `) + parseValue(receivedValue, "expected") + "\n";
          countExpected++;
          countReceived++;
        }
      }
    }

    for (const [key, receivedValue] of received.entries()) {
      if (!expected.has(key)) {
        differences += green(`  +    "${key}" => `) + parseValue(receivedValue, "expected") + "\n";
        countReceived++;
      }
    }

    details += red(`    Expected: - ${countExpected}\n`);
    details += green(`    Received: + ${countReceived}\n`);

    if (differences.length > 0) {
      details += `\n    ${dim("Map {")}\n`;
      details += printSafe(differences);
      details += `\n    ${dim("}")}\n`;
    }
  } else if (isSet(expected) && isSet(received)) {
    let differences = "";
    let countExpected = 0;
    let countReceived = 0;

    for (const expectedValue of expected) {
      if (!received.has(expectedValue)) {
        differences += red(`  -   `) + parseValue(expectedValue, "received") + "\n";
        countExpected++;
      }
    }

    for (const receivedValue of received) {
      if (!expected.has(receivedValue)) {
        differences += green(`  +   `) + parseValue(receivedValue, "expected") + "\n";
        countReceived++;
      }
    }

    details += red(`    Expected: - ${countExpected}\n`);
    details += green(`    Received: + ${countReceived}\n`);

    if (differences.length > 0) {
      details += `\n    ${dim("Set {")}\n`;
      details += printSafe(differences);
      details += `\n    ${dim("}")}\n`;
    }
  } else if (isArrayBuffer(expected)) {
    details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
    if (!not) details += `    Received: ${parseValue(received, "received")}\n`;
  } else if (isObject(expected) || isBuffer(expected)) {
    if (not) {
      details += `    Expected: ${dim("not ")}${parseValue(expected)}\n`;
    } else {
      let differences = "";
      let countExpected = 0;
      let countReceived = 0;
      const parsedExpected = isBuffer(expected) ? JSON.parse(JSON.stringify(expected)) : expected;
      const parsedReceived = isBuffer(received) ? JSON.parse(JSON.stringify(received)) : received;

      Object.entries(parsedExpected).forEach(([key, expectedValue]) => {
        if (!(key in parsedReceived)) {
          differences += red(`  -   ${key}: `) + parseValue(expectedValue, "received") + "\n";
          countExpected++;
        } else {
          const receivedValue = parsedReceived[key];

          if (isNotEqual(expectedValue, receivedValue)) {
            differences += red(`  -   ${key}: `) + parseValue(expectedValue, "received") + "\n";
            differences += green(`  +   ${key}: `) + parseValue(receivedValue, "expected") + "\n";
            countExpected++;
            countReceived++;
          }
        }
      });

      // Adiciona as propriedades presentes em received mas não em expected
      Object.entries(parsedReceived).forEach(([key, receivedValue]) => {
        if (!(key in parsedExpected)) {
          differences += green(`  +   ${key}: `) + parseValue(receivedValue, "expected") + "\n";
          countReceived++;
        }
      });

      // Exibe as contagens de itens
      details += red(`    Expected: - ${countExpected}\n`);
      details += green(`    Received: + ${countReceived}\n`);

      // Exibe as diferenças se houver
      if (differences.length > 0) {
        details += `\n    ${dim("{")}\n`;
        details += printSafe(differences);
        details += `\n    ${dim("}")}\n`;
      }
    }
  } else if (
    (isArray(expected) && isArray(received)) ||
    (isInt8Array(expected) && isInt8Array(received) && !isUint8Array(received) && !isUint8Array(received)) ||
    (isUint8Array(received) && isUint8Array(received) && !isInt8Array(expected) && !isInt8Array(received)) ||
    (isUint32Array(expected) && isUint32Array(received) && !isFloat32Array(expected) && !isFloat32Array(received)) ||
    (isFloat32Array(expected) && isFloat32Array(received) && !isUint32Array(expected) && !isUint32Array(received))
  ) {
    if (not) {
      details += `    Expected: ${dim("not ")}${parseValue(expected)}\n`;
    } else {
      let differences = "";
      let countExpected = 0;
      let countReceived = 0;
      let labelType = "";
      if (isArray(received)) labelType = "Array";
      if (isInt8Array(received)) labelType = "Uint8Array";
      if (isUint8Array(received)) labelType = "Int8Array";
      if (isUint32Array(received)) labelType = "Uint32Array";
      if (isFloat32Array(received)) labelType = "Float32Array";

      const iterateExpected = isArray(expected) ? expected : [...expected];
      const iterateReceived = isArray(received) ? received : [...received];

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
    }
  } else {
    details += `    Expected: ${not ? dim("not ") : ""}${parseValue(expected)}\n`;
    if (!not) details += `    Received: ${parseValue(received, "received")}\n`;
  }

  details += `    ${getErrorContext(filename)}\n\n`;
  details += `    ${blue(filename)}\n`;
  return details;
};
