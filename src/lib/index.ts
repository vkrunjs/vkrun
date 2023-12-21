import { Validator } from './validator'
import { ErrorTypes, ValidatorValue, ValidatorValueName } from './types'

const validator = (
  value: ValidatorValue,
  valueName?: ValidatorValueName,
  typeError?: ErrorTypes
): Validator => {
  return new Validator(value, valueName ?? '', typeError)
}

export default validator
