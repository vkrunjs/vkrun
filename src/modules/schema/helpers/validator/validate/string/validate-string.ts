import { getLocation } from '../../../../../location'
import { SchemaStringConfig, SchemaValidateMethod } from '../../../../../types'
import { isString, received } from '../../../../../utils'

export const validateString = (
  params: SchemaValidateMethod & {
    config: SchemaStringConfig
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
    expect: 'string type',
    error: (isString(config?.message) ? config.message : getLocation().schema.string.invalidValue)
      .replace('[value]', String(value))
      .replace('[valueName]', String(valueName))
  }

  if (isString(value)) {
    callbackAddPassed({
      method: 'string',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'string',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
