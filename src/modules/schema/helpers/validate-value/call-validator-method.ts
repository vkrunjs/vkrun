import { validator } from '../../../validator'
import { ValidateMethodParams, ObjectType } from '../../../types'
import { informativeMessage } from '../../../location'

export const callValidatorMethod = async (params: ValidateMethodParams): Promise<void> => {
  for (const rule of params.schemaRules) {
    const message = informativeMessage.schema.validateProperty.itemArray.valueName
    const name = message.replace('[keyName]', params.keyName)

    if (rule.method === 'array') {
      if (rule.arrayType === 'string') {
        params.value.forEach(async (item: string) => {
          const test = await validator().string().validate(item, name)
          params.callbackUpdateTest(test)
        })
      } else if (rule.arrayType === 'number') {
        params.value.forEach(async (item: number) => {
          const test = await validator().number().validate(item, name)
          params.callbackUpdateTest(test)
        })
      } else if (rule.arrayType === 'boolean') {
        params.value.forEach(async (item: boolean) => {
          const test = await validator().boolean().validate(item, name)
          params.callbackUpdateTest(test)
        })
      } else if (rule.arrayType === 'date') {
        params.value.forEach(async (item: Date) => {
          const test = await validator().date(rule?.dateType).validate(item, name)
          params.callbackUpdateTest(test)
        })
      } else if (rule.arrayType === 'strict') {
        params.value.forEach((item: number, index: number) => {
          if (item === rule?.arrayRules[index]) {
            params.callbackAddPassed({
              method: 'array',
              name,
              expect: rule?.arrayRules,
              received: params.value
            })
          } else {
            params.callbackAddFailed({
              method: 'array',
              type: 'invalid value',
              name,
              expect: rule?.arrayRules,
              received: params.value,
              message: 'the array value does not match'
            })
          }
        })
      } else if (rule.arrayType === 'object') {
        params.value.map(async (item: ObjectType) => {
          await params.callbackValidateValue(item, rule.arrayRules)
        })
      }
    }
  }
}
