export const sanitizeProcessEnv = (): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(process.env).filter(([_, value]) => typeof value === 'string') as Array<[string, string]>
  )
}
