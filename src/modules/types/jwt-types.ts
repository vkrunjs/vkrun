export interface VkrunJwt {
  encrypt: (data: any, config: EncryptConfig) => Token
  decrypt: (token: Token, secretKey: string | string[]) => any | null
}

export interface EncryptConfig {
  secretKey: string | string[]
  expiresIn: number | string
}

export interface TokenData {
  data: any
  config: {
    createdAt: number
    expiresIn: number
  }
}

export type Token = string
