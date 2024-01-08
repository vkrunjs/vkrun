import { Validator, validator } from '../../../validator'
import { informativeMessage } from '../../../location'
import {
  ValidateMethodParams,
  ObjectType,
  ValidateItemArrayValue
} from '../../../types'

export const callValidatorMethod = async (params: ValidateMethodParams): Promise<void> => {
  for (const rule of params.schemaRules) {
    const v = validator(params.value, params.keyName)

    if (rule.method === 'string') {
      params.callbackUpdateTest(v.string().validate())
    } else if (rule.method === 'minWord') {
      params.callbackUpdateTest(v.minWord(rule.minWord ?? 0).validate())
    } else if (rule.method === 'uuid') {
      params.callbackUpdateTest(v.uuid().validate())
    } else if (rule.method === 'email') {
      params.callbackUpdateTest(v.email().validate())
    } else if (rule.method === 'maxLength') {
      params.callbackUpdateTest(v.maxLength(rule.maxLength ?? 0).validate())
    } else if (rule.method === 'minLength') {
      params.callbackUpdateTest(v.minLength(rule.minLength ?? 0).validate())
    } else if (rule.method === 'required') {
      params.callbackUpdateTest(v.required().validate())
    } else if (rule.method === 'number') {
      params.callbackUpdateTest(v.number().validate())
    } else if (rule.method === 'float') {
      params.callbackUpdateTest(v.float().validate())
    } else if (rule.method === 'integer') {
      params.callbackUpdateTest(v.integer().validate())
    } else if (rule.method === 'boolean') {
      params.callbackUpdateTest(v.boolean().validate())
    } else if (rule.method === 'date') {
      params.callbackUpdateTest(v.date(rule.dateType ?? 'ISO8601').validate())
    } else if (rule.method === 'dateGreaterThan') {
      params.callbackUpdateTest(v.dateGreaterThan(rule.dateToCompare ?? new Date()).validate())
    } else if (rule.method === 'dateLessThan') {
      params.callbackUpdateTest(v.dateLessThan(rule.dateToCompare ?? new Date()).validate())
    } else if (rule.method === 'time') {
      params.callbackUpdateTest(v.time(rule.timeType ?? 'HH:MM:SS').validate())
    } else if (rule.method === 'array') {
      const validateArray = (value: ValidateItemArrayValue): Validator => {
        const message = informativeMessage.schema.validateProperty.itemArray.valueName
        const valueName = message.replace('[keyName]', params.keyName)
        return validator(value, valueName)
      }

      if (rule.arrayType === 'string') {
        params.value.forEach((item: string) => {
          params.callbackUpdateTest(validateArray(item).string().validate())
        })
      } else if (rule.arrayType === 'number') {
        params.value.forEach((item: number) => {
          params.callbackUpdateTest(validateArray(item).number().validate())
        })
      } else if (rule.arrayType === 'boolean') {
        params.value.forEach((item: boolean) => {
          params.callbackUpdateTest(validateArray(item).boolean().validate())
        })
      } else if (rule.arrayType === 'date') {
        params.value.forEach((item: Date) => {
          params.callbackUpdateTest(validateArray(item).date(rule?.dateType).validate())
        })
      } else if (rule.arrayType === 'strict') {
        params.value.forEach((item: number, index: number) => {
          if (item === rule?.arrayRules[index]) {
            params.callbackAddPassed({
              method: 'array',
              name: params.keyName,
              expect: rule?.arrayRules,
              received: params.value
            })
          } else {
            params.callbackAddFailed({
              method: 'array',
              type: 'invalid value',
              name: params.keyName,
              expect: rule?.arrayRules,
              received: params.value,
              message: 'the array value does not match'
            })
          }
        })
      } else if (rule.arrayType === 'object' && rule.arrayType !== undefined) {
        await Promise.all(params.value.map(async (item: ObjectType) => {
          await params.callbackValidateValue(item, rule.arrayRules as ObjectType)
        }))
      }
    }
  }
}
