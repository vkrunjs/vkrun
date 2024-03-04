import * as type from '../../../../types'
import * as util from '../../../../utils'

export const parseJSON = (request: type.Request, escapeSQL: boolean): JSON => {
  const parsedBody = JSON.parse(request.body, (_key, value) => {
    if (util.isString(value) && util.isISO8601(value)) {
      return new Date(value)
    } else if (util.isString(value) && escapeSQL) {
      return util.parseEscapeSQL(value)
    }
    return value
  })
  return parsedBody
}
