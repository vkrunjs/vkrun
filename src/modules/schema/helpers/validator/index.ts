import {
  validateBoolean,
  validateDate,
  validateEmail,
  validateFloat,
  validateInteger,
  validateMaxLength,
  validateMinLength,
  validateMinWord,
  validateNumber,
  validateRequired,
  validateString,
  validateUuid,
  validateMinDate,
  validateMaxDate,
  validateTime,
  validateNotRequired,
  validateEqual,
  validateObject,
  validateArray
} from './validate'
import { hasMethod } from '../has-method'
import * as type from '../../../types'

export const validator = (params: type.ExecuteValidateMethods): void => {
  params.resetTests()
  const validateMethodParams: any = params

  const validateMethod = (rule: any, value: any, indexArray?: number): void => {
    validateMethodParams.value = value
    if (rule.method === 'object') {
      validateObject({ ...validateMethodParams, indexArray, schema: rule.schema })
    } else if (rule.method === 'string') {
      validateString({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'minWord') {
      validateMinWord({ ...validateMethodParams, indexArray, minWord: rule.minWord })
    } else if (rule.method === 'email') {
      validateEmail({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'UUID') {
      validateUuid({ ...validateMethodParams, indexArray, uuidVersion: rule.uuidVersion })
    } else if (rule.method === 'maxLength') {
      validateMaxLength({ ...validateMethodParams, indexArray, maxLength: rule.maxLength })
    } else if (rule.method === 'minLength') {
      validateMinLength({ ...validateMethodParams, indexArray, minLength: rule.minLength })
    } else if (rule.method === 'number') {
      validateNumber({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'float') {
      validateFloat({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'integer') {
      validateInteger({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'boolean') {
      validateBoolean({ ...validateMethodParams, indexArray })
    } else if (rule.method === 'date') {
      validateDate({ ...validateMethodParams, indexArray, type: rule.dateType })
    } else if (rule.method === 'min') {
      if (hasMethod(validateMethodParams.methods, 'date')) {
        validateMinDate({ ...validateMethodParams, indexArray, dateToCompare: rule.dateToCompare })
      }
    } else if (rule.method === 'max') {
      if (hasMethod(validateMethodParams.methods, 'date')) {
        validateMaxDate({ ...validateMethodParams, indexArray, dateToCompare: rule.dateToCompare })
      }
    } else if (rule.method === 'time') {
      validateTime({ ...validateMethodParams, indexArray, type: rule.timeType })
    } else if (rule.method === 'equal') {
      validateEqual({ ...validateMethodParams, indexArray, valueToCompare: rule.valueToCompare })
    }
  }

  if (hasMethod(validateMethodParams.methods, 'alias')) {
    const method = params.methods.find((item: type.Method) => item.method === 'alias')
    if (method) validateMethodParams.valueName = method.alias
  }

  if (hasMethod(validateMethodParams.methods, 'notRequired')) {
    validateNotRequired(validateMethodParams)
    if (validateMethodParams.value === undefined) return
  } else {
    validateRequired(validateMethodParams)
  }

  if (hasMethod(validateMethodParams.methods, 'array')) {
    validateArray({ ...validateMethodParams, validateMethod })
  } else {
    validateMethodParams.methods.forEach((rule: any) => { validateMethod(rule, validateMethodParams.value) })
  }
}
