import { getLocation } from '../../../../../location'
import { SchemaArrayMaxConfig, SchemaMethod, SchemaMethods, SchemaValidateMethod } from '../../../../../types'
import { isArray, isNumber, isString, received } from '../../../../../utils'

export const validateMaxArray = (
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
    filteredMethod.method === 'max'
  )?.config as SchemaArrayMaxConfig

  if (isArray(value)) {
    if (isNumber(config?.max)) {
      if (value.length > config.max) {
        callbackAddFailed({
          method: 'max',
          type: 'invalid value',
          name: valueName,
          expect: 'the list must have the maximum number of items',
          received: received(value),
          message: (isString(config?.message) ? config.message : getLocation().schema.array.max)
            .replace('[valueName]', String(valueName))
            .replace('[value]', isArray(value) ? JSON.stringify(value) : String(value))
            .replace('[max]', String(config?.max))
        })
      } else {
        callbackAddPassed({
          method: 'max',
          name: valueName,
          expect: 'the list must have the maximum number of items',
          received: received(value)
        })
      }
    }
  }
}
