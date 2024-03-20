import * as util from '../../utils'
import * as type from '../../types'

export const validateOptions = (options: type.SetCorsOptions): void => {
  if (!util.isObject(options)) {
    throw new Error('vkrun-cors: Options must be an object.')
  }

  if (options.origin && !util.isString(options.origin) && !util.isArray(options.origin)) {
    throw new Error('vkrun-cors: The origin value must be a string or string array.')
  }

  if (options.methods && !util.isString(options.methods) && !util.isArray(options.methods)) {
    throw new Error('vkrun-cors: The methods value must be a string or string array.')
  }

  if (options.allowedHeaders && !util.isString(options.allowedHeaders)) {
    throw new Error('vkrun-cors: The allowedHeaders value must be a string.')
  }

  if (options.exposedHeaders && !util.isString(options.exposedHeaders)) {
    throw new Error('vkrun-cors: The exposedHeaders value must be a string.')
  }

  if (options.credentials && !util.isBoolean(options.credentials)) {
    throw new Error('vkrun-cors: The credentials value must be a boolean.')
  }

  if (options.maxAge && (!util.isNumber(options.maxAge) || options.maxAge < 0)) {
    throw new Error('vkrun-cors: The maxAge value must be a non-negative number.')
  }
}
