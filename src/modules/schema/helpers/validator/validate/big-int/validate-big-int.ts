import { SchemaErrorTest, SchemaSuccessTest } from '../../../../../types'
import { isBigInt, received } from '../../../../../utils'
import { informativeMessage } from '../../../location'

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
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in bigint type' : 'bigint type',
    error: informativeMessage.bigInt.invalidValue
      .replace('[value]', isBigInt(value) ? `${value}n` : String(value))
      .replace('[valueName]', valueName)
  }

  if (isBigInt(value)) {
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
      received: received(value),
      message: message.error
    })
  }
}
