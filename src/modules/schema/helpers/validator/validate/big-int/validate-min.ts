import { SchemaValidateMethod } from '../../../../../types'
import { isBigInt, received } from '../../../../../utils'
import { informativeMessage } from '../../../location'

export const validateMinBigInt = (
  params: SchemaValidateMethod & {
    min: bigint
  }
): void => {
  const {
    value,
    valueName,
    min,
    indexArray,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined
      ? 'array index must contain a bigint greater than or equal to the reference'
      : 'value greater than or equal to the reference',
    error: informativeMessage.bigInt.min
      .replace('[valueName]', valueName)
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
      .replace('[min]', isBigInt(min) ? `${min}n` : String(min))
  }

  if (isBigInt(value) && value >= min) {
    callbackAddPassed({
      method: 'min',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'min',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
