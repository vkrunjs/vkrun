import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { isFloat, received } from '../../../utils'

export const validateFloat = ({
  value,
  valueName,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  if (isFloat(value)) {
    callbackAddPassed({
      method: 'float',
      name: valueName,
      expect: 'float type',
      received: value
    })
  } else {
    const message = informativeMessage.float.invalidValue
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'float',
      type: 'invalid value',
      name: valueName,
      expect: 'float type',
      received: received(value),
      message: messageError
    })
  }
}
