import { SchemaNumberMinConfig, SchemaValidateMethod } from '../../../../../types'
import { isNumber, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateMinNumber = (
  params: SchemaValidateMethod & {
    config: SchemaNumberMinConfig
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
    expect: 'value greater than or equal to the reference',
    error: (isString(config?.message) ? config.message : getLocation().schema.number.min)
      .replace('[valueName]', String(valueName))
      .replace('[value]', String(value))
      .replace('[min]', String(config.min))
  }

  if (isNumber(value) && value >= config.min) {
    callbackAddPassed({
      method: 'min',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'min',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
