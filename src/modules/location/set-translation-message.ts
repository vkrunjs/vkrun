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
  if (newMessages?.validator?.method?.dateGreaterThan?.limitExceeded) {
    if (typeof newMessages.validator.method.dateGreaterThan.limitExceeded === 'string') {
      const hasValueNameKey = newMessages.validator.method.dateGreaterThan.limitExceeded.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.dateGreaterThan.limitExceeded = newMessages.validator.method.dateGreaterThan.limitExceeded
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.dateGreaterThan.limitExceeded must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.dateGreaterThan.limitExceeded must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.dateLessThan?.invalidDate) {
    if (typeof newMessages.validator.method.dateLessThan.invalidDate === 'string') {
      informativeMessage.validator.method.dateLessThan.invalidDate = newMessages.validator.method.dateLessThan.invalidDate
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.dateLessThan.invalidDate must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.dateLessThan?.limitExceeded) {
    if (typeof newMessages.validator.method.dateLessThan.limitExceeded === 'string') {
      const hasValueNameKey = newMessages.validator.method.dateLessThan.limitExceeded.includes('[valueName]')
      if (hasValueNameKey) {
        informativeMessage.validator.method.dateLessThan.limitExceeded = newMessages.validator.method.dateLessThan.limitExceeded
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.dateLessThan.limitExceeded must contain the reserved key [valueName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.dateLessThan.limitExceeded must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.time?.invalidParameter) {
    if (typeof newMessages.validator.method.time.invalidParameter === 'string') {
      informativeMessage.validator.method.time.invalidParameter = newMessages.validator.method.time.invalidParameter
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.time.invalidParameter must be a string type!')
    }
  }
  if (newMessages?.validator?.method?.time?.invalidFormat) {
    if (typeof newMessages.validator.method.time.invalidFormat === 'string') {
      const hasValueKey = newMessages.validator.method.time.invalidFormat.includes('[value]')
      const hasTypeKey = newMessages.validator.method.time.invalidFormat.includes('[type]')
      if (hasValueKey && hasTypeKey) {
        informativeMessage.validator.method.time.invalidFormat = newMessages.validator.method.time.invalidFormat
      } else {
        throw new Error('setTranslationMessage: newMessages.validator.method.time.invalidFormat must contain the reserved keys [value] and [type]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.validator.method.time.invalidFormat must be a string type!')
    }
  }
  if (newMessages?.schema?.validateProperty?.itemArray?.valueName) {
    if (typeof newMessages.schema.validateProperty.itemArray.valueName === 'string') {
      const hasKeyName = newMessages.schema.validateProperty.itemArray.valueName.includes('[keyName]')
      if (hasKeyName) {
        informativeMessage.schema.validateProperty.itemArray.valueName = newMessages.schema.validateProperty.itemArray.valueName
      } else {
        throw new Error('setTranslationMessage: newMessages.schema.validateProperty.itemArray.valueName must contain the reserved key [keyName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.schema.validateProperty.itemArray.valueName must be a string type!')
    }
  }
  if (newMessages?.schema?.validateSchema?.keyNotDeclaredInTheSchema) {
    if (typeof newMessages.schema.validateSchema.keyNotDeclaredInTheSchema === 'string') {
      const hasKeyName = newMessages.schema.validateSchema.keyNotDeclaredInTheSchema.includes('[keyName]')
      if (hasKeyName) {
        informativeMessage.schema.validateSchema.keyNotDeclaredInTheSchema = newMessages.schema.validateSchema.keyNotDeclaredInTheSchema
      } else {
        throw new Error('setTranslationMessage: newMessages.schema.validateSchema.keyNotDeclaredInTheSchema must contain the reserved key [keyName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.schema.validateSchema.keyNotDeclaredInTheSchema must be a string type!')
    }
  }
  if (newMessages?.schema?.validateObject?.schemaKeyAbsent) {
    if (typeof newMessages.schema.validateObject.schemaKeyAbsent === 'string') {
      const hasKeyName = newMessages.schema.validateObject.schemaKeyAbsent.includes('[keyName]')
      if (hasKeyName) {
        informativeMessage.schema.validateObject.schemaKeyAbsent = newMessages.schema.validateObject.schemaKeyAbsent
      } else {
        throw new Error('setTranslationMessage: newMessages.schema.validateObject.schemaKeyAbsent must contain the reserved key [keyName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.schema.validateObject.schemaKeyAbsent must be a string type!')
    }
  }
  if (newMessages?.schema?.validateObject?.notIsArray) {
    if (typeof newMessages.schema.validateObject.notIsArray === 'string') {
      const hasKeyName = newMessages.schema.validateObject.notIsArray.includes('[keyName]')
      if (hasKeyName) {
        informativeMessage.schema.validateObject.notIsArray = newMessages.schema.validateObject.notIsArray
      } else {
        throw new Error('setTranslationMessage: newMessages.schema.validateObject.notIsArray must contain the reserved key [keyName]!')
      }
    } else {
      throw new Error('setTranslationMessage: newMessages.schema.validateObject.notIsArray must be a string type!')
    }
  }
  return true
}
