import { oneOf } from '../one-of'

describe('oneOf', () => {
  it('Should return true if the value is equal to a comparison value', () => {
    expect(oneOf('hello', ['hello', 'world'])).toBeTruthy()
  })

  it('Should return false if the value is not equal to a comparison value', () => {
    expect(oneOf('hi', ['hello', 'world'])).toBeFalsy()
  })
})
