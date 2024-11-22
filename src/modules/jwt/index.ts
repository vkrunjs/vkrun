import * as crypto from 'crypto'
import { JwtEncryptConfig, JwtToken, JwtTokenData, VkrunJwt } from '../types'
import { convertExpiresIn, validateSecretKey, validateTimeFormat } from '../utils'

class JwtSetup implements VkrunJwt {
  encrypt (data: any, config: JwtEncryptConfig): JwtToken {
    const { secretKey, expiresIn } = config
    validateSecretKey(secretKey, 'jwt')
    validateTimeFormat(expiresIn, 'jwt')

    const convertedExpiresIn = convertExpiresIn(expiresIn)
    const keys = Array.isArray(secretKey) ? secretKey : [secretKey]
    const selectedKey = keys[Math.floor(Math.random() * keys.length)]

    const params: JwtTokenData = {
      data,
      config: {
        createdAt: Date.now(),
        expiresIn: convertedExpiresIn
      }
    }

    const token: JwtToken = this.encryptData(JSON.stringify(params), selectedKey)

    return token
  }

  decrypt (token: JwtToken, secretKey: string | string[]): any | null {
    validateSecretKey(secretKey, 'jwt')
    const keys = Array.isArray(secretKey) ? secretKey : [secretKey]

    for (const key of keys) {
      try {
        const { data, config } = this.decryptData(token, key)

        if (!this.tokenHasExpired(config.createdAt, config.expiresIn)) {
          return data
        }
      } catch (err) {
        // Ignore errors and try the next key
      }
    }

    return null
  }

  private encryptData (tokenData: string, secretKey: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv)
    let encryptedData = cipher.update(tokenData, 'utf-8', 'hex')
    encryptedData += cipher.final('hex')
    return `${iv.toString('hex')}:${encryptedData}`
  }

  private decryptData (token: string, secretKey: string): JwtTokenData {
    const [ivHex, encryptedDataHex] = token.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv)
    let decryptedData = decipher.update(encryptedDataHex, 'hex', 'utf-8')
    decryptedData += decipher.final('utf-8')
    const tokenData = JSON.parse(decryptedData)
    return tokenData
  }

  private tokenHasExpired (createdAt: number, expiresIn: number): boolean {
    const now = Date.now()
    const expirationTime = createdAt + expiresIn
    return now > expirationTime
  }
}

/**
 * @function jwt
 *
 * This function is used to generate tokens and decrypt them, and can be customized with various
 * configurations such as secret keys and expiration times.
 *
 * **Usage:**
 * - You can call this function to create a new instance of the `JwtSetup` class, which contains the
 *   methods `encrypt` and `decrypt` to handle JWT tokens.
 *
 * @returns {VkrunJwt} - Returns an instance of the `JwtSetup` class, which implements the `VkrunJwt` interface.
 *
 * @example
 * const data = { id: 123, name: 'John Doe' }
 * const config = { secretKey: 'your-secret-key-SHA256', expiresIn: '1h' }
 * const token = jwt().encrypt(data, config)
 * console.log(token) // token string
 */
export const jwt = (): VkrunJwt => new JwtSetup()
