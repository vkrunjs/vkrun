export const isISO8601 = (value: any): boolean => {
  const iso8601Pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/
  return iso8601Pattern.test(value)
}
