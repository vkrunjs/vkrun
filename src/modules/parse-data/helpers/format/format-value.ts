import { convertToType } from './convert-to-type'
import { formatObjectValues } from './format-object-values'
import * as util from '../../../utils'

export const formatValue = (value: any, escapeSQL: boolean): any => {
  if (util.isArray(value)) {
    return value.map((v: any) => formatValue(v, escapeSQL))
  } else if (typeof value === 'object' && value !== null) {
    return formatObjectValues(value, escapeSQL)
  } else if (typeof value === 'string' && util.isISO8601(value)) {
    return new Date(value)
  } else {
    const formattedValue = convertToType(value)

    if (escapeSQL && util.isString(formattedValue)) {
      return util.parseEscapeSQL(formattedValue)
    }

    return formattedValue
  }
}
