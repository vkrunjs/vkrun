export const isNotEmpty = (value: any): boolean => {
  return (typeof value === 'boolean' ||
         (typeof value === 'number' && value === 0) ||
         (typeof value === 'string' && value !== '')) &&
         (value !== undefined && value !== null)
}
