import { SchemaValidateMethod } from '../../../../../types'
import { isBigInt, received } from '../../../../../utils'
import { informativeMessage } from '../../../location'

export const validateNegativeBigInt = (params: SchemaValidateMethod): void => {
  const {
    value,
    valueName,
    indexArray,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined
      ? 'array index must contain a bigint negative'
      : 'negative bigint',
    error: informativeMessage.bigInt.negative
      .replace('[valueName]', valueName)
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
  }

  if (isBigInt(value) && value < 0n) {
    callbackAddPassed({
      method: 'negative',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'negative',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
