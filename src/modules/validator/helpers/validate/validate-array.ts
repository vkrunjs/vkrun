import { informativeMessage } from '../../../location'
import { ErrorTest, Method, Methods, SuccessTest, Tests } from '../../../types'
import { isArray, received } from '../../../utils'
import { validateString } from './string/validate-string'

export const validateArray = ({
  value,
  valueName,
  methods,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  methods: Methods
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  if (isArray(value)) {
    let localTests: Tests = {
      passedAll: false,
      passed: 0,
      failed: 0,
      totalTests: 0,
      successes: [],
      errors: [],
      time: ''
    }

    const passedAll = (): void => {
      localTests.passedAll = localTests.passed === localTests.totalTests
    }

    const addPassed = (success: SuccessTest): void => {
      ++localTests.passed
      ++localTests.totalTests
      localTests.successes.push(success)
      passedAll()
    }

    const addFailed = (error: ErrorTest): void => {
      ++localTests.failed
      ++localTests.totalTests
      localTests.errors.push(error)
      passedAll()
    }

    const resetTests = (): void => {
      localTests = {
        passedAll: false,
        passed: 0,
        failed: 0,
        totalTests: 0,
        successes: [],
        errors: [],
        time: ''
      }
    }

    const filteredMethods = methods.filter((filteredMethod: Method) =>
      filteredMethod.method !== 'notRequired' &&
      filteredMethod.method !== 'alias'
    )

    value.forEach((valueIndexArr: any) => {
      filteredMethods.forEach((filteredMethod: Method) => {
        if (filteredMethod.method === 'string') {
          validateString({
            value: valueIndexArr,
            valueName,
            callbackAddPassed: success => addPassed(success),
            callbackAddFailed: error => addFailed(error)
          })

          if (localTests.passedAll) {
            callbackAddPassed({
              method: 'array',
              name: valueName,
              expect: 'index of the array is of type string!',
              received: received(valueIndexArr)
            })
          } else {
            const message = informativeMessage.array.invalidValue
            const messageError = message
              .replace('[valueName]', valueName)
              .replace('[arrayType]', 'string')

            callbackAddFailed({
              method: 'array',
              type: 'invalid value',
              name: valueName,
              expect: 'index of the array is of type string!',
              received: received(valueIndexArr),
              message: messageError
            })
          }

          resetTests()
        }
      })
    })
  } else {
    const message = informativeMessage.array.notIsArray
    const messageError = message.replace('[keyName]', valueName)

    callbackAddFailed({
      method: 'array',
      type: 'invalid value',
      name: valueName,
      expect: 'array',
      received: received(value),
      message: messageError
    })
  }
}
