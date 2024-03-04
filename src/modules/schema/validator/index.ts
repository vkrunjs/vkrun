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
} from './helpers'
import { hasMethod } from '../../utils'
import { ExecuteValidateMethods } from '../../types'

export const validator = (params: ExecuteValidateMethods): void => {
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
      validateUuid({ ...validateMethodParams, indexArray })
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion
    validateMethodParams.valueName = params.methods.find((item: any) => item.method === 'alias')?.alias!
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
