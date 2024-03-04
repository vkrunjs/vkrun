import { informativeMessage } from '../../../location'
import { DateTypes, ErrorTest, SuccessTest } from '../../../../types'
import { received } from '../../../../utils'

export const validateDate = ({
  value,
  valueName,
  type,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  type?: DateTypes
  indexArray: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  let year: number, month: number, day: number
  let formattedDate: Date
  const message = {
    expect: indexArray !== undefined
      ? `array index in the ${type ?? 'ISO8601'} date type`
      : `${type ?? 'ISO8601'} date type`,
    error: informativeMessage.date.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[type]', type ?? 'ISO8601')
  }

  const invalidFormat = (): boolean => (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.length < 10) ||
    (typeof value === 'string' && value.length <= 10 && type === 'ISO8601')
  )

  const handleAddFailed = (): void => {
    callbackAddFailed({
      method: 'date',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }

  if (invalidFormat()) {
    handleAddFailed()
    return
  }

  switch (type) {
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
