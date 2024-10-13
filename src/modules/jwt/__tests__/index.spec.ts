import * as crypto from 'crypto'
import { jwt } from '..'

const generateKey = (): string => {
  return crypto.randomBytes(32).toString('hex')
}

describe('JWT', () => {
  it('encrypts and decrypts data with a single secret key', () => {
    const data = { id: 123, name: 'John' }
    const config = {
      secretKey: generateKey(),
      expiresIn: 60 // 60 seconds
    }
    const token = jwt().encrypt(data, config)
    const decryptedToken = jwt().decrypt(token, config.secretKey)

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toEqual(data)
  })

  it('encrypts and decrypts data of any type', () => {
    const data = 'John'
    const config = {
      secretKey: generateKey(),
      expiresIn: 60 // 60 seconds
    }
    const token = jwt().encrypt(data, config)
    const decryptedToken = jwt().decrypt(token, config.secretKey)

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toEqual(data)
  })

  it('encrypts and decrypts data with an array of secret keys', () => {
    const data = { id: 456, name: 'Alice' }
    const config = {
      secretKey: [generateKey(), generateKey(), generateKey()],
      expiresIn: 60 // 60 seconds
    }

    const token = jwt().encrypt(data, config)
    const decryptedToken = jwt().decrypt(token, config.secretKey)

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toEqual(data)
  })

  it('return null when token is expired', (done) => {
    const data = { id: 789, name: 'Bob' }
    const config = {
      secretKey: generateKey(),
      expiresIn: 1 // 1 second
    }
    const token = jwt().encrypt(data, config)

    setTimeout(() => {
      const decryptedToken = jwt().decrypt(token, config.secretKey)

      expect(typeof token === 'string').toBeTruthy()
      expect(decryptedToken).toBeNull()
      done()
    }, 1001)
  })

  it('return null when trying to decrypt with incorrect secret key', () => {
    const data = { id: 987, name: 'Eve' }
    const config = {
      secretKey: generateKey(),
      expiresIn: 60 // 60 seconds
    }
    const wrongSecretKey = generateKey()
    const token = jwt().encrypt(data, config)
    const decryptedToken = jwt().decrypt(token, wrongSecretKey)

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toBeNull()
  })

  it('should return an error when calling the encrypt method with a secret key other than string or string array', () => {
    const data = { id: 456, name: 'Alice' }
    const config = { secretKey: true as any, expiresIn: 60 }

    const token = (): string => jwt().encrypt(data, config)

    expect(token).toThrow('vkrun-jwt: the secret key must be a string or a string array.')
  })

  it('should return an error when calling the decrypt method with the secret key string in the invalid format', () => {
    const data = { id: 456, name: 'Alice' }
    const config = { secretKey: generateKey(), expiresIn: 60 }

    const token = jwt().encrypt(data, config)
    const decryptedToken = (): void => jwt().decrypt(token, 'invalid_secret_key')

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toThrow('vkrun-jwt: the secret keys must be strings of 64 characters representing 32 bytes.')
  })

  it('should return an error when calling the decrypt method with invalid secret keys', () => {
    const data = { id: 456, name: 'Alice' }
    const config = { secretKey: [generateKey()], expiresIn: 60 }

    const token = jwt().encrypt(data, config)
    const decryptedToken = (): void => jwt().decrypt(token, ['invalid_secret_key'])

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toThrow('vkrun-jwt: all secret keys must be strings of 64 characters representing 32 bytes.')
  })

  it('encrypts and decrypts data with expiresIn in minutes', () => {
    const data = { id: 123, name: 'John' }
    const config = {
      secretKey: generateKey(),
      expiresIn: '5m' // 5 minutes
    }

    const token = jwt().encrypt(data, config)
    const decryptedToken = jwt().decrypt(token, config.secretKey)

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toEqual(data)
  })

  it('encrypts and decrypts data with expiresIn in hours', () => {
    const data = { id: 123, name: 'John' }
    const config = {
      secretKey: generateKey(),
      expiresIn: '2h' // 2 hours
    }

    const token = jwt().encrypt(data, config)
    const decryptedToken = jwt().decrypt(token, config.secretKey)

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toEqual(data)
  })

  it('encrypts and decrypts data with expiresIn in days', () => {
    const data = { id: 123, name: 'John' }
    const config = {
      secretKey: generateKey(),
      expiresIn: '3d' // 3 days
    }

    const token = jwt().encrypt(data, config)
    const decryptedToken = jwt().decrypt(token, config.secretKey)

    expect(typeof token === 'string').toBeTruthy()
    expect(decryptedToken).toEqual(data)
  })

  it('throws an error for invalid expiresIn format', () => {
    const data = { id: 123, name: 'John' }
    const config = {
      secretKey: generateKey(),
      expiresIn: '3y' // invalid format
    }
    const token = (): string => jwt().encrypt(data, config)

    expect(token).toThrow('vkrun-jwt: invalid time format. Use a number or string in the example format: "5s", "5m", "3h", or "2d".')
  })
})
