import { SchemaErrorTest, SchemaSuccessTest } from '../../../../../types'
import { isInteger, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateIntegerNumber = ({
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
    expect: indexArray !== undefined ? 'array index in integer type' : 'integer type',
    error: getLocation().schema.number.integer
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isInteger(value)) {
    callbackAddPassed({
      method: 'integer',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'integer',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
