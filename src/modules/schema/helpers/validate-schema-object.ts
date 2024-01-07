import { hasMethod, isEmpty, isNotEmpty } from '../../utils'
import { ValidateMethodParams, ValidatePropertyRules } from '../../types'
import { callValidateMethod } from './call-validate-method'

export const validateSchemaObject = async (params: ValidateMethodParams): Promise<void> => {
  if (hasMethod(params.schemaRules, 'notRequired')) {
    params.callbackAddPassed({
      method: 'notRequired',
      name: params.keyName,
      expect: 'value is not required and of any type',
      received: params.value ?? 'undefined'
    })
    if (isNotEmpty(params.value)) {
      await params.callbackValidateObject(params.value, params.schemaRules[1].object)
    }
  }
  if (hasMethod(params.schemaRules, 'required')) {
    if (isEmpty(params.value)) {
      const requiredRules: ValidatePropertyRules = [{ method: 'required', private: true }]
      await callValidateMethod({ ...params, schemaRules: requiredRules })
      await params.callbackValidateObject({}, params.schemaRules[1].object)
    } else {
      await params.callbackValidateObject(params.value, params.schemaRules[1].object)
    }
  }
}
