import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { received } from '../../../../utils'
import { isEqual } from '../../../../utils/is-equal'

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
  if (isEqual(value, valueToCompare)) {
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
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
