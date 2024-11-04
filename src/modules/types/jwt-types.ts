export interface VkrunJwt {
  encrypt: (data: any, config: JwtEncryptConfig) => JwtToken
  decrypt: (token: JwtToken, secretKey: string | string[]) => any | null
}

export interface JwtEncryptConfig {
  secretKey: string | string[]
  expiresIn: number | string
}

export interface JwtTokenData {
  data: any
  config: {
    createdAt: number
    expiresIn: number
  }
}

export type JwtToken = string
