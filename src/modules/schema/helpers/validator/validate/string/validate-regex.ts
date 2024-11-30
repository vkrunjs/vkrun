import { getLocation } from '../../../../../location'
import { SchemaOtherMethodConfig, SchemaValidateMethod } from '../../../../../types'
import { received, regexMatch } from '../../../../../utils'

export const validateRegex = (
  params: SchemaValidateMethod & {
    regExp: RegExp
    config: SchemaOtherMethodConfig
  }
): void => {
  const {
    value,
    valueName,
    indexArray,
    regExp,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: indexArray !== undefined ? 'array index in value matches' : 'regex format',
    error: config?.errorMessage
      ? config.errorMessage
        .replace('[value]', String(value))
        .replace('[valueName]', valueName)
      : getLocation().schema.string.regex
        .replace('[value]', String(value))
        .replace('[valueName]', valueName)
  }

  if (regexMatch(value, regExp)) {
    callbackAddPassed({
      method: 'regex',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'regex',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
