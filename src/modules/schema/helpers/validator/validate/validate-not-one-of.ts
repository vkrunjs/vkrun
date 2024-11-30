import { SchemaValidateMethod } from '../../../../types'
import { notOneOf, received } from '../../../../utils'
import { getLocation } from '../../../../location'

export const validateNotOneOf = (
  params: SchemaValidateMethod & {
    comparisonItems: any[]
  }
): void => {
  const {
    value,
    valueName,
    indexArray,
    comparisonItems,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined ? 'array index in value does not match' : 'value does not match',
    error: getLocation().schema.notOneOf
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (notOneOf(value, comparisonItems)) {
    callbackAddPassed({
      method: 'notOneOf',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'notOneOf',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
