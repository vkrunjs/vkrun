import { getLocation } from '../../../../../location'
import { SchemaErrorTest, SchemaMethod, SchemaMethods, SchemaSuccessTest } from '../../../../../types'
import { isArray, received } from '../../../../../utils'

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
      message: getLocation().schema.array.invalidValue
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
