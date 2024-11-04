import { informativeMessage } from '../../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../../types'
import { isString, received } from '../../../../../utils'

export const validateMaxLength = ({
  value,
  valueName,
  maxLength,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  maxLength: number
  indexArray: number
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined
      ? 'array index with a length less than or equal to the limit'
      : 'value with a length less than or equal to the limit',
    error: informativeMessage.string.maxLength
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[maxLength]', String(maxLength))
  }

  const handleAddFailed = (): void => {
    callbackAddFailed({
      method: 'maxLength',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }

  if (isString(value)) {
    const exceededLimit = String(value).length > maxLength
    if (exceededLimit) {
      handleAddFailed()
      return
    }
    callbackAddPassed({
      method: 'maxLength',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    message.error = informativeMessage.string.invalidValue
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
    handleAddFailed()
  }
}
