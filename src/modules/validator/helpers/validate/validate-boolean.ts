import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { isBoolean, received } from '../../../utils'

export const validateBoolean = ({
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
  if (isBoolean(value)) {
    callbackAddPassed({
      method: 'boolean',
      name: valueName,
      expect: 'boolean type',
      received: value
    })
  } else {
    const message = informativeMessage.boolean.invalidValue
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'boolean',
      type: 'invalid value',
      name: valueName,
      expect: 'boolean type',
      received: received(value),
      message: messageError
    })
  }
}
