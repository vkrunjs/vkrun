import { informativeMessage } from '../../../location'
import * as type from '../../../../../types'
import * as util from '../../../../../utils'

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
  callbackAddPassed: (success: type.SuccessTest) => void
  callbackAddFailed: (error: type.ErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in number type' : 'number type',
    error: informativeMessage.number.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (util.isNumber(value)) {
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
      received: util.received(value),
      message: message.error
    })
  }
}
