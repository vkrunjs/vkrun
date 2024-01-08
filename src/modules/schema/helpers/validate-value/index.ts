import { hasMethod, isObject } from '../../../utils'
import { SelectSchemaFormat } from '../../../types'
import { validateArray } from './validate-array'
import { validateObject } from './validate-object'
import { validateOtherMethods } from './validate-other-methods'

export const validateValue = async (params: SelectSchemaFormat): Promise<void> => {
  if (isObject(params.value)) {
    for (const [schemaKey, schemaRules] of Object.entries(params.schema)) {
      const valueToValidate = params.value[schemaKey]
      const paramsToValidate = {
        keyName: hasMethod(schemaRules, 'alias')
          ? schemaRules.find((rule: any) => rule.method === 'alias').alias
          : schemaKey,
        value: valueToValidate,
        schemaRules,
        callbackUpdateTest: params.callbackUpdateTest,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed,
        callbackValidateValue: params.callbackValidateValue
      }

      if (hasMethod(schemaRules, 'object')) {
        await validateObject(paramsToValidate)
      } else if (hasMethod(schemaRules, 'array')) {
        await validateArray(paramsToValidate)
      } else {
        await validateOtherMethods(paramsToValidate)
      }
    }
  }
}
