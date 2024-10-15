import { informativeMessage } from '../../../location'
import * as type from '../../../../../types'
import * as util from '../../../../../utils'

export const validateBigInt = ({
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
    expect: indexArray !== undefined ? 'array index in bigint type' : 'bigint type',
    error: informativeMessage.bigInt.invalidValue
      .replace('[value]', util.isBigInt(value) ? `${value}n` : String(value))
      .replace('[valueName]', valueName)
  }

  if (util.isBigInt(value)) {
    callbackAddPassed({
      method: 'bigInt',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'bigInt',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: util.received(value),
      message: message.error
    })
  }
}
