import { isFunction, isRegExp, isString } from "../../../../../utils";
import { blue, dim, green, red } from "../../../output-colors";
import { getErrorContext } from "../get-error-context";
import { parseValue } from "../parse-value";

export const errorDetailsToThrow = ({
  expected,
  received,
  filename,
  flags,
}: {
  expected: any;
  received: string | RegExp;
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
  details += `.ToThrow${dim("(")}${green("expected")}${dim(")")}\n\n`;

  if ((resolves || rejects) && !receivedIsPromise) {
    details += `    Matcher error: ${red("received")} value must be a promise\n\n`;
  }

  if (resolves && !rejects && receivedIsPromise && invalidReceivedPromise) {
    details += `    Received promise rejected instead of resolved\n`;
    if (!not) details += `    Rejected to value: ${parseValue(received, "received")}\n`;
  } else if (rejects && !resolves && receivedIsPromise && invalidReceivedPromise) {
    details += `    Received promise resolved instead of rejected\n`;
    if (!not) details += `    Resolved to value: ${parseValue(received, "received")}\n`;
  } else {
    if (!isFunction(received)) {
      details += `    Received function did not throw\n`;
    } else {
      let errorThrown = false;
      let errorMessage = "";
      let errorName = "";

      try {
        received();
      } catch (error: any) {
        errorThrown = true;
        errorName = error.name;
        errorMessage = error.message;
      }

      if (!errorThrown) {
        details += `    Received function did not throw\n`;
      } else {
        details += `    Expected: ${not ? dim("not ") : ""}\n`;
        if (typeof expected === "function" && expected.prototype instanceof Error) {
          details += `      - Error name: ${green(`"${expected.name}"`)}\n`;
          if (expected.message) details += `      - Error message: ${green(`"${expected.message}"`)}\n`;

          if (!not) {
            if (errorThrown) {
              details += `    Received:\n`;
              details += `      - Error name: ${red(`"${errorName}"`)}\n`;
              if (expected.message) details += `      - Error message: ${red(`"${errorMessage}"`)}\n`;
            } else {
              details += `    Received: ${parseValue(received, "received")}\n`;
            }
          }
        } else if (expected instanceof Error && errorThrown) {
          details += `      - Error name: ${green(`"${expected.name}"`)}\n`;
          if (expected.message) details += `      - Error message: ${green(`"${expected.message}"`)}\n`;

          if (!not) {
            details += `    Received:\n`;
            details += `      - Error name: ${red(`"${errorName}"`)}\n`;
            if (expected.message) details += `      - Error message: ${red(`"${errorMessage}"`)}\n`;
          }
        } else if (isRegExp(expected)) {
          details += `      - Error message pattern: ${parseValue(expected, "expected")}\n`;
          if (!not) {
            details += `    Received:\n`;
            details += `      - Error message: ${red(`"${errorMessage}"`)}\n`;
          }
        } else if (isString(expected)) {
          details += `      - Error message: ${parseValue(expected, "expected")}\n`;
          if (!not) {
            details += `    Received:\n`;
            details += `      - Error message: ${red(`"${errorMessage}"`)}\n`;
          }
        } else {
          details += `      - Error name: ${green(`"${errorName}"`)}\n`;
          details += `      - Error message: ${green(`"${errorMessage}"`)}\n`;
        }
      }
    }
  }

  details += `    ${getErrorContext(filename)}\n\n`;
  details += `    ${blue(filename)}\n`;
  return details;
};
