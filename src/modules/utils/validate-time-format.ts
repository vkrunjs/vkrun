import { isNumber } from "./is-number";
import { isString } from "./is-string";

export const validateTimeFormat = (expiresIn: number | string, module: string): void => {
  const regex = /^(\d+)([mhds])$/;

  if (!isNumber(expiresIn) && !(isString(expiresIn) && regex.test(expiresIn))) {
    throw new Error(
      `vkrun-${module}: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".`,
    );
  }
};
