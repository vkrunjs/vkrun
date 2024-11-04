import { informativeMessage } from '../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../types'
import { received } from '../../../../utils'

export const validateRequired = ({
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
  if (value !== undefined) {
    callbackAddPassed({
      method: 'required',
      name: valueName,
      expect: 'value other than undefined',
      received: value
    })
  } else {
    const message = informativeMessage.required
    const messageError = message
      .replace('[valueName]', valueName)
      .replace('[value]', value)

    callbackAddFailed({
      method: 'required',
      type: 'missing value',
      name: valueName,
      expect: 'value other than undefined',
      received: received(value),
      message: messageError
    })
  }
}
