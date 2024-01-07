import { ValidateMethodParams, ValidatePropertyRules } from '../../types'
import { callValidateMethod } from './call-validate-method'

export const validateSchemaOtherMethods = async (params: ValidateMethodParams): Promise<void> => {
  const requiredRules: ValidatePropertyRules = [{ method: 'required', private: true }]
  await callValidateMethod({ ...params, schemaRules: requiredRules })
  await callValidateMethod(params)
}
