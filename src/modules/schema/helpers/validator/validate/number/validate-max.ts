import { SchemaValidateMethod } from '../../../../../types'
import { isNumber, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateMaxNumber = (
  params: SchemaValidateMethod & {
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
    error: getLocation().schema.number.max
      .replace('[valueName]', valueName)
      .replace('[value]', String(value))
      .replace('[max]', String(max))
  }

  if (isNumber(value) && value <= max) {
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
