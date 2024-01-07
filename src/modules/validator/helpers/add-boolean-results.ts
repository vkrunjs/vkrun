import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { isBoolean, received } from '../../utils'

export const addBooleanResults = ({
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
  if (isBoolean(value)) {
    callbackAddPassed({
      method: 'boolean',
      name: valueName,
      expect: 'boolean type',
      received: value
    })
  } else {
    const message = informativeMessage.validator.method.boolean.strict
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
