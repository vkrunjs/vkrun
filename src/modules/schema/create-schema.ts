import { Validator, validator } from '../validator'
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
import { informativeMessage } from '../location/informative-message'

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
    const validateItemArray = (value: ValidateItemArrayValue): Validator => {
      let validatorItemArray: Validator
      const message = informativeMessage.schema.validateProperty.itemArray.valueName
      const valueName = message.replace('[keyName]', key)

      if (this.config?.errorType) {
        validatorItemArray = validator(value, valueName, this.config?.errorType)
      } else {
        validatorItemArray = validator(value, valueName)
      }
      return validatorItemArray
    }

    let validate: boolean
    for (const rule of rules) {
      let v: Validator
      if (this.config) v = validator(value, key, this.config.errorType)
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
        if (this.config?.errorType && typeof this.config?.errorType === 'function') {
          const message = informativeMessage.schema.validateSchema.keyNotDeclaredInTheSchema
          const messageError = message.replace('[keyName]', objectToValidateKey)
          const CustomError = this.config?.errorType
          throw new CustomError(messageError)
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
        if (this.config?.errorType && typeof this.config?.errorType === 'function') {
          const message = informativeMessage.schema.validateObject.schemaKeyAbsent
          const messageError = message.replace('[keyName]', schemaKey)
          const CustomError = this.config?.errorType
          throw new CustomError(messageError)
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
          if (this.config?.errorType && typeof this.config?.errorType === 'function') {
            const message = informativeMessage.schema.validateObject.notIsArray
            const messageError = message.replace('[keyName]', schemaKey)
            const CustomError = this.config?.errorType
            throw new CustomError(messageError)
          }
          this.isValid.push(false)
        }
      } else if (isNotRequiredMethodPresent()) {
        if (objectToValidateValue !== undefined) {
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
