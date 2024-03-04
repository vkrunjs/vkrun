export const isExpired = (createdAt: number, expiresIn: number): boolean => {
  const now = Date.now()
  const expirationTime = createdAt + expiresIn
  return now > expirationTime
}
