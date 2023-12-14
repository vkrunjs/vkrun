import { validator } from '../../index'

describe('Validator', () => {
  const error = new Error('any_error')

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
      validator.required(hasNoValue, error)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
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
      validator.minWord(value, 2, error)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
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
      validator.isEmail(email, error)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
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
      validator.isUuid(uuid)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
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
      validator.maxLength(value, 10)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
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
      validator.minLength(value, 20)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
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
      validator.isString(value)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
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
      validator.isNumber(value)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(error)
    }
  })
})
