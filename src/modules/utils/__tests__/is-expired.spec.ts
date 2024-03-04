import { isExpired } from '../is-expired'

describe('isExpired', () => {
  it('Should return false for a time that has not expired', () => {
    const now = Date.now()
    const expiresIn = 1000 // 1 second
    const createdAt = now - 500 // 500 milliseconds ago
    expect(isExpired(createdAt, expiresIn)).toBeFalsy()
  })

  it('Should return true for a time that has expired', () => {
    const now = Date.now()
    const expiresIn = 1000 // 1 second
    const createdAt = now - 1500 // 1.5 seconds ago
    expect(isExpired(createdAt, expiresIn)).toBeTruthy()
  })

  it('Should return false for a time that has not expired when expiresIn is 0', () => {
    const now = Date.now()
    const expiresIn = 0 // Immediately expires
    const createdAt = now - 500 // 500 milliseconds ago
    expect(isExpired(createdAt, expiresIn)).toBeFalsy()
  })

  it('Should return true for a time that has expired when expiresIn is 0', () => {
    const now = Date.now()
    const expiresIn = 0 // Immediately expires
    const createdAt = now
    expect(isExpired(createdAt, expiresIn)).toBeTruthy()
  })
})
