import { getLocation } from '../../../../../location'
import { SchemaArrayMinConfig, SchemaMethod, SchemaMethods, SchemaValidateMethod } from '../../../../../types'
import { isArray, isNumber, isString, received } from '../../../../../utils'

export const validateMinArray = (
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
    filteredMethod.method === 'min'
  )?.config as SchemaArrayMinConfig

  if (isArray(value)) {
    if (isNumber(config?.min)) {
      if (value.length < config.min) {
        callbackAddFailed({
          method: 'min',
          type: 'invalid value',
          name: valueName,
          expect: 'the list must have the minimum number of items',
          received: received(value),
          message: (isString(config?.message) ? config.message : getLocation().schema.array.min)
            .replace('[valueName]', String(valueName))
            .replace('[value]', isArray(value) ? JSON.stringify(value) : String(value))
            .replace('[min]', String(config?.min))
        })
      } else {
        callbackAddPassed({
          method: 'min',
          name: valueName,
          expect: 'the list must have the minimum number of items',
          received: received(value)
        })
      }
    }
  }
}
