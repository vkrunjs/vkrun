import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { isNotEmpty, received } from '../../utils'

export const validateRequired = ({
  value,
  valueName,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: ValidatorValue
  valueName: ValidatorValueName
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  if (isNotEmpty(value)) {
    callbackAddPassed({
      method: 'required',
      name: valueName,
      expect: 'value other than undefined, null or empty string',
      received: value
    })
  } else {
    const message = informativeMessage.validator.method.required.strict
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'required',
      type: 'missing value',
      name: valueName,
      expect: 'value other than undefined, null or empty string',
      received: received(value),
      message: messageError
    })
  }
}
