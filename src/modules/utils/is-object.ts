export const isObject = (value: any): boolean => (
  Object.prototype.toString.call(value) === '[object Object]'
)
