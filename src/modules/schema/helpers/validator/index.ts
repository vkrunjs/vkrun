import * as validate from './validate'
import { hasMethod } from '../has-method'
import { SchemaExecuteValidateMethods, SchemaMethod } from '../../../types'

export const validator = (params: SchemaExecuteValidateMethods): void => {
  params.resetTests()
  const validateMethodParams: any = params

  const validateOtherMethods = (rule: any, value: any, indexArray?: number): void => {
    validateMethodParams.value = value
    if (rule.method === 'object') {
      validate.validateObject({ ...validateMethodParams, indexArray, schema: rule.schema })
    } else if (rule.method === 'string') {
      validate.validateString({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'minWord') {
      validate.validateMinWord({ ...validateMethodParams, indexArray, minWord: rule.minWord })
    } else if (rule.method === 'email') {
      validate.validateEmail({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'UUID') {
      validate.validateUuid({ ...validateMethodParams, indexArray, uuidVersion: rule.uuidVersion })
    } else if (rule.method === 'maxLength') {
      validate.validateMaxLength({ ...validateMethodParams, indexArray, maxLength: rule.maxLength })
    } else if (rule.method === 'minLength') {
      validate.validateMinLength({ ...validateMethodParams, indexArray, minLength: rule.minLength })
    } else if (rule.method === 'regex') {
      validate.validateRegex({
        ...validateMethodParams,
        indexArray,
        regExp: rule.regExp,
        config: rule.config
      })
    } else if (rule.method === 'number') {
      validate.validateNumber({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'bigInt') {
      validate.validateBigInt({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'float') {
      validate.validateFloatNumber({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'integer') {
      validate.validateIntegerNumber({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'positive') {
      if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validatePositiveNumber({ ...validateMethodParams, indexArray })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validatePositiveBigInt({ ...validateMethodParams, indexArray })
      }
    } else if (rule.method === 'negative') {
      if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validateNegativeNumber({ ...validateMethodParams, indexArray })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validateNegativeBigInt({ ...validateMethodParams, indexArray })
      }
    } else if (rule.method === 'boolean') {
      validate.validateBoolean({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'buffer') {
      validate.validateBuffer({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'function') {
      validate.validateFunction({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'date') {
      validate.validateDate({ ...validateMethodParams, indexArray, type: rule.dateType })
    } else if (rule.method === 'min') {
      if (hasMethod(validateMethodParams.methods, 'date')) {
        validate.validateMinDate({ ...validateMethodParams, indexArray, dateToCompare: rule.dateToCompare })
      } else if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validateMinNumber({ ...validateMethodParams, indexArray, min: rule.min })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validateMinBigInt({ ...validateMethodParams, indexArray, min: rule.min })
      }
    } else if (rule.method === 'max') {
      if (hasMethod(validateMethodParams.methods, 'date')) {
        validate.validateMaxDate({ ...validateMethodParams, indexArray, dateToCompare: rule.dateToCompare })
      } else if (hasMethod(validateMethodParams.methods, 'number')) {
        validate.validateMaxNumber({ ...validateMethodParams, indexArray, max: rule.max })
      } else if (hasMethod(validateMethodParams.methods, 'bigInt')) {
        validate.validateMaxBigInt({ ...validateMethodParams, indexArray, max: rule.max })
      }
    } else if (rule.method === 'time') {
      validate.validateTime({ ...validateMethodParams, indexArray, type: rule.timeType })
    } else if (rule.method === 'equal') {
      validate.validateEqual({ ...validateMethodParams, indexArray, valueToCompare: rule.valueToCompare })
    } else if (rule.method === 'notEqual') {
      validate.validateNotEqual({ ...validateMethodParams, indexArray, valueToCompare: rule.valueToCompare })
    } else if (rule.method === 'oneOf') {
      validate.validateOneOf({ ...validateMethodParams, indexArray, comparisonItems: rule.comparisonItems })
    } else if (rule.method === 'notOneOf') {
      validate.validateNotOneOf({ ...validateMethodParams, indexArray, comparisonItems: rule.comparisonItems })
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
  } else {
    validate.validateRequired(validateMethodParams)
  }

  if (hasMethod(validateMethodParams.methods, 'array')) {
    validate.validateMinArray(validateMethodParams)
    validate.validateMaxArray(validateMethodParams)
    validate.validateArray({ ...validateMethodParams, validateOtherMethods })
  } else {
    validateMethodParams.methods.forEach((rule: any) => { validateOtherMethods(rule, validateMethodParams.value) })
  }
}
