import { isEmpty } from "./is-empty";
import { isNumber } from "./is-number";
import { isString } from "./is-string";

export const convertExpiresIn = (expiresIn: string | number, result: "MS" | "S" = "MS"): number => {
  if (isString(expiresIn) && isEmpty(expiresIn)) {
    return 0;
  } else if (isNumber(expiresIn)) {
    return result === "MS" ? expiresIn * 1000 : expiresIn;
  }

  const regex = /^(\d+)([mhds])$/;
  const matches = expiresIn.match(regex) ?? [];

  const value = parseInt(matches[1]);
  const unit = matches[2];

  if (unit === "s") {
    return result === "MS" ? value * 1000 : value; // seconds
  } else if (unit === "m") {
    return result === "MS" ? value * 60 * 1000 : value * 60; // minutes
  } else if (unit === "h") {
    return result === "MS" ? value * 60 * 60 * 1000 : value * 60 * 60; // hours
  } else if (unit === "d") {
    return result === "MS" ? value * 24 * 60 * 60 * 1000 : value * 24 * 60 * 60; // days
  } else {
    return 0;
  }
};
