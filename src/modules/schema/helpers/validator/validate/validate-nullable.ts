import { getLocation } from '../../../../location'
import { isString, received } from '../../../../utils'
import { SchemaMethod, SchemaMethods, SchemaNullableConfig, SchemaValidateMethod } from '../../../../types'

export const validateNullable = (
  params: SchemaValidateMethod & {
    methods: SchemaMethods
  }
): void => {
  const {
    value,
    valueName,
    methods,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const config = methods.find((filteredMethod: SchemaMethod) =>
    filteredMethod.method === 'nullable'
  )?.config as SchemaNullableConfig

  if (value === undefined) {
    callbackAddFailed({
      method: 'nullable',
      type: 'invalid value',
      name: valueName,
      expect: 'the value can be null, but other than undefined',
      received: received(value),
      message: (isString(config?.message) ? config.message : getLocation().schema.nullable)
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  } else {
    callbackAddPassed({
      method: 'nullable',
      name: valueName,
      expect: 'the value can be null, but other than undefined',
      received: received(value)
    })
  }
}
