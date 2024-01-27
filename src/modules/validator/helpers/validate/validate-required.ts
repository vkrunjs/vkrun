import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { received } from '../../../utils'

export const validateRequired = ({
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
  if (value !== undefined) {
    callbackAddPassed({
      method: 'required',
      name: valueName,
      expect: 'value other than undefined',
      received: value
    })
  } else {
    const message = informativeMessage.required
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'required',
      type: 'missing value',
      name: valueName,
      expect: 'value other than undefined',
      received: received(value),
      message: messageError
    })
  }
}
