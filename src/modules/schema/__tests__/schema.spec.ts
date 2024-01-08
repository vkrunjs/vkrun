import { InvalidParamError } from '../../errors'
import { Tests } from '../../types'
import {
  alias,
  array,
  boolean,
  createSchema,
  date,
  dateGreaterThan,
  dateLessThan,
  email,
  float,
  integer,
  maxLength,
  minLength,
  minWord,
  notRequired,
  number,
  object,
  string,
  time,
  uuid
} from '../index'

describe('Schema', () => {
  // String
  it('Should be able to validate the string method and return passes all tests', async () => {
    const schema = createSchema({
      keyString: [string()]
    })

    const sut = await schema.validate({
      keyString: 'value is string'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyString',
      expect: 'value other than undefined, null or empty string',
      received: 'value is string'
    },
    {
      method: 'string',
      name: 'keyString',
      expect: 'string type',
      received: 'value is string'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the string method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyString: [string()]
    })

    const sut = await schema.validate({
      keyString: false
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyString',
      expect: 'value other than undefined, null or empty string',
      received: false
    }])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'keyString',
      expect: 'string type',
      received: false,
      message: 'keyString must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the string method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyString: [string()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyString',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyString is required!'
      },
      {
        method: 'string',
        type: 'invalid value',
        name: 'keyString',
        expect: 'string type',
        received: 'undefined',
        message: 'keyString must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the string method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyString: [string(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyString',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the string method and return passes all tests when not required and value is provided', async () => {
    const schema = createSchema({
      keyString: [string(), notRequired()]
    })

    const sut = await schema.validate({
      keyString: 'string'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'notRequired',
        name: 'keyString',
        expect: 'value is not required and of any type',
        received: 'string'
      },
      {
        method: 'string',
        name: 'keyString',
        expect: 'string type',
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the string method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyString: [string()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({ keyString: false })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyString must be a string type!')
    )
  })

  it('Should be able to validate the string method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyString: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyString is required!')
    )
  })

  // Number
  it('Should be able to validate the number method and return passes all tests', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: 123
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyNumber',
        expect: 'value other than undefined, null or empty string',
        received: 123
      },
      {
        method: 'number',
        name: 'keyNumber',
        expect: 'number type',
        received: 123
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the number method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: false
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyNumber',
      expect: 'value other than undefined, null or empty string',
      received: false
    }])
    expect(sut.errors).toEqual([{
      method: 'number',
      type: 'invalid value',
      name: 'keyNumber',
      expect: 'number type',
      received: false,
      message: 'keyNumber must be a number type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the number method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyNumber',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyNumber is required!'
      },
      {
        method: 'number',
        type: 'invalid value',
        name: 'keyNumber',
        expect: 'number type',
        received: 'undefined',
        message: 'keyNumber must be a number type!'
      }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the number method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyNumber',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the number method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({ keyNumber: false })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyNumber must be a number type!')
    )
  })

  it('Should be able to validate the number method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyNumber is required!')
    )
  })

  // Boolean
  it('Should be able to validate the boolean method and return passes all tests', async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    })

    const sut = await schema.validate({
      keyBooleanTrue: true,
      keyBooleanFalse: false
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(4)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyBooleanTrue',
        expect: 'value other than undefined, null or empty string',
        received: true
      },
      {
        method: 'boolean',
        name: 'keyBooleanTrue',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'keyBooleanFalse',
        expect: 'value other than undefined, null or empty string',
        received: false
      },
      {
        method: 'boolean',
        name: 'keyBooleanFalse',
        expect: 'boolean type',
        received: false
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the boolean method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    })

    const sut = await schema.validate({
      keyBooleanTrue: true,
      keyBooleanFalse: 'false'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(3)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyBooleanTrue',
        expect: 'value other than undefined, null or empty string',
        received: true
      },
      {
        method: 'boolean',
        name: 'keyBooleanTrue',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'keyBooleanFalse',
        expect: 'value other than undefined, null or empty string',
        received: 'false'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'boolean',
      type: 'invalid value',
      name: 'keyBooleanFalse',
      expect: 'boolean type',
      received: 'false',
      message: 'keyBooleanFalse must be a boolean type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the number method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(4)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyBooleanTrue',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyBooleanTrue is required!'
      },
      {
        method: 'boolean',
        type: 'invalid value',
        name: 'keyBooleanTrue',
        expect: 'boolean type',
        received: 'undefined',
        message: 'keyBooleanTrue must be a boolean type!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'keyBooleanFalse',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyBooleanFalse is required!'
      },
      {
        method: 'boolean',
        type: 'invalid value',
        name: 'keyBooleanFalse',
        expect: 'boolean type',
        received: 'undefined',
        message: 'keyBooleanFalse must be a boolean type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the boolean method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean(), notRequired()],
      keyBooleanFalse: [boolean(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'notRequired',
        name: 'keyBooleanTrue',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'keyBooleanFalse',
        expect: 'value is not required and of any type',
        received: 'undefined'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the boolean method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyBooleanTrue: 'true',
      keyBooleanFalse: false
    })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyBooleanTrue must be a boolean type!')
    )
  })

  it('Should be able to validate the boolean method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyBooleanTrue is required!')
    )
  })

  // MinWord
  it('Should be able to validate the minWord method and return passes all tests', async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    })

    const sut = await schema.validate({
      keyMinWord: 'any text'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyMinWord',
        expect: 'value other than undefined, null or empty string',
        received: 'any text'
      },
      {
        method: 'minWord',
        name: 'keyMinWord',
        expect: 'must have a minimum of words',
        received: 'any text'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the minWord method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    })

    const sut = await schema.validate({
      keyMinWord: 'any_text'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyMinWord',
      expect: 'value other than undefined, null or empty string',
      received: 'any_text'
    }])
    expect(sut.errors).toEqual([{
      method: 'minWord',
      type: 'invalid value',
      name: 'keyMinWord',
      expect: 'must have a minimum of words',
      received: 'any_text',
      message: 'keyMinWord must have at least 2 words!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the minWord method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyMinWord',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyMinWord is required!'
      },
      {
        method: 'minWord',
        type: 'invalid value',
        name: 'keyMinWord',
        expect: 'must have a minimum of words',
        received: 'undefined',
        message: 'keyMinWord must have at least 2 words!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the minWord method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyMinWord',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the minWord method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyMinWord: 'any_text'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMinWord must have at least 2 words!')
    )
  })

  it('Should be able to validate the minWord method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMinWord is required!')
    )
  })

  // MaxLength
  it('Should be able to validate the maxLength method and return passes all tests', async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(4)]
    })

    const sut = await schema.validate({
      keyMaxLength: 'text'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyMaxLength',
        expect: 'value other than undefined, null or empty string',
        received: 'text'
      },
      {
        method: 'maxLength',
        name: 'keyMaxLength',
        expect: 'string with characters less than or equal to the limit',
        received: 'text'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the maxLength method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3)]
    })

    const sut = await schema.validate({
      keyMaxLength: 'text'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyMaxLength',
      expect: 'value other than undefined, null or empty string',
      received: 'text'
    }])
    expect(sut.errors).toEqual([{
      method: 'maxLength',
      type: 'invalid value',
      name: 'keyMaxLength',
      expect: 'string with characters less than or equal to the limit',
      received: 'text',
      message: 'keyMaxLength must have a maximum of 3 characters!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the maxLength method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3)]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyMaxLength',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyMaxLength is required!'
      },
      {
        method: 'maxLength',
        type: 'invalid value',
        name: 'keyMaxLength',
        received: 'undefined',
        expect: 'string with characters less than or equal to the limit',
        message: 'keyMaxLength must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the maxLength method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyMaxLength',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the maxLength method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyMaxLength: 'text'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMaxLength must have a maximum of 3 characters!')
    )
  })

  it('Should be able to validate the maxLength method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMaxLength is required!')
    )
  })

  // MinLength
  it('Should be able to validate the minLength method and return passes all tests', async () => {
    const schema = createSchema({
      keyMinLength: [minLength(4)]
    })

    const sut = await schema.validate({
      keyMinLength: 'text'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyMinLength',
        expect: 'value other than undefined, null or empty string',
        received: 'text'
      },
      {
        method: 'minLength',
        name: 'keyMinLength',
        expect: 'string with characters greater than or equal to the limit',
        received: 'text'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the maxLength method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5)]
    })

    const sut = await schema.validate({
      keyMinLength: 'text'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyMinLength',
      expect: 'value other than undefined, null or empty string',
      received: 'text'
    }])
    expect(sut.errors).toEqual([{
      method: 'minLength',
      type: 'invalid value',
      name: 'keyMinLength',
      expect: 'string with characters greater than or equal to the limit',
      received: 'text',
      message: 'keyMinLength must have a minimum of 5 characters!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the maxLength method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5)]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyMinLength',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyMinLength is required!'
      },
      {
        method: 'minLength',
        type: 'invalid value',
        name: 'keyMinLength',
        expect: 'string with characters greater than or equal to the limit',
        received: 'undefined',
        message: 'keyMinLength must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the maxLength method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyMinLength',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the maxLength method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyMinLength: 'text'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMinLength must have a minimum of 5 characters!')
    )
  })

  it('Should be able to validate the maxLength method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMinLength is required!')
    )
  })

  // Uuid
  it('Should be able to validate the uuid method and return passes all tests', async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    })

    const sut = await schema.validate({
      keyUuid: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyUuid',
        expect: 'value other than undefined, null or empty string',
        received: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
      },
      {
        method: 'uuid',
        name: 'keyUuid',
        expect: 'uuid format',
        received: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the uuid method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    })

    const sut = await schema.validate({
      keyUuid: '123'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyUuid',
      expect: 'value other than undefined, null or empty string',
      received: '123'
    }])
    expect(sut.errors).toEqual([{
      method: 'uuid',
      type: 'invalid value',
      name: 'keyUuid',
      expect: 'uuid format',
      received: '123',
      message: 'keyUuid must be a uuid type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the uuid method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyUuid',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyUuid is required!'
      },
      {
        method: 'uuid',
        type: 'invalid value',
        name: 'keyUuid',
        expect: 'uuid format',
        received: 'undefined',
        message: 'keyUuid must be a uuid type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the uuid method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyUuid: [uuid(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyUuid',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the uuid method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyUuid: '123'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyUuid must be a uuid type!')
    )
  })

  it('Should be able to validate the uuid method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyUuid is required!')
    )
  })

  // Email
  it('Should be able to validate the email method and return passes all tests', async () => {
    const schema = createSchema({
      keyEmail: [email()]
    })

    const sut = await schema.validate({
      keyEmail: 'email@email.com'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyEmail',
        expect: 'value other than undefined, null or empty string',
        received: 'email@email.com'
      },
      {
        method: 'email',
        name: 'keyEmail',
        expect: 'valid email',
        received: 'email@email.com'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the email method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyEmail: [email()]
    })

    const sut = await schema.validate({
      keyEmail: 'email@email'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyEmail',
      expect: 'value other than undefined, null or empty string',
      received: 'email@email'
    }])
    expect(sut.errors).toEqual([{
      method: 'email',
      type: 'invalid value',
      name: 'keyEmail',
      expect: 'valid email',
      received: 'email@email',
      message: 'email email@email is invalid!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the email method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyEmail: [email()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyEmail',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyEmail is required!'
      },
      {
        method: 'email',
        type: 'invalid value',
        name: 'keyEmail',
        expect: 'valid email',
        received: 'undefined',
        message: 'email undefined is invalid!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the email method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyEmail: [email(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyEmail',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the email method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyEmail: [email()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyEmail: 'email@email'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('email email@email is invalid!')
    )
  })

  it('Should be able to validate the email method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyEmail: [email()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyEmail is required!')
    )
  })

  // Number
  it('Should be able to validate the number method and return passes all tests', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: 123
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyNumber',
        expect: 'value other than undefined, null or empty string',
        received: 123
      },
      {
        method: 'number',
        name: 'keyNumber',
        expect: 'number type',
        received: 123
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the number method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: '123'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyNumber',
      expect: 'value other than undefined, null or empty string',
      received: '123'
    }])
    expect(sut.errors).toEqual([{
      method: 'number',
      type: 'invalid value',
      name: 'keyNumber',
      expect: 'number type',
      received: '123',
      message: 'keyNumber must be a number type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the number method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyNumber',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyNumber is required!'
      },
      {
        method: 'number',
        type: 'invalid value',
        name: 'keyNumber',
        expect: 'number type',
        received: 'undefined',
        message: 'keyNumber must be a number type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the number method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyNumber',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the number method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyNumber: '123'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyNumber must be a number type!')
    )
  })

  it('Should be able to validate the number method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyNumber is required!')
    )
  })

  // Float
  it('Should be able to validate the float method and return passes all tests', async () => {
    const schema = createSchema({
      keyFloat: [float()]
    })

    const sut = await schema.validate({
      keyFloat: 123.5
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyFloat',
        expect: 'value other than undefined, null or empty string',
        received: 123.5
      },
      {
        method: 'float',
        name: 'keyFloat',
        expect: 'number float type',
        received: 123.5
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the float method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyFloat: [float()]
    })

    const sut = await schema.validate({
      keyFloat: 123
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyFloat',
      expect: 'value other than undefined, null or empty string',
      received: 123
    }])
    expect(sut.errors).toEqual([{
      method: 'float',
      type: 'invalid value',
      name: 'keyFloat',
      expect: 'number float type',
      received: 123,
      message: 'keyFloat must be a number and float!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the float method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyFloat: [float()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyFloat',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyFloat is required!'
      },
      {
        method: 'float',
        type: 'invalid value',
        name: 'keyFloat',
        expect: 'number float type',
        received: 'undefined',
        message: 'keyFloat must be a number and float!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the float method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyFloat: [float(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyFloat',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the float method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyFloat: [float()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyFloat: 123
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyFloat must be a number and float!')
    )
  })

  it('Should be able to validate the float method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyFloat: [float()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyFloat is required!')
    )
  })

  // Integer
  it('Should be able to validate the integer method and return passes all tests', async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    })

    const sut = await schema.validate({
      keyInteger: 123
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyInteger',
        expect: 'value other than undefined, null or empty string',
        received: 123
      },
      {
        method: 'integer',
        name: 'keyInteger',
        expect: 'number integer type',
        received: 123
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the integer method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    })

    const sut = await schema.validate({
      keyInteger: 123.5
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyInteger',
      expect: 'value other than undefined, null or empty string',
      received: 123.5
    }])
    expect(sut.errors).toEqual([{
      method: 'integer',
      type: 'invalid value',
      name: 'keyInteger',
      expect: 'number integer type',
      received: 123.5,
      message: 'keyInteger must be a number and integer!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the integer method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyInteger',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyInteger is required!'
      },
      {
        method: 'integer',
        type: 'invalid value',
        name: 'keyInteger',
        expect: 'number integer type',
        received: 'undefined',
        message: 'keyInteger must be a number and integer!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the integer method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      keyInteger: [integer(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyInteger',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the integer method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyInteger: 123.5
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyInteger must be a number and integer!')
    )
  })

  it('Should be able to validate the integer method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyInteger is required!')
    )
  })

  // Date
  it('Should be able to validate the date method and return passes all tests', async () => {
    const schema = createSchema({
      'ISO8601-A': [date('ISO8601')],
      'ISO8601-B': [date()],
      'DD/MM/YYYY': [date('DD/MM/YYYY')],
      'MM/DD/YYYY': [date('MM/DD/YYYY')],
      'DD-MM-YYYY': [date('DD-MM-YYYY')],
      'MM-DD-YYYY': [date('MM-DD-YYYY')],
      'YYYY/MM/DD': [date('YYYY/MM/DD')],
      'YYYY/DD/MM': [date('YYYY/DD/MM')],
      'YYYY-MM-DD': [date('YYYY-MM-DD')],
      'YYYY-DD-MM': [date('YYYY-DD-MM')]
    })

    const sut = await schema.validate({
      'ISO8601-A': new Date('2024-01-03T23:02:01.117Z'),
      'ISO8601-B': new Date('2024-01-03T23:02:01.117Z').toISOString(),
      'DD/MM/YYYY': '30/12/2000',
      'MM/DD/YYYY': '12/30/2000',
      'DD-MM-YYYY': '30-12-2000',
      'MM-DD-YYYY': '12-30-2000',
      'YYYY/MM/DD': '2000/12/30',
      'YYYY/DD/MM': '2000/30/12',
      'YYYY-MM-DD': '2000-12-30',
      'YYYY-DD-MM': '2000-30-12'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(20)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(20)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'ISO8601-A',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:02:01.117Z')
      },
      {
        method: 'date',
        name: 'ISO8601-A',
        expect: 'date type ISO8601',
        received: new Date('2024-01-03T23:02:01.117Z')
      },
      {
        method: 'required',
        name: 'ISO8601-B',
        expect: 'value other than undefined, null or empty string',
        received: '2024-01-03T23:02:01.117Z'
      },
      {
        method: 'date',
        name: 'ISO8601-B',
        expect: 'date type ISO8601',
        received: '2024-01-03T23:02:01.117Z'
      },
      {
        method: 'required',
        name: 'DD/MM/YYYY',
        expect: 'value other than undefined, null or empty string',
        received: '30/12/2000'
      },
      {
        method: 'date',
        name: 'DD/MM/YYYY',
        expect: 'date type DD/MM/YYYY',
        received: '30/12/2000'
      },
      {
        method: 'required',
        name: 'MM/DD/YYYY',
        expect: 'value other than undefined, null or empty string',
        received: '12/30/2000'
      },
      {
        method: 'date',
        name: 'MM/DD/YYYY',
        expect: 'date type MM/DD/YYYY',
        received: '12/30/2000'
      },
      {
        method: 'required',
        name: 'DD-MM-YYYY',
        expect: 'value other than undefined, null or empty string',
        received: '30-12-2000'
      },
      {
        method: 'date',
        name: 'DD-MM-YYYY',
        expect: 'date type DD-MM-YYYY',
        received: '30-12-2000'
      },
      {
        method: 'required',
        name: 'MM-DD-YYYY',
        expect: 'value other than undefined, null or empty string',
        received: '12-30-2000'
      },
      {
        method: 'date',
        name: 'MM-DD-YYYY',
        expect: 'date type MM-DD-YYYY',
        received: '12-30-2000'
      },
      {
        method: 'required',
        name: 'YYYY/MM/DD',
        expect: 'value other than undefined, null or empty string',
        received: '2000/12/30'
      },
      {
        method: 'date',
        name: 'YYYY/MM/DD',
        expect: 'date type YYYY/MM/DD',
        received: '2000/12/30'
      },
      {
        method: 'required',
        name: 'YYYY/DD/MM',
        expect: 'value other than undefined, null or empty string',
        received: '2000/30/12'
      },
      {
        method: 'date',
        name: 'YYYY/DD/MM',
        expect: 'date type YYYY/DD/MM',
        received: '2000/30/12'
      },
      {
        method: 'required',
        name: 'YYYY-MM-DD',
        expect: 'value other than undefined, null or empty string',
        received: '2000-12-30'
      },
      {
        method: 'date',
        name: 'YYYY-MM-DD',
        expect: 'date type YYYY-MM-DD',
        received: '2000-12-30'
      },
      {
        method: 'required',
        name: 'YYYY-DD-MM',
        expect: 'value other than undefined, null or empty string',
        received: '2000-30-12'
      },
      {
        method: 'date',
        name: 'YYYY-DD-MM',
        expect: 'date type YYYY-DD-MM',
        received: '2000-30-12'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the date method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      'ISO8601-A': [date('ISO8601')],
      'ISO8601-B': [date()],
      'DD/MM/YYYY': [date('DD/MM/YYYY')],
      'MM/DD/YYYY': [date('MM/DD/YYYY')],
      'DD-MM-YYYY': [date('DD-MM-YYYY')],
      'MM-DD-YYYY': [date('MM-DD-YYYY')],
      'YYYY/MM/DD': [date('YYYY/MM/DD')],
      'YYYY/DD/MM': [date('YYYY/DD/MM')],
      'YYYY-MM-DD': [date('YYYY-MM-DD')],
      'YYYY-DD-MM': [date('YYYY-DD-MM')]
    })

    const sut = await schema.validate({
      'ISO8601-A': '30/12/2000',
      'ISO8601-B': '30/12/2000',
      'DD/MM/YYYY': new Date('2024-01-03T23:15:34.690Z'),
      'MM/DD/YYYY': new Date('2024-01-03T23:15:34.690Z'),
      'DD-MM-YYYY': new Date('2024-01-03T23:15:34.690Z'),
      'MM-DD-YYYY': new Date('2024-01-03T23:15:34.690Z'),
      'YYYY/MM/DD': new Date('2024-01-03T23:15:34.690Z'),
      'YYYY/DD/MM': new Date('2024-01-03T23:15:34.690Z'),
      'YYYY-MM-DD': new Date('2024-01-03T23:15:34.690Z'),
      'YYYY-DD-MM': new Date('2024-01-03T23:15:34.690Z')
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(10)
    expect(sut.failed).toEqual(10)
    expect(sut.totalTests).toEqual(20)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'ISO8601-A',
        expect: 'value other than undefined, null or empty string',
        received: '30/12/2000'
      },
      {
        method: 'required',
        name: 'ISO8601-B',
        expect: 'value other than undefined, null or empty string',
        received: '30/12/2000'
      },
      {
        method: 'required',
        name: 'DD/MM/YYYY',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      },
      {
        method: 'required',
        name: 'MM/DD/YYYY',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      },
      {
        method: 'required',
        name: 'DD-MM-YYYY',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      },
      {
        method: 'required',
        name: 'MM-DD-YYYY',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      },
      {
        method: 'required',
        name: 'YYYY/MM/DD',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      },
      {
        method: 'required',
        name: 'YYYY/DD/MM',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      },
      {
        method: 'required',
        name: 'YYYY-MM-DD',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      },
      {
        method: 'required',
        name: 'YYYY-DD-MM',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2024-01-03T23:15:34.690Z')
      }
    ])
    expect(sut.errors).toEqual([
      {
        method: 'date',
        type: 'invalid value',
        name: 'ISO8601-A',
        expect: 'date type ISO8601',
        received: '30/12/2000',
        message: 'the date ISO8601-A is not in the format ISO8601!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'ISO8601-B',
        expect: 'date type ISO8601',
        received: '30/12/2000',
        message: 'the date ISO8601-B is not in the format ISO8601!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'DD/MM/YYYY',
        expect: 'date type DD/MM/YYYY',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date DD/MM/YYYY is not in the format DD/MM/YYYY!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'MM/DD/YYYY',
        expect: 'date type MM/DD/YYYY',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date MM/DD/YYYY is not in the format MM/DD/YYYY!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'DD-MM-YYYY',
        expect: 'date type DD-MM-YYYY',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date DD-MM-YYYY is not in the format DD-MM-YYYY!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'MM-DD-YYYY',
        expect: 'date type MM-DD-YYYY',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date MM-DD-YYYY is not in the format MM-DD-YYYY!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY/MM/DD',
        expect: 'date type YYYY/MM/DD',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date YYYY/MM/DD is not in the format YYYY/MM/DD!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY/DD/MM',
        expect: 'date type YYYY/DD/MM',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date YYYY/DD/MM is not in the format YYYY/DD/MM!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY-MM-DD',
        expect: 'date type YYYY-MM-DD',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date YYYY-MM-DD is not in the format YYYY-MM-DD!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY-DD-MM',
        expect: 'date type YYYY-DD-MM',
        received: new Date('2024-01-03T23:15:34.690Z'),
        message: 'the date YYYY-DD-MM is not in the format YYYY-DD-MM!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the date method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      'ISO8601-A': [date('ISO8601')],
      'ISO8601-B': [date()],
      'DD/MM/YYYY': [date('DD/MM/YYYY')],
      'MM/DD/YYYY': [date('MM/DD/YYYY')],
      'DD-MM-YYYY': [date('DD-MM-YYYY')],
      'MM-DD-YYYY': [date('MM-DD-YYYY')],
      'YYYY/MM/DD': [date('YYYY/MM/DD')],
      'YYYY/DD/MM': [date('YYYY/DD/MM')],
      'YYYY-MM-DD': [date('YYYY-MM-DD')],
      'YYYY-DD-MM': [date('YYYY-DD-MM')]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(20)
    expect(sut.totalTests).toEqual(20)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'ISO8601-A',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'ISO8601-A is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'ISO8601-A',
        expect: 'date type ISO8601',
        received: 'undefined',
        message: 'the date ISO8601-A is not in the format ISO8601!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'ISO8601-B',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'ISO8601-B is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'ISO8601-B',
        expect: 'date type ISO8601',
        received: 'undefined',
        message: 'the date ISO8601-B is not in the format ISO8601!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'DD/MM/YYYY',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'DD/MM/YYYY is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'DD/MM/YYYY',
        expect: 'date type DD/MM/YYYY',
        received: 'undefined',
        message: 'the date DD/MM/YYYY is not in the format DD/MM/YYYY!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'MM/DD/YYYY',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'MM/DD/YYYY is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'MM/DD/YYYY',
        expect: 'date type MM/DD/YYYY',
        received: 'undefined',
        message: 'the date MM/DD/YYYY is not in the format MM/DD/YYYY!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'DD-MM-YYYY',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'DD-MM-YYYY is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'DD-MM-YYYY',
        expect: 'date type DD-MM-YYYY',
        received: 'undefined',
        message: 'the date DD-MM-YYYY is not in the format DD-MM-YYYY!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'MM-DD-YYYY',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'MM-DD-YYYY is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'MM-DD-YYYY',
        expect: 'date type MM-DD-YYYY',
        received: 'undefined',
        message: 'the date MM-DD-YYYY is not in the format MM-DD-YYYY!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'YYYY/MM/DD',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'YYYY/MM/DD is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY/MM/DD',
        expect: 'date type YYYY/MM/DD',
        received: 'undefined',
        message: 'the date YYYY/MM/DD is not in the format YYYY/MM/DD!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'YYYY/DD/MM',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'YYYY/DD/MM is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY/DD/MM',
        expect: 'date type YYYY/DD/MM',
        received: 'undefined',
        message: 'the date YYYY/DD/MM is not in the format YYYY/DD/MM!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'YYYY-MM-DD',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'YYYY-MM-DD is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY-MM-DD',
        expect: 'date type YYYY-MM-DD',
        received: 'undefined',
        message: 'the date YYYY-MM-DD is not in the format YYYY-MM-DD!'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'YYYY-DD-MM',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'YYYY-DD-MM is required!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'YYYY-DD-MM',
        expect: 'date type YYYY-DD-MM',
        received: 'undefined',
        message: 'the date YYYY-DD-MM is not in the format YYYY-DD-MM!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the date method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      'ISO8601-A': [date('ISO8601'), notRequired()],
      'ISO8601-B': [date(), notRequired()],
      'DD/MM/YYYY': [date('DD/MM/YYYY'), notRequired()],
      'MM/DD/YYYY': [date('MM/DD/YYYY'), notRequired()],
      'DD-MM-YYYY': [date('DD-MM-YYYY'), notRequired()],
      'MM-DD-YYYY': [date('MM-DD-YYYY'), notRequired()],
      'YYYY/MM/DD': [date('YYYY/MM/DD'), notRequired()],
      'YYYY/DD/MM': [date('YYYY/DD/MM'), notRequired()],
      'YYYY-MM-DD': [date('YYYY-MM-DD'), notRequired()],
      'YYYY-DD-MM': [date('YYYY-DD-MM'), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(10)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(10)
    expect(sut.successes).toEqual([
      {
        method: 'notRequired',
        name: 'ISO8601-A',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'ISO8601-B',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'DD/MM/YYYY',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'MM/DD/YYYY',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'DD-MM-YYYY',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'MM-DD-YYYY',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'YYYY/MM/DD',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'YYYY/DD/MM',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'YYYY-MM-DD',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'YYYY-DD-MM',
        expect: 'value is not required and of any type',
        received: 'undefined'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the date method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      'ISO8601-A': [date('ISO8601')],
      'ISO8601-B': [date()],
      'DD/MM/YYYY': [date('DD/MM/YYYY')],
      'MM/DD/YYYY': [date('MM/DD/YYYY')],
      'DD-MM-YYYY': [date('DD-MM-YYYY')],
      'MM-DD-YYYY': [date('MM-DD-YYYY')],
      'YYYY/MM/DD': [date('YYYY/MM/DD')],
      'YYYY/DD/MM': [date('YYYY/DD/MM')],
      'YYYY-MM-DD': [date('YYYY-MM-DD')],
      'YYYY-DD-MM': [date('YYYY-DD-MM')]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      'ISO8601-A': '30/12/2000',
      'ISO8601-B': '30/12/2000',
      'DD/MM/YYYY': false,
      'MM/DD/YYYY': new Date(),
      'DD-MM-YYYY': new Date(),
      'MM-DD-YYYY': new Date(),
      'YYYY/MM/DD': new Date(),
      'YYYY/DD/MM': new Date(),
      'YYYY-MM-DD': new Date(),
      'YYYY-DD-MM': new Date()
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('the date ISO8601-A is not in the format ISO8601!')
    )
  })

  it('Should be able to validate the date method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyDate: [date()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyDate is required!')
    )
  })

  // DateGreaterThan
  it('Should be able to validate the dateGreaterThan method and return passes all tests', async () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateGreaterThan: date
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyDateGreaterThan',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2000-02-03T02:00:00.000Z')
      },
      {
        method: 'dateGreaterThan',
        name: 'keyDateGreaterThan',
        expect: '2000/03/02 00:00:00 greater than reference 2000/02/02 00:00:00',
        received: new Date('2000-02-03T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the dateGreaterThan method and return doesn't passes all tests", async () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateGreaterThan: date
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyDateGreaterThan',
      expect: 'value other than undefined, null or empty string',
      received: new Date('2000-02-02T02:00:00.000Z')
    }])
    expect(sut.errors).toEqual([{
      method: 'dateGreaterThan',
      type: 'invalid value',
      name: 'keyDateGreaterThan',
      expect: '2000/02/02 00:00:00 greater than reference 2000/03/02 00:00:00',
      received: new Date('2000-02-02T02:00:00.000Z'),
      message: 'the date keyDateGreaterThan must be greater than the reference date!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the dateGreaterThan method and return doesn't passes all tests when value is not provided", async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyDateGreaterThan',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyDateGreaterThan is required!'
      },
      {
        method: 'dateGreaterThan',
        type: 'invalid value',
        name: 'keyDateGreaterThan',
        expect: 'date keyDateGreaterThan greater than reference date',
        received: 'undefined',
        message: 'the provided date is invalid!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the dateGreaterThan method and return passes all tests when not required and value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyDateGreaterThan',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the dateGreaterThan method and throw InvalidParamError if doesn't passes all tests", async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyDateGreaterThan: 'invalid_date'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('the provided date is invalid!')
    )
  })

  it('Should be able to validate the dateGreaterThan method and throw InvalidParamError when value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyDateGreaterThan is required!')
    )
  })

  // DateLessThan
  it('Should be able to validate the dateLessThan method and return passes all tests', async () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateLessThan: date
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'keyDateLessThan',
        expect: 'value other than undefined, null or empty string',
        received: new Date('2000-02-02T02:00:00.000Z')
      },
      {
        method: 'dateLessThan',
        name: 'keyDateLessThan',
        expect: '2000/02/02 00:00:00 less than reference 2000/03/02 00:00:00',
        received: new Date('2000-02-02T02:00:00.000Z')
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the dateLessThan method and return doesn't passes all tests", async () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateLessThan: date
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'keyDateLessThan',
      expect: 'value other than undefined, null or empty string',
      received: new Date('2000-02-03T02:00:00.000Z')
    }])
    expect(sut.errors).toEqual([
      {
        method: 'dateLessThan',
        type: 'invalid value',
        name: 'keyDateLessThan',
        expect: '2000/03/02 00:00:00 less than reference 2000/02/02 00:00:00',
        received: new Date('2000-02-03T02:00:00.000Z'),
        message: 'the date keyDateLessThan must be less than the reference date!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the dateLessThan method and return doesn't passes all tests when value is not provided", async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'keyDateLessThan',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'keyDateLessThan is required!'
      },
      {
        method: 'dateLessThan',
        type: 'invalid value',
        name: 'keyDateLessThan',
        expect: 'date keyDateLessThan less than reference date',
        received: 'undefined',
        message: 'the provided date is invalid!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the dateLessThan method and return passes all tests when not required and value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyDateLessThan',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the dateLessThan method and throw InvalidParamError if doesn't passes all tests", async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyDateLessThan: 'invalid_date'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('the provided date is invalid!')
    )
  })

  it('Should be able to validate the dateLessThan method and throw InvalidParamError when value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyDateLessThan is required!')
    )
  })

  // Time
  it('Should be able to validate the time method and return passes all tests', async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    })

    const sut = await schema.validate({
      'HH:MM:SS': '11:05:30',
      'HH:MM': '11:05'
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(4)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'HH:MM:SS',
        expect: 'value other than undefined, null or empty string',
        received: '11:05:30'
      },
      {
        method: 'time',
        name: 'HH:MM:SS',
        expect: 'format HH:MM:SS',
        received: '11:05:30'
      },
      {
        method: 'required',
        name: 'HH:MM',
        expect: 'value other than undefined, null or empty string',
        received: '11:05'
      },
      {
        method: 'time',
        name: 'HH:MM',
        expect: 'format HH:MM',
        received: '11:05'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the time method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    })

    const sut = await schema.validate({
      'HH:MM:SS': '11:05',
      'HH:MM': '11:05:30'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'HH:MM:SS',
        expect: 'value other than undefined, null or empty string',
        received: '11:05'
      },
      {
        method: 'required',
        name: 'HH:MM',
        expect: 'value other than undefined, null or empty string',
        received: '11:05:30'
      }
    ])
    expect(sut.errors).toEqual([
      {
        method: 'time',
        type: 'invalid value',
        name: 'HH:MM:SS',
        expect: 'format HH:MM:SS',
        received: '11:05',
        message: 'the time 11:05 is not in the format HH:MM:SS'
      },
      {
        method: 'time',
        type: 'invalid value',
        name: 'HH:MM',
        expect: 'format HH:MM',
        received: '11:05:30',
        message: 'the time 11:05:30 is not in the format HH:MM'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the time method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(4)
    expect(sut.totalTests).toEqual(4)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'required',
        type: 'missing value',
        name: 'HH:MM:SS',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'HH:MM:SS is required!'
      },
      {
        method: 'time',
        type: 'invalid value',
        name: 'HH:MM:SS',
        expect: 'format HH:MM:SS',
        received: 'undefined',
        message: 'the time undefined is not in the format HH:MM:SS'
      },
      {
        method: 'required',
        type: 'missing value',
        name: 'HH:MM',
        expect: 'value other than undefined, null or empty string',
        received: 'undefined',
        message: 'HH:MM is required!'
      },
      {
        method: 'time',
        type: 'invalid value',
        name: 'HH:MM',
        expect: 'format HH:MM',
        received: 'undefined',
        message: 'the time undefined is not in the format HH:MM'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the time method and return passes all tests when not required and value is not provided', async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS'), notRequired()],
      'HH:MM': [time('HH:MM'), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'notRequired',
        name: 'HH:MM:SS',
        expect: 'value is not required and of any type',
        received: 'undefined'
      },
      {
        method: 'notRequired',
        name: 'HH:MM',
        expect: 'value is not required and of any type',
        received: 'undefined'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the time method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      'HH:MM:SS': '11:05',
      'HH:MM': '11:05:30'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('the time 11:05 is not in the format HH:MM:SS')
    )
  })

  it('Should be able to validate the time method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('HH:MM:SS is required!')
    )
  })

  // Array
  it('Should be able to validate the array method and return passes all tests', async () => {
    const schema = createSchema({
      stringArray: array.required().string(),
      numberArray: array.required().number(),
      booleanArray: array.required().boolean(),
      dateArray: array.required().date('ISO8601'),
      strictArray: array.required().strict(['blue', 'orange', 'red']),
      anyArray: array.required().any(),
      objectArray: array.required().object({
        keyObject: [string()]
      })
    })

    const sut = await schema.validate({
      stringArray: ['string', 'string', 'string'],
      numberArray: [123, 123, 123],
      booleanArray: [true, false, true],
      dateArray: [
        new Date('2024-01-04T00:22:21.377Z'),
        new Date('2024-01-04T00:22:21.377Z'),
        new Date('2024-01-04T00:22:21.377Z')
      ],
      strictArray: ['blue', 'orange', 'red'],
      anyArray: [new Date('2024-01-04T00:22:21.377Z'), 'string', true, 123],
      objectArray: [{
        keyObject: 'string'
      }]
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(24)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(24)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'stringArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          'string',
          'string',
          'string'
        ]
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'required',
        name: 'numberArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          123,
          123,
          123
        ]
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'required',
        name: 'booleanArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          true,
          false,
          true
        ]
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: false
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'dateArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          new Date('2024-01-04T00:22:21.377Z'),
          new Date('2024-01-04T00:22:21.377Z'),
          new Date('2024-01-04T00:22:21.377Z')
        ]
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:22:21.377Z')
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:22:21.377Z')
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:22:21.377Z')
      },
      {
        method: 'required',
        name: 'strictArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'array',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'array',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'array',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'required',
        name: 'anyArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          new Date('2024-01-04T00:22:21.377Z'),
          'string',
          true,
          123
        ]
      },
      {
        method: 'required',
        name: 'objectArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          {
            keyObject: 'string'
          }
        ]
      },
      {
        method: 'required',
        name: 'keyObject',
        expect: 'value other than undefined, null or empty string',
        received: 'string'
      },
      {
        method: 'string',
        name: 'keyObject',
        expect: 'string type',
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the not required array method and return passes all tests', async () => {
    const schema = createSchema({
      stringArray: array.notRequired().string(),
      numberArray: array.notRequired().number(),
      booleanArray: array.notRequired().boolean(),
      dateArray: array.notRequired().date('ISO8601'),
      strictArray: array.notRequired().strict(['blue', 'orange', 'red']),
      anyArray: array.notRequired().any(),
      objectArray: array.notRequired().object({
        keyObject: [string()]
      })
    })

    const sut = await schema.validate({
      stringArray: ['string', 'string', 'string'],
      numberArray: [123, 123, 123],
      booleanArray: [true, false, true],
      dateArray: [
        new Date('2024-01-04T00:22:21.377Z'),
        new Date('2024-01-04T00:22:21.377Z'),
        new Date('2024-01-04T00:22:21.377Z')
      ],
      strictArray: ['blue', 'orange', 'red'],
      anyArray: [new Date('2024-01-04T00:22:21.377Z'), 'string', true, 123],
      objectArray: [{
        keyObject: 'string'
      }]
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(24)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(24)
    expect(sut.successes).toEqual([
      {
        method: 'notRequired',
        name: 'stringArray',
        expect: 'value is not required and of any type',
        received: [
          'string',
          'string',
          'string'
        ]
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'notRequired',
        name: 'numberArray',
        expect: 'value is not required and of any type',
        received: [
          123,
          123,
          123
        ]
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'notRequired',
        name: 'booleanArray',
        expect: 'value is not required and of any type',
        received: [
          true,
          false,
          true
        ]
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: false
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'notRequired',
        name: 'dateArray',
        expect: 'value is not required and of any type',
        received: [
          new Date('2024-01-04T00:22:21.377Z'),
          new Date('2024-01-04T00:22:21.377Z'),
          new Date('2024-01-04T00:22:21.377Z')
        ]
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:22:21.377Z')
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:22:21.377Z')
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:22:21.377Z')
      },
      {
        method: 'notRequired',
        name: 'strictArray',
        expect: 'value is not required and of any type',
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'array',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'array',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'array',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'orange',
          'red'
        ]
      },
      {
        method: 'notRequired',
        name: 'anyArray',
        expect: 'value is not required and of any type',
        received: [
          new Date('2024-01-04T00:22:21.377Z'),
          'string',
          true,
          123
        ]
      },
      {
        method: 'notRequired',
        name: 'objectArray',
        expect: 'value is not required and of any type',
        received: [
          {
            keyObject: 'string'
          }
        ]
      },
      {
        method: 'required',
        name: 'keyObject',
        expect: 'value other than undefined, null or empty string',
        received: 'string'
      },
      {
        method: 'string',
        name: 'keyObject',
        expect: 'string type',
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the array method and return doesn't passes all tests", async () => {
    const schema = createSchema({
      stringArray: array.required().string(),
      numberArray: array.required().number(),
      booleanArray: array.required().boolean(),
      dateArray: array.required().date('ISO8601'),
      strictArray: array.required().strict(['blue', 'orange', 'red']),
      anyArray: array.required().any(),
      objectArray: array.required().object({
        keyObject: [string()]
      })
    })

    const sut = await schema.validate({
      stringArray: ['string', false, 'string'],
      numberArray: [123, '123', 123],
      booleanArray: ['true', false, true],
      dateArray: [new Date('2024-01-04T00:25:15.816Z'), '03/10/1993', new Date('2024-01-04T00:25:15.816Z')],
      strictArray: ['blue', 'red', 'orange'],
      anyArray: [new Date('2024-01-04T00:25:15.816Z'), 'string', true, 123],
      objectArray: [{
        keyObject: false
      }]
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(17)
    expect(sut.failed).toEqual(7)
    expect(sut.totalTests).toEqual(24)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'stringArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          'string',
          false,
          'string'
        ]
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'string',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: 'string'
      },
      {
        method: 'required',
        name: 'numberArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          123,
          '123',
          123
        ]
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'number',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: 123
      },
      {
        method: 'required',
        name: 'booleanArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          'true',
          false,
          true
        ]
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: false
      },
      {
        method: 'boolean',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'dateArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          new Date('2024-01-04T00:25:15.816Z'),
          '03/10/1993',
          new Date('2024-01-04T00:25:15.816Z')
        ]
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:25:15.816Z')
      },
      {
        method: 'date',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: new Date('2024-01-04T00:25:15.816Z')
      },
      {
        method: 'required',
        name: 'strictArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          'blue',
          'red',
          'orange'
        ]
      },
      {
        method: 'array',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'red',
          'orange'
        ]
      },
      {
        method: 'required',
        name: 'anyArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          new Date('2024-01-04T00:25:15.816Z'),
          'string',
          true,
          123
        ]
      },
      {
        method: 'required',
        name: 'objectArray',
        expect: 'value other than undefined, null or empty string',
        received: [
          {
            keyObject: false
          }
        ]
      },
      {
        method: 'required',
        name: 'keyObject',
        expect: 'value other than undefined, null or empty string',
        received: false
      }
    ])
    expect(sut.errors).toEqual([
      {
        method: 'string',
        type: 'invalid value',
        name: 'all values in the stringArray',
        expect: 'string type',
        received: false,
        message: 'all values in the stringArray must be a string type!'
      },
      {
        method: 'number',
        type: 'invalid value',
        name: 'all values in the numberArray',
        expect: 'number type',
        received: '123',
        message: 'all values in the numberArray must be a number type!'
      },
      {
        method: 'boolean',
        type: 'invalid value',
        name: 'all values in the booleanArray',
        expect: 'boolean type',
        received: 'true',
        message: 'all values in the booleanArray must be a boolean type!'
      },
      {
        method: 'date',
        type: 'invalid value',
        name: 'all values in the dateArray',
        expect: 'date type ISO8601',
        received: '03/10/1993',
        message: 'the date all values in the dateArray is not in the format ISO8601!'
      },
      {
        method: 'array',
        type: 'invalid value',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'red',
          'orange'
        ],
        message: 'the array value does not match'
      },
      {
        method: 'array',
        type: 'invalid value',
        name: 'strictArray',
        expect: [
          'blue',
          'orange',
          'red'
        ],
        received: [
          'blue',
          'red',
          'orange'
        ],
        message: 'the array value does not match'
      },
      {
        method: 'string',
        type: 'invalid value',
        name: 'keyObject',
        expect: 'string type',
        received: false,
        message: 'keyObject must be a string type!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Must be able to validate the array method and return passes all tests when value is not provided', async () => {
    const schema = createSchema({
      stringArray: array.notRequired().string()
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'stringArray',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the array method and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      stringArray: array.required().string()
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      method: 'array',
      type: 'invalid value',
      name: 'stringArray',
      expect: 'array',
      received: 'undefined',
      message: 'stringArray value must be an array!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the array method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      stringArray: array.required().string()
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      stringArray: [true, 'string', 'string']
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('all values in the stringArray must be a string type!')
    )
  })

  it("Should be able to validate the array method and return doesn't passes all tests when value is not array", async () => {
    const schema = createSchema({
      stringArray: array.required().string()
    })

    const sut = await schema.validate({
      stringArray: 'string'
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        method: 'array',
        type: 'invalid value',
        name: 'stringArray',
        expect: 'array',
        received: 'string',
        message: 'stringArray value must be an array!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the array method and throw InvalidParamError when value is not array', async () => {
    const schema = createSchema({
      stringArray: array.required().string()
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      stringArray: 'string'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('stringArray value must be an array!')
    )
  })

  it('Should be able to throw InvalidParamError when error is true', async () => {
    const schema = createSchema({
      stringArray: array.required().string()
    }, { error: true })

    const sut = async (): Promise<Tests> => await schema.validate({
      stringArray: 'string'
    })

    await expect(sut).rejects.toThrow(
      new Error('stringArray value must be an array!')
    )
  })

  // Object
  it('Should be able to validate the object and return passes all tests', async () => {
    const schema = createSchema({
      keyObject: object({
        itemA: [string()]
      }).required()
    })

    const sut = await schema.validate({
      keyObject: {
        itemA: 'string'
      }
    })

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'itemA',
        expect: 'value other than undefined, null or empty string',
        received: 'string'
      },
      {
        method: 'string',
        name: 'itemA',
        expect: 'string type',
        received: 'string'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the required object and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyObject: object({
        itemA: [string()]
      }).required()
    })

    const sut = await schema.validate({
      keyObject: {
        itemA: false
      }
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'itemA',
      expect: 'value other than undefined, null or empty string',
      received: false
    }])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'itemA',
      expect: 'string type',
      received: false,
      message: 'itemA must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the not required object and return doesn't passes all tests", async () => {
    const schema = createSchema({
      keyObject: object({
        itemA: [string()]
      }).notRequired()
    })

    const sut = await schema.validate({
      keyObject: {
        itemA: false
      }
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        method: 'notRequired',
        name: 'keyObject',
        expect: 'value is not required and of any type',
        received: {
          itemA: false
        }
      },
      {
        method: 'required',
        name: 'itemA',
        expect: 'value other than undefined, null or empty string',
        received: false
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'itemA',
      expect: 'string type',
      received: false,
      message: 'itemA must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Must be able to validate the object and return doesn't passes all tests when value is not provided", async () => {
    const schema = createSchema({
      keyObject: object({
        itemA: [string()]
      }).notRequired()
    })

    const sut = await schema.validate({})

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      method: 'notRequired',
      name: 'keyObject',
      expect: 'value is not required and of any type',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to validate the array method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyObject: object({
        itemA: [string()]
      }).required()
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({
      keyObject: {
        itemA: false
      }
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('itemA must be a string type!')
    )
  })

  it('Should be able to validate the object and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyObject: object({
        itemA: [string()]
      }).required()
    }, { error: InvalidParamError })

    const sut = async (): Promise<Tests> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyObject is required!')
    )
  })

  it('Should be able to change the object key name using the alias method', async () => {
    const schema = createSchema({
      itemA: [alias('Item A'), string()]
    })

    const sut = await schema.validate({
      itemA: false
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([{
      method: 'required',
      name: 'Item A',
      expect: 'value other than undefined, null or empty string',
      received: false
    }])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'Item A',
      expect: 'string type',
      received: false,
      message: 'Item A must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  // Teste para arrumar

  it("Should be able to receive a schema array of required objects and return doesn't passes all tests", async () => {
    const schema = createSchema(array.required().object({
      itemA: [alias('Item A'), string()]
    }))

    const sut = await schema.validate([
      {
        itemA: false
      },
      {
        itemA: 'is string'
      }
    ])

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(4)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(5)
    expect(sut.successes).toEqual([
      {
        class: 'create schema',
        method: 'required',
        name: 'validate schema',
        expect: 'array of objects',
        received: [
          {
            itemA: false
          },
          {
            itemA: 'is string'
          }
        ]
      },
      {
        method: 'required',
        name: 'Item A',
        expect: 'value other than undefined, null or empty string',
        received: false
      },
      {
        method: 'required',
        name: 'Item A',
        expect: 'value other than undefined, null or empty string',
        received: 'is string'
      },
      {
        method: 'string',
        name: 'Item A',
        expect: 'string type',
        received: 'is string'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'Item A',
      expect: 'string type',
      received: false,
      message: 'Item A must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to receive a schema array of required objects with empty array value and return doesn't passes all tests", async () => {
    const schema = createSchema(array.required().object({
      itemA: [alias('Item A'), string()]
    }))

    const sut = await schema.validate([])

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      class: 'create schema',
      expect: 'array of objects',
      message: 'schema validate value must be an array!',
      method: 'required',
      name: 'validate schema',
      received: [],
      type: 'invalid param'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to receive a schema array of required objects with value undefined and return doesn't passes all tests", async () => {
    const schema = createSchema(array.required().object({
      itemA: [alias('Item A'), string()]
    }))

    const sut = await schema.validate(undefined as any)

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(2)
    expect(sut.totalTests).toEqual(2)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([
      {
        class: 'create schema',
        method: 'required',
        type: 'invalid param',
        name: 'validate schema',
        expect: 'array of objects',
        received: 'undefined',
        message: 'schema validate value must be an array!'
      },
      {
        class: 'create schema',
        type: 'invalid param',
        name: 'validate schema',
        expect: 'array of objects',
        received: 'undefined',
        message: 'schema validate value must be an array!'
      }
    ])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to receive a schema array of not required objects and return doesn't passes all tests", async () => {
    const schema = createSchema(array.notRequired().object({
      itemA: [alias('Item A'), string()]
    }))

    const sut = await schema.validate([
      {
        itemA: false
      },
      {
        itemA: 'is string'
      }
    ])

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(4)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(5)
    expect(sut.successes).toEqual([
      {
        class: 'create schema',
        method: 'notRequired',
        name: 'validate schema',
        expect: 'value is not required and of type object array',
        received: [
          {
            itemA: false
          },
          {
            itemA: 'is string'
          }
        ]
      },
      {
        method: 'required',
        name: 'Item A',
        expect: 'value other than undefined, null or empty string',
        received: false
      },
      {
        method: 'required',
        name: 'Item A',
        expect: 'value other than undefined, null or empty string',
        received: 'is string'
      },
      {
        method: 'string',
        name: 'Item A',
        expect: 'string type',
        received: 'is string'
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'Item A',
      expect: 'string type',
      received: false,
      message: 'Item A must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to receive a schema array of not required objects with empty array value and return passes all tests', async () => {
    const schema = createSchema(array.notRequired().object({
      itemA: [alias('Item A'), string()]
    }))

    const sut = await schema.validate([])

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      class: 'create schema',
      method: 'notRequired',
      name: 'validate schema',
      expect: 'value is not required and of type object array',
      received: []
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to return doesn't passes all tests when it lacks a schema or is in an invalid format", async () => {
    const schema = createSchema(undefined as any)

    const sut = await schema.validate([])

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      class: 'create schema',
      type: 'invalid param',
      name: 'create schema',
      expect: 'valid schema',
      received: 'undefined',
      message: 'the schema must be an object, object method, or array of objects method!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to receive a schema with object required method and return doesn't passed all tests", async () => {
    const schema = createSchema(object({
      itemB: [alias('Item B'), string()]
    }).required())

    const sut = await schema.validate({
      itemB: false
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        class: 'create schema',
        method: 'required',
        name: 'validate schema',
        expect: 'object',
        received: {
          itemB: false
        }
      },
      {
        method: 'required',
        name: 'Item B',
        expect: 'value other than undefined, null or empty string',
        received: false
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'Item B',
      expect: 'string type',
      received: false,
      message: 'Item B must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to return failed all tests receive when schema with method required and value not provided', async () => {
    const schema = createSchema(object({
      itemB: [alias('Item B'), string()]
    }).required())

    const sut = await schema.validate(undefined as any)

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(0)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([])
    expect(sut.errors).toEqual([{
      class: 'create schema',
      method: 'required',
      type: 'invalid param',
      name: 'validate schema',
      expect: 'object',
      received: 'undefined',
      message: 'schema validate value must be an object!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it("Should be able to receive a schema with object not required method and return doesn't passed all tests", async () => {
    const schema = createSchema(object({
      itemB: [alias('Item B'), string()]
    }).notRequired())

    const sut = await schema.validate({
      itemB: false
    })

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(2)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(3)
    expect(sut.successes).toEqual([
      {
        class: 'create schema',
        method: 'notRequired',
        name: 'validate schema',
        expect: 'value is not required and of type object',
        received: {
          itemB: false
        }
      },
      {
        method: 'required',
        name: 'Item B',
        expect: 'value other than undefined, null or empty string',
        received: false
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'string',
      type: 'invalid value',
      name: 'Item B',
      expect: 'string type',
      received: false,
      message: 'Item B must be a string type!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to return passes all tests receive when schema with method not required and value not provided', async () => {
    const schema = createSchema(object({
      itemB: [alias('Item B'), string()]
    }).notRequired())

    const sut = await schema.validate(undefined as any)

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(1)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(1)
    expect(sut.successes).toEqual([{
      class: 'create schema',
      method: 'notRequired',
      name: 'validate schema',
      expect: 'value is not required and of type object',
      received: 'undefined'
    }])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })
})
