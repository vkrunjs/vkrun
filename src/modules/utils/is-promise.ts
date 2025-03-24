export const isPromise = (value: any): boolean => {
  if (
    value instanceof Promise ||
    (typeof value === "function" && Object.prototype.toString.call(value) === "[object AsyncFunction]")
  ) {
    return true;
  }

  return false;
};
