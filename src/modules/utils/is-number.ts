export const isNumber = (value: any): value is number => {
  return typeof value === "number" && !Number.isNaN(value);
};
