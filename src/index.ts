import { Validex } from './lib/validex'
import { ErrorTypes, ValidexValue, ValidexValueName } from './lib/types'
export * from './lib/schema'

const validex = (
  value: ValidexValue,
  valueName?: ValidexValueName,
  typeError?: ErrorTypes
): Validex => {
  return new Validex(value, valueName ?? '', typeError)
}

export default validex
