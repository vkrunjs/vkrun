import { schema } from '../../../../index'
import { AnyError } from '../../../../../errors'

describe('Validator Number Method', () => {
  it('Should be able to validate the number method and return true if the value is of type number', () => {
    const value = 1

    const sut = schema()
      .number()
      .validate(value)

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate all sub methods of number method and return true if the value is valid', () => {
    // number > float
    expect(schema().number().float().validate(1.5)).toBeTruthy()

    // number > float > min > ...
    expect(schema().number().float().min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: 1 }).max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: 1 }).max({ max: 2 }).positive().validate(1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: -2 }).max({ max: -1 }).negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: 1 }).positive().validate(1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: -2 }).positive().max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: -2 }).negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: -2 }).negative().max({ max: -1 }).validate(-1.5)).toBeTruthy()

    // number > float > max > ...
    expect(schema().number().float().max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().max({ max: 2 }).min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().max({ max: 2 }).min({ min: 1 }).positive().validate(1.5)).toBeTruthy()
    expect(schema().number().float().max({ max: -1 }).min({ min: -2 }).negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().float().min({ min: 1 }).positive().validate(1.5)).toBeTruthy()
    expect(schema().number().float().max({ max: 2 }).positive().min({ min: -2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().max({ max: -1 }).negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().float().max({ max: -1 }).negative().min({ min: -2 }).validate(-1.5)).toBeTruthy()

    // number > float > positive > ...
    expect(schema().number().float().positive().validate(1.5)).toBeTruthy()
    expect(schema().number().float().positive().min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().positive().min({ min: 1 }).max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().float().positive().max({ max: 2 }).min({ min: 1 }).validate(1.5)).toBeTruthy()

    // number > float > negative > ...
    expect(schema().number().float().negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().float().negative().min({ min: -2 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().float().negative().min({ min: -2 }).max({ max: -1 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().float().negative().max({ max: -1 }).min({ min: -2 }).validate(-1.5)).toBeTruthy()

    // number > integer
    expect(schema().number().integer().validate(2)).toBeTruthy()

    // number > integer > min > ...
    expect(schema().number().integer().min({ min: 1 }).validate(2)).toBeTruthy()
    expect(schema().number().integer().min({ min: 1 }).max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().integer().min({ min: 1 }).max({ max: 2 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().integer().min({ min: -2 }).max({ max: -1 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().integer().min({ min: 1 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().integer().min({ min: -2 }).positive().max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().integer().min({ min: -2 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().integer().min({ min: -2 }).negative().max({ max: -1 }).validate(-1)).toBeTruthy()

    // number > integer > max > ...
    expect(schema().number().integer().max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().integer().max({ max: 2 }).min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().integer().max({ max: 2 }).min({ min: 1 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().integer().max({ max: -1 }).min({ min: -2 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().integer().min({ min: 1 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().integer().max({ max: 2 }).positive().min({ min: -2 }).validate(1)).toBeTruthy()
    expect(schema().number().integer().max({ max: -1 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().integer().max({ max: -1 }).negative().min({ min: -2 }).validate(-1)).toBeTruthy()

    // number > integer > positive > ...
    expect(schema().number().integer().positive().validate(1)).toBeTruthy()
    expect(schema().number().integer().positive().min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().integer().positive().min({ min: 1 }).max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().integer().positive().max({ max: 2 }).min({ min: 1 }).validate(1)).toBeTruthy()

    // number > integer > negative > ...
    expect(schema().number().integer().negative().validate(-1)).toBeTruthy()
    expect(schema().number().integer().negative().min({ min: -2 }).validate(-1)).toBeTruthy()
    expect(schema().number().integer().negative().min({ min: -2 }).max({ max: -1 }).validate(-1)).toBeTruthy()
    expect(schema().number().integer().negative().max({ max: -1 }).min({ min: -2 }).validate(-1)).toBeTruthy()

    // number > min
    expect(schema().number().min({ min: 1 }).validate(1.5)).toBeTruthy()

    // number > min > float > ...
    expect(schema().number().min({ min: 1 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).float().max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).float().max({ max: 2 }).positive().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).float().max({ max: -1 }).negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).float().positive().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).float().positive().max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).float().negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).float().negative().max({ max: -1 }).validate(-1.5)).toBeTruthy()

    // number > min > integer > ...
    expect(schema().number().min({ min: 1 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).integer().max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).integer().max({ max: 2 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).integer().max({ max: -1 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).integer().positive().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).integer().positive().max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).integer().negative().validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).integer().negative().max({ max: -1 }).validate(-1)).toBeTruthy()

    // number > min > max > ...
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).float().positive().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).max({ max: -1 }).float().negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).integer().positive().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).max({ max: -1 }).integer().negative().validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).positive().float().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).max({ max: 2 }).positive().integer().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).max({ max: -1 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).max({ max: -1 }).negative().float().validate(-1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).max({ max: -1 }).negative().integer().validate(-1)).toBeTruthy()

    // number > min > positive > ...
    expect(schema().number().min({ min: 1 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).positive().max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).positive().max({ max: 2 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).positive().max({ max: 2 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).positive().float().validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).positive().float().max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).positive().integer().validate(1)).toBeTruthy()
    expect(schema().number().min({ min: 1 }).positive().integer().max({ max: 2 }).validate(1)).toBeTruthy()

    // number > min > negative > ...
    expect(schema().number().min({ min: -2 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).negative().max({ max: -1 }).validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).negative().max({ max: -1 }).float().validate(-1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).negative().max({ max: -1 }).integer().validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).negative().float().validate(-1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).negative().float().max({ max: -1 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).negative().integer().validate(-1)).toBeTruthy()
    expect(schema().number().min({ min: -2 }).negative().integer().max({ max: -1 }).validate(-1)).toBeTruthy()

    // number > max
    expect(schema().number().max({ max: 2 }).validate(1)).toBeTruthy()

    // number > max > float > ...
    expect(schema().number().max({ max: 2 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).float().min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).float().min({ min: 1 }).positive().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).float().min({ min: -2 }).negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).float().positive().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).float().positive().min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).float().negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).float().negative().min({ min: -2 }).validate(-1.5)).toBeTruthy()

    // number > max > integer > ...
    expect(schema().number().max({ max: 2 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).integer().min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).integer().min({ min: 1 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).integer().min({ min: -2 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).integer().positive().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).integer().positive().min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).integer().negative().validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).integer().negative().min({ min: -2 }).validate(-1)).toBeTruthy()

    // number > max > max > ...
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).float().positive().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).min({ min: -2 }).float().negative().validate(-1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).integer().positive().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).min({ min: -2 }).integer().negative().validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).positive().float().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).min({ min: 1 }).positive().integer().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).min({ min: -2 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).min({ min: -2 }).negative().float().validate(-1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).min({ min: -2 }).negative().integer().validate(-1)).toBeTruthy()

    // number > max > positive > ...
    expect(schema().number().max({ max: 2 }).positive().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).positive().min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).positive().min({ min: 1 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).positive().min({ min: 1 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).positive().float().validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).positive().float().min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).positive().integer().validate(1)).toBeTruthy()
    expect(schema().number().max({ max: 2 }).positive().integer().min({ min: 1 }).validate(1)).toBeTruthy()

    // number > max > negative > ...
    expect(schema().number().max({ max: -1 }).negative().validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).negative().min({ min: -2 }).validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).negative().min({ min: -2 }).float().validate(-1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).negative().min({ min: -2 }).integer().validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).negative().float().validate(-1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).negative().float().min({ min: -2 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).negative().integer().validate(-1)).toBeTruthy()
    expect(schema().number().max({ max: -1 }).negative().integer().min({ min: -2 }).validate(-1)).toBeTruthy()

    // number > positive
    expect(schema().number().positive().validate(1)).toBeTruthy()

    // number > positive > float > ...
    expect(schema().number().positive().float().validate(1.5)).toBeTruthy()
    expect(schema().number().positive().float().min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().positive().float().min({ min: 1 }).max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().positive().float().max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().positive().float().max({ max: 2 }).min({ min: 1 }).validate(1.5)).toBeTruthy()

    // number > positive > integer > ...
    expect(schema().number().positive().integer().validate(1)).toBeTruthy()
    expect(schema().number().positive().integer().min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().positive().integer().min({ min: 1 }).max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().positive().integer().max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().positive().integer().max({ max: 2 }).min({ min: 1 }).validate(1)).toBeTruthy()

    // number > positive > min > ...
    expect(schema().number().positive().min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().positive().min({ min: 1 }).max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().positive().min({ min: 1 }).max({ max: 2 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().positive().min({ min: 1 }).max({ max: 2 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().positive().min({ min: 1 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().positive().min({ min: 1 }).float().max({ max: 2 }).validate(1.5)).toBeTruthy()
    expect(schema().number().positive().min({ min: 1 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().positive().min({ min: 1 }).integer().max({ max: 2 }).validate(1)).toBeTruthy()

    // number > positive > max > ...
    expect(schema().number().positive().max({ max: 2 }).validate(1)).toBeTruthy()
    expect(schema().number().positive().max({ max: 2 }).min({ min: 1 }).validate(1)).toBeTruthy()
    expect(schema().number().positive().max({ max: 2 }).min({ min: 1 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().positive().max({ max: 2 }).min({ min: 1 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().positive().max({ max: 2 }).float().validate(1.5)).toBeTruthy()
    expect(schema().number().positive().max({ max: 2 }).float().min({ min: 1 }).validate(1.5)).toBeTruthy()
    expect(schema().number().positive().max({ max: 2 }).integer().validate(1)).toBeTruthy()
    expect(schema().number().positive().max({ max: 2 }).integer().min({ min: 1 }).validate(1)).toBeTruthy()

    // number > negative
    expect(schema().number().negative().validate(-1)).toBeTruthy()

    // number > negative > float > ...
    expect(schema().number().negative().float().validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().float().min({ min: -2 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().float().min({ min: -2 }).max({ max: -1 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().float().max({ max: -1 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().float().max({ max: -1 }).min({ min: -2 }).validate(-1.5)).toBeTruthy()

    // number > negative > integer > ...
    expect(schema().number().negative().integer().validate(-1)).toBeTruthy()
    expect(schema().number().negative().integer().min({ min: -2 }).validate(-1)).toBeTruthy()
    expect(schema().number().negative().integer().min({ min: -2 }).max({ max: -1 }).validate(-1)).toBeTruthy()
    expect(schema().number().negative().integer().max({ max: -1 }).validate(-1)).toBeTruthy()
    expect(schema().number().negative().integer().max({ max: -1 }).min({ min: -2 }).validate(-1)).toBeTruthy()

    // number > negative > min > ...
    expect(schema().number().negative().min({ min: -2 }).validate(-1)).toBeTruthy()
    expect(schema().number().negative().min({ min: -2 }).max({ max: -1 }).validate(-1)).toBeTruthy()
    expect(schema().number().negative().min({ min: -2 }).max({ max: -1 }).float().validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().min({ min: -2 }).max({ max: -1 }).integer().validate(-1)).toBeTruthy()
    expect(schema().number().negative().min({ min: -2 }).float().validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().min({ min: -2 }).float().max({ max: -1 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().min({ min: -2 }).integer().validate(-1)).toBeTruthy()
    expect(schema().number().negative().min({ min: -2 }).integer().max({ max: -1 }).validate(-1)).toBeTruthy()

    // number > negative > max > ...
    expect(schema().number().negative().max({ max: -1 }).validate(-1)).toBeTruthy()
    expect(schema().number().negative().max({ max: -1 }).min({ min: -2 }).validate(-1)).toBeTruthy()
    expect(schema().number().negative().max({ max: -1 }).min({ min: -2 }).float().validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().max({ max: -1 }).min({ min: -2 }).integer().validate(-1)).toBeTruthy()
    expect(schema().number().negative().max({ max: -1 }).float().validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().max({ max: -1 }).float().min({ min: -2 }).validate(-1.5)).toBeTruthy()
    expect(schema().number().negative().max({ max: -1 }).integer().validate(-1)).toBeTruthy()
    expect(schema().number().negative().max({ max: -1 }).integer().min({ min: -2 }).validate(-1)).toBeTruthy()
  })

  it('Should be able to validate the number method and return false if list is invalid', () => {
    const invalidList = [
      'invalid-uuid-57b73598-8764-4ad0-a76a-679bb6640eb1',
      false,
      new Date(),
      null,
      [],
      {},
      undefined
    ]

    const sut = schema().number()

    expect(invalidList.every((value) => sut.validate(value))).toBeFalsy()
  })

  it('Should be able to validate the number method when value is promise and return true if the value is of type number', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the number method when value is promise and return false if the value is not of type number', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the number method and passedAll to equal true if the value is of type number', () => {
    const value = 1

    const sut = schema()
      .number()
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
        received: 1
      },
      {
        method: 'number',
        expect: 'number type',
        name: 'value_name',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the number method and passedAll to equal false if the value is not of type number', () => {
    const value = false

    const sut = schema()
      .number()
      .test(value, 'value_name')

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

  it('Should allow custom error message', () => {
    const value = false

    const sut = schema()
      .number({ message: '[valueName] [value]!' })
      .test(value, 'value_name')

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
      message: 'value_name false!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the number and passAll method as equal to true when it is not required, undefined value and not of type number', () => {
    const value = undefined

    const sut = schema()
      .number()
      .notRequired()
      .test(value, 'value_name')

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

  it('Should be able to validate the number method and passedAll to equal true if the value is promise of type number', async () => {
    const value = async (): Promise<number> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .testAsync(value(), 'value_name')

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
        method: 'number',
        expect: 'number type',
        name: 'value_name',
        received: 1
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the number method and passedAll to equal false if the value is a promise and is not of type number', async () => {
    const value = async (): Promise<boolean> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 100)
      })
    }

    const sut = await schema()
      .number()
      .testAsync(value(), 'value_name')

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

  it('Should be able to validate the number method and throw AnyError if the value is not of type number', () => {
    const value = undefined

    const sut = (): void => schema()
      .number()
      .throw(value, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the number method and throw Error if the value is a promise and is not of type number', async () => {
    const value = async (): Promise<null> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await schema()
      .number()
      .throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('value_name must be a number type!')
  })
})
