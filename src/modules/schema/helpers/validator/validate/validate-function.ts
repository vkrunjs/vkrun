import { getLocation } from '../../../../location'
import { SchemaFunctionConfig, SchemaValidateMethod } from '../../../../types'
import { isFunction, isString, received } from '../../../../utils'

export const validateFunction = (
  params: SchemaValidateMethod & {
    config: SchemaFunctionConfig
  }
): void => {
  const {
    value,
    valueName,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: 'function type',
    error: (isString(config?.message) ? config.message : getLocation().schema.function.invalidValue)
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isFunction(value)) {
    callbackAddPassed({
      method: 'function',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'function',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
