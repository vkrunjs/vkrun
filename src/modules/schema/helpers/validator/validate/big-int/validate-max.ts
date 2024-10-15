import { informativeMessage } from '../../../location'
import * as type from '../../../../../types'
import * as util from '../../../../../utils'

export const validateMaxBigInt = (
  params: type.ValidateMethod & {
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
      .replace('[value]', util.isBigInt(value) ? `${value}n` : String(value))
      .replace('[max]', util.isBigInt(max) ? `${max}n` : String(max))
  }

  if (util.isBigInt(value) && value <= max) {
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
      received: util.received(value),
      message: message.error
    })
  }
}
