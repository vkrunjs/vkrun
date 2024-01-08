import { informativeMessage } from '../informative-message'

describe('Error Messages', () => {
  it('validator.constructorParams.valueName.missingClassParam should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.constructorParams.valueName.missingClassParam
    expect(typeof message).toBe('string')
  })

  it('validator.constructorParams.valueName.invalidClassParam should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.constructorParams.valueName.invalidClassParam
    expect(typeof message).toBe('string')
  })

  it('validator.method.string.strict should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.string.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.minWord.noMinimumWords should be a string and contain [valueName] and [minWord]', () => {
    const message = informativeMessage.validator.method.minWord.noMinimumWords
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[minWord]')).toBe(true)
  })

  it('validator.method.uuid.strict should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.uuid.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.email.strict should be a string and contain [value]', () => {
    const message = informativeMessage.validator.method.email.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[value]')).toBe(true)
  })

  it('validator.method.maxLength.strict should be a string and contain [valueName] and [maxLength]', () => {
    const message = informativeMessage.validator.method.maxLength.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[maxLength]')).toBe(true)
  })

  it('validator.method.minLength.strict should be a string and contain [valueName] and [minLength]', () => {
    const message = informativeMessage.validator.method.minLength.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[minLength]')).toBe(true)
  })

  it('validator.method.number.strict should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.number.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.float.strict should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.float.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.integer.strict should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.integer.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.boolean.strict should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.boolean.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.required.strict should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.required.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.date.invalidFormat should be a string and contain [valueName] and [type]', () => {
    const message = informativeMessage.validator.method.date.invalidFormat
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[type]')).toBe(true)
  })

  it('validator.method.dateGreaterThan.invalidDate should be a string', () => {
    const message = informativeMessage.validator.method.dateGreaterThan.invalidDate
    expect(typeof message).toBe('string')
  })

  it('validator.method.dateGreaterThan.limitExceeded should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.dateGreaterThan.limitExceeded
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.dateLessThan.invalidDate should be a string', () => {
    const message = informativeMessage.validator.method.dateLessThan.invalidDate
    expect(typeof message).toBe('string')
  })

  it('validator.method.dateLessThan.limitExceeded should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.dateLessThan.limitExceeded
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validator.method.time.invalidParameter should be a string', () => {
    const message = informativeMessage.validator.method.time.invalidParameter
    expect(typeof message).toBe('string')
  })

  it('validator.method.time.invalidFormat should be a string and contain [valueName]', () => {
    const message = informativeMessage.validator.method.time.invalidFormat
    expect(typeof message).toBe('string')
    expect(message.includes('[value]')).toBe(true)
    expect(message.includes('[type]')).toBe(true)
  })

  it('schema.constructorParams.schema should be a string', () => {
    const message = informativeMessage.schema.constructorParams.schema
    expect(typeof message).toBe('string')
  })

  it('schema.validateProperty.itemArray.valueName should be a string', () => {
    const message = informativeMessage.schema.validateProperty.itemArray.valueName
    expect(typeof message).toBe('string')
  })

  it('schema.validateObject.schemaKeyAbsent should be a string and contain [keyName]', () => {
    const message = informativeMessage.schema.validateObject.schemaKeyAbsent
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })

  it('schema.validateObject.notIsArray should be a string and contain [keyName]', () => {
    const message = informativeMessage.schema.validateObject.notIsArray
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })

  it('schema.validateObject.notIsObject should be a string and contain [valueName]', () => {
    const message = informativeMessage.schema.validateObject.notIsObject
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })
})
