import { errorMessage } from '../error-message'

describe('Error Messages', () => {
  it('validex.constructorParams.valueName.missingClassParam should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.constructorParams.valueName.missingClassParam
    expect(typeof message).toBe('string')
  })

  it('validex.constructorParams.valueName.invalidClassParam should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.constructorParams.valueName.invalidClassParam
    expect(typeof message).toBe('string')
  })

  it('validex.method.string.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.string.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.minWord.noMinimumWords should be a string and contain [valueName] and [minWord]', () => {
    const message = errorMessage.validex.method.minWord.noMinimumWords
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[minWord]')).toBe(true)
  })

  it('validex.method.uuid.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.uuid.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.email.strict should be a string and contain [value]', () => {
    const message = errorMessage.validex.method.email.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[value]')).toBe(true)
  })

  it('validex.method.maxLength.strict should be a string and contain [valueName] and [maxLength]', () => {
    const message = errorMessage.validex.method.maxLength.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[maxLength]')).toBe(true)
  })

  it('validex.method.minLength.strict should be a string and contain [valueName] and [minLength]', () => {
    const message = errorMessage.validex.method.minLength.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[minLength]')).toBe(true)
  })

  it('validex.method.number.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.number.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.float.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.float.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.integer.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.integer.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.boolean.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.boolean.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.required.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.required.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.date.invalidFormat should be a string and contain [valueName] and [type]', () => {
    const message = errorMessage.validex.method.date.invalidFormat
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[type]')).toBe(true)
  })

  it('validex.method.date.invalidParameter should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.date.invalidParameter
    expect(typeof message).toBe('string')
  })

  it('validex.method.dateGreaterThan.invalidDate should be a string', () => {
    const message = errorMessage.validex.method.dateGreaterThan.invalidDate
    expect(typeof message).toBe('string')
  })

  it('validex.method.dateGreaterThan.limitExceeded should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.dateGreaterThan.limitExceeded
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.dateLessThan.invalidDate should be a string', () => {
    const message = errorMessage.validex.method.dateLessThan.invalidDate
    expect(typeof message).toBe('string')
  })

  it('validex.method.dateLessThan.limitExceeded should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.dateLessThan.limitExceeded
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('validex.method.time.invalidParameter should be a string', () => {
    const message = errorMessage.validex.method.time.invalidParameter
    expect(typeof message).toBe('string')
  })

  it('validex.method.time.invalidFormat should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.time.invalidFormat
    expect(typeof message).toBe('string')
    expect(message.includes('[value]')).toBe(true)
    expect(message.includes('[type]')).toBe(true)
  })

  it('schema.validateProperty.itemArray.valueName should be a string', () => {
    const message = errorMessage.schema.validateProperty.itemArray.valueName
    expect(typeof message).toBe('string')
  })

  it('schema.validateSchema.keyNotDeclaredInTheSchema should be a string and contain [keyName]', () => {
    const message = errorMessage.schema.validateSchema.keyNotDeclaredInTheSchema
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })

  it('schema.validateObject.schemaKeyAbsent should be a string and contain [keyName]', () => {
    const message = errorMessage.schema.validateObject.schemaKeyAbsent
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })

  it('schema.validateObject.notIsArray should be a string and contain [keyName]', () => {
    const message = errorMessage.schema.validateObject.notIsArray
    expect(typeof message).toBe('string')
    expect(message.includes('[keyName]')).toBe(true)
  })
})
