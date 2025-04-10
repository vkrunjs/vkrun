export const isWeakSet = (value: any): value is WeakSet<any> => {
  return value instanceof WeakSet;
};
