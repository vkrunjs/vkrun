import { blue, dim, green, red } from "../../../output-colors";
import { getErrorContext } from "../get-error-context";
import { parseValue } from "../parse-value";

export const errorDetailsToTruthy = ({
  received,
  filename,
  flags,
}: {
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
  details += `.toBeTruthy${dim("(")}${green("expected")}${dim(")")}\n\n`;

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
    details += `    Expected: ${not ? dim("not ") : ""}${green("true")}\n`;
    if (!not) details += `    Received: ${parseValue(received, "received")}\n`;
  }

  details += `    ${getErrorContext(filename)}\n\n`;
  details += `    ${blue(filename)}\n`;
  return details;
};
