import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { received } from '../../../../utils'

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
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const isUuid = uuidRegex.test(String(value))
  const message = {
    expect: indexArray !== undefined ? 'array index in UUID format' : 'format UUID',
    error: informativeMessage.string.uuid
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
  }

  if (isUuid) {
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
