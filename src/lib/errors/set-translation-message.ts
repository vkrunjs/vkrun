import { errorMessage } from './error-message'

interface SetTranslationMessage {
  validex?: {
    constructorParams?: {
      valueName?: {
        missingClassParam?: string
        invalidClassParam?: string
      }
    }
    method?: {
      string?: {
        strict?: string
      }
      minWord?: {
        noMinimumWords?: string
      }
    }
  }
}

export const setTranslationMessage = (newMessages: SetTranslationMessage): boolean => {
  if (newMessages?.validex?.constructorParams?.valueName?.invalidClassParam) {
    if (typeof newMessages.validex.constructorParams.valueName.invalidClassParam === 'string') {
      errorMessage.validex.constructorParams.valueName.invalidClassParam = newMessages.validex.constructorParams.valueName.invalidClassParam
    } else {
      throw new Error('updateErrorMessages: newMessages.validex.constructorParams.valueName.invalidClassParam must be a string type!')
    }
  }
  if (newMessages?.validex?.constructorParams?.valueName?.missingClassParam) {
    if (typeof newMessages.validex.constructorParams.valueName.missingClassParam === 'string') {
      errorMessage.validex.constructorParams.valueName.missingClassParam = newMessages.validex.constructorParams.valueName.missingClassParam
    } else {
      throw new Error('updateErrorMessages: newMessages.validex.constructorParams.valueName.missingClassParam must be a string type!')
    }
  }
  if (newMessages?.validex?.method?.string?.strict) {
    if (typeof newMessages.validex.method.string.strict === 'string') {
      const hasValueNameKey = newMessages.validex.method.string.strict.includes('[valueName]')
      if (hasValueNameKey) {
        errorMessage.validex.method.string.strict = newMessages.validex.method.string.strict
      } else {
        throw new Error('updateErrorMessages: newMessages.validex.method.string.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('updateErrorMessages: newMessages.validex.method.string.strict must be a string type!')
    }
  }
  if (newMessages?.validex?.method?.minWord?.noMinimumWords) {
    if (typeof newMessages.validex.method.minWord.noMinimumWords === 'string') {
      const hasValueNameKey = newMessages.validex.method.minWord.noMinimumWords.includes('[valueName]')
      const hasMinWordKey = newMessages.validex.method.minWord.noMinimumWords.includes('[minWord]')
      if (hasValueNameKey && hasMinWordKey) {
        errorMessage.validex.method.minWord.noMinimumWords = newMessages.validex.method.minWord.noMinimumWords
      } else {
        throw new Error('updateErrorMessages: newMessages.validex.method.minWord.noMinimumWords must contain the reserved keys [valueName] and [minWord]!')
      }
    } else {
      throw new Error('updateErrorMessages: newMessages.validex.method.minWord.noMinimumWords must be a string type!')
    }
  }
  return true
}
