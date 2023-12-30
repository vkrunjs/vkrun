import { InvalidParamError } from '../../errors'
import {
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
  string,
  time,
  uuid
} from '../index'

describe('Schema', () => {
  // String
  it('Should be able to validate the string method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyString: [string()]
    })

    const sut = await schema.validate({
      keyString: 'value is string'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the string method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyString: [string()]
    })

    const sut = await schema.validate({
      keyString: false
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the string method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyString: [string()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the string method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyString: [string(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it('Must be able to validate the string method and return true when not required and value is provided', async () => {
    const schema = createSchema({
      keyString: [string(), notRequired()]
    })

    const sut = await schema.validate({
      keyString: 'string'
    })
    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the string method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyString: [string()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({ keyString: false })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyString must be a string type!')
    )
  })

  it('Should be able to validate the string method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyString: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyString key is required!')
    )
  })

  // Number
  it('Should be able to validate the number method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: 123
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the number method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: false
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the number method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the number method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the number method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({ keyNumber: false })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyNumber must be a number type!')
    )
  })

  it('Should be able to validate the number method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyNumber key is required!')
    )
  })

  // Boolean
  it('Should be able to validate the boolean method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    })

    const sut = await schema.validate({
      keyBooleanTrue: true,
      keyBooleanFalse: false
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the boolean method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    })

    const sut = await schema.validate({
      keyBooleanTrue: true,
      keyBooleanFalse: 'false'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the number method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the boolean method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean(), notRequired()],
      keyBooleanFalse: [boolean(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the boolean method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyBooleanTrue key is required!')
    )
  })

  // MinWord
  it('Should be able to validate the minWord method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    })

    const sut = await schema.validate({
      keyMinWord: 'any text'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the minWord method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    })

    const sut = await schema.validate({
      keyMinWord: 'any_text'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the minWord method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the minWord method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the minWord method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinWord: [minWord(2)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMinWord key is required!')
    )
  })

  // MaxLength
  it('Should be able to validate the maxLength method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(4)]
    })

    const sut = await schema.validate({
      keyMaxLength: 'text'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the maxLength method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3)]
    })

    const sut = await schema.validate({
      keyMaxLength: 'text'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the maxLength method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3)]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the maxLength method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the maxLength method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMaxLength: [maxLength(3)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMaxLength key is required!')
    )
  })

  // MinLength
  it('Should be able to validate the minLength method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyMinLength: [minLength(4)]
    })

    const sut = await schema.validate({
      keyMinLength: 'text'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the maxLength method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5)]
    })

    const sut = await schema.validate({
      keyMinLength: 'text'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the maxLength method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5)]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the maxLength method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the maxLength method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyMinLength: [minLength(5)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyMinLength key is required!')
    )
  })

  // Uuid
  it('Should be able to validate the uuid method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    })

    const sut = await schema.validate({
      keyUuid: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the uuid method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    })

    const sut = await schema.validate({
      keyUuid: '123'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the uuid method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the uuid method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyUuid: [uuid(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the uuid method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyUuid: [uuid()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyUuid key is required!')
    )
  })

  // Email
  it('Should be able to validate the email method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyEmail: [email()]
    })

    const sut = await schema.validate({
      keyEmail: 'email@email.com'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the email method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyEmail: [email()]
    })

    const sut = await schema.validate({
      keyEmail: 'email@email'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the email method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyEmail: [email()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the email method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyEmail: [email(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the email method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyEmail: [email()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyEmail key is required!')
    )
  })

  // Number
  it('Should be able to validate the number method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: 123
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the number method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({
      keyNumber: '123'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the number method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the number method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the number method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyNumber key is required!')
    )
  })

  // Float
  it('Should be able to validate the float method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyFloat: [float()]
    })

    const sut = await schema.validate({
      keyFloat: 123.5
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the float method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyFloat: [float()]
    })

    const sut = await schema.validate({
      keyFloat: 123
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the float method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyFloat: [float()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the float method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyFloat: [float(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the float method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyFloat: [float()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyFloat key is required!')
    )
  })

  // Integer
  it('Should be able to validate the integer method and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    })

    const sut = await schema.validate({
      keyInteger: 123
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the integer method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    })

    const sut = await schema.validate({
      keyInteger: 123.5
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the integer method and return false when value is not provided', async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the integer method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      keyInteger: [integer(), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the integer method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyInteger: [integer()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyInteger key is required!')
    )
  })

  // Date
  it('Should be able to validate the date method and return true if it passes all tests', async () => {
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
      'ISO8601-A': new Date(),
      'ISO8601-B': new Date().toISOString(),
      'DD/MM/YYYY': '30/12/2000',
      'MM/DD/YYYY': '12/30/2000',
      'DD-MM-YYYY': '30-12-2000',
      'MM-DD-YYYY': '12-30-2000',
      'YYYY/MM/DD': '2000/12/30',
      'YYYY/DD/MM': '2000/30/12',
      'YYYY-MM-DD': '2000-12-30',
      'YYYY-DD-MM': '2000-30-12'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the date method and return false if it doesn't passes all tests", async () => {
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
      'DD/MM/YYYY': new Date(),
      'MM/DD/YYYY': new Date(),
      'DD-MM-YYYY': new Date(),
      'MM-DD-YYYY': new Date(),
      'YYYY/MM/DD': new Date(),
      'YYYY/DD/MM': new Date(),
      'YYYY-MM-DD': new Date(),
      'YYYY-DD-MM': new Date()
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the date method and return false when value is not provided', async () => {
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

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the date method and return true when not required and value is not provided', async () => {
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

    expect(sut).toBeTruthy()
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

    const sut = async (): Promise<boolean> => await schema.validate({
      keyDate: 123.5
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('ISO8601-A key is required!')
    )
  })

  it('Should be able to validate the date method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyDate: [date()]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyDate key is required!')
    )
  })

  // DateGreaterThan
  it('Should be able to validate the dateGreaterThan method and return true if it passes all tests', async () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateGreaterThan: date
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the dateGreaterThan method and return false if it doesn't passes all tests", async () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateGreaterThan: date
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the dateGreaterThan method and return false when value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the dateGreaterThan method and return true when not required and value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the dateGreaterThan method and throw InvalidParamError if doesn't passes all tests", async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateGreaterThan: [dateGreaterThan(refDate)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyDateGreaterThan key is required!')
    )
  })

  // DateLessThan
  it('Should be able to validate the dateLessThan method and return true if it passes all tests', async () => {
    const date = new Date('2000-02-02T02:00:00.000Z')
    const refDate = new Date('2000-02-03T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateLessThan: date
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the dateLessThan method and return false if it doesn't passes all tests", async () => {
    const date = new Date('2000-02-03T02:00:00.000Z')
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    })

    const sut = await schema.validate({
      keyDateLessThan: date
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the dateLessThan method and return false when value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the dateLessThan method and return true when not required and value is not provided', async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the dateLessThan method and throw InvalidParamError if doesn't passes all tests", async () => {
    const refDate = new Date('2000-02-02T02:00:00.000Z')

    const schema = createSchema({
      keyDateLessThan: [dateLessThan(refDate)]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyDateLessThan key is required!')
    )
  })

  // Time
  it('Should be able to validate the time method and return true if it passes all tests', async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    })

    const sut = await schema.validate({
      'HH:MM:SS': '11:05:30',
      'HH:MM': '11:05'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the time method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    })

    const sut = await schema.validate({
      'HH:MM:SS': '11:05',
      'HH:MM': '11:05:30'
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the time method and return false when value is not provided', async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the time method and return true when not required and value is not provided', async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS'), notRequired()],
      'HH:MM': [time('HH:MM'), notRequired()]
    })

    const sut = await schema.validate({})

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the time method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      'HH:MM:SS': [time('HH:MM:SS')],
      'HH:MM': [time('HH:MM')]
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('HH:MM:SS key is required!')
    )
  })

  // Array
  it('Should be able to validate the array method and return true if it passes all tests', async () => {
    const schema = createSchema({
      stringArray: array.string(),
      numberArray: array.number(),
      booleanArray: array.boolean(),
      dateArray: array.date('ISO8601'),
      strictArray: array.strict(['blue', 'orange', 'red']),
      anyArray: array.any(),
      objectArray: array.object({
        keyObject: [string()]
      })
    })

    const sut = await schema.validate({
      stringArray: ['string', 'string', 'string'],
      numberArray: [123, 123, 123],
      booleanArray: [true, false, true],
      dateArray: [new Date(), new Date(), new Date()],
      strictArray: ['blue', 'orange', 'red'],
      anyArray: [new Date(), 'string', true, 123],
      objectArray: [{
        keyObject: 'string'
      }]
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the array method and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      stringArray: array.string(),
      numberArray: array.number(),
      booleanArray: array.boolean(),
      dateArray: array.date('ISO8601'),
      strictArray: array.strict(['blue', 'orange', 'red']),
      anyArray: array.any(),
      objectArray: array.object({
        keyObject: [string()]
      })
    })

    const sut = await schema.validate({
      stringArray: ['string', false, 'string'],
      numberArray: [123, '123', 123],
      booleanArray: ['true', false, true],
      dateArray: [new Date(), '03/10/1993', new Date()],
      strictArray: ['blue', 'red', 'orange'],
      anyArray: [new Date(), 'string', true, 123],
      objectArray: [{
        keyObject: false
      }]
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the array method and return false when value is not provided', async () => {
    const schema = createSchema({
      stringArray: array.string()
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it("Should be able to validate the array method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      stringArray: array.string()
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
      stringArray: [true, 'string', 'string']
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('all values in the stringArray must be a string type!')
    )
  })

  it('Should be able to validate the array method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      stringArray: array.string()
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('stringArray key is required!')
    )
  })

  it('Should be able to validate the array method and return false when value is not array', async () => {
    const schema = createSchema({
      stringArray: array.string()
    })

    const sut = await schema.validate({
      stringArray: 'string'
    })

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the array method and throw InvalidParamError when value is not array', async () => {
    const schema = createSchema({
      stringArray: array.string()
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
      stringArray: 'string'
    })

    await expect(sut).rejects.toThrow(
      new InvalidParamError('stringArray value must be an array!')
    )
  })

  // Object
  it('Should be able to validate the object and return true if it passes all tests', async () => {
    const schema = createSchema({
      keyObject: {
        itemA: [string()]
      }
    })

    const sut = await schema.validate({
      keyObject: {
        itemA: 'string'
      }
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the object and return false if it doesn't passes all tests", async () => {
    const schema = createSchema({
      keyObject: {
        itemA: [string()]
      }
    })

    const sut = await schema.validate({
      keyObject: {
        itemA: false
      }
    })

    expect(sut).toBeFalsy()
  })

  it('Must be able to validate the object and return false when value is not provided', async () => {
    const schema = createSchema({
      keyObject: {
        itemA: [string()]
      }
    })

    const sut = await schema.validate({})

    expect(sut).toBeFalsy()
  })

  it("Should be able to validate the array method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyObject: {
        itemA: [string()]
      }
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
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
      keyObject: {
        itemA: [string()]
      }
    }, { error: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(
      new InvalidParamError('keyObject key is required!')
    )
  })
})
