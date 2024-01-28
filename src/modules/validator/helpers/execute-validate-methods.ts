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
import { informativeMessage } from '../../location'
import { hasMethod } from '../../utils'
import { ErrorTest, MethodTypes, Methods, SuccessTest, Tests } from '../../types'

export const executeValidateMethods = (params: {
  value: any
  valueName: string
  methods: Methods
  resetTests: () => void
  callbackUpdateTest: (test: Tests) => void
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  params.resetTests()
  let hasArray = false
  let valueName = params.valueName
  const message = { expect: '', error: '' }

  const arrayErrorMessage = (type: MethodTypes): string => {
    return informativeMessage.array.invalidValue
      .replace('[valueName]', valueName)
      .replace('[arrayType]', 'string')
  }

  const validateMethod = (rule: any, value: any): void => {
    if (rule.method === 'object') {
      validateObject({
        value,
        valueName,
        schema: rule.schema,
        callbackUpdateTest: params.callbackUpdateTest,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'string') {
      if (hasArray) {
        message.expect = 'index of the array is of type string!'
        message.error = arrayErrorMessage('string')
      } else {
        message.expect = 'string type'
        message.error = informativeMessage.string.invalidValue.replace('[valueName]', valueName)
      }

      validateString({
        value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed,
        message
      })
    } else if (rule.method === 'minWord') {
      validateMinWord({
        value,
        valueName,
        minWord: rule.minWord,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'email') {
      validateEmail({
        value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'UUID') {
      validateUuid({
        value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'maxLength') {
      validateMaxLength({
        value,
        valueName,
        maxLength: rule.maxLength,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'minLength') {
      validateMinLength({
        value,
        valueName,
        minLength: rule.minLength,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'number') {
      validateNumber({
        value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'float') {
      validateFloat({
        value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'integer') {
      validateInteger({
        value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'boolean') {
      validateBoolean({
        value,
        valueName,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'date') {
      validateDate({
        value,
        valueName,
        type: rule.dateType,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'min') {
      if (hasMethod(params.methods, 'date')) {
        validateMinDate({
          value,
          valueName,
          dateToCompare: rule.dateToCompare,
          callbackAddPassed: params.callbackAddPassed,
          callbackAddFailed: params.callbackAddFailed
        })
      }
    } else if (rule.method === 'max') {
      if (hasMethod(params.methods, 'date')) {
        validateMaxDate({
          value,
          valueName,
          dateToCompare: rule.dateToCompare,
          callbackAddPassed: params.callbackAddPassed,
          callbackAddFailed: params.callbackAddFailed
        })
      }
    } else if (rule.method === 'time') {
      validateTime({
        value,
        valueName,
        type: rule.timeType,
        callbackAddPassed: params.callbackAddPassed,
        callbackAddFailed: params.callbackAddFailed
      })
    } else if (rule.method === 'equal') {
      validateEqual({
        value,
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
    hasArray = true
    validateArray({
      value: params.value,
      valueName,
      methods: params.methods,
      validateMethod,
      callbackAddPassed: params.callbackAddPassed,
      callbackAddFailed: params.callbackAddFailed
    })
  } else {
    params.methods.forEach(rule => validateMethod(rule, params.value))
  }
}
