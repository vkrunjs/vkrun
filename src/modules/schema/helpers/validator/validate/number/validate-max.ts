import { informativeMessage } from '../../../location'
import * as type from '../../../../../types'
import * as util from '../../../../../utils'

export const validateMaxNumber = (
  params: type.ValidateMethod & {
    max: number
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
      ? 'array index must contain a number less than or equal to the reference'
      : 'value less than or equal to the reference',
    error: informativeMessage.number.max
      .replace('[valueName]', valueName)
      .replace('[value]', String(value))
      .replace('[max]', String(max))
  }
  console.log({ value, max })
  console.log('util.isNumber(value)', util.isNumber(value))
  console.log('value <= max', value <= max)
  if (util.isNumber(value) && value <= max) {
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
