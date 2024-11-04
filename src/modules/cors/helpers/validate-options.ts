import { isArray, isBoolean, isNumber, isObject, isString } from '../../utils'
import { CorsSetOptions } from '../../types'

export const validateOptions = (options: CorsSetOptions): void => {
  if (!isObject(options)) {
    throw new Error('vkrun-cors: Options must be an object.')
  }

  if (options.origin && !isString(options.origin) && !isArray(options.origin)) {
    throw new Error('vkrun-cors: The origin value must be a string or string array.')
  }

  if (options.methods && !isString(options.methods) && !isArray(options.methods)) {
    throw new Error('vkrun-cors: The methods value must be a string or string array.')
  }

  if (options.allowedHeaders && !isString(options.allowedHeaders)) {
    throw new Error('vkrun-cors: The allowedHeaders value must be a string.')
  }

  if (options.exposedHeaders && !isString(options.exposedHeaders)) {
    throw new Error('vkrun-cors: The exposedHeaders value must be a string.')
  }

  if (options.credentials && !isBoolean(options.credentials)) {
    throw new Error('vkrun-cors: The credentials value must be a boolean.')
  }

  if (options.maxAge && (!isNumber(options.maxAge) || options.maxAge < 0)) {
    throw new Error('vkrun-cors: The maxAge value must be a non-negative number.')
  }
}
