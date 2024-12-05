import { SchemaBigIntMaxConfig, SchemaValidateMethod } from '../../../../../types'
import { isBigInt, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateMaxBigInt = (
  params: SchemaValidateMethod & {
    config: SchemaBigIntMaxConfig
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
    expect: 'value less than or equal to the reference',
    error: (isString(config?.message) ? config.message : getLocation().schema.bigInt.max)
      .replace('[valueName]', String(valueName))
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
      .replace('[max]', isBigInt(config.max) ? `${config.max}n` : String(config.max))
  }

  if (isBigInt(value) && value <= config.max) {
    callbackAddPassed({
      method: 'max',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'max',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
