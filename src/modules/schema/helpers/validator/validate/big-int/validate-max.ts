import { SchemaValidateMethod } from '../../../../../types'
import { isBigInt, received } from '../../../../../utils'
import { informativeMessage } from '../../../location'

export const validateMaxBigInt = (
  params: SchemaValidateMethod & {
    max: bigint
  }
): void => {
  const {
    value,
    valueName,
    max,
    indexArray,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined
      ? 'array index must contain a bigint less than or equal to the reference'
      : 'value less than or equal to the reference',
    error: informativeMessage.bigInt.max
      .replace('[valueName]', valueName)
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
      .replace('[max]', isBigInt(max) ? `${max}n` : String(max))
  }

  if (isBigInt(value) && value <= max) {
    callbackAddPassed({
      method: 'max',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'max',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
