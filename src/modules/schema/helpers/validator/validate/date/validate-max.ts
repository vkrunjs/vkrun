import { getLocation } from '../../../../../location'
import { SchemaDateMaxConfig, SchemaValidateMethod } from '../../../../../types'
import { dateToString, isString, received } from '../../../../../utils'

export const validateMaxDate = (
  params: SchemaValidateMethod & {
    config: SchemaDateMaxConfig
  }
): void => {
  const {
    value,
    valueName,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  const date = new Date(String(value))
  const isInvalidDate = isNaN(date.getTime())

  const expect = (): string => {
    if (value instanceof Date) {
      return `${dateToString(value, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')} less than or equal to ${dateToString(config.max, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC')}`
    } else {
      return 'date less than or equal to reference date'
    }
  }

  if (isInvalidDate) {
    return
  }

  const dateTimestamp = value.getTime()
  const dateToCompareTimestamp = config.max.getTime()

  const deadlineExceeded = dateTimestamp > dateToCompareTimestamp && value.getMilliseconds() >= config.max.getMilliseconds()

  if (deadlineExceeded) {
    callbackAddFailed({
      method: 'max',
      type: 'invalid value',
      name: valueName,
      expect: expect(),
      received: received(value),
      message: (isString(config?.message) ? config.message : getLocation().schema.date.min)
        .replace('[value]', dateToString(value, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC'))
        .replace('[valueName]', valueName)
        .replace('[refDate]', dateToString(config.max, 'YYYY/MM/DD HH:MM:SS.MS', 'UTC'))
    })
  } else {
    callbackAddPassed({
      method: 'max',
      name: valueName,
      expect: expect(),
      received: value
    })
  }
}
