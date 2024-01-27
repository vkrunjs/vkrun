import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { received } from '../../../../utils'

export const validateUuid = ({
  value,
  valueName,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const isUuid = uuidRegex.test(String(value))

  if (isUuid) {
    callbackAddPassed({
      method: 'UUID',
      name: valueName,
      expect: 'UUID format',
      received: value
    })
  } else {
    const message = informativeMessage.string.uuid
    const messageError = message.replace('[valueName]', valueName)

    callbackAddFailed({
      method: 'UUID',
      type: 'invalid value',
      name: valueName,
      expect: 'UUID format',
      received: received(value),
      message: messageError
    })
  }
}
