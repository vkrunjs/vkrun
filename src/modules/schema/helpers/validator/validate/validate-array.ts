import { informativeMessage } from '../../location'
import { SchemaErrorTest, SchemaMethod, SchemaMethods, SchemaSuccessTest } from '../../../../types'
import { isArray, received } from '../../../../utils'

export const validateArray = ({
  value,
  valueName,
  methods,
  validateOtherMethods,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  methods: SchemaMethods
  validateOtherMethods: (rule: any, value: any, index: number) => void
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  if (isArray(value)) {
    const arrayMethod = methods.find((filteredMethod: SchemaMethod) =>
      filteredMethod.method === 'array'
    )

    if (arrayMethod?.min !== undefined) {
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

    if (arrayMethod?.max !== undefined) {
      if (value.length > arrayMethod.max) {
        callbackAddFailed({
          method: 'max',
          type: 'invalid value',
          name: valueName,
          expect: 'the list must have the maximum number of items',
          received: received(value),
          message: informativeMessage.array.max
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

    callbackAddPassed({
      method: 'array',
      name: valueName,
      expect: 'array type',
      received: received(value)
    })

    const methodsWithoutArray = methods.filter((filteredMethod: SchemaMethod) =>
      filteredMethod.method !== 'array'
    )

    value.forEach((indexValue: any, index: number) => {
      methodsWithoutArray.forEach(rule => {
        validateOtherMethods(rule, indexValue, index)
      })
    })
  } else {
    callbackAddFailed({
      method: 'array',
      type: 'invalid value',
      name: valueName,
      expect: 'array type',
      received: received(value),
      message: informativeMessage.array.invalidValue
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
