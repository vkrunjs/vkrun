import { getLocation } from '../../../../../location'
import { SchemaStringTimeConfig, SchemaValidateMethod } from '../../../../../types'
import { isString, received } from '../../../../../utils'

export const validateTime = (
  params: SchemaValidateMethod & {
    config: SchemaStringTimeConfig
  }
): void => {
  const {
    value,
    valueName,
    config,
    callbackAddPassed,
    callbackAddFailed
  } = params
  if (!['HH:MM', 'HH:MM:SS', 'HH:MM:SS.MS'].includes(config.type)) {
    console.error('vkrun-schema: time method received invalid parameter!')
    throw Error('vkrun-schema: time method received invalid parameter!')
  }

  const regTimeHHMM = /^([01]\d|2[0-3]):[0-5]\d$/
  const regTimeHHMMSS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
  const regTimeHHMMSSMS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{1,3})?$/
  let isTime = false
  const message = {
    expect: `${config.type} format`,
    error: (isString(config?.message) ? config.message : getLocation().schema.string.time)
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[type]', config.type)
  }

  if (config.type === 'HH:MM') {
    isTime = regTimeHHMM.test(String(value))
  } else if (config.type === 'HH:MM:SS') {
    isTime = regTimeHHMMSS.test(String(value))
  } else if (config.type === 'HH:MM:SS.MS') {
    isTime = regTimeHHMMSSMS.test(String(value))
  }

  if (isTime) {
    callbackAddPassed({
      method: 'time',
      name: valueName,
      expect: message.expect,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'time',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
  }
}
