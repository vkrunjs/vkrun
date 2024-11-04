import { SchemaErrorTest, SchemaSuccessTest, UUIDVersion } from '../../../../../types'
import { isUUID, received } from '../../../../../utils'
import { informativeMessage } from '../../../location'

export const validateUuid = ({
  value,
  valueName,
  uuidVersion,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  uuidVersion?: UUIDVersion
  indexArray: number
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in UUID format' : 'format UUID',
    error: informativeMessage.string.uuid
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isUUID(value, uuidVersion)) {
    callbackAddPassed({
      method: 'UUID',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'UUID',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
