import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../types'
import { isBoolean, received } from '../../../utils'

export const validateBoolean = ({
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
    expect: indexArray !== undefined ? 'array index in boolean type' : 'boolean type',
    error: informativeMessage.boolean.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isBoolean(value)) {
    callbackAddPassed({
      method: 'boolean',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'boolean',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
