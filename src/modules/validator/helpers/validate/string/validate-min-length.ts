import { informativeMessage } from '../../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { isString, received } from '../../../../utils'

export const validateMinLength = ({
  value,
  valueName,
  minLength,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  minLength: number
  indexArray: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined
      ? 'array index with a length greater than or equal to the limit'
      : 'value with a length greater than or equal to the limit',
    error: informativeMessage.string.minLength
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[minLength]', String(minLength))
  }

  const handleAddFailed = (): void => {
    callbackAddFailed({
      method: 'minLength',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }

  if (isString(value)) {
    const exceededLimit = String(value).length < minLength
    if (exceededLimit) {
      handleAddFailed()
      return
    }
    callbackAddPassed({
      method: 'minLength',
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
