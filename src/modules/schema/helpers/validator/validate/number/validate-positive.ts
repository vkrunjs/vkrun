import { SchemaNumberPositiveConfig, SchemaValidateMethod } from '../../../../../types'
import { isNumber, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validatePositiveNumber = (
  params: SchemaValidateMethod & {
    config: SchemaNumberPositiveConfig
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
    expect: 'positive number',
    error: (isString(config?.message) ? config.message : getLocation().schema.number.positive)
      .replace('[value]', String(value))
      .replace('[valueName]', String(valueName))
  }

  if (isNumber(value) && value > 0) {
    callbackAddPassed({
      method: 'positive',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'positive',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
