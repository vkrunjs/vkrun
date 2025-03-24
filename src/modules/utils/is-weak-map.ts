export const isWeakMap = (value: any): value is WeakMap<any, any> => {
  return value instanceof WeakMap;
};
