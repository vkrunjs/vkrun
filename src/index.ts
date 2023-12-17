import { Validator } from './lib/validator'
import { ErrorTypes } from './lib/validator.types'

export const validator = (value: any, valueName: string, typeError?: ErrorTypes): Validator => {
  return new Validator(value, valueName, typeError)
}
