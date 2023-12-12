import { validator } from '../index'

describe('Validator', () => {
  it('Should be able to validate the required method and return true if the value is provided', () => {
    const example = false
    const sut = validator.required(example)
    expect(sut).toBeTruthy()
  })
})
