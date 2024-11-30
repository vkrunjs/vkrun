import { SchemaErrorTest, SchemaSuccessTest } from '../../../../../types'
import { isFloat, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

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
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in float type' : 'float type',
    error: getLocation().schema.number.float
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
