import { Validex } from './validex'
import { ErrorTypes, ValidexValue, ValidexValueName } from './types'
// export * from './schema'

const validex = (
  value: ValidexValue,
  valueName?: ValidexValueName,
  typeError?: ErrorTypes
): Validex => {
  return new Validex(value, valueName ?? '', typeError)
}

export default validex
