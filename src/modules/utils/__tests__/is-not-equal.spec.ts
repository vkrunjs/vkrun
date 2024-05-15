import { isNotEqual } from '../is-not-equal'

describe('isNotEqual', () => {
  it('Should return true if values is not equal', () => {
    expect(isNotEqual('hello', 'world')).toBeTruthy()
  })

  it('Should return false if values is equal', () => {
    expect(isNotEqual('hello', 'hello')).toBeFalsy()
  })
})
