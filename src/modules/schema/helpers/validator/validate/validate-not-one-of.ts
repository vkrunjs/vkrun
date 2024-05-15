import { informativeMessage } from '../../location'
import * as type from '../../../../types'
import * as util from '../../../../utils'

export const validateNotOneOf = (
  params: type.ValidateMethod & {
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

  if (util.notOneOf(value, comparisonItems)) {
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
      received: util.received(value),
      message: informativeMessage.notOneOf
    })
  }
}
