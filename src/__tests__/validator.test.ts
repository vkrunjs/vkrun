import { validator } from '../index'

describe('Validator', () => {
  it('Should be able to validate the required method and return true if the value is provided', () => {
    const value = false
    const sut = validator.required(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return false if the value is not provided', () => {
    const value = undefined
    const sut = validator.required(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the required method and return error if the value is not provided', () => {
    const hasNoValue = undefined
    const error = new Error('error message')
    const sut = validator.required(hasNoValue, error)
    expect(sut).toEqual(error)
  })
})
