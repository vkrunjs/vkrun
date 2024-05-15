import { notOneOf } from '../not-one-of'

describe('notOneOf', () => {
  it('Should return true if the value is equal to a comparison value', () => {
    expect(notOneOf('hi', ['hello', 'world'])).toBeTruthy()
  })

  it('Should return false if the value is not equal to a comparison value', () => {
    expect(notOneOf('hello', ['hello', 'world'])).toBeFalsy()
  })
})
