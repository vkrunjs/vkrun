import { InvalidParamError } from '../../errors'
import {
  createSchema,
  string
} from '../index'

describe('Schema', () => {
  it('Should be able to validate the string method and return true if it passes all tests', async () => {
    const userSchema = createSchema({
      string: [string()]
    })

    const sut = await userSchema.validate({
      string: 'value is string'
    })

    expect(sut).toBeTruthy()
  })

  it("Should be able to validate the string method and return false if it doesn't passes all tests", async () => {
    const userSchema = createSchema({
      string: [string()]
    })

    const sut = await userSchema.validate({
      string: false
    })

    expect(sut).toBeFalsy()
  })

  it("Should be able to validate the string method and throw InvalidParamError if doesn't passes all tests", async () => {
    const userSchema = createSchema({
      string: [string()]
    }, { errorType: InvalidParamError })

    const sut = async (): Promise<boolean> => await userSchema.validate({ string: false })

    await expect(sut).rejects.toThrow(InvalidParamError)
    await expect(sut).rejects.toThrow('invalid param: string must be a string type!')
  })
})
