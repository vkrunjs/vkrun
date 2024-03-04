import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { received, isUUID } from '../../../../utils'

export const validateUuid = ({
  value,
  valueName,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  indexArray: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in UUID format' : 'format UUID',
    error: informativeMessage.string.uuid
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isUUID(value)) {
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
      received: received(value),
      message: message.error
    })
  }
}
