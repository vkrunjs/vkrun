import { informativeMessage } from '../../../location'
import { hasMethod, isNotEmpty, isObject } from '../../../utils'
import { SelectSchemaFormat } from '../../../types'

export const schemaMethodObject = async (params: SelectSchemaFormat): Promise<void> => {
  if (hasMethod(params.schema, 'required')) {
    if (isNotEmpty(params.value)) {
      params.callbackAddPassed({
        class: 'create schema',
        method: 'required',
        name: 'validate schema',
        expect: 'object',
        received: params.value ?? 'undefined'
      })
    } else {
      const message = informativeMessage.schema.validateObject.notIsObject
      const messageError = message.replace('[valueName]', 'schema validate')
      params.callbackAddFailed({
        class: 'create schema',
        method: 'required',
        type: 'invalid param',
        name: 'validate schema',
        expect: 'object',
        received: params.value ?? 'undefined',
        message: messageError
      })
    }
  } else {
    params.callbackAddPassed({
      class: 'create schema',
      method: 'notRequired',
      name: 'validate schema',
      expect: 'value is not required and of type object',
      received: params.value ?? 'undefined'
    })
  }

  if (isNotEmpty(params.value) && isObject(params.value)) {
    await params.callbackValidateValue(params.value, params.schema[1].object)
  }
}
