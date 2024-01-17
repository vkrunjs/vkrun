import { hasMethod, isArray, isObject } from '../../../utils'
import { SelectSchemaFormat } from '../../../types'
import { validateArray } from './validate-array'
import { validateObject } from './validate-object'

export const validateValue = async (params: SelectSchemaFormat): Promise<void> => {
  if (isObject(params.value)) {
    for (const [schemaKey, schemaRules] of Object.entries(params.schema)) {
      const paramsToValidate = {
        keyName: hasMethod(schemaRules.methods, 'alias')
          ? schemaRules.methods.find((rule: any) => rule.method === 'alias').alias
          : schemaKey,
        value: params.value[schemaKey],
        schemaRules: schemaRules.methods ?? schemaRules,
        callbackUpdateTest: params.callbackUpdateTest,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed,
        callbackValidateValue: params.callbackValidateValue
      }

      if (hasMethod(paramsToValidate.schemaRules, 'object')) {
        await validateObject(paramsToValidate)
      } else if (
        isArray(paramsToValidate.schemaRules) &&
        hasMethod(paramsToValidate.schemaRules, 'array')
      ) {
        await validateArray(paramsToValidate)
      } else {
        params.callbackUpdateTest(await schemaRules.validate(
          paramsToValidate.value,
          paramsToValidate.keyName
        ))
      }
    }
  }
}
