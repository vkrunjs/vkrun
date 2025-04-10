export const isArrayBuffer = (value: any): value is ArrayBuffer => {
  return value instanceof ArrayBuffer;
};
