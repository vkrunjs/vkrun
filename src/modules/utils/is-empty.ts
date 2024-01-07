export const isEmpty = (value: any): boolean => {
  return value === undefined ||
         value === null ||
         (typeof value === 'string' && value === '')
}
