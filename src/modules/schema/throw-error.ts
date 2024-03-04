import { ErrorTypes, Tests } from '../types'

export const throwError = (tests: Tests, ClassError: ErrorTypes): void => {
  if (tests.errors.length > 0) {
    if (ClassError) {
      let extendsError
      try {
        const TestClassError = new ClassError('')
        extendsError = TestClassError instanceof Error
      } catch (error) {
        throw new Error('vkrun: provided class does not extend Error!')
      }
      if (extendsError) {
        throw new ClassError(tests.errors[0].message)
      }
    } else {
      throw new Error(tests.errors[0].message)
    }
  }
}
