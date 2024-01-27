import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { isInteger, received } from '../../../../utils'

export const validateInteger = ({
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
  if (isInteger(value)) {
    callbackAddPassed({
      method: 'integer',
      name: valueName,
      expect: 'integer type',
      received: value
    })
  } else {
    const message = informativeMessage.number.integer
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'integer',
      type: 'invalid value',
      name: valueName,
      expect: 'integer type',
      received: received(value),
      message: messageError
    })
  }
}
