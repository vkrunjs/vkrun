import * as util from '../utils'

export const convertExpiresIn = (expiresIn: string | number): number => {
  if (util.isString(expiresIn) && util.isEmpty(expiresIn)) {
    return 0
  } else if (util.isNumber(expiresIn)) {
    return expiresIn * 1000
  }

  const regex = /^(\d+)([mhd])$/
  const matches = expiresIn.match(regex) ?? []

  const value = parseInt(matches[1])
  const unit = matches[2]

  if (unit === 'm') {
    return value * 60 * 1000 // minutes
  } else if (unit === 'h') {
    return value * 60 * 60 * 1000 // hours
  } else if (unit === 'd') {
    return value * 24 * 60 * 60 * 1000 // days
  } else {
    return 0
  }
}
