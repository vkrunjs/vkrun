import { informativeMessage } from '../../../location'
import { ErrorTest, SuccessTest } from '../../../types'
import { received } from '../../../utils'

export const validateMinWord = ({
  value,
  valueName,
  minWord,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  minWord: number
  callbackAddPassed: (success: SuccessTest) => void
  callbackAddFailed: (error: ErrorTest) => void
}): void => {
  const trimmedValue = String(value).trim()
  const words = trimmedValue.split(/\s+/)
  const hasMinOfWords = words.length >= minWord

  if (hasMinOfWords) {
    callbackAddPassed({
      method: 'minWord',
      name: valueName,
      expect: 'must have a minimum of words',
      received: value
    })
  } else {
    const message = informativeMessage.minWord.noMinimumWords
    const messageError = message
      .replace('[valueName]', valueName)
      .replace('[minWord]', String(minWord))

    callbackAddFailed({
      method: 'minWord',
      type: 'invalid value',
      name: valueName,
      expect: 'must have a minimum of words',
      received: received(value),
      message: messageError
    })
  }
}
