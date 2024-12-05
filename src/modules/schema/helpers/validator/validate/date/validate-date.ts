import { getLocation } from '../../../../../location'
import { SchemaDateConfig, SchemaValidateMethod } from '../../../../../types'
import { isString, received } from '../../../../../utils'

export const validateDate = (
  params: SchemaValidateMethod & {
    config: SchemaDateConfig
  }
): void => {
  const {
    value,
    valueName,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params

  let year: number, month: number, day: number
  let formattedDate: Date

  const message = {
    expect: `${config?.type ?? 'ISO8601'} date type`,
    error: (isString(config?.message) ? config.message : getLocation().schema.date.invalidValue)
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[type]', config?.type ?? 'ISO8601')
  }

  const invalidFormat = (): boolean => (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.length < 10) ||
    (typeof value === 'string' && value.length <= 10 && config?.type === 'ISO8601')
  )

  const handleAddFailed = (): void => {
    callbackAddFailed({
      method: 'date',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }

  if (invalidFormat()) {
    handleAddFailed()
    return
  }

  switch (config?.type) {
    case 'DD/MM/YYYY':
      [day, month, year] = String(value).split('/').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    case 'MM/DD/YYYY':
      [month, day, year] = String(value).split('/').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    case 'DD-MM-YYYY':
      [day, month, year] = String(value).split('-').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    case 'MM-DD-YYYY':
      [month, day, year] = String(value).split('-').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    case 'YYYY/MM/DD':
      [year, month, day] = String(value).split('/').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    case 'YYYY/DD/MM':
      [year, day, month] = String(value).split('/').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    case 'YYYY-MM-DD':
      [year, month, day] = String(value).split('-').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    case 'YYYY-DD-MM':
      [year, day, month] = String(value).split('-').map(Number)
      if (month > 12 || day > new Date(year, month, 0).getUTCDate()) {
        formattedDate = false as any
      } else {
        formattedDate = new Date(year, month - 1, day)
      }
      break
    default:
      formattedDate = new Date(String(value))
  }

  const isInvalidDate = !formattedDate || isNaN(formattedDate.getTime())
  if (isInvalidDate) {
    handleAddFailed()
  } else {
    callbackAddPassed({
      method: 'date',
      name: valueName,
      expect: message.expect,
      received: value
    })
  }
}
