import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../types'
import { received } from '../../../utils'
import { deepEqual } from '../../../utils/deep-equal'

export const validateEqual = ({
  value,
  valueToCompare,
  valueName,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueToCompare: any
  valueName: string
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  if (deepEqual(value, valueToCompare)) {
    callbackAddPassed({
      method: 'equal',
      name: valueName,
      expect: valueToCompare,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'equal',
      type: 'invalid value',
      name: valueName,
      expect: valueToCompare,
      received: received(value),
      message: informativeMessage.equal
    })
  }
}
