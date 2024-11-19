export const compileRegex = (path: string): RegExp => {
  const pattern = path
    .replace(/\/\*/g, '/.*') // Support wildcard `*`
    .replace(/\/:([^/]+)/g, '/([^/]+)') // Dynamic parameters `:param`
  return new RegExp(`^${pattern}$`)
}
