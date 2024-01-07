import { validator } from '../index'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'

describe('Validator', () => {
  it('Should be able to validate the required method and return passedAll to equal true if the value is boolean', () => {
    const value = false

    const sut = validator(value, 'value_name').required().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined, null or empty string',
      received: false
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the required method and return passedAll to equal true if the value is provided and not is boolean', () => {
    const value = 'any_value'

    const sut = validator(value, 'value_name').required().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined, null or empty string',
      received: 'any_value'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the required method and return passedAll to equal true if the value is number type and equal to 0', () => {
    const value = 0

    const sut = validator(value, 'value_name').required().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined, null or empty string',
      received: 0
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the required method and return passedAll to equal false if the value is undefined', () => {
    const hasNoValue = undefined

    const sut = validator(hasNoValue, 'value_name').required().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'required',
      type: 'missing value',
      name: 'value_name',
      expect: 'value other than undefined, null or empty string',
      received: 'undefined',
      message: 'value_name is required!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the required method and return passedAll to equal false if the value is null', () => {
    const valueIsNull = null

    const sut = validator(valueIsNull, 'value_name').required().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'required',
      type: 'missing value',
      name: 'value_name',
      expect: 'value other than undefined, null or empty string',
      received: null,
      message: 'value_name is required!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the required method and return passedAll to equal false if the value is string empty', () => {
    const isEmpty = ''

    const sut = validator(isEmpty, 'value_name').required().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'required',
      type: 'missing value',
      name: 'value_name',
      expect: 'value other than undefined, null or empty string',
      received: '',
      message: 'value_name is required!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the required method and throw MISSING_PARAM if value is not provided', () => {
    const hasNoValue = undefined
    const sut = (): void => validator(hasNoValue, 'value_name').required().throw(MissingParamError)
    expect(sut).toThrow(new MissingParamError('value_name is required!'))
  })

  it('Should be able to validate the required method and throw INVALID_PARAM if value is not provided', () => {
    const hasNoValue = undefined
    const sut = (): void => validator(hasNoValue, 'value_name').required().throw(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name is required!'))
  })

  it('Should be able to validate the required method and throw SERVER_ERROR if value is not provided', () => {
    const hasNoValue = undefined
    const sut = (): void => validator(hasNoValue, 'value_name').required().throw(ServerError)
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the required method and throw error if class error is invalid', () => {
    const hasNoValue = undefined
    const error: any = true
    const sut = (): any => validator(hasNoValue, 'value_name').required().throw(error)
    expect(sut).toThrow('ClassError is not a constructor')
  })

  it('Should be able to validate the required method and throw error if class error is not extends Error', () => {
    class InvalidClassError {
      private invalidParam (): boolean { return false }
    }
    const hasNoValue = ''
    const sut = (): void => validator(hasNoValue, 'value_name').required().throw(InvalidClassError)
    expect(sut).toThrow('invalid class param: class error provided is not valid!')
  })

  it('Should be able to validate the minWord method and return passedAll to equal true if the value has the minimum number of words', () => {
    const value = 'primary secondary'

    const sut = validator(value, 'value_name').minWord(2).validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'minWord',
      name: 'value_name',
      expect: 'must have a minimum of words',
      received: 'primary secondary'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minWord method and return passedAll to equal false if the value does not have the minimum number of words', () => {
    const value = 'primary'

    const sut = validator(value, 'value_name').minWord(2).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'minWord',
      type: 'invalid value',
      name: 'value_name',
      expect: 'must have a minimum of words',
      received: 'primary',
      message: 'value_name must have at least 2 words!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minWord method and throw MissingParamError if value is not provided', () => {
    const value = 'primary '
    const sut = (): void => validator(value, 'value_name').minWord(2).throw(MissingParamError)
    expect(sut).toThrow(new MissingParamError('value_name must have at least 2 words!'))
  })

  it('Should be able to validate the minWord method and throw InvalidParamError if value is not provided', () => {
    const value = 'primary '
    const sut = (): void => validator(value, 'value_name').minWord(2).throw(InvalidParamError)
    expect(sut).toThrow(new InvalidParamError('value_name must have at least 2 words!'))
  })

  it('Should be able to validate the minWord method and throw ServerError type error if value is not provided', () => {
    const value = 'primary '
    const sut = (): void => validator(value, 'value_name').minWord(2).throw(ServerError)
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the email method and return passedAll to equal true if email is correct', () => {
    const email = 'any_email@mail.com'
    const sut = validator(email, 'value_name').email().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'email',
      name: 'value_name',
      expect: 'valid email',
      received: 'any_email@mail.com'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the email method and return passedAll to equal false if email is not correct', () => {
    const email = 'invalid_email@mail'

    const sut = validator(email, 'value_name').email().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'email',
      type: 'invalid value',
      name: 'value_name',
      expect: 'valid email',
      received: 'invalid_email@mail',
      message: 'email invalid_email@mail is invalid!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the email method and throw MISSING_PARAM error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): void => validator(email, 'email').email().throw(MissingParamError)
    expect(sut).toThrow('missing param: email invalid_email@mail is invalid!')
  })

  it('Should be able to validate the email method and throw INVALID_PARAM error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): void => validator(email, 'email').email().throw(InvalidParamError)
    expect(sut).toThrow('invalid param: email invalid_email@mail is invalid!')
  })

  it('Should be able to validate the email method and throw SERVER_ERROR error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): void => validator(email, 'email').email().throw(ServerError)
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the uuid method and return passedAll to equal true if uuid is correct', () => {
    const uuid = '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'

    const sut = validator(uuid, 'uuid').uuid().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'uuid',
      name: 'uuid',
      expect: 'uuid format',
      received: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the uuid method and return passedAll to equal false if uuid is not correct', () => {
    const uuid = 'invalid_uuid'

    const sut = validator(uuid, 'uuid').uuid().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'uuid',
      type: 'invalid value',
      name: 'uuid',
      expect: 'uuid format',
      received: 'invalid_uuid',
      message: 'uuid must be a uuid type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the uuid method and throw INVALID_PARAM if uuid is not correct', () => {
    const uuid = 'invalid_uuid'
    const sut = (): void => validator(uuid, 'uuid').uuid().throw(InvalidParamError)
    expect(sut).toThrow('invalid param: uuid must be a uuid type!')
  })

  it('Should be able to validate the maxLength method and return passedAll to equal false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'

    const sut = validator(value, 'value_name').maxLength(21).validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'maxLength',
      name: 'value_name',
      expect: 'string with characters less than or equal to the limit',
      received: 'not_exceed_the_limit'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the maxLength method and return passedAll to equal true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validator(value, 'value_name').maxLength(10).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'maxLength',
      type: 'invalid value',
      name: 'value_name',
      expect: 'string with characters less than or equal to the limit',
      received: 'exceed_the_limit',
      message: 'value_name must have a maximum of 10 characters!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the maxLength method and throw INVALID_PARAM if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = (): void => validator(value, 'value_name').maxLength(10).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must have a maximum of 10 characters!')
  })

  it('Should be able to validate the maxLength method and throw INVALID_PARAM if value is invalid', () => {
    const value = false
    const sut = (): void => validator(value, 'value_name').maxLength(10).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the maxLength method and return passedAll to equal false if value is invalid', () => {
    const value: any = undefined
    const sut = validator(value, 'value_name').maxLength(10).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'maxLength',
      type: 'invalid value',
      name: 'value_name',
      expect: 'string with characters less than or equal to the limit',
      received: 'undefined',
      message: 'value_name must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and return passedAll to equal false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'

    const sut = validator(value, 'value_name').minLength(19).validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'minLength',
      name: 'value_name',
      expect: 'string with characters greater than or equal to the limit',
      received: 'not_exceed_the_limit'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and return passedAll to equal true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'

    const sut = validator(value, 'value_name').minLength(20).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'minLength',
      type: 'invalid value',
      name: 'value_name',
      expect: 'string with characters greater than or equal to the limit',
      received: 'exceed_the_limit',
      message: 'value_name must have a minimum of 20 characters!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and throw INVALID_PARAM if value is invalid', () => {
    const value = false
    const sut = (): void => validator(value, 'value_name').minLength(20).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the minLength method and return passedAll to equal false if value is invalid', () => {
    const value: any = undefined
    const sut = validator(value, 'value_name').minLength(10).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'minLength',
      type: 'invalid value',
      name: 'value_name',
      expect: 'string with characters greater than or equal to the limit',
      received: 'undefined',
      message: 'value_name must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and throw INVALID_PARAM if value length exceed the limit', () => {
    const value = 'invalid'
    const sut = (): void => validator(value, 'value_name').minLength(10).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must have a minimum of 10 characters!')
  })

  it('Should be able to validate the string method and return passedAll to equal true if the value is of type string', () => {
    const value = 'string_value'

    const sut = validator(value, 'value_name').string().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'string',
      name: 'value_name',
      expect: 'string type',
      received: 'string_value'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the string method and passedAll to equal false if the value is not of type string', () => {
    const value: any = false

    const sut = validator(value, 'value_name').string().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'value_name',
      expect: 'string type',
      received: false,
      message: 'value_name must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the string method and throw InvalidParamError if the value is not of type string', () => {
    const value: any = false
    const sut = (): void => validator(value, 'value_name').string().throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the string method and throw Error if the value is not of type string', () => {
    const value: any = false
    const sut = (): void => validator(value, 'value_name').string().throw()
    expect(sut).toThrow('value_name must be a string type!')
  })

  it('Should be able to validate the number method and return passedAll to equal true if the value is of type number', () => {
    const value = 0

    const sut = validator(value, 'value_name').number().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'number',
      name: 'value_name',
      expect: 'number type',
      received: 0
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the number method and return passedAll to equal false if the value is not of type number', () => {
    const value: any = false

    const sut = validator(value, 'value_name').number().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'number',
      type: 'invalid value',
      name: 'value_name',
      expect: 'number type',
      received: false,
      message: 'value_name must be a number type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the number method and throw INVALID_PARAM if the value is not of type number', () => {
    const value: any = false
    const sut = (): void => validator(value, 'value_name').number().throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a number type!')
  })

  it('Should be able to validate the boolean method and return passedAll to equal true if the value is of type boolean', () => {
    const value = false

    const sut = validator(value, 'value_name').boolean().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'boolean',
      name: 'value_name',
      expect: 'boolean type',
      received: false
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the boolean method and return passedAll to equal false if the value is not of type boolean', () => {
    const value: any = 'false'

    const sut = validator(value, 'value_name').boolean().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'boolean',
      type: 'invalid value',
      name: 'value_name',
      expect: 'boolean type',
      received: 'false',
      message: 'value_name must be a boolean type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the boolean method and throw INVALID_PARAM if the value is not of type boolean', () => {
    const value: any = 'false'
    const sut = (): void => validator(value, 'value_name').boolean().throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a boolean type!')
  })

  it('Should be able to validate the float method and return passedAll to equal true if the value is number and float', () => {
    const value = 1.2

    const sut = validator(value, 'value_name').float().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'float',
      name: 'value_name',
      expect: 'number float type',
      received: 1.2
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float method and return passedAll to equal false if the value is number and is not float', () => {
    const value = 1

    const sut = validator(value, 'value_name').float().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'float',
      type: 'invalid value',
      name: 'value_name',
      expect: 'number float type',
      received: 1,
      message: 'value_name must be a number and float!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float method and return passedAll to equal false if the value is not number', () => {
    const value: any = '1.2'

    const sut = validator(value, 'value_name').float().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'float',
      type: 'invalid value',
      name: 'value_name',
      expect: 'number float type',
      received: '1.2',
      message: 'value_name must be a number and float!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float method and throw INVALID_PARAM if the value is number and is not float', () => {
    const value = 1
    const sut = (): void => validator(value, 'value_name').float().throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a number and float!')
  })

  it('Should be able to validate the integer method and return passedAll to equal true if the value is number and integer', () => {
    const value = 1

    const sut = validator(value, 'value_name').integer().validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'integer',
      name: 'value_name',
      expect: 'number integer type',
      received: 1
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the integer method and return passedAll to equal false if the value is number and is not integer', () => {
    const value = 1.2

    const sut = validator(value, 'value_name').integer().validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'integer',
      type: 'invalid value',
      name: 'value_name',
      expect: 'number integer type',
      received: 1.2,
      message: 'value_name must be a number and integer!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the integer method and throw INVALID_PARAM if the value is number and is not integer', () => {
    const value = 1.2
    const sut = (): void => validator(value, 'value_name').integer().throw(InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a number and integer!')
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is date and type ISO8601', () => {
    const value = new Date('2024-01-01T06:11:09.714Z').toISOString()

    const sut = validator(value, 'value_name').date('ISO8601').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type ISO8601',
      received: '2024-01-01T06:11:09.714Z'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal false if the value is not correct date', () => {
    const value = '2000-30'

    const sut = validator(value, 'value_name').date('YYYY-DD-MM').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'date type YYYY-DD-MM',
      received: '2000-30',
      message: 'the date value_name is not in the format YYYY-DD-MM!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type DD/MM/YYYY', () => {
    const value = '30/12/2000'

    const sut = validator(value, 'value_name').date('DD/MM/YYYY').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type DD/MM/YYYY',
      received: '30/12/2000'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type DD-MM-YYYY', () => {
    const value = '30-12-2000'

    const sut = validator(value, 'value_name').date('DD-MM-YYYY').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type DD-MM-YYYY',
      received: '30-12-2000'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type MM/DD/YYYY', () => {
    const value = '12/30/2000'

    const sut = validator(value, 'value_name').date('MM/DD/YYYY').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type MM/DD/YYYY',
      received: '12/30/2000'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type MM-DD-YYYY', () => {
    const value = '12-30-2000'

    const sut = validator(value, 'value_name').date('MM-DD-YYYY').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type MM-DD-YYYY',
      received: '12-30-2000'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY/MM/DD', () => {
    const value = '2000/12/30'

    const sut = validator(value, 'value_name').date('YYYY/MM/DD').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type YYYY/MM/DD',
      received: '2000/12/30'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY-MM-DD', () => {
    const value = '2000-12-30'

    const sut = validator(value, 'value_name').date('YYYY-MM-DD').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type YYYY-MM-DD',
      received: '2000-12-30'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY/DD/MM', () => {
    const value = '2000/30/12'

    const sut = validator(value, 'value_name').date('YYYY/DD/MM').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type YYYY/DD/MM',
      received: '2000/30/12'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY-DD-MM', () => {
    const value = '2000-30-12'

    const sut = validator(value, 'value_name').date('YYYY-DD-MM').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'date',
      name: 'value_name',
      expect: 'date type YYYY-DD-MM',
      received: '2000-30-12'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal false if the value is not correctly formatted', () => {
    const value = 'invalid-format'

    const sut = validator(value, 'value_name').date('YYYY-DD-MM').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'date type YYYY-DD-MM',
      received: 'invalid-format',
      message: 'the date value_name is not in the format YYYY-DD-MM!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and throw INVALID_PARAM if the value is not correctly formatted', () => {
    const value = '2023/10'
    const sut = (): void => validator(value, 'value_name').date('YYYY-DD-MM').throw(InvalidParamError)
    expect(sut).toThrow('invalid param: the date value_name is not in the format YYYY-DD-MM!')
  })

  it('Should be able to validate the date method and throw error if the value is not correctly formatted', () => {
    const value = 'invalid-format'

    const sut = validator(value, 'value_name').date('YYYY-DD-MM').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'date',
      type: 'invalid value',
      name: 'value_name',
      expect: 'date type YYYY-DD-MM',
      received: 'invalid-format',
      message: 'the date value_name is not in the format YYYY-DD-MM!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and throw MISSING_PARAM if the value is not correctly formatted', () => {
    const value = 'invalid-format'
    const sut = (): void => validator(value, 'value_name').date('YYYY-DD-MM').throw(MissingParamError)
    expect(sut).toThrow('missing param: the date value_name is not in the format YYYY-DD-MM!')
  })

  it('Should be able to validate the dateGreaterThan method and return passedAll to equal true if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateGreaterThan(refDate).validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'dateGreaterThan',
      name: 'value_name',
      expect: '2000/03/02 00:00:00 greater than reference 2000/02/02 00:00:00',
      received: new Date('2000-02-03T02:00:00.000Z')
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateGreaterThan method and return passedAll to equal false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateGreaterThan(refDate).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'dateGreaterThan',
      type: 'invalid value',
      name: 'value_name',
      expect: '2000/02/02 00:00:00 greater than reference 2000/03/02 00:00:00',
      received: new Date('2000-02-02T02:00:00.000Z'),
      message: 'the date value_name must be greater than the reference date!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateGreaterThan method and return passedAll to equal false if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateGreaterThan(refDate).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'dateGreaterThan',
      type: 'invalid value',
      name: 'value_name',
      expect: '2000/02/02 00:00:00 greater than reference 2000/02/02 00:00:00',
      received: new Date('2000-02-02T02:00:00.000Z'),
      message: 'the date value_name must be greater than the reference date!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateGreaterThan method and throw INVALID_PARAM if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = (): void => validator(date, 'value_name').dateGreaterThan(refDate).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: the date value_name must be greater than the reference date!')
  })

  it('Should be able to validate the dateGreaterThan method and throw INVALID_PARAM if the date is in an invalid format', () => {
    const date = 'invalid_data'
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = (): void => validator(date, 'value_name').dateGreaterThan(refDate).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: the provided date is invalid!')
  })

  it('Should be able to validate the dateGreaterThan method and return passedAll to equal false if the date is in an invalid format', () => {
    const date = 'invalid_data'
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateGreaterThan(refDate).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'dateGreaterThan',
      type: 'invalid value',
      name: 'value_name',
      expect: 'date value_name greater than reference date',
      received: 'invalid_data',
      message: 'the provided date is invalid!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateLessThan method and return passedAll to equal true if the date is less than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateLessThan(refDate).validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'dateLessThan',
      name: 'value_name',
      expect: '2000/02/02 00:00:00 less than reference 2000/03/02 00:00:00',
      received: new Date('2000-02-02T02:00:00.000Z')
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateLessThan method and return passedAll to equal false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateLessThan(refDate).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'dateLessThan',
      type: 'invalid value',
      name: 'value_name',
      expect: '2000/03/02 00:00:00 less than reference 2000/02/02 00:00:00',
      received: new Date('2000-02-03T02:00:00.000Z'),
      message: 'the date value_name must be less than the reference date!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateLessThan method and return passedAll to equal false if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateLessThan(refDate).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'dateLessThan',
      type: 'invalid value',
      name: 'value_name',
      expect: '2000/02/02 00:00:00 less than reference 2000/02/02 00:00:00',
      received: new Date('2000-02-02T02:00:00.000Z'),
      message: 'the date value_name must be less than the reference date!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateLessThan method and throw INVALID_PARAM if value is not date', () => {
    const date = 'invalid_date'
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = (): void => validator(date, 'value_name').dateLessThan(refDate).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: the provided date is invalid!')
  })

  it('Should be able to validate the dateLessThan method and return passedAll to equal false if value is not date', () => {
    const date = 'invalid_date'
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator(date, 'value_name').dateLessThan(refDate).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'dateLessThan',
      type: 'invalid value',
      name: 'value_name',
      expect: 'date value_name less than reference date',
      received: 'invalid_date',
      message: 'the provided date is invalid!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateLessThan method and throw INVALID_PARAM if the date is equal to the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')
    const sut = (): void => validator(date, 'value_name').dateLessThan(refDate).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: the date value_name must be less than the reference date!')
  })

  it('Should be able to validate the time method and return passedAll to equal true if the value is in the time format HH:MM', () => {
    const value = '11:05'
    const sut = validator(value, 'value_name').time('HH:MM').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'time',
      name: 'value_name',
      expect: 'format HH:MM',
      received: '11:05'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal false if the value is not in the time format HH:MM', () => {
    const value = '11:5'

    const sut = validator(value, 'value_name').time('HH:MM').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'time',
      type: 'invalid value',
      name: 'value_name',
      expect: 'format HH:MM',
      received: '11:5',
      message: 'the time 11:5 is not in the format HH:MM'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal true if the value is in the time format HH:MM:SS', () => {
    const value = '11:05:03'

    const sut = validator(value, 'value_name').time('HH:MM:SS').validate()

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'time',
      name: 'value_name',
      expect: 'format HH:MM:SS',
      received: '11:05:03'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal false if the value is not in the time format HH:MM:SS', () => {
    const value = '11:55:6'
    const sut = validator(value, 'value_name').time('HH:MM:SS').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'time',
      type: 'invalid value',
      name: 'value_name',
      expect: 'format HH:MM:SS',
      received: '11:55:6',
      message: 'the time 11:55:6 is not in the format HH:MM:SS'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate time method and throw error if value is in correct format and invalid type', () => {
    const value = '11:55'
    const type: any = null
    const sut = (): void => validator(value, 'value_name').time(type).throw(InvalidParamError)
    expect(sut).toThrow('invalid param: time method received invalid parameter: type is required!')
  })

  it('Should be able to validate the time method and return passedAll to equal false if the time is greater than 23', () => {
    const value = '24:55:59'
    const sut = validator(value, 'value_name').time('HH:MM:SS').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'time',
      type: 'invalid value',
      name: 'value_name',
      expect: 'format HH:MM:SS',
      received: '24:55:59',
      message: 'the time 24:55:59 is not in the format HH:MM:SS'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal false if the minutes is greater than 59', () => {
    const value = '12:60:60'
    const sut = validator(value, 'value_name').time('HH:MM:SS').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'time',
      type: 'invalid value',
      name: 'value_name',
      expect: 'format HH:MM:SS',
      received: '12:60:60',
      message: 'the time 12:60:60 is not in the format HH:MM:SS'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal false if seconds is greater than 59', () => {
    const value = '12:59:60'
    const sut = validator(value, 'value_name').time('HH:MM:SS').validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'time',
      type: 'invalid value',
      name: 'value_name',
      expect: 'format HH:MM:SS',
      received: '12:59:60',
      message: 'the time 12:59:60 is not in the format HH:MM:SS'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal false if the type is not string type', () => {
    const value = '12:59:60'
    const type: any = false
    const sut = validator(value, 'value_name').time(type).validate()

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'time',
      type: 'invalid value',
      name: 'value_name',
      expect: 'format false',
      received: '12:59:60',
      message: 'time method received invalid parameter: type is required!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and throw INVALID_PARAM if the value is not time', () => {
    const value = false
    const sut = (): void => validator(value, 'value_name').time('HH:MM:SS').throw(InvalidParamError)
    expect(sut).toThrow('invalid param: the time false is not in the format HH:MM:SS')
  })
})
