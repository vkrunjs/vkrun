import { informativeMessage } from '../../../location'
import { hasMethod, isArray, isNotEmpty } from '../../../utils'
import { SelectSchemaFormat } from '../../../types'

export const schemaMethodObjectArray = async (params: SelectSchemaFormat): Promise<void> => {
  if (hasMethod(params.schema, 'required')) {
    if (isNotEmpty(params.value)) {
      params.callbackAddPassed({
        class: 'create schema',
        method: 'required',
        name: 'validate schema',
        expect: 'array of objects',
        received: params.value ?? 'undefined'
      })
    } else {
      const message = informativeMessage.schema.validateObject.notIsArray
      const messageError = message.replace('[keyName]', 'schema validate')
      params.callbackAddFailed({
        class: 'create schema',
        method: 'required',
        type: 'invalid param',
        name: 'validate schema',
        expect: 'array of objects',
        received: params.value ?? 'undefined',
        message: messageError
      })
    }
  } else {
    params.callbackAddPassed({
      class: 'create schema',
      method: 'notRequired',
      name: 'validate schema',
      expect: 'value is not required and of type object array',
      received: params.value ?? 'undefined'
    })
  }

  if (isArray(params.value)) {
    params.value.forEach(async (object: any) => {
      await params.callbackValidateValue(object, params.schema[1].arrayRules)
    })
  } else {
    const message = informativeMessage.schema.validateObject.notIsArray
    const messageError = message.replace('[keyName]', 'schema validate')
    params.callbackAddFailed({
      class: 'create schema',
      type: 'invalid param',
      name: 'validate schema',
      expect: 'array of objects',
      received: params.value ?? 'undefined',
      message: messageError
    })
  }
}
