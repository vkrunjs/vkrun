import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { isFloat, received } from '../../../../utils'

export const validateFloat = ({
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
    expect: indexArray !== undefined ? 'array index in float type' : 'float type',
    error: informativeMessage.number.float
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isFloat(value)) {
    callbackAddPassed({
      method: 'float',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'float',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
