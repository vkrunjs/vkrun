import { hasMethod } from '../utils'
import {
  validateSchemaArray,
  validateSchemaNotRequired,
  validateSchemaObject,
  validateSchemaOtherMethods
} from './helpers'
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

  private async validateObject (
    objectToValidate: ObjectType,
    schema: ObjectType
  ): Promise<void> {
    // ajustar para que validateObjet receba diretamente um metodo array de objetos
    for (const [schemaKey, schemaRules] of Object.entries(schema)) {
      const objectValueToValidate = objectToValidate[schemaKey]
      const params = {
        object: objectToValidate,
        keyName: hasMethod(schemaRules, 'alias')
          ? schemaRules.find((rule: any) => rule.method === 'alias').alias
          : schemaKey,
        value: objectValueToValidate,
        schemaRules,
        callbackUpdateTest: (test: Tests) => this.handleUpdateTest(test),
        callbackAddPassed: (success: SuccessTest) => this.addPassed(success),
        callbackAddFailed: (error: ErrorTest) => this.addFailed(error),
        callbackValidateObject: async (
          object: ObjectType,
          schema: ObjectType
        ) => await this.validateObject(object, schema)
      }

      if (hasMethod(schemaRules, 'object')) {
        await validateSchemaObject(params)
      } else if (hasMethod(schemaRules, 'array')) {
        await validateSchemaArray(params)
      } else if (hasMethod(schemaRules, 'notRequired')) {
        await validateSchemaNotRequired(params)
      } else {
        await validateSchemaOtherMethods(params)
      }
    }
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

  async validate (objectToValidate: ObjectType): Promise<Tests> {
    const stateDate = new Date()
    await this.validateObject(objectToValidate, this.schema)
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
