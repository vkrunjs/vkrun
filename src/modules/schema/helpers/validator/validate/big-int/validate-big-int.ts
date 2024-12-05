import { SchemaBigIntConfig, SchemaValidateMethod } from '../../../../../types'
import { isBigInt, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateBigInt = (
  params: SchemaValidateMethod & {
    config: SchemaBigIntConfig
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
    expect: 'bigint type',
    error: (isString(config?.message) ? config.message : getLocation().schema.bigInt.invalidValue)
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
      .replace('[valueName]', String(valueName))
  }

  if (isBigInt(value)) {
    callbackAddPassed({
      method: 'bigInt',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'bigInt',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
