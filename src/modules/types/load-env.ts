import { SchemaReturn } from './schema-types'

export interface LoadEnvOptions {
  path?: string | string[]
  encoding?: BufferEncoding
  override?: boolean
  debug?: boolean
  schema?: SchemaReturn
}
