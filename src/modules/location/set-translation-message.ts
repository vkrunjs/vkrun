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
        throw new Error('setTranslationMessage: newMessages.validator.method.uuid.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.uuid.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.email?.strict) {
    if (typeof newMessages.validator.method.email.strict === 'string') {
      const hasValueKey = newMessages.validator.method.email.strict.includes('[value]')
      if (hasValueKey) {
        informativeMessage.validator.method.email.strict = newMessages.validator.method.email.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.email.strict must contain the reserved key [value]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.email.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.maxLength?.strict) {
    if (typeof newMessages.validator.method.maxLength.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.maxLength.strict.includes('[valueName]')
      const hasMaxLengthKey = newMessages.validator.method.maxLength.strict.includes('[maxLength]')
      if (hasValueNameKey && hasMaxLengthKey) {
        informativeMessage.validator.method.maxLength.strict = newMessages.validator.method.maxLength.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.maxLength.strict must contain the reserved keys [valueName] and [maxLength]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.maxLength.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.minLength?.strict) {
    if (typeof newMessages.validator.method.minLength.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.minLength.strict.includes('[valueName]')
      const hasMinLengthKey = newMessages.validator.method.minLength.strict.includes('[minLength]')
      if (hasValueNameKey && hasMinLengthKey) {
        informativeMessage.validator.method.minLength.strict = newMessages.validator.method.minLength.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.minLength.strict must contain the reserved keys [valueName] and [minLength]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.minLength.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.number?.strict) {
    if (typeof newMessages.validator.method.number.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.number.strict.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.number.strict = newMessages.validator.method.number.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.number.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.number.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.float?.strict) {
    if (typeof newMessages.validator.method.float.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.float.strict.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.float.strict = newMessages.validator.method.float.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.float.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.float.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.integer?.strict) {
    if (typeof newMessages.validator.method.integer.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.integer.strict.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.integer.strict = newMessages.validator.method.integer.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.integer.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.integer.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.boolean?.strict) {
    if (typeof newMessages.validator.method.boolean.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.boolean.strict.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.boolean.strict = newMessages.validator.method.boolean.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.boolean.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.boolean.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.required?.strict) {
    if (typeof newMessages.validator.method.required.strict === 'string') {
      const hasValueNameKey = newMessages.validator.method.required.strict.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.required.strict = newMessages.validator.method.required.strict
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.required.strict must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.required.strict must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.date?.invalidFormat) {
    if (typeof newMessages.validator.method.date.invalidFormat === 'string') {
      const hasValueNameKey = newMessages.validator.method.date.invalidFormat.includes('[valueName]')
      const hasTypeKey = newMessages.validator.method.date.invalidFormat.includes('[type]')
      if (hasValueNameKey && hasTypeKey) {
        informativeMessage.validator.method.date.invalidFormat = newMessages.validator.method.date.invalidFormat
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.date.invalidFormat must contain the reserved keys [valueName] and [type]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.date.invalidFormat must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.date?.invalidParameter) {
    if (typeof newMessages.validator.method.date.invalidParameter === 'string') {
      informativeMessage.validator.method.date.invalidParameter = newMessages.validator.method.date.invalidParameter
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.date.invalidParameter must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.dateGreaterThan?.invalidDate) {
    if (typeof newMessages.validator.method.dateGreaterThan.invalidDate === 'string') {
      informativeMessage.validator.method.dateGreaterThan.invalidDate = newMessages.validator.method.dateGreaterThan.invalidDate
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.dateGreaterThan.invalidDate must be a string type!')
    }
  }
  return true
}
