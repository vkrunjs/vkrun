import { informativeMessage } from '../../../location'
import { ErrorTest, Method, Methods, SuccessTest } from '../../../types'
import { isArray, received } from '../../../utils'

export const validateArray = ({
  value,
  valueName,
  methods,
  validateMethod,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  methods: Methods
  validateMethod: (rule: any, value: any, index: number) => void
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const message = {
    expect: 'array type',
    error: informativeMessage.array.notIsArray.replace('[valueName]', valueName)
  }

  if (isArray(value)) {
    callbackAddPassed({
      method: 'array',
      name: valueName,
      expect: message.expect,
      received: received(value)
    })

    const methodsWithoutArray = methods.filter((filteredMethod: Method) =>
      filteredMethod.method !== 'array'
    )

    value.forEach((indexValue: any, index: number) => {
      methodsWithoutArray.forEach(rule => validateMethod(rule, indexValue, index))
    })
  } else {
    callbackAddFailed({
      method: 'array',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
