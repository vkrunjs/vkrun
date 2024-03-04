import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { received } from '../../../../utils'

export const validateEmail = ({
  value,
  valueName,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  indexArray: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const message = {
    expect: indexArray !== undefined ? 'array index in email format' : 'email format',
    error: informativeMessage.string.email
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  const emailFormatIsValid = regEmail.test(String(value))
  if (emailFormatIsValid) {
    callbackAddPassed({
      method: 'email',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'email',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
