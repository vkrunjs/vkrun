import { isArray } from "./is-array";
import { isString } from "./is-string";

export const validateSecretKey = (secretKey: string | string[], module: string): void => {
  if (!isString(secretKey) && !isArray(secretKey)) {
    throw new Error(`vkrun-${module}: the secret key must be a string or a string array.`);
  } else if (isString(secretKey) && secretKey.length !== 64) {
    throw new Error(`vkrun-${module}: the secret keys must be strings of 64 characters representing 32 bytes.`);
  } else if (isArray(secretKey)) {
    if (secretKey.some((key) => typeof key !== "string" || key.length !== 64)) {
      throw new Error(`vkrun-${module}: all secret keys must be strings of 64 characters representing 32 bytes.`);
    }
  }
};
