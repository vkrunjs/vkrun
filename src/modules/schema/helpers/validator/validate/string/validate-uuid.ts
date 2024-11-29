import { SchemaOtherMethodConfig, SchemaValidateMethod, UUIDVersion } from '../../../../../types'
import { isString, isUUID, received } from '../../../../../utils'
import { informativeMessage } from '../../../location'

export const validateUuid = (
  params: SchemaValidateMethod & {
    config: SchemaOtherMethodConfig
    uuidVersion?: UUIDVersion
  }
): void => {
  const {
    value,
    valueName,
    indexArray,
    config,
    uuidVersion,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined ? 'array index in UUID format' : 'format UUID',
    error: isString(config?.errorMessage)
      ? config.errorMessage
        .replace('[value]', String(value))
        .replace('[valueName]', String(valueName))
      : informativeMessage.string.uuid
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
