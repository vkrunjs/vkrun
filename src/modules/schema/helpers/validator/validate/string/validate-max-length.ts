import { getLocation } from '../../../../../location'
import { SchemaStringMaxLengthConfig, SchemaValidateMethod } from '../../../../../types'
import { isString, received } from '../../../../../utils'

export const validateMaxLength = (
  params: SchemaValidateMethod & {
    config: SchemaStringMaxLengthConfig
  }
): void => {
  const {
    value,
    valueName,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  if (typeof config.max !== 'number' || config.max < 0) {
    console.error('vkrun-schema: maxLength method received invalid parameter!')
    throw Error('vkrun-schema: maxLength method received invalid parameter!')
  }

  const message = {
    expect: 'value with a length less than or equal to the limit',
    error: (isString(config?.message) ? config.message : getLocation().schema.string.maxLength)
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[maxLength]', String(config.max))
  }

  const exceededLimit = String(value).length > config.max

  if (exceededLimit) {
    callbackAddFailed({
      method: 'maxLength',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  } else {
    callbackAddPassed({
      method: 'maxLength',
      name: valueName,
      expect: message.expect,
      received: value
    })
  }
}
