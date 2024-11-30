import { SchemaReturn, SchemaValidateMethod } from '../../../../types'
import { oneOf, received } from '../../../../utils'
import { getLocation } from '../../../../location'

export const validateOneOf = (
  params: SchemaValidateMethod & {
    comparisonItems: SchemaReturn[] | any[]
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
    expect: indexArray !== undefined ? 'array index in value matches' : 'value matches',
    error: getLocation().schema.oneOf
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (oneOf(value, comparisonItems)) {
    callbackAddPassed({
      method: 'oneOf',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'oneOf',
      type: 'invalid value',
      name: valueName,
      expect: 'value matches',
      received: received(value),
      message: message.error
    })
  }
}
