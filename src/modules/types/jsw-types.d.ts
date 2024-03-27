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
