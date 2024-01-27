import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest, TimeTypes } from '../../../../types'
import { received } from '../../../../utils'

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
  const regTimeHHMMSSMS = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{1,3})?$/
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

  if (type === 'HH:MM') {
    isTime = regTimeHHMM.test(String(value))
  } else if (type === 'HH:MM:SS') {
    isTime = regTimeHHMMSS.test(String(value))
  } else if (type === 'HH:MM:SS.MS') {
    isTime = regTimeHHMMSSMS.test(String(value))
  }

  if (isTime) {
    callbackAddPassed({
      method: 'time',
      name: valueName,
      expect: `format ${type}`,
      received: value
    })
  } else {
    const message = informativeMessage.string.time
    const messageError = message
      .replace('[value]', String(value))
      .replace('[type]', type)

    handleAddFailed(messageError)
  }
}
