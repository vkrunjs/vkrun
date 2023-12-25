import { SetTranslationMessage } from '../types'
import { informativeMessage } from './informative-message'

export const setTranslationMessage = (newMessages: SetTranslationMessage): boolean => {
  if (newMessages?.validator?.constructorParams?.valueName?.invalidClassParam) {
    if (typeof newMessages.validator.constructorParams.valueName.invalidClassParam === 'string') {
      informativeMessage.validator.constructorParams.valueName.invalidClassParam = newMessages.validator.constructorParams.valueName.invalidClassParam
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.constructorParams.valueName.invalidClassParam must be a string type!')
    }
  }
  if (newMessages?.validator?.constructorParams?.valueName?.missingClassParam) {
    if (typeof newMessages.validator.constructorParams.valueName.missingClassParam === 'string') {
      informativeMessage.validator.constructorParams.valueName.missingClassParam = newMessages.validator.constructorParams.valueName.missingClassParam
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.constructorParams.valueName.missingClassParam must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.string?.strict) {
    if (typeof newMessages.validator.method.string.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.string.strict.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.string.strict = newMessages.validator.method.string.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.string.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.string.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.minWord?.noMinimumWords) {
    if (typeof newMessages.validator.method.minWord.noMinimumWords === 'string') {
      const hasValueNameKey = newMessages.validator.method.minWord.noMinimumWords.includes('[valueName]')
      const hasMinWordKey = newMessages.validator.method.minWord.noMinimumWords.includes('[minWord]')
      if (hasValueNameKey && hasMinWordKey) {
        informativeMessage.validator.method.minWord.noMinimumWords = newMessages.validator.method.minWord.noMinimumWords
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.minWord.noMinimumWords must contain the reserved keys [valueName] and [minWord]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.minWord.noMinimumWords must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.uuid?.strict) {
    if (typeof newMessages.validator.method.uuid.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.uuid.strict.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.uuid.strict = newMessages.validator.method.uuid.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.uuid.strict must contain the reserved keys [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.uuid.strict must be a string type!')
    }
  }
  return true
}
