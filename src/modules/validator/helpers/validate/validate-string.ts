import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { isString, received } from '../../../utils'

export const validateString = ({
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
  if (isString(value)) {
    callbackAddPassed({
      method: 'string',
      name: valueName,
      expect: 'string type',
      received: value
    })
  } else {
    const message = informativeMessage.string.invalidValue
    const messageError = message.replace('[valueName]', valueName)
    callbackAddFailed({
      method: 'string',
      type: 'invalid value',
      name: valueName,
      expect: 'string type',
      received: received(value),
      message: messageError
    })
  }
}
