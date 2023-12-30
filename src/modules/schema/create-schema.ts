import { Validator, validator } from '../validator'
import { informativeMessage } from '../location'
import { isObject, isArray, isNotRequired } from './utils'
import {
  Schema,
  ObjectConfig,
  ValidatePropertyKey,
  ValidatePropertyValue,
  ValidatePropertyRules,
  ValidateItemArrayValue,
  ObjectType,
  ValidatePropertyRule
} from '../types'

class CreateSchema {
  private readonly schema: Schema
  private readonly config?: ObjectConfig
  private readonly isValid: boolean[]

  constructor (schema: Schema, config?: ObjectConfig) {
    this.schema = schema
    this.config = config
    this.isValid = []
  }

  private async validateProperty (
    key: ValidatePropertyKey,
    value: ValidatePropertyValue,
    rules: ValidatePropertyRules
  ): Promise<boolean> {
    const validateItemArray = (value: ValidateItemArrayValue): Validator => {
      let validatorItemArray: Validator
      const message = informativeMessage.schema.validateProperty.itemArray.valueName
      const valueName = message.replace('[keyName]', key)

      if (this.config?.error) {
        validatorItemArray = validator(value, valueName, this.config.error)
      } else {
        validatorItemArray = validator(value, valueName)
      }
      return validatorItemArray
    }

    let validate: boolean
    for (const rule of rules) {
      let v: Validator
      if (this.config) v = validator(value, key, this.config.error)
      else v = validator(value, key)

      switch (rule.method) {
        case 'string':
          validate = v.string().validate()
          this.isValid.push(validate)
          break

        case 'minWord':
          validate = v.minWord(rule.minWord ?? 0).validate()
          this.isValid.push(validate)
          break

        case 'uuid':
          validate = v.uuid().validate()
          this.isValid.push(validate)
          break

        case 'email':
          validate = v.email().validate()
          this.isValid.push(validate)
          break

        case 'maxLength':
          validate = v.maxLength(rule.maxLength ?? 0).validate()
          this.isValid.push(validate)
          break

        case 'minLength':
          validate = v.minLength(rule.minLength ?? 0).validate()
          this.isValid.push(validate)
          break

        case 'required':
          validate = v.required().validate()
          this.isValid.push(validate)
          break

        case 'number':
          validate = v.number().validate()
          this.isValid.push(validate)
          break

        case 'float':
          validate = v.float().validate()
          this.isValid.push(validate)
          break

        case 'integer':
          validate = v.integer().validate()
          this.isValid.push(validate)
          break

        case 'boolean':
          validate = v.boolean().validate()
          this.isValid.push(validate)
          break

        case 'date':
          validate = v.date(rule.dateType ?? 'ISO8601').validate()
          this.isValid.push(validate)
          break

        case 'dateGreaterThan':
          validate = v.dateGreaterThan(rule.dateToCompare ?? new Date()).validate()
          this.isValid.push(validate)
          break

        case 'dateLessThan':
          validate = v.dateLessThan(rule.dateToCompare ?? new Date()).validate()
          this.isValid.push(validate)
          break

        case 'time':
          validate = v.time(rule.timeType ?? 'HH:MM:SS').validate()
          this.isValid.push(validate)
          break

        case 'array':
          if (rule.arrayType === 'string') {
            value.forEach((item: string) => {
              validate = validateItemArray(item).string().validate()
              this.isValid.push(validate)
            })
          } else if (rule.arrayType === 'number') {
            value.forEach((item: number) => {
              validate = validateItemArray(item).number().validate()
              this.isValid.push(validate)
            })
          } else if (rule.arrayType === 'boolean') {
            value.forEach((item: boolean) => {
              validate = validateItemArray(item).boolean().validate()
              this.isValid.push(validate)
            })
          } else if (rule.arrayType === 'date') {
            value.forEach((item: Date) => {
              validate = validateItemArray(item).date(rule?.dateType).validate()
              this.isValid.push(validate)
            })
          } else if (rule.arrayType === 'strict') {
            value.forEach((item: number, index: number) => {
              if (item === rule?.arrayRules[index]) {
                this.isValid.push(true)
              } else {
                this.isValid.push(false)
              }
            })
          } else if (rule.arrayType === 'object' && rule.arrayType !== undefined) {
            await Promise.all(value.map(async (item: ObjectType) => {
              const validate = await this.validateObject(item, rule.arrayRules as ObjectType)
              this.isValid.push(validate)
            }))
          }
          break

        default: break
      }
    }

    return this.isValid.every(isValid => isValid)
  }

  private async validateObject (
    objectToValidate: ObjectType,
    schema: ObjectType
  ): Promise<boolean> {
    let validate: boolean

    for (const [schemaKey, schemaRules] of Object.entries(schema)) {
      const objectToValidateValue = objectToValidate[schemaKey]
      const isSchemaKeyAbsent = !(schemaKey in objectToValidate)

      if (
        (isSchemaKeyAbsent && !isNotRequired(schemaRules)) ||
        (isSchemaKeyAbsent && isObject(schemaRules))
      ) {
        if (this.config?.error && typeof this.config?.error === 'function') {
          const message = informativeMessage.schema.validateObject.schemaKeyAbsent
          const messageError = message.replace('[keyName]', schemaKey)
          const CustomError = this.config?.error
          throw new CustomError(messageError)
        }
        this.isValid.push(false)
        break
      }

      if (isObject(objectToValidateValue)) {
        validate = await this.validateObject(objectToValidateValue, schemaRules)
        this.isValid.push(validate)
      } else if (isArray(schemaRules)) {
        const valuesIsArray = Array.isArray(objectToValidateValue)

        if (valuesIsArray) {
          validate = await this.validateProperty(schemaKey, objectToValidateValue, schemaRules)
          this.isValid.push(validate)
        } else {
          if (this.config?.error && typeof this.config?.error === 'function') {
            const message = informativeMessage.schema.validateObject.notIsArray
            const messageError = message.replace('[keyName]', schemaKey)
            const CustomError = this.config?.error
            throw new CustomError(messageError)
          }
          this.isValid.push(false)
        }
      } else if (isNotRequired(schemaRules)) {
        if (objectToValidateValue !== undefined) {
          const newSchemaRules = schemaRules.filter(
            (rule: ValidatePropertyRule) => rule.method !== 'notRequired'
          )
          validate = await this.validateProperty(schemaKey, objectToValidateValue, newSchemaRules)
          this.isValid.push(validate)
        }
      } else {
        const requiredRules: ValidatePropertyRules = [{ method: 'required', private: true }]
        const validateRequiredByDefault = this.validateProperty(schemaKey, objectToValidateValue, requiredRules)
        this.isValid.push(await validateRequiredByDefault)
        validate = await this.validateProperty(schemaKey, objectToValidateValue, schemaRules)
        this.isValid.push(validate)
      }
    }

    return this.isValid.every(isValid => isValid)
  }

  async validate (objectToValidate: ObjectType): Promise<boolean> {
    await this.validateObject(objectToValidate, this.schema)
    return this.isValid.every(isValid => isValid)
  }
}

export const createSchema = (schema: ObjectType, config?: ObjectConfig): CreateSchema => {
  return new CreateSchema(schema, config)
}
