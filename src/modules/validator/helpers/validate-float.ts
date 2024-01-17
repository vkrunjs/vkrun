import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { isFloat, received } from '../../utils'

export const validateFloat = ({
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
  if (isFloat(value)) {
    callbackAddPassed({
      method: 'float',
      name: valueName,
      expect: 'number float type',
      received: value
    })
  } else {
    const message = informativeMessage.validator.method.float.strict
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'float',
      type: 'invalid value',
      name: valueName,
      expect: 'number float type',
      received: received(value),
      message: messageError
    })
  }
}
