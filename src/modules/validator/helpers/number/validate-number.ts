import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { isNumber, received } from '../../../utils'

export const validateNumber = ({
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
  const message = {
    expect: indexArray !== undefined ? 'array index in number type' : 'number type',
    error: informativeMessage.number.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isNumber(value)) {
    callbackAddPassed({
      method: 'number',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'number',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
