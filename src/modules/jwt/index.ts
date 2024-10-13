import * as crypto from 'crypto'
import * as util from '../utils'
import * as type from '../types'

class VkrunJwt implements type.VkrunJwt {
  encrypt (data: any, config: type.EncryptConfig): type.Token {
    const { secretKey, expiresIn } = config
    util.validateSecretKey(secretKey, 'jwt')
    util.validateTimeFormat(expiresIn, 'jwt')

    const convertedExpiresIn = util.convertExpiresIn(expiresIn)
    const keys = Array.isArray(secretKey) ? secretKey : [secretKey]
    const selectedKey = keys[Math.floor(Math.random() * keys.length)]

    const params: type.TokenData = {
      data,
      config: {
        createdAt: Date.now(),
        expiresIn: convertedExpiresIn
      }
    }

    const token: type.Token = this.encryptData(JSON.stringify(params), selectedKey)

    return token
  }

  decrypt (token: type.Token, secretKey: string | string[]): any | null {
    util.validateSecretKey(secretKey, 'jwt')
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

  private decryptData (token: string, secretKey: string): type.TokenData {
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

export const jwt = (): type.VkrunJwt => new VkrunJwt()
