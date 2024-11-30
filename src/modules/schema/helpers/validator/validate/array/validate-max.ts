import { getLocation } from '../../../../../location'
import { SchemaMethod, SchemaMethods, SchemaValidateMethod } from '../../../../../types'
import { isArray, isNumber, received } from '../../../../../utils'

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

  const arrayMethod = methods.find((filteredMethod: SchemaMethod) =>
    filteredMethod.method === 'array'
  )

  if (isArray(value)) {
    if (isNumber(arrayMethod?.max)) {
      if (value.length > arrayMethod.max) {
        callbackAddFailed({
          method: 'max',
          type: 'invalid value',
          name: valueName,
          expect: 'the list must have the maximum number of items',
          received: received(value),
          message: getLocation().schema.array.max
            .replace('[valueName]', valueName)
            .replace('[max]', String(arrayMethod?.max))
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
