import { SchemaStringUUIDConfig, SchemaValidateMethod } from '../../../../../types'
import { isString, isUUID, received } from '../../../../../utils'
import { getLocation } from '../../../../../location'

export const validateUUID = (
  params: SchemaValidateMethod & {
    config: SchemaStringUUIDConfig
  }
): void => {
  const {
    value,
    valueName,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: 'format UUID',
    error: (isString(config?.message) ? config.message : getLocation().schema.string.uuid)
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isUUID(value, config?.version)) {
    callbackAddPassed({
      method: 'UUID',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'UUID',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
