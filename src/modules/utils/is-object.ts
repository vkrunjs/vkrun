export const isObject = (value: any): value is Record<string, any> => {
  return Object.prototype.toString.call(value) === "[object Object]";
};
