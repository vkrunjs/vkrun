import { informativeMessage } from '../../../location'
import * as type from '../../../../../types'
import * as util from '../../../../../utils'

export const validateFloatNumber = ({
  value,
  valueName,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  indexArray: number
  callbackAddPassed: (success: type.SuccessTest) => void
  callbackAddFailed: (error: type.ErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in float type' : 'float type',
    error: informativeMessage.number.float
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (util.isFloat(value)) {
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
      received: util.received(value),
      message: message.error
    })
  }
}
