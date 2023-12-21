import validator from './index'
import { Validator } from './validator'
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
    const validateItemArray = (value: ValidateItemArrayValue): Validator => {
      let validatorItemArray: Validator
      if (this.config) {
        validatorItemArray = validator(value, `all values in the ${key}`, this.config.errorType)
      } else {
        validatorItemArray = validator(value, `all values in the ${key}`)
      }
      return validatorItemArray
    }

    let validate: boolean
    for (const rule of rules) {
      let v: Validator
      if (this.config) v = validator(value, key, this.config.errorType)
      else v = validator(value, key)

      if (rule.method === 'string') {
        validate = v.string(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'minWord') {
        validate = v.minWord(rule.minWord ?? 0, rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'uuid') {
        validate = v.uuid(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'email') {
        validate = v.email(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'maxLength') {
        validate = v.maxLength(rule.maxLength ?? 0, rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'minLength') {
        validate = v.minLength(rule.minLength ?? 0, rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'required') {
        validate = v.required(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'number') {
        validate = v.number(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'float') {
        validate = v.float(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'integer') {
        validate = v.integer(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'boolean') {
        validate = v.boolean(rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'date') {
        validate = v.date(rule.dateType ?? 'ISO8601', rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'dateGreaterThan') {
        validate = v.dateGreaterThan(rule.dateToCompare ?? new Date(), rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'dateLessThan') {
        validate = v.dateLessThan(rule.dateToCompare ?? new Date(), rule.returnError).validate()
        this.isValid.push(validate)
      } else if (rule.method === 'time') {
        validate = v.time(rule.timeType ?? 'HH:MM:SS', rule.returnError).validate()
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

export const string = (returnError?: Error): any => {
  return {
    method: 'string',
    private: true,
    returnError
  }
}

export const minWord = (minWord: number, returnError?: Error): any => {
  return {
    method: 'minWord',
    minWord,
    private: true,
    returnError
  }
}

export const maxLength = (maxLength: number, returnError?: Error): any => {
  return {
    method: 'maxLength',
    maxLength,
    private: true,
    returnError
  }
}

export const minLength = (minLength: number, returnError?: Error): any => {
  return {
    method: 'minLength',
    minLength,
    private: true,
    returnError
  }
}

export const uuid = (returnError?: Error): any => {
  return {
    method: 'uuid',
    private: true,
    returnError
  }
}

export const email = (returnError?: Error): any => {
  return {
    method: 'email',
    private: true,
    returnError
  }
}

export const number = (returnError?: Error): any => {
  return {
    method: 'number',
    private: true,
    returnError
  }
}

export const float = (returnError?: Error): any => {
  return {
    method: 'float',
    private: true,
    returnError
  }
}

export const integer = (returnError?: Error): any => {
  return {
    method: 'integer',
    private: true,
    returnError
  }
}

export const boolean = (returnError?: Error): any => {
  return {
    method: 'boolean',
    private: true,
    returnError
  }
}

export const date = (type: DateTypes, returnError?: Error): any => {
  return {
    method: 'date',
    dateType: type,
    private: true,
    returnError
  }
}

export const dateGreaterThan = (dateToCompare: Date, returnError?: Error): any => {
  return {
    method: 'dateGreaterThan',
    dateToCompare,
    private: true,
    returnError
  }
}

export const dateLessThan = (dateToCompare: Date, returnError?: Error): any => {
  return {
    method: 'dateLessThan',
    dateToCompare,
    private: true,
    returnError
  }
}

export const time = (type: TimeTypes, returnError?: Error): any => {
  return {
    method: 'dateLessThan',
    timeType: type,
    private: true,
    returnError
  }
}

export const required = (returnError?: Error): any => {
  return {
    method: 'required',
    private: true,
    returnError
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
