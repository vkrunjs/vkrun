import { SchemaValidateMethod } from '../../../../../types'
import { isNumber, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateMinNumber = (
  params: SchemaValidateMethod & {
    min: number
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
    error: getLocation().schema.number.min
      .replace('[valueName]', valueName)
      .replace('[value]', String(value))
      .replace('[min]', String(min))
  }

  if (isNumber(value) && value >= min) {
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
