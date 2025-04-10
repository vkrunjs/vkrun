export const isInt8Array = (value: any): value is Int8Array => {
  return value instanceof Int8Array && !Buffer.isBuffer(value);
};
