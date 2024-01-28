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
  validateArray,
  validateEqual
} from './validate'
import { hasMethod } from '../../utils'
import { ErrorTest, Methods, SuccessTest } from '../../types'

export const executeValidateMethods = (params: {
  value: any
  valueName: string
  methods: Methods
  resetTests: () => void
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  let valueName = params.valueName
  params.resetTests()

  const validateMethod = (rule: any): void => {
    if (rule.method === 'string') {
      validateString({
        value: params.value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'minWord') {
      validateMinWord({
        value: params.value,
        valueName,
        minWord: rule.minWord,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'email') {
      validateEmail({
        value: params.value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'UUID') {
      validateUuid({
        value: params.value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'maxLength') {
      validateMaxLength({
        value: params.value,
        valueName,
        maxLength: rule.maxLength,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'minLength') {
      validateMinLength({
        value: params.value,
        valueName,
        minLength: rule.minLength,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'number') {
      validateNumber({
        value: params.value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'float') {
      validateFloat({
        value: params.value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'integer') {
      validateInteger({
        value: params.value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'boolean') {
      validateBoolean({
        value: params.value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'date') {
      validateDate({
        value: params.value,
        valueName,
        type: rule.dateType,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'min') {
      if (hasMethod(params.methods, 'date')) {
        validateMinDate({
          value: params.value,
          valueName,
          dateToCompare: rule.dateToCompare,
          callbackAddPassed: params.callbackAddPassed,
          callbackAddFailed: params.callbackAddFailed
        })
      }
    } else if (rule.method === 'max') {
      if (hasMethod(params.methods, 'date')) {
        validateMaxDate({
          value: params.value,
          valueName,
          dateToCompare: rule.dateToCompare,
          callbackAddPassed: params.callbackAddPassed,
          callbackAddFailed: params.callbackAddFailed
        })
      }
    } else if (rule.method === 'time') {
      validateTime({
        value: params.value,
        valueName,
        type: rule.timeType,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'equal') {
      validateEqual({
        value: params.value,
        valueToCompare: rule.valueToCompare,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    }
  }

  if (hasMethod(params.methods, 'alias')) {
    valueName = params.methods.find((item) => item.method === 'alias')?.alias as string
  }

  if (hasMethod(params.methods, 'notRequired')) {
    validateNotRequired({
      value: params.value,
      valueName,
      callbackAddPassed: params.callbackAddPassed
    })
    if (params.value === undefined) return
  } else {
    validateRequired({
      value: params.value,
      valueName,
      callbackAddPassed: params.callbackAddPassed,
      callbackAddFailed: params.callbackAddFailed
    })
  }

  if (hasMethod(params.methods, 'array')) {
    validateArray({
      value: params.value,
      valueName,
      methods: params.methods,
      callbackAddPassed: params.callbackAddPassed,
      callbackAddFailed: params.callbackAddFailed
    })
  } else {
    params.methods.forEach(rule => validateMethod(rule))
  }
}
