import { getLocation } from '../../../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../types'
import { isFunction, received } from '../../../../utils'

export const validateFunction = ({
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
    expect: indexArray !== undefined ? 'array index in function type' : 'function type',
    error: getLocation().schema.function.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isFunction(value)) {
    callbackAddPassed({
      method: 'function',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'function',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
