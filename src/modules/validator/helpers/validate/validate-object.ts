import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest, Tests } from '../../../types'
import { isObject, received } from '../../../utils'

export const validateObject = ({
  value,
  valueName,
  schema,
  callbackUpdateTest,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  schema: any
  callbackUpdateTest: (test: Tests) => void
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  if (isObject(value)) {
    callbackAddPassed({
      method: 'object',
      name: valueName,
      expect: 'object type',
      received: value
    })

    for (const [key, rule] of Object.entries(schema) as [string, any]) {
      callbackUpdateTest(rule.test(value[key], key))
    }
  } else {
    callbackAddFailed({
      method: 'object',
      type: 'invalid value',
      name: valueName,
      expect: 'object type',
      received: received(value),
      message: informativeMessage.object.replace('[valueName]', valueName)
    })
  }
}
