import crypto from 'crypto'

export const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex')
}
