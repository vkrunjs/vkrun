import { existsSync } from 'fs'
import { resolve } from 'path'
import { LoadEnvOptions } from '../types'
import { LoadEnvError } from '../errors'
import { isArray, isString } from '../utils'
import { parseEnvFile } from './helpers'

export const loadEnv = (options: LoadEnvOptions = {}): void => {
  const nodeEnv = process.env.NODE_ENV
  const defaultEnvPath = nodeEnv ? `.env.${nodeEnv}` : '.env'
  const envPath = options.path ?? resolve(process.cwd(), defaultEnvPath)
  const encoding = options.encoding ?? 'utf8'
  const override = options.override ?? true
  const debug = options.debug ?? false
  const schema = options.schema

  if (isString(envPath)) {
    if (existsSync(envPath)) {
      parseEnvFile(envPath, encoding, override, debug)
    } else if (debug) {
      console.warn(`loadEnv: file not found at ${envPath}`)
    }
  } else if (isArray(envPath)) {
    envPath.forEach((path) => {
      if (existsSync(path)) {
        parseEnvFile(path, encoding, override, debug)
      } else if (debug) {
        console.warn(`loadEnv: file not found at ${path}`)
      }
    })
  }

  if (schema) {
    const validatedEnvVars = schema.test(process.env, 'envVars')

    if (!validatedEnvVars.passedAll) {
      throw new LoadEnvError(validatedEnvVars.errors[0].message)
    }
  }

  if (debug) {
    console.log('env variables loaded successfully!\n', JSON.stringify(process.env, null, 2))
  }
}
