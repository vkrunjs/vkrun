import { AnyInformativeMessage, SetTranslationMessage } from '../types'
import { informativeMessage } from './informative-message'

export const setTranslationMessage = (newMessages: SetTranslationMessage): boolean => {
  const isString = (value: string | undefined, key: string): boolean => {
    if (typeof value === 'string') {
      return true
    } else if (value !== undefined && typeof value !== 'string') {
      throw new Error(`setTranslationMessage: newMessages.${key} must be a string type!`)
    }
    return false
  }

  const setValue = (keys: string[], value: string | undefined, reservedKeys?: string[]): void => {
    const keyPath: string = keys.join('.')
    let currentObject: AnyInformativeMessage = informativeMessage

    if (isString(value, keyPath)) {
      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey: string = keys[i]
        currentObject = currentObject[currentKey]
      }

      const lastKey: string = keys[keys.length - 1]

      if (reservedKeys) {
        const hasReservedKeys = reservedKeys.every((k: string) => String(value).includes(k))
        if (!hasReservedKeys) {
          const reservedKeysString = reservedKeys.join(' and ')
          throw new Error(`setTranslationMessage: ${lastKey} must contain the reserved key(s) ${reservedKeysString}!`)
        }
      }

      currentObject[lastKey] = value
    }
  }

  // Constructor
  setValue(
    ['validator', 'constructorParams', 'valueName', 'invalidClassParam'],
    newMessages?.validator?.constructorParams?.valueName?.invalidClassParam
  )
  setValue(
    ['validator', 'constructorParams', 'valueName', 'missingClassParam'],
    newMessages?.validator?.constructorParams?.valueName?.missingClassParam
  )

  // Validator
  setValue(
    ['validator', 'method', 'string', 'strict'],
    newMessages?.validator?.method?.string?.strict,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'minWord', 'noMinimumWords'],
    newMessages?.validator?.method?.minWord?.noMinimumWords,
    ['[valueName]', '[minWord]']
  )
  setValue(
    ['validator', 'method', 'uuid', 'strict'],
    newMessages?.validator?.method?.uuid?.strict,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'email', 'strict'],
    newMessages?.validator?.method?.email?.strict,
    ['[value]']
  )
  setValue(
    ['validator', 'method', 'maxLength', 'strict'],
    newMessages?.validator?.method?.maxLength?.strict,
    ['[valueName]', '[maxLength]']
  )
  setValue(
    ['validator', 'method', 'minLength', 'strict'],
    newMessages?.validator?.method?.minLength?.strict,
    ['[valueName]', '[minLength]']
  )
  setValue(
    ['validator', 'method', 'number', 'strict'],
    newMessages?.validator?.method?.number?.strict,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'float', 'strict'],
    newMessages?.validator?.method?.float?.strict,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'integer', 'strict'],
    newMessages?.validator?.method?.integer?.strict,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'boolean', 'strict'],
    newMessages?.validator?.method?.boolean?.strict,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'required', 'strict'],
    newMessages?.validator?.method?.required?.strict,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'date', 'invalidFormat'],
    newMessages?.validator?.method?.date?.invalidFormat,
    ['[valueName]', '[type]']
  )
  setValue(
    ['validator', 'method', 'date', 'invalidParameter'],
    newMessages?.validator?.method?.date?.invalidParameter
  )
  setValue(
    ['validator', 'method', 'dateGreaterThan', 'invalidDate'],
    newMessages?.validator?.method?.dateGreaterThan?.invalidDate
  )
  setValue(
    ['validator', 'method', 'dateGreaterThan', 'limitExceeded'],
    newMessages?.validator?.method?.dateGreaterThan?.limitExceeded,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'dateLessThan', 'invalidDate'],
    newMessages?.validator?.method?.dateLessThan?.invalidDate
  )
  setValue(
    ['validator', 'method', 'dateLessThan', 'limitExceeded'],
    newMessages?.validator?.method?.dateLessThan?.limitExceeded,
    ['[valueName]']
  )
  setValue(
    ['validator', 'method', 'time', 'invalidParameter'],
    newMessages?.validator?.method?.time?.invalidParameter
  )
  setValue(
    ['validator', 'method', 'time', 'invalidFormat'],
    newMessages?.validator?.method?.time?.invalidFormat,
    ['[value]', '[type]']
  )

  // Schema
  setValue(
    ['schema', 'validateProperty', 'itemArray', 'valueName'],
    newMessages?.schema?.validateProperty?.itemArray?.valueName,
    ['[keyName]']
  )
  setValue(
    ['schema', 'validateSchema', 'keyNotDeclaredInTheSchema'],
    newMessages?.schema?.validateSchema?.keyNotDeclaredInTheSchema,
    ['[keyName]']
  )
  setValue(
    ['schema', 'validateObject', 'schemaKeyAbsent'],
    newMessages?.schema?.validateObject?.schemaKeyAbsent,
    ['[keyName]']
  )
  setValue(
    ['schema', 'validateObject', 'notIsArray'],
    newMessages?.schema?.validateObject?.notIsArray,
    ['[keyName]']
  )

  return true
}
