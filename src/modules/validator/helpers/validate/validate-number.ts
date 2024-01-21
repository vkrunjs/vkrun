import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { isNumber, received } from '../../../utils'

export const validateNumber = ({
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
  if (isNumber(value)) {
    callbackAddPassed({
      method: 'number',
      name: valueName,
      expect: 'number type',
      received: value
    })
  } else {
    const message = informativeMessage.number.invalidValue
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'number',
      type: 'invalid value',
      name: valueName,
      expect: 'number type',
      received: received(value),
      message: messageError
    })
  }
}
