import { SchemaNumberIntegerConfig, SchemaValidateMethod } from '../../../../../types'
import { isInteger, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateIntegerNumber = (
  params: SchemaValidateMethod & {
    config: SchemaNumberIntegerConfig
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
    expect: 'integer type',
    error: (isString(config?.message) ? config.message : getLocation().schema.number.integer)
      .replace('[value]', String(value))
      .replace('[valueName]', String(valueName))
  }

  if (isInteger(value)) {
    callbackAddPassed({
      method: 'integer',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'integer',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
