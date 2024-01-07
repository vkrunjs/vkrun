import { informativeMessage } from '../../location'
import { hasMethod } from '../../utils'
import { ValidateMethodParams } from '../../types'
import { callValidateMethod } from './call-validate-method'

export const validateSchemaArray = async (params: ValidateMethodParams): Promise<void> => {
  if ((hasMethod(params.schemaRules, 'notRequired'))) {
    params.callbackAddPassed({
      method: 'notRequired',
      name: params.keyName,
      expect: 'value is not required and of any type',
      received: params.value ?? 'undefined'
    })
  }

  if (Array.isArray(params.value)) {
    await callValidateMethod(params)
  } else {
    if (hasMethod(params.schemaRules, 'required')) {
      const message = informativeMessage.schema.validateObject.notIsArray
      const messageError = message.replace('[keyName]', params.keyName)

      params.callbackAddFailed({
        method: 'array',
        type: 'invalid value',
        name: params.keyName,
        expect: 'array',
        received: typeof params.value,
        message: messageError
      })
    }
  }
}
