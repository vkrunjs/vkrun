export const isBuffer = (value: any): value is Buffer => {
  return (
    Buffer.isBuffer(value) || (value instanceof ArrayBuffer && !(value instanceof Uint8Array || value instanceof Int8Array))
  );
};
