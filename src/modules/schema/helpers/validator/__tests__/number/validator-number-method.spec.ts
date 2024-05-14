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
    const sut = [
      // number > float
      schema().number().float().validate(1.5),

      // number > float > min > ...
      schema().number().float().min(1).validate(1.5),
      schema().number().float().min(1).max(2).validate(1.5),
      schema().number().float().min(1).max(2).positive().validate(1.5),
      schema().number().float().min(-2).max(-1).negative().validate(-1.5),
      schema().number().float().min(1).positive().validate(1.5),
      schema().number().float().min(-2).positive().max(2).validate(1.5),
      schema().number().float().min(-2).negative().validate(-1.5),
      schema().number().float().min(-2).negative().max(-1).validate(-1.5),

      // number > float > max > ...
      schema().number().float().max(2).validate(1.5),
      schema().number().float().max(2).min(1).validate(1.5),
      schema().number().float().max(2).min(1).positive().validate(1.5),
      schema().number().float().max(-1).min(-2).negative().validate(-1.5),
      schema().number().float().min(1).positive().validate(1.5),
      schema().number().float().max(2).positive().min(-2).validate(1.5),
      schema().number().float().max(-1).negative().validate(-1.5),
      schema().number().float().max(-1).negative().min(-2).validate(-1.5),

      // number > float > positive > ...
      schema().number().float().positive().validate(1.5),
      schema().number().float().positive().min(1).validate(1.5),
      schema().number().float().positive().min(1).max(2).validate(1.5),
      schema().number().float().positive().max(2).min(1).validate(1.5),

      // number > float > negative > ...
      schema().number().float().negative().validate(-1.5),
      schema().number().float().negative().min(-2).validate(-1.5),
      schema().number().float().negative().min(-2).max(-1).validate(-1.5),
      schema().number().float().negative().max(-1).min(-2).validate(-1.5),

      // number > integer
      schema().number().integer().validate(2),

      // number > integer > min > ...
      schema().number().integer().min(1).validate(2),
      schema().number().integer().min(1).max(2).validate(1),
      schema().number().integer().min(1).max(2).positive().validate(1),
      schema().number().integer().min(-2).max(-1).negative().validate(-1),
      schema().number().integer().min(1).positive().validate(1),
      schema().number().integer().min(-2).positive().max(2).validate(1),
      schema().number().integer().min(-2).negative().validate(-1),
      schema().number().integer().min(-2).negative().max(-1).validate(-1),

      // number > integer > max > ...
      schema().number().integer().max(2).validate(1),
      schema().number().integer().max(2).min(1).validate(1),
      schema().number().integer().max(2).min(1).positive().validate(1),
      schema().number().integer().max(-1).min(-2).negative().validate(-1),
      schema().number().integer().min(1).positive().validate(1),
      schema().number().integer().max(2).positive().min(-2).validate(1),
      schema().number().integer().max(-1).negative().validate(-1),
      schema().number().integer().max(-1).negative().min(-2).validate(-1),

      // number > integer > positive > ...
      schema().number().integer().positive().validate(1),
      schema().number().integer().positive().min(1).validate(1),
      schema().number().integer().positive().min(1).max(2).validate(1),
      schema().number().integer().positive().max(2).min(1).validate(1),

      // number > integer > negative > ...
      schema().number().integer().negative().validate(-1),
      schema().number().integer().negative().min(-2).validate(-1),
      schema().number().integer().negative().min(-2).max(-1).validate(-1),
      schema().number().integer().negative().max(-1).min(-2).validate(-1),

      // number > min
      schema().number().min(1).validate(1.5),

      // number > min > float > ...
      schema().number().min(1).float().validate(1.5),
      schema().number().min(1).float().max(2).validate(1.5),
      schema().number().min(1).float().max(2).positive().validate(1.5),
      schema().number().min(-2).float().max(-1).negative().validate(-1.5),
      schema().number().min(1).float().positive().validate(1.5),
      schema().number().min(1).float().positive().max(2).validate(1.5),
      schema().number().min(-2).float().negative().validate(-1.5),
      schema().number().min(-2).float().negative().max(-1).validate(-1.5),

      // number > min > integer > ...
      schema().number().min(1).integer().validate(1),
      schema().number().min(1).integer().max(2).validate(1),
      schema().number().min(1).integer().max(2).positive().validate(1),
      schema().number().min(-2).integer().max(-1).negative().validate(-1),
      schema().number().min(1).integer().positive().validate(1),
      schema().number().min(1).integer().positive().max(2).validate(1),
      schema().number().min(-2).integer().negative().validate(-1),
      schema().number().min(-2).integer().negative().max(-1).validate(-1),

      // number > min > max > ...
      schema().number().min(1).max(2).validate(1),
      schema().number().min(1).max(2).float().validate(1.5),
      schema().number().min(1).max(2).float().positive().validate(1.5),
      schema().number().min(-2).max(-1).float().negative().validate(-1.5),
      schema().number().min(1).max(2).integer().validate(1),
      schema().number().min(1).max(2).integer().positive().validate(1),
      schema().number().min(-2).max(-1).integer().negative().validate(-1),
      schema().number().min(1).max(2).positive().validate(1),
      schema().number().min(1).max(2).positive().float().validate(1.5),
      schema().number().min(1).max(2).positive().integer().validate(1),
      schema().number().min(-2).max(-1).negative().validate(-1),
      schema().number().min(-2).max(-1).negative().float().validate(-1.5),
      schema().number().min(-2).max(-1).negative().integer().validate(-1),

      // number > min > positive > ...
      schema().number().min(1).positive().validate(1),
      schema().number().min(1).positive().max(2).validate(1),
      schema().number().min(1).positive().max(2).float().validate(1.5),
      schema().number().min(1).positive().max(2).integer().validate(1),
      schema().number().min(1).positive().float().validate(1.5),
      schema().number().min(1).positive().float().max(2).validate(1.5),
      schema().number().min(1).positive().integer().validate(1),
      schema().number().min(1).positive().integer().max(2).validate(1),

      // number > min > negative > ...
      schema().number().min(-2).negative().validate(-1),
      schema().number().min(-2).negative().max(-1).validate(-1),
      schema().number().min(-2).negative().max(-1).float().validate(-1.5),
      schema().number().min(-2).negative().max(-1).integer().validate(-1),
      schema().number().min(-2).negative().float().validate(-1.5),
      schema().number().min(-2).negative().float().max(-1).validate(-1.5),
      schema().number().min(-2).negative().integer().validate(-1),
      schema().number().min(-2).negative().integer().max(-1).validate(-1)
    ]

    expect(sut.every((value: boolean) => value)).toBeTruthy()
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
