import validex from '../index'
import { Validex } from '../validex'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'

describe('Validex', () => {
  const errorInjected = new Error('any_error')

  it('Should be able to validate the required method and return true if the value is boolean', () => {
    const value = false
    const sut = validex(value).required().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return true if the value is provided and not is boolean', () => {
    const value = 'any_value'
    const sut = validex(value).required().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return true if the value is number type and equal to 0', () => {
    const value = 0
    const sut = validex(value).required().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the required method and return false if the value is undefined', () => {
    const hasNoValue = undefined
    const sut = validex(hasNoValue).required().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the required method and throw custom error if the value is not provided', () => {
    const hasNoValue = undefined
    const sut = (): Validex => validex(hasNoValue).required(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the required method and throw error missing class param if value name is not provided', () => {
    const hasNoValue = undefined
    const valueName: any = null
    const sut = (): Validex => validex(hasNoValue, valueName, 'MISSING_PARAM').required()
    expect(sut).toThrow('missing class param: valueName is required!')
  })

  it('Should be able to validate the required method and throw MISSING_PARAM if value is not provided', () => {
    const hasNoValue = undefined
    const sut = (): Validex => validex(hasNoValue, 'value_name', 'MISSING_PARAM').required()
    expect(sut).toThrow(new MissingParamError('value_name is required!'))
  })

  it('Should be able to validate the required method and throw INVALID_PARAM if value is not provided', () => {
    const hasNoValue = undefined
    const sut = (): Validex => validex(hasNoValue, 'value_name', 'INVALID_PARAM').required()
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the required method and throw SERVER_ERROR if value is not provided', () => {
    const hasNoValue = undefined
    const sut = (): Validex => validex(hasNoValue, 'value_name', 'SERVER_ERROR').required()
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the required method and throw error if errorType is invalid', () => {
    const hasNoValue = undefined
    const errorType: any = true
    const sut = (): Validex => validex(hasNoValue, 'value_name', errorType).required()
    expect(sut).toThrow('invalid class param: errorType provided is not valid!')
  })

  it('Should be able to validate the minWord method and return true if the value has the minimum number of words', () => {
    const value = 'primary secondary'
    const sut = validex(value).minWord(2).validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the minWord method and return false if the value does not have the minimum number of words', () => {
    const value = 'primary'
    const sut = validex(value).minWord(2).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minWord method and throw error if the value does not have the minimum number of words', () => {
    const value = 'primary '
    const sut = (): Validex => validex(value).minWord(2, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the minWord method and throw MISSING_PARAM if value is not provided', () => {
    const value = 'primary '
    const sut = (): Validex => validex(value, 'value_name', 'MISSING_PARAM').minWord(2)
    expect(sut).toThrow(new MissingParamError('value_name must have at least 2 words!'))
  })

  it('Should be able to validate the minWord method and throw INVALID_PARAM if value is not provided', () => {
    const value = 'primary '
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').minWord(2)
    expect(sut).toThrow(new InvalidParamError('value_name must have at least 2 words!'))
  })

  it('Should be able to validate the minWord method and throw SERVER_ERROR type error if value is not provided', () => {
    const value = 'primary '
    const sut = (): Validex => validex(value, 'value_name', 'SERVER_ERROR').minWord(2)
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the email method and return true if email is correct', () => {
    const email = 'any_email@mail.com'
    const sut = validex(email).email().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the email method and return false if email is not correct', () => {
    const email = 'invalid_email@mail'
    const sut = validex(email).email().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the email method and throw error if email is not correct', () => {
    const email = 'invalid_email@mail'
    const sut = (): Validex => validex(email).email(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the email method and throw MISSING_PARAM error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): Validex => validex(email, 'email', 'MISSING_PARAM').email()
    expect(sut).toThrow(new MissingParamError('email format is invalid!'))
  })

  it('Should be able to validate the email method and throw INVALID_PARAM error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): Validex => validex(email, 'email', 'INVALID_PARAM').email()
    expect(sut).toThrow(new InvalidParamError('email format is invalid!'))
  })

  it('Should be able to validate the email method and throw SERVER_ERROR error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): Validex => validex(email, 'email', 'SERVER_ERROR').email()
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the uuid method and return true if uuid is correct', () => {
    const uuid = '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
    const sut = validex(uuid).uuid().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the uuid method and return false if uuid is not correct', () => {
    const uuid = 'invalid_uuid'
    const sut = validex(uuid).uuid().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the uuid method and throw error if uuid is not correct', () => {
    const uuid = 'invalid_uuid'
    const sut = (): Validex => validex(uuid).uuid(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the uuid method and throw INVALID_PARAM if uuid is not correct', () => {
    const uuid = 'invalid_uuid'
    const sut = (): Validex => validex(uuid, 'uuid', 'INVALID_PARAM').uuid()
    expect(sut).toThrow('invalid param: uuid must be a uuid type!')
  })

  it('Should be able to validate the maxLength method and return false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'
    const sut = validex(value).maxLength(20).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the maxLength method and return true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validex(value).maxLength(10).validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the maxLength method and throw error if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = (): Validex => validex(value).maxLength(10, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the maxLength method and throw INVALID_PARAM if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').maxLength(10)
    expect(sut).toThrow('invalid param: value_name must have a maximum of 10 characters!')
  })

  it('Should be able to validate the maxLength method and throw INVALID_PARAM if value is invalid', () => {
    const value = false
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').maxLength(10)
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the maxLength method and throw error if value is invalid', () => {
    const value = false
    const sut = (): Validex => validex(value, 'value_name').maxLength(10, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the maxLength method and return false if value is invalid', () => {
    const value: any = undefined
    const sut = validex(value).maxLength(10).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minLength method and return false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'
    const sut = validex(value).minLength(20).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minLength method and return true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validex(value).minLength(20).validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the minLength method and throw error if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = (): Validex => validex(value).minLength(20, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the minLength method and throw INVALID_PARAM if value is invalid', () => {
    const value = false
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').minLength(20)
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the minLength method and throw error if value is invalid', () => {
    const value = false
    const sut = (): Validex => validex(value, 'value_name').minLength(10, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the minLength method and return false if value is invalid', () => {
    const value: any = undefined
    const sut = validex(value).minLength(10).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the minLength method and throw INVALID_PARAM if value length exceed the limit', () => {
    const value = 'invalid'
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').minLength(10)
    expect(sut).toThrow('invalid param: value_name must have a minimum of 10 characters!')
  })

  it('Should be able to validate the string method and return true if the value is of type string', () => {
    const value = 'string_value'
    const sut = validex(value).string().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the string method and return false if the value is not of type string', () => {
    const value: any = false
    const sut = validex(value).string().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the string method and throw error if the value is not of type string', () => {
    const value: any = false
    const sut = (): Validex => validex(value).string(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the string method and throw INVALID_PARAM if the value is not of type string', () => {
    const value: any = false
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').string()
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the number method and return true if the value is of type number', () => {
    const value = 0
    const sut = validex(value).number().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the number method and return false if the value is not of type number', () => {
    const value: any = false
    const sut = validex(value).number().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the number method and throw error if the value is not of type number', () => {
    const value: any = false
    const sut = (): Validex => validex(value).number(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the number method and throw INVALID_PARAM if the value is not of type number', () => {
    const value: any = false
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').number()
    expect(sut).toThrow('invalid param: value_name must be a number type!')
  })

  it('Should be able to validate the boolean method and return true if the value is of type boolean', () => {
    const value = false
    const sut = validex(value).boolean()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the boolean method and return false if the value is not of type boolean', () => {
    const value: any = 'false'
    const sut = validex(value).boolean().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the boolean method and throw error if the value is not of type boolean', () => {
    const value: any = 'false'
    const sut = (): Validex => validex(value).boolean(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the boolean method and throw INVALID_PARAM if the value is not of type boolean', () => {
    const value: any = 'false'
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').boolean()
    expect(sut).toThrow('invalid param: value_name must be a boolean type!')
  })

  it('Should be able to validate the float method and return true if the value is number and float', () => {
    const value = 1.2
    const sut = validex(value).float().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the float method and return false if the value is number and is not float', () => {
    const value = 1
    const sut = validex(value).float().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the float method and return false if the value is not number', () => {
    const value: any = '1.2'
    const sut = validex(value).float().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the float method and throw error if the value is number and is not float', () => {
    const value = 1
    const sut = (): Validex => validex(value).float(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the float method and throw INVALID_PARAM if the value is number and is not float', () => {
    const value = 1
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').float()
    expect(sut).toThrow('invalid param: value_name must be a number and float!')
  })

  it('Should be able to validate the integer method and return true if the value is number and integer', () => {
    const value = 1
    const sut = validex(value).integer().validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the integer method and return false if the value is number and is not integer', () => {
    const value = 1.2
    const sut = validex(value).integer().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the integer method and return false if the value is number and is not integer', () => {
    const value = 1.2
    const sut = validex(value).integer().validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the integer method and throw error if the value is number and is not integer', () => {
    const value = 1.2
    const sut = (): Validex => validex(value).integer(errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the integer method and throw INVALID_PARAM if the value is number and is not integer', () => {
    const value = 1.2
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').integer()
    expect(sut).toThrow('invalid param: value_name must be a number and integer!')
  })

  it('Should be able to validate the date method and return true if the value is date and type ISO8601', () => {
    const value = new Date().toISOString()
    const sut = validex(value).date('ISO8601').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and throw INVALID_PARAM if the value is date and invalid type', () => {
    const value = new Date().toISOString()
    const type: any = null
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').date(type)
    expect(sut).toThrow('date method received invalid parameter: type is required!')
  })

  it('Should be able to validate the date method and throw error if the value is not correct date', () => {
    const value = '2000-30'
    const sut = (): Validex => validex(value).date('YYYY-DD-MM', errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the date method and return false if the value is not correct date', () => {
    const value = '2000-30'
    const sut = validex(value).date('YYYY-DD-MM').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type DD/MM/YYYY', () => {
    const value = '30/12/2000'
    const sut = validex(value).date('DD/MM/YYYY').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type DD-MM-YYYY', () => {
    const value = '30-12-2000'
    const sut = validex(value).date('DD-MM-YYYY').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type MM/DD/YYYY', () => {
    const value = '12/30/2000'
    const sut = validex(value).date('MM/DD/YYYY').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type MM-DD-YYYY', () => {
    const value = '12-30-2000'
    const sut = validex(value).date('MM-DD-YYYY').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type YYYY/MM/DD', () => {
    const value = '2000/12/30'
    const sut = validex(value).date('YYYY/MM/DD').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type YYYY-MM-DD', () => {
    const value = '2000-12-30'
    const sut = validex(value).date('YYYY-MM-DD').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type YYYY/DD/MM', () => {
    const value = '2000/30/12'
    const sut = validex(value).date('YYYY/DD/MM').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return true if the value is string date and type YYYY-DD-MM', () => {
    const value = '2000-30-12'
    const sut = validex(value).date('YYYY-DD-MM').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the date method and return false if the value is not correctly formatted', () => {
    const value = 'invalid-format'
    const sut = validex(value).date('YYYY-DD-MM').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and throw error if the value is not correctly formatted', () => {
    const value = 'invalid-format'
    const sut = (): Validex => validex(value).date('YYYY-DD-MM', errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the date method and throw INVALID_PARAM if the value is not correctly formatted', () => {
    const value = '2023/10'
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').date('YYYY-DD-MM')
    expect(sut).toThrow('invalid param: the date value_name is not in the format YYYY-DD-MM!')
  })

  it('Should be able to validate the date method and throw error if the value is not correctly formatted', () => {
    const value = 'invalid-format'
    const sut = validex(value).date('YYYY-DD-MM').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and return false if the type is not correctly formatted', () => {
    const value = '2023/10/15'
    const type: any = 'invalid-format'
    const sut = validex(value).date(type).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the date method and throw error if the type is not correctly formatted', () => {
    const value = 'invalid-format'
    const type: any = 'invalid-format'
    const sut = (): Validex => validex(value).date(type, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the date method and throw MISSING_PARAM if the value is not correctly formatted', () => {
    const value = 'invalid-format'
    const sut = (): Validex => validex(value, 'value_name', 'MISSING_PARAM').date('YYYY-DD-MM')
    expect(sut).toThrow('missing param: the date value_name is not in the format YYYY-DD-MM!')
  })

  it('Should be able to validate the dateGreaterThan method and return true if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validex(date).dateGreaterThan(refDate).validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the dateGreaterThan method and return false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = validex(date).dateGreaterThan(refDate).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the dateGreaterThan method and return false if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validex(date).dateGreaterThan(refDate).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the dateGreaterThan method and throw error if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = (): Validex => validex(date).dateGreaterThan(refDate, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the dateGreaterThan method and throw INVALID_PARAM if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = (): Validex => validex(date, 'value_name', 'INVALID_PARAM').dateGreaterThan(refDate)
    expect(sut).toThrow('invalid param: the date value_name must be greater than the reference date!')
  })

  it('Should be able to validate the dateGreaterThan method and throw error if the date is greater than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = (): Validex => validex(date).dateGreaterThan(refDate, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the dateGreaterThan method and throw INVALID_PARAM if the date is in an invalid format', () => {
    const date = 'invalid_data'
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = (): Validex => validex(date, 'date_name', 'INVALID_PARAM').dateGreaterThan(refDate)
    expect(sut).toThrow('invalid param: the provided date is invalid!')
  })

  it('Should be able to validate the dateGreaterThan method and return false if the date is in an invalid format', () => {
    const date = 'invalid_data'
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = validex(date).dateGreaterThan(refDate).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the dateLessThan method and return true if the date is less than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = validex(date).dateLessThan(refDate).validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the dateLessThan method and return false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validex(date).dateLessThan(refDate).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the dateLessThan method and throw error if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = (): Validex => validex(date).dateLessThan(refDate, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the dateLessThan method and return false if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = validex(date).dateLessThan(refDate).validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the dateLessThan method and return false if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = (): Validex => validex(date).dateLessThan(refDate, errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the time method and return true if the value is in the time format HH:MM', () => {
    const value = '11:05'
    const sut = validex(value).time('HH:MM').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the time method and return false if the value is not in the time format HH:MM', () => {
    const value = '11:5'
    const sut = validex(value).time('HH:MM').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the time method and throw error if the value is not in the time format HH:MM', () => {
    const value = '11:5'
    const sut = (): Validex => validex(value).time('HH:MM', errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate the time method and return true if the value is in the time format HH:MM:SS', () => {
    const value = '11:05:03'
    const sut = validex(value).time('HH:MM:SS').validate()
    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the time method and return false if the value is not in the time format HH:MM:SS', () => {
    const value = '11:55:6'
    const sut = validex(value).time('HH:MM:SS').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the time method and throw error if the value is not in the time format HH:MM:SS', () => {
    const value = '11:55:6'
    const sut = (): Validex => validex(value).time('HH:MM:SS', errorInjected)
    expect(sut).toThrow(errorInjected)
  })

  it('Should be able to validate time method and throw error if value is in correct format and invalid type', () => {
    const value = '11:55'
    const type: any = null
    const sut = (): Validex => validex(value, 'value_name', 'INVALID_PARAM').time(type)
    expect(sut).toThrow('invalid param: time method received invalid parameter: type is required!')
  })

  it('Should be able to validate the time method and return false if the time is greater than 23', () => {
    const value = '24:55:59'
    const sut = validex(value).time('HH:MM:SS').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the time method and return false if the minutes is greater than 59', () => {
    const value = '12:60:60'
    const sut = validex(value).time('HH:MM:SS').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the time method and return false if seconds is greater than 59', () => {
    const value = '12:59:60'
    const sut = validex(value).time('HH:MM:SS').validate()
    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the time method and throw error if hour, minutes or seconds are invalid', () => {
    const value = '12:59:60'
    const sut = (): Validex => validex(value).time('HH:MM:SS', errorInjected)
    expect(sut).toThrow(errorInjected)
  })
})
