import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { isString, received } from '../../utils'

export const addMinLengthResults = ({
  value,
  valueName,
  minLength,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: ValidatorValue
  valueName: ValidatorValueName
  minLength: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const handleAddFailed = (messageError: string): void => {
    callbackAddFailed({
      method: 'minLength',
      type: 'invalid value',
      name: valueName,
      expect: 'string with characters greater than or equal to the limit',
      received: received(value),
      message: messageError
    })
  }

  if (isString(value)) {
    const exceededLimit = String(value).length < minLength
    if (exceededLimit) {
      const message = informativeMessage.validator.method.minLength.strict
      const messageError = message
        .replace('[valueName]', valueName)
        .replace('[minLength]', String(minLength))

      handleAddFailed(messageError)
      return this
    }
    callbackAddPassed({
      method: 'minLength',
      name: valueName,
      expect: 'string with characters greater than or equal to the limit',
      received: value
    })
  } else {
    const message = informativeMessage.validator.method.string.strict
    const messageError = message.replace('[valueName]', valueName)
    handleAddFailed(messageError)
  }
}
