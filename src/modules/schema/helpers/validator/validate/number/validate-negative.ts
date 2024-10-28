import { informativeMessage } from '../../../location'
import * as type from '../../../../../types'
import * as util from '../../../../../utils'

export const validateNegativeNumber = (params: type.ValidateMethod): void => {
  const {
    value,
    valueName,
    indexArray,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined
      ? 'array index must contain a number negative'
      : 'negative number',
    error: informativeMessage.number.negative
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (util.isNumber(value) && value < 0) {
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
      received: util.received(value),
      message: message.error
    })
  }
}
