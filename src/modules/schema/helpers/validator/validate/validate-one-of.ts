import { informativeMessage } from '../../location'
import * as type from '../../../../types'
import * as util from '../../../../utils'

export const validateOneOf = (
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

  if (util.oneOf(value, comparisonItems)) {
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
      received: util.received(value),
      message: informativeMessage.oneOf
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
