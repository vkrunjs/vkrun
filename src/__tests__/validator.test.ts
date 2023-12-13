import { validator } from '../index'

describe('Validator', () => {
  it('Should be able to validate the required method and return true if the value is boolean', () => {
    const value = false
    const sut = validator.required(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return true if the value is provided and nod is boolean', () => {
    const value = 'any_value'
    const sut = validator.required(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return false if the value is not provided', () => {
    const hasNoValue = undefined
    const sut = validator.required(hasNoValue)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the required method and return error if the value is not provided', () => {
    const hasNoValue = undefined
    const error = new Error('any_error')
    const sut = validator.required(hasNoValue, error)
    expect(sut).toEqual(error)
  })
})
