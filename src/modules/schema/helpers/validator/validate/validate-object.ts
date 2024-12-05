import { getLocation } from '../../../../location'
import { SchemaObjectConfig, SchemaReturn, SchemaTests, SchemaValidateMethod } from '../../../../types'
import { isObject, isString, received } from '../../../../utils'

export const validateObject = (
  params: SchemaValidateMethod & {
    config: SchemaObjectConfig
    schema: Record<string, SchemaReturn>
    callbackUpdateTest: (test: SchemaTests) => void
  }
): void => {
  const {
    value,
    valueName,
    config,
    schema,
    callbackAddPassed,
    callbackUpdateTest,
    callbackAddFailed
  } = params

  const message = {
    expect: 'object type',
    error: (isString(config?.message) ? config.message : getLocation().schema.object)
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (isObject(value)) {
    callbackAddPassed({
      method: 'object',
      name: valueName,
      expect: message.expect,
      received: value
    })

    for (const [key, rule] of Object.entries(schema) as [string, any]) {
      callbackUpdateTest(rule.test(value[key], key))
    }
  } else {
    callbackAddFailed({
      method: 'object',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
