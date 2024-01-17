import { informativeMessage } from '../../../location'
import { hasMethod, received } from '../../../utils'
import { ValidateMethodParams } from '../../../types'
import { callValidatorMethod } from './call-validator-method'

export const validateArray = async (params: ValidateMethodParams): Promise<void> => {
  if ((hasMethod(params.schemaRules, 'notRequired'))) {
    params.callbackAddPassed({
      method: 'notRequired',
      name: params.keyName,
      expect: 'value is not required and of any type',
      received: received(params.value)
    })
  }

  if (Array.isArray(params.value)) {
    if (hasMethod(params.schemaRules, 'required')) {
      params.callbackAddPassed({
        method: 'array',
        name: params.keyName,
        expect: 'array',
        received: received(params.value)
      })
    }
    await callValidatorMethod(params)
  } else {
    if (hasMethod(params.schemaRules, 'required')) {
      const message = informativeMessage.schema.validateObject.notIsArray
      const messageError = message.replace('[keyName]', params.keyName)

      params.callbackAddFailed({
        method: 'array',
        type: 'invalid value',
        name: params.keyName,
        expect: 'array',
        received: received(params.value),
        message: messageError
      })
    }
  }
}
