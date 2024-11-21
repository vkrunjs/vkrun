import { informativeMessage } from '../../../location'
import { SchemaMethod, SchemaMethods, SchemaValidateMethod } from '../../../../../types'
import { isArray, isNumber, received } from '../../../../../utils'

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

  const arrayMethod = methods.find((filteredMethod: SchemaMethod) =>
    filteredMethod.method === 'array'
  )

  if (isArray(value)) {
    if (isNumber(arrayMethod?.min)) {
      if (value.length < arrayMethod.min) {
        callbackAddFailed({
          method: 'min',
          type: 'invalid value',
          name: valueName,
          expect: 'the list must have the minimum number of items',
          received: received(value),
          message: informativeMessage.array.min
            .replace('[valueName]', valueName)
            .replace('[min]', String(arrayMethod?.min))
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
