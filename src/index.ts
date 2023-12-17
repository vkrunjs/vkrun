import { Validator } from './lib/validator'
import { ErrorTypes } from './lib/validator.types'

const validator = (value: any, valueName?: string, typeError?: ErrorTypes): Validator => {
  return new Validator(value, valueName ?? '', typeError)
}

export default validator
