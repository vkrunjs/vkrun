import { validator } from '../index'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'

describe('Validator', () => {
  it('Should be able to validate the minWord method and return passedAll to equal true if the value has the minimum number of words', () => {
    const value = 'primary secondary'

    const sut = validator().minWord(2).test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 'primary secondary'
      },
      {
        method: 'minWord',
        name: 'value_name',
        expect: 'must have a minimum of words',
        received: 'primary secondary'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minWord method and return passedAll to equal false if the value does not have the minimum number of words', () => {
    const value = 'primary'

    const sut = validator().minWord(2).test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'primary'
    }])
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
    const sut = (): void => validator().minWord(2).throw(value, 'value_name', MissingParamError)
    expect(sut).toThrow(
      new MissingParamError('value_name must have at least 2 words!')
    )
  })

  it('Should be able to validate the minWord method and throw InvalidParamError if value is not provided', () => {
    const value = 'primary '
    const sut = (): void => validator().minWord(2).throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow(
      new InvalidParamError('value_name must have at least 2 words!')
    )
  })

  it('Should be able to validate the minWord method and throw ServerError type error if value is not provided', () => {
    const value = 'primary '
    const sut = (): void => validator().minWord(2).throw(value, 'value_name', ServerError)
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the email method and return passedAll to equal true if email is correct', () => {
    const email = 'any_email-.+0@mail.com'
    const sut = validator().email().test(email, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 'any_email-.+0@mail.com'
      },
      {
        method: 'email',
        name: 'value_name',
        expect: 'valid email',
        received: 'any_email-.+0@mail.com'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the email method and return passedAll to equal false if email is not correct', () => {
    const email = 'invalid_email@mail'

    const sut = validator().email().test(email, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'invalid_email@mail'
    }])
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
    const sut = (): void => validator().email().throw(email, 'email', MissingParamError)
    expect(sut).toThrow('missing param: email invalid_email@mail is invalid!')
  })

  it('Should be able to validate the email method and throw INVALID_PARAM error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): void => validator().email().throw(email, 'email', InvalidParamError)
    expect(sut).toThrow('invalid param: email invalid_email@mail is invalid!')
  })

  it('Should be able to validate the email method and throw SERVER_ERROR error if the email is not the correct format', () => {
    const email = 'invalid_email@mail'
    const sut = (): void => validator().email().throw(email, 'email', ServerError)
    expect(sut).toThrow(new ServerError())
  })

  it('Should be able to validate the uuid method and return passedAll to equal true if uuid is correct', () => {
    const uuid = '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'

    const sut = validator().uuid().test(uuid, 'uuid')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'uuid',
        expect: 'value other than undefined',
        received: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
      },
      {
        method: 'uuid',
        name: 'uuid',
        expect: 'uuid format',
        received: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the uuid method and return passedAll to equal false if uuid is not correct', () => {
    const uuid = 'invalid_uuid'

    const sut = validator().uuid().test(uuid, 'uuid')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'uuid',
      expect: 'value other than undefined',
      received: 'invalid_uuid'
    }])
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
    const sut = (): void => validator().uuid().throw(uuid, 'uuid', InvalidParamError)
    expect(sut).toThrow('invalid param: uuid must be a uuid type!')
  })

  it('Should be able to validate the maxLength method and return passedAll to equal false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'

    const sut = validator().maxLength(21).test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 'not_exceed_the_limit'
      },
      {
        method: 'maxLength',
        name: 'value_name',
        expect: 'string with characters less than or equal to the limit',
        received: 'not_exceed_the_limit'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the maxLength method and return passedAll to equal true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'
    const sut = validator().maxLength(10).test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'exceed_the_limit'
    }])
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
    const sut = (): void => validator().maxLength(10).throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must have a maximum of 10 characters!')
  })

  it('Should be able to validate the maxLength method and throw INVALID_PARAM if value is invalid', () => {
    const value = false
    const sut = (): void => validator().maxLength(10).throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the maxLength method and return passedAll to equal false if value is invalid', () => {
    const value: any = undefined
    const sut = validator().maxLength(10).test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        name: 'value_name',
        type: 'missing value',
        expect: 'value other than undefined',
        received: 'undefined',
        message: 'value_name is required!'
      },
      {
        method: 'maxLength',
        type: 'invalid value',
        name: 'value_name',
        expect: 'string with characters less than or equal to the limit',
        received: 'undefined',
        message: 'value_name must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and return passedAll to equal false if value length does not exceed the limit', () => {
    const value = 'not_exceed_the_limit'

    const sut = validator().minLength(19).test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 'not_exceed_the_limit'
      },
      {
        method: 'minLength',
        name: 'value_name',
        expect: 'string with characters greater than or equal to the limit',
        received: 'not_exceed_the_limit'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and return passedAll to equal true if value length exceed the limit', () => {
    const value = 'exceed_the_limit'

    const sut = validator().minLength(20).test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'exceed_the_limit'
    }])
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
    const sut = (): void => validator().minLength(20).throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a string type!')
  })

  it('Should be able to validate the minLength method and return passedAll to equal false if value is invalid', () => {
    const value: any = undefined
    const sut = validator().minLength(10).test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        name: 'value_name',
        type: 'missing value',
        expect: 'value other than undefined',
        received: 'undefined',
        message: 'value_name is required!'
      },
      {
        method: 'minLength',
        type: 'invalid value',
        name: 'value_name',
        expect: 'string with characters greater than or equal to the limit',
        received: 'undefined',
        message: 'value_name must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the minLength method and throw INVALID_PARAM if value length exceed the limit', () => {
    const value = 'invalid'
    const sut = (): void => validator().minLength(10).throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must have a minimum of 10 characters!')
  })

  it('Should be able to validate the number method and return passedAll to equal true if the value is of type number', () => {
    const value = 0

    const sut = validator().number().test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 0
      },
      {
        method: 'number',
        name: 'value_name',
        expect: 'number type',
        received: 0
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the number method and return passedAll to equal false if the value is not of type number', () => {
    const value: any = false

    const sut = validator().number().test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: false
    }])
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
    const sut = (): void => validator().number().throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a number type!')
  })

  it('Should be able to validate the boolean method and return passedAll to equal true if the value is of type boolean', () => {
    const value = false

    const sut = validator().boolean().test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: false
      },
      {
        method: 'boolean',
        name: 'value_name',
        expect: 'boolean type',
        received: false
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the boolean method and return passedAll to equal false if the value is not of type boolean', () => {
    const value: any = 'false'

    const sut = validator().boolean().test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'false'
    }])
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
    const sut = (): void => validator().boolean().throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a boolean type!')
  })

  it('Should be able to validate the float method and return passedAll to equal true if the value is number and float', () => {
    const value = 1.2

    const sut = validator().float().test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 1.2
      },
      {
        method: 'float',
        name: 'value_name',
        expect: 'number float type',
        received: 1.2
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the float method and return passedAll to equal false if the value is number and is not float', () => {
    const value = 1

    const sut = validator().float().test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 1
    }])
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

    const sut = validator().float().test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '1.2'
    }])
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
    const sut = (): void => validator().float().throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a number and float!')
  })

  it('Should be able to validate the integer method and return passedAll to equal true if the value is number and integer', () => {
    const value = 1

    const sut = validator().integer().test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 1
      },
      {
        method: 'integer',
        name: 'value_name',
        expect: 'number integer type',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the integer method and return passedAll to equal false if the value is number and is not integer', () => {
    const value = 1.2

    const sut = validator().integer().test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 1.2
    }])
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
    const sut = (): void => validator().integer().throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: value_name must be a number and integer!')
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is date and type ISO8601', () => {
    const value = new Date('2024-01-01T06:11:09.714Z').toISOString()

    const sut = validator().date('ISO8601').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '2024-01-01T06:11:09.714Z'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type ISO8601',
        received: '2024-01-01T06:11:09.714Z'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal false if the value is not correct date', () => {
    const value = '2000-30'

    const sut = validator().date('YYYY-DD-MM').test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '2000-30'
    }])
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

    const sut = validator().date('DD/MM/YYYY').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '30/12/2000'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type DD/MM/YYYY',
        received: '30/12/2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type DD-MM-YYYY', () => {
    const value = '30-12-2000'

    const sut = validator().date('DD-MM-YYYY').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '30-12-2000'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type DD-MM-YYYY',
        received: '30-12-2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type MM/DD/YYYY', () => {
    const value = '12/30/2000'

    const sut = validator().date('MM/DD/YYYY').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '12/30/2000'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type MM/DD/YYYY',
        received: '12/30/2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type MM-DD-YYYY', () => {
    const value = '12-30-2000'

    const sut = validator().date('MM-DD-YYYY').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '12-30-2000'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type MM-DD-YYYY',
        received: '12-30-2000'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY/MM/DD', () => {
    const value = '2000/12/30'

    const sut = validator().date('YYYY/MM/DD').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '2000/12/30'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type YYYY/MM/DD',
        received: '2000/12/30'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY-MM-DD', () => {
    const value = '2000-12-30'

    const sut = validator().date('YYYY-MM-DD').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '2000-12-30'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type YYYY-MM-DD',
        received: '2000-12-30'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY/DD/MM', () => {
    const value = '2000/30/12'

    const sut = validator().date('YYYY/DD/MM').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '2000/30/12'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type YYYY/DD/MM',
        received: '2000/30/12'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal true if the value is string date and type YYYY-DD-MM', () => {
    const value = '2000-30-12'

    const sut = validator().date('YYYY-DD-MM').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '2000-30-12'
      },
      {
        method: 'date',
        name: 'value_name',
        expect: 'date type YYYY-DD-MM',
        received: '2000-30-12'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the date method and return passedAll to equal false if the value is not correctly formatted', () => {
    const value = 'invalid-format'

    const sut = validator().date('YYYY-DD-MM').test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'invalid-format'
    }])
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
    const sut = (): void => validator().date('YYYY-DD-MM').throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: the date value_name is not in the format YYYY-DD-MM!')
  })

  it('Should be able to validate the date method and throw error if the value is not correctly formatted', () => {
    const value = 'invalid-format'

    const sut = validator().date('YYYY-DD-MM').test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'invalid-format'
    }])
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
    const sut = (): void => validator().date('YYYY-DD-MM').throw(value, 'value_name', MissingParamError)
    expect(sut).toThrow('missing param: the date value_name is not in the format YYYY-DD-MM!')
  })

  it('Should be able to validate the dateGreaterThan method and return passedAll to equal true if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator().dateGreaterThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-02-03T02:00:00.000Z')
      },
      {
        method: 'dateGreaterThan',
        name: 'value_name',
        expect: '2000/03/02 00:00:00 greater than reference 2000/02/02 00:00:00',
        received: new Date('2000-02-03T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateGreaterThan method and return passedAll to equal false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator().dateGreaterThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: new Date('2000-02-02T02:00:00.000Z')
    }])
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

    const sut = validator().dateGreaterThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: new Date('2000-02-02T02:00:00.000Z')
    }])
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
    const sut = (): void => validator().dateGreaterThan(refDate).throw(date, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: the date value_name must be greater than the reference date!')
  })

  it('Should be able to validate the dateGreaterThan method and throw INVALID_PARAM if the date is in an invalid format', () => {
    const date = 'invalid_data'
    const refDate = new Date('2000-02-03T02:00:00.000Z')
    const sut = (): void => validator().dateGreaterThan(refDate).throw(date, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: the provided date is invalid!')
  })

  it('Should be able to validate the dateGreaterThan method and return passedAll to equal false if the date is in an invalid format', () => {
    const date = 'invalid_data'
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const sut = validator().dateGreaterThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'invalid_data'
    }])
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

    const sut = validator().dateLessThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: new Date('2000-02-02T02:00:00.000Z')
      },
      {
        method: 'dateLessThan',
        name: 'value_name',
        expect: '2000/02/02 00:00:00 less than reference 2000/03/02 00:00:00',
        received: new Date('2000-02-02T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the dateLessThan method and return passedAll to equal false if the date is greater than the reference date', () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator().dateLessThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: new Date('2000-02-03T02:00:00.000Z')
    }])
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

    const sut = validator().dateLessThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: new Date('2000-02-02T02:00:00.000Z')
    }])
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
    const sut = (): void => validator().dateLessThan(refDate).throw(date, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: the provided date is invalid!')
  })

  it('Should be able to validate the dateLessThan method and return passedAll to equal false if value is not date', () => {
    const date = 'invalid_date'
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const sut = validator().dateLessThan(refDate).test(date, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: 'invalid_date'
    }])
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
    const sut = (): void => validator().dateLessThan(refDate).throw(date, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: the date value_name must be less than the reference date!')
  })

  it('Should be able to validate the time method and return passedAll to equal true if the value is in the time format HH:MM', () => {
    const value = '11:05'
    const sut = validator().time('HH:MM').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '11:05'
      },
      {
        method: 'time',
        name: 'value_name',
        expect: 'format HH:MM',
        received: '11:05'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal false if the value is not in the time format HH:MM', () => {
    const value = '11:5'

    const sut = validator().time('HH:MM').test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '11:5'
    }])
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

    const sut = validator().time('HH:MM:SS').test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: '11:05:03'
      },
      {
        method: 'time',
        name: 'value_name',
        expect: 'format HH:MM:SS',
        received: '11:05:03'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the time method and return passedAll to equal false if the value is not in the time format HH:MM:SS', () => {
    const value = '11:55:6'
    const sut = validator().time('HH:MM:SS').test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '11:55:6'
    }])
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
    const sut = (): void => validator()
      .time(type)
      .throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: time method received invalid parameter: type is required!')
  })

  it('Should be able to validate the time method and return passedAll to equal false if the time is greater than 23', () => {
    const value = '24:55:59'
    const sut = validator()
      .time('HH:MM:SS')
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '24:55:59'
    }])
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
    const sut = validator()
      .time('HH:MM:SS')
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '12:60:60'
    }])
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
    const sut = validator()
      .time('HH:MM:SS')
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '12:59:60'
    }])
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
    const sut = validator()
      .time(type)
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: '12:59:60'
    }])
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
    const sut = (): void => validator()
      .time('HH:MM:SS')
      .throw(value, 'value_name', InvalidParamError)
    expect(sut).toThrow('invalid param: the time false is not in the format HH:MM:SS')
  })

  it('Should be able to validate the toEqual method and return passAll true when the value is equal to the comparison value', () => {
    const value = [{
      a: 1,
      b: {
        c: 2,
        d: [1, 2, 3]
      },
      e: 'string',
      f: false,
      g: undefined
    }]
    const valueToCompare = value

    const sut = validator()
      .equal(valueToCompare)
      .test(value, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: [{
          a: 1,
          b: {
            c: 2,
            d: [1, 2, 3]
          },
          e: 'string',
          f: false,
          g: undefined
        }]
      },
      {
        method: 'toEqual',
        name: 'value_name',
        expect: [{
          a: 1,
          b: {
            c: 2,
            d: [1, 2, 3]
          },
          e: 'string',
          f: false,
          g: undefined
        }],
        received: [{
          a: 1,
          b: {
            c: 2,
            d: [1, 2, 3]
          },
          e: 'string',
          f: false,
          g: undefined
        }]
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the toEqual method and return passAll false when the value is equal to the comparison value', () => {
    const value = [{
      a: 1,
      b: {
        c: 2,
        d: [1, 2, 4] // invalid value
      },
      e: 'string',
      f: false,
      g: undefined
    }]
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

    const sut = validator()
      .equal(valueToCompare)
      .test(value, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'value_name',
      expect: 'value other than undefined',
      received: [{
        a: 1,
        b: {
          c: 2,
          d: [1, 2, 4]
        },
        e: 'string',
        f: false
      }]
    }])
    expect(sut.errors).toEqual([{
      method: 'toEqual',
      type: 'invalid value',
      name: 'value_name',
      expect: [{
        a: 1,
        b: {
          c: 2,
          d: [1, 2, 3]
        },
        e: 'string',
        f: false
      }],
      received: [{
        a: 1,
        b: {
          c: 2,
          d: [1, 2, 4]
        },
        e: 'string',
        f: false
      }],
      message: 'value does not match'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method with all string type values and return pastAll true', () => {
    const array = ['Valor A', 'Valor B', 'Valor C']

    const sut = validator()
      .array()
      .string()
      .test(array, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(4)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: ['Valor A', 'Valor B', 'Valor C']
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'index of the array is of type string!',
        received: 'Valor A'
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'index of the array is of type string!',
        received: 'Valor B'
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'index of the array is of type string!',
        received: 'Valor C'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method, not all values are of type string and return pastAll false', () => {
    const array = ['Valor A', 'Valor B', false]

    const sut = validator()
      .array()
      .string()
      .test(array, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(3)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: ['Valor A', 'Valor B', false]
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'index of the array is of type string!',
        received: 'Valor A'
      },
      {
        method: 'array',
        name: 'value_name',
        expect: 'index of the array is of type string!',
        received: 'Valor B'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'array',
      type: 'invalid value',
      name: 'value_name',
      expect: 'index of the array is of type string!',
      received: false,
      message: 'all values in the array value_name must be type string!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the array method, when value is not an array and return pastAll false', () => {
    const array = undefined

    const sut = validator()
      .array()
      .string()
      .test(array, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'value_name',
        expect: 'value other than undefined',
        received: 'undefined',
        message: 'value_name is required!'
      },
      {
        method: 'array',
        type: 'invalid value',
        name: 'value_name',
        expect: 'array',
        received: 'undefined',
        message: 'value_name value must be an array!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method, not all values are of type string when notRequired and return pastAll false', () => {
    const array = undefined

    const sut = validator()
      .array()
      .string()
      .notRequired()
      .test(array, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'value_name',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
