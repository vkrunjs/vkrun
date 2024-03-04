import { informativeMessage } from '../../../location'
import * as type from '../../../../types'
import * as util from '../../../../utils'

export const validateUuid = ({
  value,
  valueName,
  uuidVersion,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  uuidVersion?: type.UUIDVersion
  indexArray: number
  callbackAddPassed: (success: type.SuccessTest) => void
  callbackAddFailed: (error: type.ErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in UUID format' : 'format UUID',
    error: informativeMessage.string.uuid
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (util.isUUID(value, uuidVersion)) {
    callbackAddPassed({
      method: 'UUID',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'UUID',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: util.received(value),
      message: message.error
    })
  }
}
