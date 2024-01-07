import { isNotEmpty } from '../../utils'
import { ValidateMethodParams, ValidatePropertyRule } from '../../types'
import { callValidateMethod } from './call-validate-method'

export const validateSchemaNotRequired = async (params: ValidateMethodParams): Promise<void> => {
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
    await callValidateMethod({ ...params, schemaRules: newSchemaRules })
  }
}
