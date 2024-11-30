import { getLocation } from '../../../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../types'
import { isBoolean, received } from '../../../../utils'

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
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in boolean type' : 'boolean type',
    error: getLocation().schema.boolean.invalidValue
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
