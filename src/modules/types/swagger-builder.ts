export type SwaggerSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null'

export interface SwaggerSchema {
  $ref?: string
  type?: SwaggerSchemaType
  description?: string
  example?: any
  format?: 'date' | 'date-time' | string
  required?: boolean | string[]
  enum?: any[]
  default?: any
  minLength?: number
  maxLength?: number
  pattern?: string
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
  multipleOf?: number
  items?: SwaggerSchema
  properties?: Record<string, SwaggerSchema>
  additionalProperties?: boolean | SwaggerSchema
  anyOf?: SwaggerSchema[]
  oneOf?: SwaggerSchema[]
  allOf?: SwaggerSchema[]
  not?: SwaggerSchema
}

export type SwaggerHttpStatusCode =
  | 100 | 101 | 102 | 103
  | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
  | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
  | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408
  | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418
  | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451
  | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511

export interface SwaggerRequestBody {
  $ref?: string // Permite $ref sem exigir outras propriedades
  required?: boolean
  content?: Record<string, {
    schema: SwaggerSchema
    examples?: Record<string, {
      summary?: string
      description?: string
      value?: any
      externalValue?: string
    }>
  }>
}

export interface SwaggerResponse {
  $ref?: string // Permite $ref sem exigir outras propriedades
  description?: string // `description` é opcional porque pode ser usado `$ref`
  content?: Record<string, {
    schema: SwaggerSchema
    examples?: Record<string, {
      $ref?: string
      summary?: string
      description?: string
      value?: any
      externalValue?: string
    }>
  }>
  headers?: Record<string, {
    $ref?: string
    description?: string
    required?: boolean
    deprecated?: boolean
    allowEmptyValue?: boolean
    schema?: SwaggerSchema
  }>
  links?: Record<string, {
    $ref?: string
    operationRef?: string
    operationId?: string
    parameters?: Record<string, any>
    requestBody?: any
    description?: string
    server?: {
      url: string
      description?: string
    }
  }>
}

export interface SwaggerParameter {
  $ref?: string
  name?: string
  in?: 'query' | 'header' | 'path' | 'cookie'
  required?: boolean
  description?: string
  deprecated?: boolean
  allowEmptyValue?: boolean
  style?: string
  explode?: boolean
  allowReserved?: boolean
  schema?: SwaggerSchema
  example?: any
  examples?: Record<string, {
    summary?: string
    description?: string
    value?: any
    externalValue?: string
  }>
}

export interface SwaggerApiKeySecurityScheme {
  type: 'apiKey'
  name: string
  in: 'query' | 'header' | 'cookie'
  description?: string
}

export interface SwaggerHttpSecurityScheme {
  type: 'http'
  scheme: 'basic' | 'bearer' | string
  bearerFormat?: string
  description?: string
}

export interface SwaggerOAuth2SecurityScheme {
  type: 'oauth2'
  flows: {
    implicit?: {
      authorizationUrl: string
      scopes: Record<string, string>
    }
    password?: {
      tokenUrl: string
      scopes: Record<string, string>
    }
    clientCredentials?: {
      tokenUrl: string
      scopes: Record<string, string>
    }
    authorizationCode?: {
      authorizationUrl: string
      tokenUrl: string
      refreshUrl?: string
      scopes: Record<string, string>
    }
  }
  description?: string
}

export interface SwaggerOpenIdConnectSecurityScheme {
  type: 'openIdConnect'
  openIdConnectUrl: string
  description?: string
}

export type SwaggerSecurityScheme =
  | SwaggerApiKeySecurityScheme
  | SwaggerHttpSecurityScheme
  | SwaggerOAuth2SecurityScheme
  | SwaggerOpenIdConnectSecurityScheme

export interface SwaggerOperation {
  tags?: string[]
  summary?: string
  description: string
  externalDocs?: {
    description?: string
    url: string
  }
  operationId?: string
  parameters?: SwaggerParameter[]
  requestBody?: SwaggerRequestBody
  responses: {
    [status in SwaggerHttpStatusCode]?: SwaggerResponse;
  }
  callbacks?: Record<string, Record<string, Record<string, any>>>
  deprecated?: boolean
  security?: Array<Record<string, string[]>>
  servers?: Array<{
    url: string
    description?: string
    variables?: Record<string, {
      default: string
      description?: string
      enum?: string[]
    }>
  }>
  // Adicionando visibilityKeys ao tipo SwaggerOperation
  visibilityKeys?: string[]
}

export interface SwaggerOpenAPIConfig {
  openapi?: string
  info: {
    title: string
    version: string
    description?: string
    termsOfService?: string
    contact?: {
      name?: string
      url?: string
      email?: string
    }
    license?: {
      name: string
      url: string
    }
  }
  servers?: Array<{
    url: string
    description?: string
    variables?: Record<string, {
      default: string
      description?: string
      enum?: string[]
    }>
  }>
  components?: {
    schemas?: Record<string, SwaggerSchema>
    responses?: Record<string, SwaggerResponse>
    parameters?: Record<string, SwaggerParameter>
    examples?: Record<string, {
      summary?: string
      description?: string
      value?: any
      externalValue?: string
    }>
    requestBodies?: Record<string, SwaggerRequestBody>
    headers?: Record<string, {
      description?: string
      required?: boolean
      deprecated?: boolean
      allowEmptyValue?: boolean
      schema?: SwaggerSchema
      example?: any
      examples?: Record<string, {
        summary?: string
        description?: string
        value?: any
        externalValue?: string
      }>
    }>
    securitySchemes?: Record<string, SwaggerSecurityScheme>
    links?: Record<string, {
      operationRef?: string
      operationId?: string
      parameters?: Record<string, any>
      requestBody?: any
      description?: string
      server?: {
        url: string
        description?: string
      }
    }>
    callbacks?: Record<string, Record<string, Record<string, any>>>
  }
  security?: Array<Record<string, string[]>>
  tags?: Array<{
    name: string
    description?: string
    externalDocs?: {
      description?: string
      url: string
    }
  }>
  externalDocs?: {
    description?: string
    url: string
  }
}

export interface SwaggerOpenAPIDocument extends Omit<SwaggerOpenAPIConfig, 'paths'> {
  openapi: string
  paths: Record<string, Record<string, SwaggerOperation>>
}

export interface SwaggerRouteBuilder {
  post: (options: SwaggerOperation) => SwaggerRouteBuilder
  put: (options: SwaggerOperation) => SwaggerRouteBuilder
  patch: (options: SwaggerOperation) => SwaggerRouteBuilder
  get: (options: SwaggerOperation) => SwaggerRouteBuilder
  delete: (options: SwaggerOperation) => SwaggerRouteBuilder
  options: (options: SwaggerOperation) => SwaggerRouteBuilder
}

export interface VkrunSwaggerBuilder {
  create: (config: SwaggerOpenAPIConfig) => this
  route: (path: string) => SwaggerRouteBuilder
  getConfig: () => SwaggerOpenAPIConfig & SwaggerOpenAPIDocument
  getDocument: () => string
  listen: (port: number, visibilityKeys: string[], callback?: () => Promise<void> | void) => void
}
