import { informativeMessage } from '../../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../../types'
import { isString, received } from '../../../../../utils'

export const validateString = ({
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
    expect: indexArray !== undefined ? 'array index in string type' : 'string type',
    error: informativeMessage.string.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', String(valueName))
  }

  if (isString(value)) {
    callbackAddPassed({
      method: 'string',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'string',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      index: indexArray,
      message: message.error
    })
  }
}
