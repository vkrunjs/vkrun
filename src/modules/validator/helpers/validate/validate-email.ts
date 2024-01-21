import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { received } from '../../../utils'

export const validateEmail = ({
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
  const regEmail = /^[a-zA-Z0-9_.+-]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  const emailFormatIsValid = regEmail.test(String(value))
  if (emailFormatIsValid) {
    callbackAddPassed({
      method: 'email',
      name: valueName,
      expect: 'valid email',
      received: value
    })
  } else {
    const message = informativeMessage.email.invalidValue
    const messageError = message.replace('[value]', String(value))

    callbackAddFailed({
      method: 'email',
      type: 'invalid value',
      name: valueName,
      expect: 'valid email',
      received: received(value),
      message: messageError
    })
  }
}
