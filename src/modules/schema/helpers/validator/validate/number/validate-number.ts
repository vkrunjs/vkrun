import { SchemaNumberConfig, SchemaValidateMethod } from '../../../../../types'
import { isNumber, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateNumber = (
  params: SchemaValidateMethod & {
    config: SchemaNumberConfig
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
    expect: 'number type',
    error: (isString(config?.message) ? config.message : getLocation().schema.number.invalidValue)
      .replace('[value]', String(value))
      .replace('[valueName]', String(valueName))
  }

  if (isNumber(value)) {
    callbackAddPassed({
      method: 'number',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'number',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
