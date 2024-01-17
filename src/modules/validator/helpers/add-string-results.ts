import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { isString, received } from '../../utils'

export const addStringResults = ({
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
  if (isString(value)) {
    callbackAddPassed({
      method: 'string',
      name: valueName,
      expect: 'string type',
      received: value
    })
  } else {
    const message = informativeMessage.validator.method.string.strict
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
