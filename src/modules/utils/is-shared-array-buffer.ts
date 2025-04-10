export const isSharedArrayBuffer = (value: any): value is SharedArrayBuffer => {
  return value instanceof SharedArrayBuffer;
};
