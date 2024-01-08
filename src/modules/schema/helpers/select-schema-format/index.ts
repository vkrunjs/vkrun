import { informativeMessage } from '../../../location'
import { hasMethod, isArray, isObject } from '../../../utils'
import { SelectSchemaFormat } from '../../../types'
import { schemaMethodObjectArray } from './schema-method-object-array'
import { validateValue } from '../validate-value'
import { schemaMethodObject } from './schema-method-object'

export const selectSchemaFormat = async (params: SelectSchemaFormat): Promise<void> => {
  const isObjectArray = isArray(params.schema) && hasMethod(params.schema, 'array') && params.schema[1].arrayType === 'object'
  const isMethodObject = isArray(params.schema) && hasMethod(params.schema, 'object') && isObject(params.schema[1].object)

  if (isObject(params.schema)) await validateValue(params)
  else if (isObjectArray) await schemaMethodObjectArray(params)
  else if (isMethodObject) await schemaMethodObject(params)
  else {
    params.callbackAddFailed({
      class: 'create schema',
      type: 'invalid param',
      name: 'create schema',
      expect: 'valid schema',
      received: params.schema ?? 'undefined',
      message: informativeMessage.schema.constructorParams.schema
    })
  }
}
