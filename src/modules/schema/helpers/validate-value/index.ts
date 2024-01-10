import { hasMethod, isObject } from '../../../utils'
import { SelectSchemaFormat } from '../../../types'
import { validateArray } from './validate-array'
import { validateObject } from './validate-object'
import { validateOtherMethods } from './validate-other-methods'

export const validateValue = async (params: SelectSchemaFormat): Promise<void> => {
  if (isObject(params.value)) {
    const validatePromises = []

    for (const [schemaKey, schemaRules] of Object.entries(params.schema)) {
      const paramsToValidate = {
        keyName: hasMethod(schemaRules, 'alias')
          ? schemaRules.find((rule: any) => rule.method === 'alias').alias
          : schemaKey,
        value: params.value[schemaKey],
        schemaRules,
        callbackUpdateTest: params.callbackUpdateTest,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed,
        callbackValidateValue: params.callbackValidateValue
      }

      let promise

      if (hasMethod(schemaRules, 'object')) {
        promise = validateObject(paramsToValidate)
      } else if (hasMethod(schemaRules, 'array')) {
        promise = validateArray(paramsToValidate)
      } else {
        promise = validateOtherMethods(paramsToValidate)
      }

      validatePromises.push(promise)
    }

    await Promise.all(validatePromises)
  }
}
