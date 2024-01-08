import { selectSchemaFormat } from './helpers'
import {
  Schema,
  ObjectConfig,
  ObjectType,
  ErrorTest,
  Tests,
  SuccessTest
} from '../types'

class CreateSchema {
  private readonly schema: Schema
  private readonly config?: ObjectConfig
  private readonly tests: Tests

  constructor (schema: Schema, config?: ObjectConfig) {
    this.schema = schema
    this.config = config
    this.tests = {
      passedAll: false,
      passed: 0,
      failed: 0,
      totalTests: 0,
      successes: [],
      errors: [],
      time: ''
    }
  }

  private async validateValue (
    value: ObjectType, // alterar nome para algo que seja array ou objeto
    schema: ObjectType
  ): Promise<void> {
    await selectSchemaFormat({
      value,
      schema,
      callbackUpdateTest: (test: Tests) => this.handleUpdateTest(test),
      callbackAddPassed: (success: SuccessTest) => this.addPassed(success),
      callbackAddFailed: (error: ErrorTest) => this.addFailed(error),
      callbackValidateValue: async (
        object: ObjectType,
        schema: ObjectType
      ) => await this.validateValue(object, schema)
    })
  }

  private passedAll (): void {
    this.tests.passedAll = this.tests.passed === this.tests.totalTests
  }

  private addPassed (success: SuccessTest): void {
    ++this.tests.passed
    ++this.tests.totalTests
    this.tests.successes.push(success)
    this.passedAll()
  }

  private addFailed (error: ErrorTest): void {
    ++this.tests.failed
    ++this.tests.totalTests
    this.tests.errors.push(error)
    this.passedAll()
  }

  private handleUpdateTest (test: Tests): void {
    if (test.passedAll) {
      ++this.tests.passed
      ++this.tests.totalTests
      test.successes.forEach((success: SuccessTest) => {
        this.tests.successes.push(success)
      })
      this.passedAll()
    } else {
      ++this.tests.failed
      ++this.tests.totalTests
      test.errors.forEach((error: ErrorTest) => {
        this.tests.errors.push(error)
      })
      this.passedAll()
    }
  }

  async validate (valueToValidate: ObjectType): Promise<Tests> {
    const stateDate = new Date()
    await this.validateValue(valueToValidate, this.schema)
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - stateDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    if (this.config?.error && !this.tests.passedAll) {
      if (this.config.error === true) {
        throw new Error(this.tests.errors[0].message)
      } else {
        const CustomError = this.config.error
        const TestClassError = new CustomError('')
        const extendsError = TestClassError instanceof Error

        if (extendsError) {
          throw new CustomError(this.tests.errors[0].message)
        }
      }
    }
    return this.tests
  }
}

export const createSchema = (schema: ObjectType, config?: ObjectConfig): CreateSchema => {
  return new CreateSchema(schema, config)
}
