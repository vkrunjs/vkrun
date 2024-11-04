import { informativeMessage } from '../../location'
import { received } from '../../../../utils'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../types'

export const validateNullable = ({
  value,
  valueName,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  if (value === undefined) {
    const message = {
      expect: 'the value can be null, but other than undefined',
      error: informativeMessage.nullable
        .replace('[valueName]', valueName)
        .replace('[value]', value)
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
