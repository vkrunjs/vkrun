import { SchemaValidateMethod } from '../../../../types'
import { notOneOf, received } from '../../../../utils'
import { informativeMessage } from '../../location'

export const validateNotOneOf = (
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

  if (notOneOf(value, comparisonItems)) {
    callbackAddPassed({
      method: 'notOneOf',
      name: valueName,
      expect: 'value does not match',
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'notOneOf',
      type: 'invalid value',
      name: valueName,
      expect: 'value does not match',
      received: received(value),
      message: informativeMessage.notOneOf
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
