export const isUint32Array = (value: any): value is Uint32Array => {
  return value instanceof Uint32Array && !Buffer.isBuffer(value);
};
