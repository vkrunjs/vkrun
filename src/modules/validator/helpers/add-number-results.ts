import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { isNumber, received } from '../../utils'

export const addNumberResults = ({
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
  if (isNumber(value)) {
    callbackAddPassed({
      method: 'number',
      name: valueName,
      expect: 'number type',
      received: value
    })
  } else {
    const message = informativeMessage.validator.method.number.strict
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
