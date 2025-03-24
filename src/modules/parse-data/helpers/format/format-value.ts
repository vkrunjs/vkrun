import { isArray, isISO8601, isString, parseEscapeSQL } from "../../../utils";
import { convertToType } from "./convert-to-type";
import { formatObjectValues } from "./format-object-values";

export const formatValue = (value: any, escapeSQL: boolean): any => {
  if (isArray(value)) {
    return value.map((v: any) => formatValue(v, escapeSQL));
  } else if (typeof value === "object" && value !== null) {
    return formatObjectValues(value, escapeSQL);
  } else if (typeof value === "string" && isISO8601(value)) {
    return new Date(value);
  } else {
    const formattedValue = convertToType(value);

    if (escapeSQL && isString(formattedValue)) {
      return parseEscapeSQL(formattedValue);
    }

    return formattedValue;
  }
};
