import { isBuffer } from '../is-buffer'

describe('isBuffer', () => {
  it('Should return true for a Buffer', () => {
    const buffer = Buffer.from('Hello World')
    expect(isBuffer(buffer)).toBeTruthy()
  })

  it('Should return false for a string', () => {
    const string = 'Hello World'
    expect(isBuffer(string)).toBeFalsy()
  })

  it('Should return false for a number', () => {
    const number = 123
    expect(isBuffer(number)).toBeFalsy()
  })

  it('Should return false for an array', () => {
    const array = [1, 2, 3]
    expect(isBuffer(array)).toBeFalsy()
  })

  it('Should return false for an object', () => {
    const object = { key: 'value' }
    expect(isBuffer(object)).toBeFalsy()
  })

  it('Should return false for null', () => {
    const nullValue = null
    expect(isBuffer(nullValue)).toBeFalsy()
  })

  it('Should return false for undefined', () => {
    const undefinedValue = undefined
    expect(isBuffer(undefinedValue)).toBeFalsy()
  })

  it('Should return false for a boolean', () => {
    const booleanValue = true
    expect(isBuffer(booleanValue)).toBeFalsy()
  })
})
