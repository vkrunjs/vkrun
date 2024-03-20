export const isObject = (value: any): value is Record<string, any> => (
  Object.prototype.toString.call(value) === '[object Object]'
)
