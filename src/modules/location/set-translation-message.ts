import { AnyInformativeMessage, SetTranslationMessage } from '../types'
import { locationConfig } from './location-config'
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
    const keyPath = keys.join('.')
    let currentObject: AnyInformativeMessage = informativeMessage

    if (isString(value, keyPath)) {
      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey = keys[i]
        currentObject = currentObject[currentKey]
      }

      const lastKey = keys[keys.length - 1]

      if (reservedKeys) {
        const hasReservedKeys = reservedKeys.every((k) => String(value).includes(k))
        if (!hasReservedKeys) {
          const reservedKeysString = reservedKeys.join(' and ')
          throw new Error(`setTranslationMessage: ${lastKey} must contain the reserved key(s) ${reservedKeysString}!`)
        }
      }

      currentObject[lastKey] = value
    }
  }

  locationConfig.forEach((config) => {
    const messages: any = newMessages
    let value = messages

    for (const key of config.keys) {
      value = value?.[key]
    }

    setValue(config.keys, value, config.reservedKeys)
  })

  return true
}
