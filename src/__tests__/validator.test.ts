import { validator } from '../index'

describe('Validator', () => {
  it('Should be able to validate the required method and return true if the value is provided', () => {
    const example = false
    const sut = validator.required(example)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return false if the value is not provided', () => {
    const example = undefined
    const sut = validator.required(example)
    expect(sut).toBeFalsy()
  })
})
