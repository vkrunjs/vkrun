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

  const configurations = [
    // Validator
    { keys: ['validator', 'constructorParams', 'valueName', 'invalidClassParam'] },
    { keys: ['validator', 'constructorParams', 'valueName', 'missingClassParam'] },
    { keys: ['validator', 'method', 'string', 'strict'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'minWord', 'noMinimumWords'], reservedKeys: ['[valueName]', '[minWord]'] },
    { keys: ['validator', 'method', 'uuid', 'strict'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'email', 'strict'], reservedKeys: ['[value]'] },
    { keys: ['validator', 'method', 'maxLength', 'strict'], reservedKeys: ['[valueName]', '[maxLength]'] },
    { keys: ['validator', 'method', 'minLength', 'strict'], reservedKeys: ['[valueName]', '[minLength]'] },
    { keys: ['validator', 'method', 'number', 'strict'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'float', 'strict'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'integer', 'strict'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'boolean', 'strict'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'required', 'strict'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'date', 'invalidFormat'], reservedKeys: ['[valueName]', '[type]'] },
    { keys: ['validator', 'method', 'date', 'invalidParameter'] },
    { keys: ['validator', 'method', 'dateGreaterThan', 'invalidDate'] },
    { keys: ['validator', 'method', 'dateGreaterThan', 'limitExceeded'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'dateLessThan', 'invalidDate'] },
    { keys: ['validator', 'method', 'dateLessThan', 'limitExceeded'], reservedKeys: ['[valueName]'] },
    { keys: ['validator', 'method', 'time', 'invalidParameter'] },
    { keys: ['validator', 'method', 'time', 'invalidFormat'], reservedKeys: ['[value]', '[type]'] },

    // Schema
    { keys: ['schema', 'validateProperty', 'itemArray', 'valueName'], reservedKeys: ['[keyName]'] },
    { keys: ['schema', 'validateSchema', 'keyNotDeclaredInTheSchema'], reservedKeys: ['[keyName]'] },
    { keys: ['schema', 'validateObject', 'schemaKeyAbsent'], reservedKeys: ['[keyName]'] },
    { keys: ['schema', 'validateObject', 'notIsArray'], reservedKeys: ['[keyName]'] }
  ]

  configurations.forEach((config: { keys: string[], reservedKeys?: string[] }) => {
    const messages: any = newMessages
    if (config.keys.length === 3) {
      setValue(
        config.keys,
        messages?.[config.keys[0]]?.[config.keys[1]]?.[config.keys[2]],
        config.reservedKeys
      )
    } else if (config.keys.length === 4) {
      setValue(
        config.keys,
        messages?.[config.keys[0]]?.[config.keys[1]]?.[config.keys[2]]?.[config.keys[3]],
        config.reservedKeys
      )
    }
  })

  return true
}
