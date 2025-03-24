import { isISO8601, isString, parseEscapeSQL } from "../../../utils";
import { Request } from "../../../types";

export const parseJSON = (request: Request, escapeSQL: boolean): JSON => {
  const body = request.body.toString();
  const parsedBody = JSON.parse(body, (_key, value) => {
    if (isString(value) && isISO8601(value)) {
      return new Date(value);
    } else if (isString(value) && escapeSQL) {
      return parseEscapeSQL(value);
    }
    return value;
  });
  return parsedBody;
};
