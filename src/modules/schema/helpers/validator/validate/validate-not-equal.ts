import { informativeMessage } from '../../location'
import * as type from '../../../../types'
import * as util from '../../../../utils'

export const validateNotEqual = (
  params: type.ValidateMethod & {
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

  if (util.isNotEqual(value, valueToCompare)) {
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
      received: util.received(value),
      message: informativeMessage.notEqual
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
