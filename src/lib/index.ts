import { Validator } from './validator'
import { ErrorTypes } from './types'

const validator = (value: any, valueName?: string, typeError?: ErrorTypes): Validator => {
  return new Validator(value, valueName ?? '', typeError)
}

export default validator
