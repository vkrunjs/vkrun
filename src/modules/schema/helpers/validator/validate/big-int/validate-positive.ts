import { SchemaBigIntPositiveConfig, SchemaValidateMethod } from '../../../../../types'
import { isBigInt, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validatePositiveBigInt = (
  params: SchemaValidateMethod & {
    config: SchemaBigIntPositiveConfig
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
    expect: 'positive bigint',
    error: (isString(config?.message) ? config.message : getLocation().schema.bigInt.positive)
      .replace('[valueName]', String(valueName))
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
  }

  if (isBigInt(value) && value > 0n) {
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
