import validex from '../../index'
import { Validex } from '../validex'
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

  private validateProperty (
    key: ValidatePropertyKey,
    value: ValidatePropertyValue,
    rules: ValidatePropertyRules
  ): boolean {
    const validateItemArray = (value: ValidateItemArrayValue): Validex => {
      let validatorItemArray: Validex
      if (this.config?.errorType) {
        validatorItemArray = validex(value, `all values in the ${key}`, this.config?.errorType)
      } else {
        validatorItemArray = validex(value, `all values in the ${key}`)
      }
      return validatorItemArray
    }

    let validate: boolean
    for (const rule of rules) {
      let v: Validex
      if (this.config) v = validex(value, key, this.config.errorType)
      else v = validex(value, key)

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
          validate = v.uuid(rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'email':
          validate = v.email(rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'maxLength':
          validate = v.maxLength(rule.maxLength ?? 0, rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'minLength':
          validate = v.minLength(rule.minLength ?? 0, rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'required':
          validate = v.required(rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'number':
          validate = v.number(rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'float':
          validate = v.float(rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'integer':
          validate = v.integer(rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'boolean':
          validate = v.boolean(rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'date':
          validate = v.date(rule.dateType ?? 'ISO8601', rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'dateGreaterThan':
          validate = v.dateGreaterThan(rule.dateToCompare ?? new Date(), rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'dateLessThan':
          validate = v.dateLessThan(rule.dateToCompare ?? new Date(), rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'time':
          validate = v.time(rule.timeType ?? 'HH:MM:SS', rule.customError).validate()
          this.isValid.push(validate)
          break

        case 'array':
          if (rule.arrayType === 'string') {
            value.forEach((item: string) => {
              validate = validateItemArray(item).string().validate()
              this.isValid.push(validate)
            })
          } else if (typeof rule.arrayType === 'object' && rule.arrayType !== undefined) {
            value.forEach((item: ObjectType) => {
              validate = this.validateObject(item, rule.arrayType as ObjectType)
              this.isValid.push(validate)
            })
          }
          break

        default: break
      }
    }

    return this.isValid.every(isValid => isValid)
  }

  private validateSchema (
    schema: ObjectType,
    objectToValidate: ObjectType
  ): boolean {
    for (const [objectToValidateKey, objectToValidateValue] of Object.entries(objectToValidate)) {
      if (!(objectToValidateKey in schema)) {
        if (this.config?.errorType) {
          const isCustomError = typeof this.config?.errorType === 'function'
          if (isCustomError) {
            const CustomError = this.config?.errorType
            throw new CustomError(`${objectToValidateKey} key was not declared in the schema`)
          } else {
            throw new Error(`${objectToValidateKey} key was not declared in the schema`)
          }
        } else {
          this.isValid.push(false)
        }
      }
      const isObject = typeof objectToValidateValue === 'object' && !Array.isArray(objectToValidateValue)
      if (isObject) {
        const validateSchema = this.validateSchema(schema[objectToValidateKey], objectToValidateValue)
        this.isValid.push(validateSchema)
      }
    }
    return this.isValid.every(isValid => isValid)
  }

  private validateObject (
    objectToValidate: ObjectType,
    schema: ObjectType
  ): boolean {
    let validate: boolean
    for (const [schemaKey, schemaRules] of Object.entries(schema)) {
      const objectToValidateValue = objectToValidate[schemaKey]
      const isSchemaKeyAbsent = !(schemaKey in objectToValidate)
      const isNotRequiredMethodPresent = (): boolean => {
        return typeof objectToValidateValue !== 'object' &&
          Array.isArray(schemaRules) &&
          schemaRules.some((rule: ValidatePropertyRule) => rule?.method === 'notRequired')
      }

      if (isSchemaKeyAbsent && !isNotRequiredMethodPresent()) {
        if (this.config?.errorType) {
          const isCustomError = typeof this.config?.errorType === 'function'
          if (isCustomError) {
            const CustomError = this.config?.errorType
            throw new CustomError(`${schemaKey} key is required!`)
          } else {
            throw new Error(`${schemaKey} key is required!`)
          }
        } else {
          this.isValid.push(false)
        }
      }

      const isObject = (): boolean => {
        return typeof objectToValidateValue === 'object' &&
          objectToValidateValue !== null &&
          schemaRules.method !== 'array' &&
          !Array.isArray(objectToValidateValue)
      }

      if (isObject()) {
        validate = this.validateObject(objectToValidateValue, schemaRules)
        this.isValid.push(validate)
      } else if (schemaRules.method === 'array') {
        const isArray = Array.isArray(objectToValidateValue)
        if (isArray) {
          validate = this.validateProperty(schemaKey, objectToValidateValue, schemaRules)
          this.isValid.push(validate)
        } else {
          if (this.config?.errorType) {
            const isCustomError = typeof this.config?.errorType === 'function'
            if (isCustomError) {
              const CustomError = this.config?.errorType
              throw new CustomError(`${schemaKey} value must be an array!`)
            } else {
              throw new Error(`${schemaKey} value must be an array!`)
            }
          }
          this.isValid.push(false)
        }
      } else if (isNotRequiredMethodPresent()) {
        if (objectToValidateValue) {
          const newSchemaRules = schemaRules.filter(
            (rule: ValidatePropertyRule) => rule.method !== 'notRequired'
          )
          validate = this.validateProperty(schemaKey, objectToValidateValue, newSchemaRules)
          this.isValid.push(validate)
        }
      } else {
        const required: ValidatePropertyRules = [{ method: 'required', private: true }]
        const validateRequiredByDefault = this.validateProperty(schemaKey, objectToValidateValue, required)
        this.isValid.push(validateRequiredByDefault)
        validate = this.validateProperty(schemaKey, objectToValidateValue, schemaRules)
        this.isValid.push(validate)
      }
    }

    return this.isValid.every(isValid => isValid)
  }

  validate (objectToValidate: ObjectType): boolean {
    this.validateObject(objectToValidate, this.schema)
    this.validateSchema(this.schema, objectToValidate)
    return this.isValid.every(isValid => isValid)
  }
}

export const createSchema = (schema: ObjectType, config?: ObjectConfig): CreateSchema => {
  return new CreateSchema(schema, config)
}
