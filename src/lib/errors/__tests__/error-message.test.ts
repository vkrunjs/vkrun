import { errorMessage } from '../error-message'

describe('Error Messages', () => {
  it('missingClassParam should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.constructorParams.valueName.missingClassParam
    expect(typeof message).toBe('string')
  })

  it('invalidClassParam should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.constructorParams.valueName.invalidClassParam
    expect(typeof message).toBe('string')
  })

  it('string.strict should be a string and contain [valueName]', () => {
    const message = errorMessage.validex.method.string.strict
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
  })

  it('minWord.noMinimumWords should be a string and contain [valueName] and [minWord]', () => {
    const message = errorMessage.validex.method.minWord.noMinimumWords
    expect(typeof message).toBe('string')
    expect(message.includes('[valueName]')).toBe(true)
    expect(message.includes('[minWord]')).toBe(true)
  })
})
