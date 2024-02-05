import { AnyInformativeMessage, SetLocation } from '../types'
import { locationConfig } from './location-config'
import { informativeMessage } from './informative-message'

export const setLocation = (newMessages: SetLocation): boolean => {
  const isString = (value: string | undefined, key: string): boolean => {
    if (typeof value === 'string') {
      return true
    } else if (value !== undefined && typeof value !== 'string') {
      console.error(`vkrun: setLocation ${key} must be a string type!`)
      throw new Error(`vkrun: setLocation ${key} must be a string type!`)
    }
    return false
  }

  const setValue = (keys: string[], value: string | undefined): void => {
    const keyPath = keys.join('.')
    let currentObject: AnyInformativeMessage = informativeMessage

    if (isString(value, keyPath)) {
      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey = keys[i]
        currentObject = currentObject[currentKey]
      }

      const lastKey = keys[keys.length - 1]

      currentObject[lastKey] = value
    }
  }

  locationConfig.forEach((config) => {
    const messages: any = newMessages
    let value = messages

    for (const key of config.keys) {
      value = value?.[key]
    }

    setValue(config.keys, value)
  })

  return true
}
