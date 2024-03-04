import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../../types'
import { received } from '../../../../utils'

export const validateMinWord = ({
  value,
  valueName,
  minWord,
  indexArray,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  minWord: number
  indexArray: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const trimmedValue = String(value).trim()
  const words = trimmedValue.split(/\s+/)
  const hasMinOfWords = words.length >= minWord
  const message = {
    expect: indexArray !== undefined
      ? 'array index with minimum of words'
      : 'minimum of words',
    error: informativeMessage.string.minWord
      .replace('[value]', String(value))
      .replace('[valueName]', valueName)
      .replace('[minWord]', String(minWord))
  }

  if (hasMinOfWords) {
    callbackAddPassed({
      method: 'minWord',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'minWord',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
