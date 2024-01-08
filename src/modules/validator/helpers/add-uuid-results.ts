import { informativeMessage } from '../../location'
import { ErrorTest, SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { received } from '../../utils'

export const addUuidResults = ({
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
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const isUuid = uuidRegex.test(String(value))

  if (isUuid) {
    callbackAddPassed({
      method: 'uuid',
      name: valueName,
      expect: 'uuid format',
      received: value
    })
  } else {
    const message = informativeMessage.validator.method.uuid.strict
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'uuid',
      type: 'invalid value',
      name: valueName,
      expect: 'uuid format',
      received: received(value),
      message: messageError
    })
  }
}
