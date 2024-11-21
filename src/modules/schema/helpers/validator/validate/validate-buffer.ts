import { informativeMessage } from '../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../types'
import { isBuffer, received } from '../../../../utils'

export const validateBuffer = ({
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
    expect: indexArray !== undefined ? 'array index in buffer type' : 'buffer type',
    error: informativeMessage.buffer.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isBuffer(value)) {
    callbackAddPassed({
      method: 'buffer',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'buffer',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
