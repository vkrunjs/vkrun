import { SchemaValidateMethod } from '../../../../types'
import { isNotEqual, received } from '../../../../utils'
import { getLocation } from '../../../../location'

export const validateNotEqual = (
  params: SchemaValidateMethod & {
    valueToCompare: any
  }
): void => {
  const {
    value,
    valueName,
    valueToCompare,
    callbackAddPassed,
    callbackAddFailed
  } = params

  if (isNotEqual(value, valueToCompare)) {
    callbackAddPassed({
      method: 'notEqual',
      name: valueName,
      expect: valueToCompare,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'notEqual',
      type: 'invalid value',
      name: valueName,
      expect: valueToCompare,
      received: received(value),
      message: getLocation().schema.notEqual
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
