export const isArray = (value: any): value is any[] => {
  return (
    Array.isArray(value) &&
    !(
      value instanceof Uint8Array ||
      value instanceof Int8Array ||
      value instanceof ArrayBuffer ||
      value instanceof Float32Array ||
      value instanceof Uint32Array
    )
  );
};
