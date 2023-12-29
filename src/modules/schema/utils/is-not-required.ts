import { ValidatePropertyRule, ValidatePropertyRules } from '../../types'
import { isObject } from './is-object'

export const isNotRequired = (schemaRules: ValidatePropertyRules): boolean => {
  if (isObject(schemaRules)) {
    return true
  } else {
    return schemaRules.some((rule: ValidatePropertyRule) => rule.method === 'notRequired')
  }
}
