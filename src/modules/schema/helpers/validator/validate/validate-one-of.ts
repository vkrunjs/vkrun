import { SchemaValidateMethod } from '../../../../types'
import { oneOf, received } from '../../../../utils'
import { informativeMessage } from '../../location'

export const validateOneOf = (
  params: SchemaValidateMethod & {
    comparisonItems: any[]
  }
): void => {
  const {
    value,
    valueName,
    comparisonItems,
    callbackAddPassed,
    callbackAddFailed
  } = params

  if (oneOf(value, comparisonItems)) {
    callbackAddPassed({
      method: 'oneOf',
      name: valueName,
      expect: 'value matches',
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'oneOf',
      type: 'invalid value',
      name: valueName,
      expect: 'value matches',
      received: received(value),
      message: informativeMessage.oneOf
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
