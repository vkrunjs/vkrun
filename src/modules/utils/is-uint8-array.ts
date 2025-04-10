import { isInt8Array } from "./is-int8-array";

export const isUint8Array = (value: any): value is Uint8Array => {
  return value instanceof Uint8Array && !Buffer.isBuffer(value) && !isInt8Array(value);
};
