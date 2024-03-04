export interface CorsOptions {
  origin: string
  methods: string | string[]
  preflightNext: boolean
  successStatus: number
  allowedHeaders?: string | undefined
  exposedHeaders?: string | undefined
  credentials?: boolean | undefined
  maxAge?: string | undefined
}

export interface SetCorsOptions {
  origin?: string | string[] | undefined
  methods?: string | string[] | undefined
  preflightNext?: boolean | undefined
  successStatus?: number | undefined
  allowedHeaders?: string | undefined
  exposedHeaders?: string | undefined
  credentials?: boolean | undefined
  maxAge?: number | undefined
}
