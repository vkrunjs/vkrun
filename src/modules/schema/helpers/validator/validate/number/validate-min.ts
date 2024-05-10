import { informativeMessage } from '../../../location'
import * as type from '../../../../../types'
import * as util from '../../../../../utils'

export const validateMinNumber = (
  params: type.ValidateMethod & {
    min: number | bigint
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
      ? 'array index must contain a number greater than or equal to the reference'
      : 'value greater than or equal to the reference',
    error: informativeMessage.number.min
      .replace('[valueName]', valueName)
      .replace('[value]', String(value))
      .replace('[min]', String(min))
  }

  if (util.isNumber(value) && value >= min) {
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
      received: util.received(value),
      message: message.error
    })
  }
}
