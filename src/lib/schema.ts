import validex from './index'
import { Validex } from './validex'
import {
  Schema,
  ObjectConfig,
  ValidatePropertyKey,
  ValidatePropertyValue,
  ValidatePropertyRules,
  ValidateItemArrayValue,
  ObjectType,
  DateTypes,
  TimeTypes
} from './types'

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
      if (this.config) {
        validatorItemArray = validex(value, `all values in the ${key}`, this.config.errorType)
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

      if (rule.method === 'string') {
        validate = v.string(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'minWord') {
        validate = v.minWord(rule.minWord ?? 0, rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'uuid') {
        validate = v.uuid(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'email') {
        validate = v.email(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'maxLength') {
        validate = v.maxLength(rule.maxLength ?? 0, rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'minLength') {
        validate = v.minLength(rule.minLength ?? 0, rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'required') {
        validate = v.required(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'number') {
        validate = v.number(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'float') {
        validate = v.float(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'integer') {
        validate = v.integer(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'boolean') {
        validate = v.boolean(rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'date') {
        validate = v.date(rule.dateType ?? 'ISO8601', rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'dateGreaterThan') {
        validate = v.dateGreaterThan(rule.dateToCompare ?? new Date(), rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'dateLessThan') {
        validate = v.dateLessThan(rule.dateToCompare ?? new Date(), rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'time') {
        validate = v.time(rule.timeType ?? 'HH:MM:SS', rule.customError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'array') {
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
          throw new Error(`${objectToValidateKey} key was not declared in the schema`)
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

      if (!(schemaKey in objectToValidate)) {
        if (this.config?.errorType) {
          throw new Error(`${schemaKey} key is required!`)
        } else {
          this.isValid.push(false)
        }
      }

      const isObject = typeof objectToValidateValue === 'object' &&
                       objectToValidateValue !== null &&
                       schemaRules.method !== 'array' &&
                       !Array.isArray(objectToValidateValue)

      if (isObject) {
        validate = this.validateObject(objectToValidateValue, schemaRules)
        this.isValid.push(validate)
      } else if (schemaRules.method === 'array') {
        const isArray = Array.isArray(objectToValidateValue)
        if (isArray) {
          validate = this.validateProperty(schemaKey, objectToValidateValue, schemaRules)
          this.isValid.push(validate)
        } else {
          if (this.config?.errorType) {
            throw new Error(`${schemaKey} value must be an array!`)
          }
          this.isValid.push(false)
        }
      } else {
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

export const string = (customError?: Error): any => {
  return {
    method: 'string',
    private: true,
    customError
  }
}

export const minWord = (minWord: number, customError?: Error): any => {
  return {
    method: 'minWord',
    minWord,
    private: true,
    customError
  }
}

export const maxLength = (maxLength: number, customError?: Error): any => {
  return {
    method: 'maxLength',
    maxLength,
    private: true,
    customError
  }
}

export const minLength = (minLength: number, customError?: Error): any => {
  return {
    method: 'minLength',
    minLength,
    private: true,
    customError
  }
}

export const uuid = (customError?: Error): any => {
  return {
    method: 'uuid',
    private: true,
    customError
  }
}

export const email = (customError?: Error): any => {
  return {
    method: 'email',
    private: true,
    customError
  }
}

export const number = (customError?: Error): any => {
  return {
    method: 'number',
    private: true,
    customError
  }
}

export const float = (customError?: Error): any => {
  return {
    method: 'float',
    private: true,
    customError
  }
}

export const integer = (customError?: Error): any => {
  return {
    method: 'integer',
    private: true,
    customError
  }
}

export const boolean = (customError?: Error): any => {
  return {
    method: 'boolean',
    private: true,
    customError
  }
}

export const date = (type: DateTypes, customError?: Error): any => {
  return {
    method: 'date',
    dateType: type,
    private: true,
    customError
  }
}

export const dateGreaterThan = (dateToCompare: Date, customError?: Error): any => {
  return {
    method: 'dateGreaterThan',
    dateToCompare,
    private: true,
    customError
  }
}

export const dateLessThan = (dateToCompare: Date, customError?: Error): any => {
  return {
    method: 'dateLessThan',
    dateToCompare,
    private: true,
    customError
  }
}

export const time = (type: TimeTypes, customError?: Error): any => {
  return {
    method: 'dateLessThan',
    timeType: type,
    private: true,
    customError
  }
}

export const required = (customError?: Error): any => {
  return {
    method: 'required',
    private: true,
    customError
  }
}

export const array = (
  arrayType?: 'string' | 'number' | 'boolean' | 'date' | Schema
): any => {
  return [{
    method: 'array',
    arrayType: arrayType ?? 'any',
    private: true
  }]
}

export const createSchema = (schema: ObjectType, config?: ObjectConfig): CreateSchema => {
  return new CreateSchema(schema, config)
}
