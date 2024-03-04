import * as util from '../../../../utils'

export const convertToType = (value: string): string | number | boolean | Date => {
  const isNumberWithoutLeadingZero = /^-?\d+(\.\d+)?$/.test(value) && !/^0\d/.test(value)

  if (isNumberWithoutLeadingZero) {
    if (Number.isInteger(Number(value))) {
      return parseInt(value, 10)
    } else {
      return parseFloat(value)
    }
  }

  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value.toLowerCase() === 'true'
  }

  if (util.isISO8601(value)) {
    return new Date(value)
  }

  return value
}
