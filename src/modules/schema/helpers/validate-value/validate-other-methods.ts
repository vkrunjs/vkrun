import { ValidateMethodParams, ValidatePropertyRule, ValidatePropertyRules } from '../../../types'
import { hasMethod, isNotEmpty } from '../../../utils'
import { callValidatorMethod } from './call-validator-method'

export const validateOtherMethods = async (params: ValidateMethodParams): Promise<void> => {
  if (hasMethod(params.schemaRules, 'notRequired')) {
    params.callbackAddPassed({
      method: 'notRequired',
      name: params.keyName,
      expect: 'value is not required and of any type',
      received: params.value ?? 'undefined'
    })

    if (isNotEmpty(params.value)) {
      const newSchemaRules = params.schemaRules.filter(
        (rule: ValidatePropertyRule) => rule.method !== 'notRequired'
      )
      await callValidatorMethod({ ...params, schemaRules: newSchemaRules })
    }
  } else {
    const requiredRules: ValidatePropertyRules = [{ method: 'required', private: true }]
    await callValidatorMethod({ ...params, schemaRules: requiredRules })
    await callValidatorMethod(params)
  }
}
