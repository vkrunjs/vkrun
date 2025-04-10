export const regexMatch = (value: string, regex: RegExp): boolean => {
  return regex.test(value);
};
