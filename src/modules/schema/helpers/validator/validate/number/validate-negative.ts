import { SchemaValidateMethod } from '../../../../../types'
import { isNumber, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateNegativeNumber = (params: SchemaValidateMethod): void => {
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
    error: getLocation().schema.number.negative
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (isNumber(value) && value < 0) {
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
