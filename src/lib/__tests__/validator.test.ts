import { validator } from '../../index'
import { InvalidParamError, MissingParamError } from '../errors'

describe('Validator', () => {
  const errorInjected = new Error('any_error')

  it('Should be able to validate the required method and return true if the value is boolean', () => {
    const value = false
    const sut = validator(value, 'value_name').required()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return true if the value is provided and nod is boolean', () => {
    const value = 'any_value'
    const sut = validator(value, 'value_name').required()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return false if the value is not provided', () => {
    const hasNoValue = undefined
    const sut = validator(hasNoValue, 'value_name').required()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the required method and return error if the value is not provided', () => {
    try {
      const hasNoValue = undefined
      validator(hasNoValue, 'value_name').required(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the required method and return MISSING_PARAM type error if value is not provided', () => {
    try {
      const hasNoValue = undefined
      validator(hasNoValue, 'value_name', 'MISSING_PARAM').required()
    } catch (error) {
      const sut = error as Error
      expect(sut).toEqual(new MissingParamError('value_name'))
    }
  })

  it('Should be able to validate the required method and return INVALID_PARAM type error if value is not provided', () => {
    try {
      const hasNoValue = undefined
      validator(hasNoValue, 'value_name', 'INVALID_PARAM').required()
    } catch (error) {
      const sut = error as Error
      expect(sut).toEqual(new InvalidParamError('value_name'))
    }
  })

  it('Should be able to validate the minWord method and return true if the value has the minimum number of words', () => {
    const value = 'primary secondary'
    const sut = validator(value, 'value_name').minWord(2)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the minWord method and return false if the value does not have the minimum number of words', () => {
    const value = 'primary'
    const sut = validator(value, 'value_name').minWord(2)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minWord method and return error if the value does not have the minimum number of words', () => {
    try {
      const value = 'primary '
      validator(value, 'value_name').minWord(2, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isEmail method and return true if email is correct', () => {
    const email = 'any_email@mail.com'
    const sut = validator(email, 'email').isEmail()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isEmail method and return false if email is not correct', () => {
    const email = 'invalid_email@mail'
    const sut = validator(email, 'email').isEmail()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isEmail method and return error if email is not correct', () => {
    try {
      const email = 'invalid_email@mail'
      validator(email, 'email').isEmail(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isUuid method and return true if uuid is correct', () => {
    const uuid = '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
    const sut = validator(uuid, 'uuid').isUuid()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isUuid method and return false if uuid is not correct', () => {
    const uuid = 'invalid_uuid'
    const sut = validator(uuid, 'uuid').isUuid()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isUuid method and return error if uuid is not correct', () => {
    try {
      const uuid = 'invalid_uuid'
      validator(uuid, 'uuid').isUuid(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the maxLength method and return false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'
    const sut = validator(value, 'value_name').maxLength(20)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the maxLength method and return true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validator(value, 'value_name').maxLength(10)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the maxLength method and return error if value length exceed the limit', () => {
    try {
      const value = 'exceed_the_limit'
      validator(value, 'value_name').maxLength(10, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the minLength method and return false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'
    const sut = validator(value, 'value_name').minLength(20)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minLength method and return true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validator(value, 'value_name').minLength(20)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the minLength method and return error if value length exceed the limit', () => {
    try {
      const value = 'exceed_the_limit'
      validator(value, 'value_name').minLength(20, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isString method and return true if the value is of type string', () => {
    const value = 'string_value'
    const sut = validator(value, 'value_name').isString()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isString method and return false if the value is not of type string', () => {
    const value: any = false
    const sut = validator(value, 'value_name').isString()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isString method and return error if the value is not of type string', () => {
    try {
      const value: any = false
      validator(value, 'value_name').isString(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isNumber method and return true if the value is of type number', () => {
    const value = 0
    const sut = validator(value, 'value_name').isNumber()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isNumber method and return false if the value is not of type number', () => {
    const value: any = false
    const sut = validator(value, 'value_name').isNumber()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isNumber method and return error if the value is not of type number', () => {
    try {
      const value: any = false
      validator(value, 'value_name').isNumber(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isBoolean method and return true if the value is of type boolean', () => {
    const value = false
    const sut = validator(value, 'value_name').isBoolean()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isBoolean method and return false if the value is not of type boolean', () => {
    const value: any = 'false'
    const sut = validator(value, 'value_name').isBoolean()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isBoolean method and return error if the value is not of type boolean', () => {
    try {
      const value: any = 'false'
      validator(value, 'value_name').isBoolean(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isFloat method and return true if the value is number and float', () => {
    const value = 1.2
    const sut = validator(value, 'value_name').isFloat()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isFloat method and return false if the value is number and is not float', () => {
    const value = 1
    const sut = validator(value, 'value_name').isFloat()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isFloat method and return false if the value is not number', () => {
    const value: any = '1.2'
    const sut = validator(value, 'value_name').isFloat()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isFloat method and return error if the value is number and is not float', () => {
    try {
      const value = 1
      validator(value, 'value_name').isFloat(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isInteger method and return true if the value is number and integer', () => {
    const value = 1
    const sut = validator(value, 'value_name').isInteger()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isInteger method and return false if the value is number and is not integer', () => {
    const value = 1.2
    const sut = validator(value, 'value_name').isInteger()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isInteger method and return false if the value is number and is not integer', () => {
    const value = 1.2
    const sut = validator(value, 'value_name').isInteger()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isInteger method and return error if the value is number and is not integer', () => {
    try {
      const value = 1.2
      validator(value, 'value_name').isInteger(errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isDate method and return true if the value is date and type ISO8601', () => {
    const value = new Date().toISOString()
    const sut = validator(value, 'value_name').isDate('ISO8601')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return error if the value is date and invalid type', () => {
    try {
      const value = new Date().toISOString()
      const type: any = null
      validator(value, 'value_name').isDate(type)
    } catch (error) {
      const sut = error as Error
      expect(sut.message).toEqual('isDate method received invalid parameter: type is required!')
    }
  })

  it('Should be able to validate the isDate method and return error if the value is not correct date', () => {
    try {
      const value = '2000-30'
      validator(value, 'value_name').isDate('YYYY-DD-MM', errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isDate method and return false if the value is not correct date', () => {
    const value = '2000-30'
    const sut = validator(value, 'value_name').isDate('YYYY-DD-MM')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type DD/MM/YYYY', () => {
    const value = '30/12/2000'
    const sut = validator(value, 'value_name').isDate('DD/MM/YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type DD-MM-YYYY', () => {
    const value = '30-12-2000'
    const sut = validator(value, 'value_name').isDate('DD-MM-YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type MM/DD/YYYY', () => {
    const value = '12/30/2000'
    const sut = validator(value, 'value_name').isDate('MM/DD/YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type MM-DD-YYYY', () => {
    const value = '12-30-2000'
    const sut = validator(value, 'value_name').isDate('MM-DD-YYYY')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY/MM/DD', () => {
    const value = '2000/12/30'
    const sut = validator(value, 'value_name').isDate('YYYY/MM/DD')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY-MM-DD', () => {
    const value = '2000-12-30'
    const sut = validator(value, 'value_name').isDate('YYYY-MM-DD')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY/DD/MM', () => {
    const value = '2000/30/12'
    const sut = validator(value, 'value_name').isDate('YYYY/DD/MM')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return true if the value is string date and type YYYY-DD-MM', () => {
    const value = '2000-30-12'
    const sut = validator(value, 'value_name').isDate('YYYY-DD-MM')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return false if the value is not correctly formatted', () => {
    const value = 'invalid-format'
    const sut = validator(value, 'value_name').isDate('YYYY-DD-MM')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return error if the value is not correctly formatted', () => {
    try {
      const value = 'invalid-format'
      validator(value, 'value_name').isDate('YYYY-DD-MM', errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isDate method and return true if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validator(date, 'date').dateGreaterThan(refDate)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = validator(date, 'date').dateGreaterThan(refDate)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return false if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validator(date, 'date').dateGreaterThan(refDate)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return error if the date is equal to the reference date', () => {
    try {
      const date = new Date('2000-02-02T02:00:00.000Z')
      const refDate = new Date('2000-02-02T02:00:00.000Z')
      validator(date, 'date').dateGreaterThan(refDate, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isDate method and return error if the date is greater than the reference date', () => {
    try {
      const date = new Date('2000-02-02T02:00:00.000Z')
      const refDate = new Date('2000-02-03T02:00:00.000Z')
      validator(date, 'date').dateGreaterThan(refDate, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isDate method and return true if the date is less than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = validator(date, 'value_name').dateLessThan(refDate)
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isDate method and return false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validator(date, 'date').dateLessThan(refDate)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return error if the date is greater than the reference date', () => {
    try {
      const date = new Date('2000-02-03T02:00:00.000Z')
      const refDate = new Date('2000-02-02T02:00:00.000Z')
      validator(date, 'date').dateLessThan(refDate, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isDate method and return false if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validator(date, 'date').dateLessThan(refDate)
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isDate method and return false if the date is equal to the reference date', () => {
    try {
      const date = new Date('2000-02-02T02:00:00.000Z')
      const refDate = new Date('2000-02-02T02:00:00.000Z')
      validator(date, 'date').dateLessThan(refDate, errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isTime method and return true if the value is in the time format HH:MM', () => {
    const value = '11:05'
    const sut = validator(value, 'value_name').isTime('HH:MM')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isTime method and return false if the value is not in the time format HH:MM', () => {
    const value = '11:5'
    const sut = validator(value, 'value_name').isTime('HH:MM')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isTime method and return error if the value is not in the time format HH:MM', () => {
    try {
      const value = '11:5'
      validator(value, 'value_name').isTime('HH:MM', errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate the isTime method and return true if the value is in the time format HH:MM:SS', () => {
    const value = '11:05:03'
    const sut = validator(value, 'value_name').isTime('HH:MM:SS')
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the isTime method and return false if the value is not in the time format HH:MM:SS', () => {
    const value = '11:55:6'
    const sut = validator(value, 'value_name').isTime('HH:MM:SS')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isTime method and return error if the value is not in the time format HH:MM:SS', () => {
    try {
      const value = '11:55:6'
      validator(value, 'value_name').isTime('HH:MM:SS', errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })

  it('Should be able to validate isTime method and return error if value is in correct format and invalid type', () => {
    try {
      const value = '11:55'
      const type: any = null
      validator(value, 'value_name').isTime(type, errorInjected)
    } catch (error) {
      const sut = error as Error
      expect(sut.message).toEqual('isTime method received invalid parameter: type is required!')
    }
  })

  it('Should be able to validate the isTime method and return false if the time is greater than 23', () => {
    const value = '24:55:59'
    const sut = validator(value, 'value_name').isTime('HH:MM:SS')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isTime method and return false if the minutes is greater than 59', () => {
    const value = '12:60:60'
    const sut = validator(value, 'value_name').isTime('HH:MM:SS')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isTime method and return false if seconds is greater than 59', () => {
    const value = '12:59:60'
    const sut = validator(value, 'value_name').isTime('HH:MM:SS')
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the isTime method and return error if hour, minutes or seconds are invalid', () => {
    try {
      const value = '12:59:60'
      validator(value, 'value_name').isTime('HH:MM:SS', errorInjected)
    } catch (error) {
      const sut = error
      expect(sut).toEqual(errorInjected)
    }
  })
})
