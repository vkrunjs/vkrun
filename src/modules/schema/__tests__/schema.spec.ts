import { InvalidParamError } from '../../errors'
import {
  boolean,
  createSchema,
  notRequired,
  number,
  string
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

  it("Should be able to validate the string method and throw InvalidParamError if doesn't passes all tests", async () => {
    const schema = createSchema({
      keyString: [string()]
    }, { errorType: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({ string: false })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow('invalid param: keyString must be a string type!')
  })

  it('Should be able to validate the string method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyString: [number()]
    }, { errorType: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow('invalid param: keyString key is required!')
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
    }, { errorType: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({ keyNumber: false })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow('invalid param: keyNumber must be a number type!')
  })

  it('Should be able to validate the number method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyNumber: [number()]
    }, { errorType: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow('invalid param: keyNumber key is required!')
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
    }, { errorType: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({
      keyBooleanTrue: 'true',
      keyBooleanFalse: false
    })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow('invalid param: keyBooleanTrue must be a boolean type!')
  })

  it('Should be able to validate the boolean method and throw InvalidParamError when value is not provided', async () => {
    const schema = createSchema({
      keyBooleanTrue: [boolean()],
      keyBooleanFalse: [boolean()]
    }, { errorType: InvalidParamError })

    const sut = async (): Promise<boolean> => await schema.validate({})

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow('invalid param: keyBooleanTrue key is required!')
  })
})
