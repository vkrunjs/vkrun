import * as util from '../utils'

export const validateTimeFormat = (expiresIn: number | string, module: string): void => {
  const regex = /^(\d+)([mhd])$/

  if (!util.isNumber(expiresIn) && !(util.isString(expiresIn) && regex.test(expiresIn))) {
    throw new Error(`vkrun-${module}: invalid time format. Use a number or string in the example format: "5m", "3h", or "2d".`)
  }
}
