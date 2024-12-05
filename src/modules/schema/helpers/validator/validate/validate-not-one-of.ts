import { SchemaNotOneOfConfig, SchemaValidateMethod } from '../../../../types'
import { isString, notOneOf, received } from '../../../../utils'
import { getLocation } from '../../../../location'

export const validateNotOneOf = (
  params: SchemaValidateMethod & {
    comparisonItems: any[]
    config: SchemaNotOneOfConfig
  }
): void => {
  const {
    value,
    valueName,
    comparisonItems,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const message = {
    expect: 'value does not match',
    error: (isString(config?.message) ? config.message : getLocation().schema.notOneOf)
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (notOneOf(value, comparisonItems)) {
    callbackAddPassed({
      method: 'notOneOf',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'notOneOf',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
