import { SchemaErrorTest, SchemaSuccessTest } from '../../../../../types'
import { isNumber, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

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
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in number type' : 'number type',
    error: getLocation().schema.number.invalidValue
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
