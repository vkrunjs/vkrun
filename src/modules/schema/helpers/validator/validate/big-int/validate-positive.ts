import { SchemaValidateMethod } from '../../../../../types'
import { isBigInt, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validatePositiveBigInt = (params: SchemaValidateMethod): void => {
  const {
    value,
    valueName,
    indexArray,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined
      ? 'array index must contain a bigint positive'
      : 'positive bigint',
    error: getLocation().schema.bigInt.positive
      .replace('[valueName]', valueName)
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
  }

  if (isBigInt(value) && value > 0n) {
    callbackAddPassed({
      method: 'positive',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'positive',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
