import { informativeMessage } from '../../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../../types'
import { isEmail, received } from '../../../../../utils'

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
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in email format' : 'email format',
    error: informativeMessage.string.email
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isEmail(value)) {
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
