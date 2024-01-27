import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { isString, received } from '../../../../utils'

export const validateMaxLength = ({
  value,
  valueName,
  maxLength,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  maxLength: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const handleAddFailed = (messageError: string): void => {
    callbackAddFailed({
      method: 'maxLength',
      type: 'invalid value',
      name: valueName,
      expect: 'value with a length less than or equal to the limit',
      received: received(value),
      message: messageError
    })
  }

  if (isString(value)) {
    const exceededLimit = String(value).length > maxLength
    if (exceededLimit) {
      const message = informativeMessage.string.maxLength
      const messageError = message
        .replace('[valueName]', valueName)
        .replace('[maxLength]', String(maxLength))

      handleAddFailed(messageError)
      return this
    }
    callbackAddPassed({
      method: 'maxLength',
      name: valueName,
      expect: 'value with a length less than or equal to the limit',
      received: value
    })
  } else {
    const message = informativeMessage.string.invalidValue
    const messageError = message.replace('[valueName]', valueName)
    handleAddFailed(messageError)
  }
}
