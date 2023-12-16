import { validator } from '../../index'

describe('Validator', () => {
  const errorInjected = new Error('any_error')

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
    try {
      const hasNoValue = undefined
      validator.required(hasNoValue, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the minWord method and return true if the value has the minimum number of words', () => {
    const value = 'primary secondary'
    const sut = validator.minWord(value, 2)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the minWord method and return false if the value does not have the minimum number of words', () => {
    const value = 'primary'
    const sut = validator.minWord(value, 2)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minWord method and return error if the value does not have the minimum number of words', () => {
    try {
      const value = 'primary '
      validator.minWord(value, 2, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isEmail method and return true if email is correct', () => {
    const email = 'any_email@mail.com'
    const sut = validator.isEmail(email)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isEmail method and return false if email is not correct', () => {
    const email = 'invalid_email@mail'
    const sut = validator.isEmail(email)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isEmail method and return error if email is not correct', () => {
    try {
      const email = 'invalid_email@mail'
      validator.isEmail(email, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isUuid method and return true if uuid is correct', () => {
    const uuid = '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
    const sut = validator.isUuid(uuid)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isUuid method and return false if uuid is not correct', () => {
    const uuid = 'invalid_uuid'
    const sut = validator.isUuid(uuid)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isUuid method and return error if uuid is not correct', () => {
    try {
      const uuid = 'invalid_uuid'
      validator.isUuid(uuid, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the maxLength method and return false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'
    const sut = validator.maxLength(value, 20)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the maxLength method and return true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validator.maxLength(value, 10)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the maxLength method and return error if value length exceed the limit', () => {
    try {
      const value = 'exceed_the_limit'
      validator.maxLength(value, 10, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the minLength method and return false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'
    const sut = validator.minLength(value, 20)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minLength method and return true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validator.minLength(value, 20)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the minLength method and return error if value length exceed the limit', () => {
    try {
      const value = 'exceed_the_limit'
      validator.minLength(value, 20, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isString method and return true if the value is of type string', () => {
    const value = 'string_value'
    const sut = validator.isString(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isString method and return false if the value is not of type string', () => {
    const value: any = false
    const sut = validator.isString(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isString method and return error if the value is not of type string', () => {
    try {
      const value: any = false
      validator.isString(value, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isNumber method and return true if the value is of type number', () => {
    const value = 0
    const sut = validator.isNumber(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isNumber method and return false if the value is not of type number', () => {
    const value: any = false
    const sut = validator.isNumber(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isNumber method and return error if the value is not of type number', () => {
    try {
      const value: any = false
      validator.isNumber(value, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isBoolean method and return true if the value is of type boolean', () => {
    const value = false
    const sut = validator.isBoolean(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isBoolean method and return false if the value is not of type boolean', () => {
    const value: any = 'false'
    const sut = validator.isBoolean(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isBoolean method and return error if the value is not of type boolean', () => {
    try {
      const value: any = 'false'
      validator.isBoolean(value, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isFloat method and return true if the value is number and float', () => {
    const value = 1.2
    const sut = validator.isFloat(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isFloat method and return false if the value is number and is not float', () => {
    const value = 1
    const sut = validator.isFloat(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isFloat method and return false if the value is not number', () => {
    const value: any = '1.2'
    const sut = validator.isFloat(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isFloat method and return error if the value is number and is not float', () => {
    try {
      const value = 1
      validator.isFloat(value, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isInteger method and return true if the value is number and integer', () => {
    const value = 1
    const sut = validator.isInteger(value)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isInteger method and return false if the value is number and is not integer', () => {
    const value = 1.2
    const sut = validator.isInteger(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isInteger method and return false if the value is number and is not integer', () => {
    const value = 1.2
    const sut = validator.isInteger(value)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isInteger method and return error if the value is number and is not integer', () => {
    try {
      const value = 1.2
      validator.isInteger(value, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isDate method and return true if the value is date and type ISO8601', () => {
    const value = new Date().toISOString()
    const sut = validator.isDate(value, 'ISO8601')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return error if the value is date and invalid type', () => {
    try {
      const value = new Date().toISOString()
      const type: any = null
      validator.isDate(value, type)
    } catch (error) {
      const sut = error as Error
      expect(sut.message).toEqual('isDate method received invalid parameter: type is mandatory!')
    }
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type DD/MM/YYYY', () => {
    const value = '30/12/2000'
    const sut = validator.isDate(value, 'DD/MM/YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type DD-MM-YYYY', () => {
    const value = '30-12-2000'
    const sut = validator.isDate(value, 'DD-MM-YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type MM/DD/YYYY', () => {
    const value = '12/30/2000'
    const sut = validator.isDate(value, 'MM/DD/YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type MM-DD-YYYY', () => {
    const value = '12-30-2000'
    const sut = validator.isDate(value, 'MM-DD-YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY/MM/DD', () => {
    const value = '2000/12/30'
    const sut = validator.isDate(value, 'YYYY/MM/DD')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY-MM-DD', () => {
    const value = '2000-12-30'
    const sut = validator.isDate(value, 'YYYY-MM-DD')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY/DD/MM', () => {
    const value = '2000/30/12'
    const sut = validator.isDate(value, 'YYYY/DD/MM')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY-DD-MM', () => {
    const value = '2000-30-12'
    const sut = validator.isDate(value, 'YYYY-DD-MM')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return false if the value is not correct date', () => {
    const value = '2000-30'
    const sut = validator.isDate(value, 'YYYY-DD-MM')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return false if the value is not correct date', () => {
    const value = '2000-30'
    const type: any = null
    const sut = validator.isDate(value, type)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return false if the value is not correctly formatted', () => {
    try {
      const value = '2000-30'
      validator.isDate(value, 'YYYY-DD-MM', errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })
})
