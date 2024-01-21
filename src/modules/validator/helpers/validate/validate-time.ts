import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest, TimeTypes } from '../../../types'
import { received } from '../../../utils'

export const validateTime = ({
  value,
  valueName,
  type,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  type: TimeTypes
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const regTimeHHMM = /^([01]\d|2[0-3]):[0-5]\d$/
  const regTimeHHMMSS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
  let isTime = false

  const handleAddFailed = (messageError: string): void => {
    callbackAddFailed({
      method: 'time',
      type: 'invalid value',
      name: valueName,
      expect: `format ${type}`,
      received: received(value),
      message: messageError
    })
  }

  if (!type || typeof type !== 'string') {
    handleAddFailed(informativeMessage.time.invalidParameter)
    return this
  } else if (type === 'HH:MM') {
    isTime = regTimeHHMM.test(String(value))
  } else if (type === 'HH:MM:SS') {
    isTime = regTimeHHMMSS.test(String(value))
  }

  if (isTime) {
    callbackAddPassed({
      method: 'time',
      name: valueName,
      expect: `format ${type}`,
      received: value
    })
  } else {
    const message = informativeMessage.time.invalidValue
    const messageError = message
      .replace('[value]', String(value))
      .replace('[type]', type)

    handleAddFailed(messageError)
  }
}
