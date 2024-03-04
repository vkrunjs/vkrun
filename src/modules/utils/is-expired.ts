export const isExpired = (createdAt: number, expiresIn: number): boolean => {
  if (expiresIn <= 0) {
    return true
  }

  const now = Date.now()
  const expirationTime = createdAt + expiresIn
  return now > expirationTime
}
