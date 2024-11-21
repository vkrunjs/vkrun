import { isBuffer } from '../is-buffer' // Caminho onde você tem a função isBuffer

describe('isBuffer', () => {
  it('Should return true for a Buffer', () => {
    const buffer = Buffer.from('Hello World')
    expect(isBuffer(buffer)).toBeTruthy() // Espera que seja true para Buffer
  })

  it('Should return false for a string', () => {
    const string = 'Hello World'
    expect(isBuffer(string)).toBeFalsy() // Espera que seja false para string
  })

  it('Should return false for a number', () => {
    const number = 123
    expect(isBuffer(number)).toBeFalsy() // Espera que seja false para número
  })

  it('Should return false for an array', () => {
    const array = [1, 2, 3]
    expect(isBuffer(array)).toBeFalsy() // Espera que seja false para array
  })

  it('Should return false for an object', () => {
    const object = { key: 'value' }
    expect(isBuffer(object)).toBeFalsy() // Espera que seja false para objeto
  })

  it('Should return false for null', () => {
    const nullValue = null
    expect(isBuffer(nullValue)).toBeFalsy() // Espera que seja false para null
  })

  it('Should return false for undefined', () => {
    const undefinedValue = undefined
    expect(isBuffer(undefinedValue)).toBeFalsy() // Espera que seja false para undefined
  })

  it('Should return false for a boolean', () => {
    const booleanValue = true
    expect(isBuffer(booleanValue)).toBeFalsy() // Espera que seja false para booleano
  })
})
