import { isISO8601 } from '../../../utils'

export const convertToType = (value: string): string | number | boolean | Date | bigint => {
  const isNumberWithoutLeadingZero = /^-?\d+(\.\d+)?$/.test(value) && !/^0\d/.test(value)

  if (isNumberWithoutLeadingZero) {
    const asNumber = Number(value)

    if (Number.isSafeInteger(asNumber)) {
      return asNumber % 1 === 0 ? asNumber : parseFloat(value)
    }

    if (/^-?\d+$/.test(value)) {
      return BigInt(value)
    }

    return parseFloat(value)
  }

  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value.toLowerCase() === 'true'
  }

  if (isISO8601(value)) {
    return new Date(value)
  }

  return value
}
