import { formatValue } from "./format-value";

export const formatObjectValues = (
  obj: Record<string, any>,
  escapeSQL: boolean,
): Record<string, string | number | boolean | Date> => {
  const formattedObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      formattedObj[key] = formatValue(value, escapeSQL);
    }
  }

  return formattedObj;
};
