import { Validator } from './validator'
import { ErrorTypes, ValidatorValue, ValidatorValueName } from './types'
// export * from './schema'

const validator = (
  value: ValidatorValue,
  valueName?: ValidatorValueName,
  typeError?: ErrorTypes
): Validator => {
  return new Validator(value, valueName ?? '', typeError)
}

export default validator
