import { informativeMessage } from '../informative-message'

describe('Error Messages', () => {
  it('string.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.string.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('minWord.noMinimumWords should be a string and contain [valueName] and [minWord]', () => {
    const message = informativeMessage.minWord.noMinimumWords
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[minWord]')).toBe(true)
  })

  it('uuid.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.uuid.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('email.invalidValue should be a string and contain [value]', () => {
    const message = informativeMessage.email.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[value]')).toBe(true)
  })

  it('maxLength.invalidValue should be a string and contain [valueName] and [maxLength]', () => {
    const message = informativeMessage.maxLength.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[maxLength]')).toBe(true)
  })

  it('minLength.invalidValue should be a string and contain [valueName] and [minLength]', () => {
    const message = informativeMessage.minLength.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[minLength]')).toBe(true)
  })

  it('number.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.number.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('float.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.float.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('integer.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.integer.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('boolean.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.boolean.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('required.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.required.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('date.invalidFormat should be a string and contain [valueName] and [type]', () => {
    const message = informativeMessage.date.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[type]')).toBe(true)
  })

  it('dateGreaterThan.invalidValue should be a string', () => {
    const message = informativeMessage.dateGreaterThan.invalidValue
    expect(typeof message).toBe('string')
  })

  it('dateGreaterThan.limitExceeded should be a string and contain [valueName]', () => {
    const message = informativeMessage.dateGreaterThan.limitExceeded
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('dateLessThan.invalidValue should be a string', () => {
    const message = informativeMessage.dateLessThan.invalidValue
    expect(typeof message).toBe('string')
  })

  it('dateLessThan.limitExceeded should be a string and contain [valueName]', () => {
    const message = informativeMessage.dateLessThan.limitExceeded
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('time.invalidParameter should be a string', () => {
    const message = informativeMessage.time.invalidParameter
    expect(typeof message).toBe('string')
  })

  it('time.invalidValue should be a string and contain [valueName]', () => {
    const message = informativeMessage.time.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[value]')).toBe(true)
    expect(message.includes('[type]')).toBe(true)
  })

  it('array.invalidValue should be a string', () => {
    const message = informativeMessage.array.invalidValue
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })

  it('array.notIsArray should be a string and contain [keyName]', () => {
    const message = informativeMessage.array.notIsArray
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })

  it('object.keyAbsent should be a string and contain [keyName]', () => {
    const message = informativeMessage.object.keyAbsent
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })

  it('object.notIsObject should be a string and contain [valueName]', () => {
    const message = informativeMessage.object.notIsObject
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })
})
