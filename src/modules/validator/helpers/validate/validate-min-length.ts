import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { isString, received } from '../../../utils'

export const validateMinLength = ({
  value,
  valueName,
  minLength,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  minLength: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const handleAddFailed = (messageError: string): void => {
    callbackAddFailed({
      method: 'minLength',
      type: 'invalid value',
      name: valueName,
      expect: 'value with a length greater than or equal to the limit',
      received: received(value),
      message: messageError
    })
  }

  if (isString(value)) {
    const exceededLimit = String(value).length < minLength
    if (exceededLimit) {
      const message = informativeMessage.minLength.invalidValue
      const messageError = message
        .replace('[valueName]', valueName)
        .replace('[minLength]', String(minLength))

      handleAddFailed(messageError)
      return this
    }
    callbackAddPassed({
      method: 'minLength',
      name: valueName,
      expect: 'value with a length greater than or equal to the limit',
      received: value
    })
  } else {
    const message = informativeMessage.string.invalidValue
    const messageError = message.replace('[valueName]', valueName)
    handleAddFailed(messageError)
  }
}
