import { informativeMessage } from '../../location'
import * as type from '../../../../types'
import { received } from '../../../../utils'

export const validateNullable = ({
  value,
  valueName,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  callbackAddPassed: (success: type.SuccessTest) => void
  callbackAddFailed: (error: type.ErrorTest) => void
}): void => {
  if (value === undefined) {
    const message = {
      expect: 'the value can be null, but other than undefined',
      error: informativeMessage.nullable.replace('[valueName]', valueName)
    }

    callbackAddFailed({
      method: 'nullable',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error
    })
    return
  }
  callbackAddPassed({
    method: 'nullable',
    name: valueName,
    expect: 'the value can be null, but other than undefined',
    received: received(value)
  })
}
