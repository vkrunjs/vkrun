import { isNotEqual } from '../is-not-equal'

describe('isNotEqual', () => {
  it('Should return true if values is not equal', () => {
    expect(isNotEqual('hello', 'world')).toBeTruthy()
  })

  it('Should return false if values is equal', () => {
    expect(isNotEqual('hello', 'hello')).toBeFalsy()
  })

  it('Should return false if array is equal', () => {
    const valueToCompare = [{
      a: 1,
      b: {
        c: 2,
        d: [1, 2, 3]
      },
      e: 'string',
      f: false,
      g: undefined
    }]

    const value = valueToCompare

    expect(isNotEqual(value, valueToCompare)).toBeFalsy()
  })
})
