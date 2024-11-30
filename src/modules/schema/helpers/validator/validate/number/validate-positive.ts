import { SchemaValidateMethod } from '../../../../../types'
import { isNumber, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validatePositiveNumber = (params: SchemaValidateMethod): void => {
  const {
    value,
    valueName,
    indexArray,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined
      ? 'array index must contain a number positive'
      : 'positive number',
    error: getLocation().schema.number.positive
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (isNumber(value) && value > 0) {
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
