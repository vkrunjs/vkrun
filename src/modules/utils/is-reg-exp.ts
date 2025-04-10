export const isRegExp = (value: any): value is RegExp => {
  return value instanceof RegExp;
};
