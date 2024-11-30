import { getLocation } from '../../../../../location'
import { SchemaOtherMethodConfig, SchemaValidateMethod } from '../../../../../types'
import { isString, received } from '../../../../../utils'

export const validateString = (
  params: SchemaValidateMethod & {
    config: SchemaOtherMethodConfig
  }
): void => {
  const {
    value,
    valueName,
    indexArray,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined ? 'array index in string type' : 'string type',
    error: isString(config?.errorMessage)
      ? config.errorMessage
        .replace('[value]', String(value))
        .replace('[valueName]', String(valueName))
      : getLocation().schema.string.invalidValue
        .replace('[value]', String(value))
        .replace('[valueName]', String(valueName))
  }

  if (isString(value)) {
    callbackAddPassed({
      method: 'string',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'string',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      index: indexArray,
      message: message.error
    })
  }
}
