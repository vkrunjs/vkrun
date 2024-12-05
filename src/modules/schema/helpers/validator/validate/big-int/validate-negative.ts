import { SchemaBigIntNegativeConfig, SchemaValidateMethod } from '../../../../../types'
import { isBigInt, isString, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateNegativeBigInt = (
  params: SchemaValidateMethod & {
    config: SchemaBigIntNegativeConfig
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
    expect: 'negative bigint',
    error: (isString(config?.message) ? config.message : getLocation().schema.bigInt.negative)
      .replace('[valueName]', valueName)
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
  }

  if (isBigInt(value) && value < 0n) {
    callbackAddPassed({
      method: 'negative',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'negative',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
