import * as validate from './validate'
import { hasMethod } from '../has-method'
import { SchemaExecuteValidateMethods, SchemaMethod } from '../../../types'

export const validator = (params: SchemaExecuteValidateMethods): void => {
  params.resetTests()
  const validateMethodParams: any = params

  const validateOtherMethods = (rule: any, value: any): void => {
    validateMethodParams.value = value
    if (rule.method === 'object') {
      validate.validateObject({ ...validateMethodParams, schema: rule.schema, config: rule.config })
    } else if (rule.method === 'string') {
      validate.validateString({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'minWord') {
      validate.validateMinWord({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'email') {
      validate.validateEmail({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'UUID') {
      validate.validateUUID({
        ...validateMethodParams,
        uuidVersion: rule.uuidVersion,
        config: rule.config
      })
    } else if (rule.method === 'maxLength') {
      validate.validateMaxLength({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'minLength') {
      validate.validateMinLength({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'regex') {
      validate.validateRegex({
        ...validateMethodParams,
        regExp: rule.regExp,
        config: rule.config
      })
    } else if (rule.method === 'number') {
      validate.validateNumber({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'bigInt') {
      validate.validateBigInt({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'float') {
      validate.validateFloatNumber({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'integer') {
      validate.validateIntegerNumber({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'positive') {
      if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validatePositiveNumber({ ...validateMethodParams, config: rule.config })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validatePositiveBigInt({ ...validateMethodParams, config: rule.config })
      }
    } else if (rule.method === 'negative') {
      if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validateNegativeNumber({ ...validateMethodParams, config: rule.config })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validateNegativeBigInt({ ...validateMethodParams, config: rule.config })
      }
    } else if (rule.method === 'boolean') {
      validate.validateBoolean({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'buffer') {
      validate.validateBuffer({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'function') {
      validate.validateFunction({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'date') {
      validate.validateDate({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'min') {
      if (hasMethod(validateMethodParams.methods, 'date')) {
        validate.validateMinDate({ ...validateMethodParams, config: rule.config })
      } else if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validateMinNumber({ ...validateMethodParams, config: rule.config })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validateMinBigInt({ ...validateMethodParams, config: rule.config })
      }
    } else if (rule.method === 'max') {
      if (hasMethod(validateMethodParams.methods, 'date')) {
        validate.validateMaxDate({ ...validateMethodParams, config: rule.config })
      } else if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validateMaxNumber({ ...validateMethodParams, config: rule.config })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validateMaxBigInt({ ...validateMethodParams, config: rule.config })
      }
    } else if (rule.method === 'time') {
      validate.validateTime({ ...validateMethodParams, config: rule.config })
    } else if (rule.method === 'equal') {
      validate.validateEqual({
        ...validateMethodParams,
        valueToCompare: rule.valueToCompare,
        config: rule.config
      })
    } else if (rule.method === 'notEqual') {
      validate.validateNotEqual({
        ...validateMethodParams,
        valueToCompare: rule.valueToCompare,
        config: rule.config
      })
    } else if (rule.method === 'oneOf') {
      validate.validateOneOf({
        ...validateMethodParams,
        comparisonItems: rule.comparisonItems,
        config: rule.config
      })
    } else if (rule.method === 'notOneOf') {
      validate.validateNotOneOf({
        ...validateMethodParams,
        comparisonItems: rule.comparisonItems,
        config: rule.config
      })
    }
  }

  if (hasMethod(validateMethodParams.methods, 'alias')) {
    const method = params.methods.find((item: SchemaMethod) => item.method === 'alias')
    if (method) validateMethodParams.valueName = method.alias
  }

  if (hasMethod(validateMethodParams.methods, 'nullable')) {
    validate.validateNullable(validateMethodParams)
    if (validateMethodParams.value === null) return
  } else if (hasMethod(validateMethodParams.methods, 'notRequired')) {
    validate.validateNotRequired(validateMethodParams)
    if (validateMethodParams.value === undefined) return
  } else if (hasMethod(validateMethodParams.methods, 'required')) {
    validate.validateRequired(validateMethodParams)
  }

  if (hasMethod(validateMethodParams.methods, 'array')) {
    validate.validateMinArray(validateMethodParams)
    validate.validateMaxArray(validateMethodParams)
    validate.validateArray(validateMethodParams)
  } else {
    validateMethodParams.methods.forEach((rule: any) => { validateOtherMethods(rule, validateMethodParams.value) })
  }
}
