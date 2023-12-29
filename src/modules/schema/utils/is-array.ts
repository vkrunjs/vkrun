export const isArray = (schemaRules: Array<{ method: string }>): boolean => {
  return schemaRules[0]?.method === 'array'
}
