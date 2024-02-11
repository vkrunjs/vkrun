import { schema } from '../../index'
import { AnyError } from '../../../errors'

describe('Validator Object Method', () => {
  it('Should be able to validate the object method and return true if the value is valid', () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const sut = objectSchema.validate({
      valueA: 'any value',
      valueB: true,
      valueC: 123,
      valueD: new Date(),
      valueE: {
        valueF: 'any value'
      }
    })

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the object method and return false if the value is invalid', () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const sut = objectSchema.validate({
      valueA: 'any value',
      valueB: true,
      valueC: 123,
      valueD: new Date(),
      valueE: false
    })

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the object method when value is promise and return true if the value is valid', async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const value = async (): Promise<object> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: 'any value',
            valueB: true,
            valueC: 123,
            valueD: new Date(),
            valueE: {
              valueF: 'any value'
            }
          })
        }, 100)
      })
    }

    const sut = await objectSchema.validateAsync(value())

    expect(sut).toBeTruthy()
  })

  it('Should be able to validate the object method when value is promise and return false if the value is invalid', async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const value = async (): Promise<object> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: 'any value',
            valueB: true,
            valueC: 123,
            valueD: new Date(),
            valueE: false
          })
        }, 100)
      })
    }

    const sut = await objectSchema.validateAsync(value())

    expect(sut).toBeFalsy()
  })

  it('Should be able to validate the object method and passedAll to equal true if the value is valid', () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const sut = objectSchema.test({
      valueA: 'any value',
      valueB: true,
      valueC: 123,
      valueD: new Date('2024-01-28T18:24:55.758Z'),
      valueE: {
        valueF: 'any value'
      }
    }, 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(14)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(14)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: {
            valueF: 'any value'
          }
        }
      },
      {
        method: 'object',
        name: 'value_name',
        expect: 'object type',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: {
            valueF: 'any value'
          }
        }
      },
      {
        method: 'required',
        name: 'valueA',
        expect: 'value other than undefined',
        received: 'any value'
      },
      {
        method: 'string',
        name: 'valueA',
        expect: 'string type',
        received: 'any value'
      },
      {
        method: 'required',
        name: 'valueB',
        expect: 'value other than undefined',
        received: true
      },
      {
        method: 'boolean',
        name: 'valueB',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'valueC',
        expect: 'value other than undefined',
        received: 123
      },
      {
        method: 'number',
        name: 'valueC',
        expect: 'number type',
        received: 123
      },
      {
        method: 'required',
        name: 'valueD',
        expect: 'value other than undefined',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'date',
        name: 'valueD',
        expect: 'ISO8601 date type',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'required',
        name: 'valueE',
        expect: 'value other than undefined',
        received: {
          valueF: 'any value'
        }
      },
      {
        method: 'object',
        name: 'valueE',
        expect: 'object type',
        received: {
          valueF: 'any value'
        }
      },
      {
        method: 'required',
        name: 'valueF',
        expect: 'value other than undefined',
        received: 'any value'
      },
      {
        method: 'string',
        name: 'valueF',
        expect: 'string type',
        received: 'any value'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the object method and passedAll to equal false if the value is invalid', () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const sut = objectSchema.test({
      valueA: 'any value',
      valueB: true,
      valueC: 123,
      valueD: new Date('2024-01-28T18:24:55.758Z'),
      valueE: false
    }, 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(11)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(12)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: false
        }
      },
      {
        method: 'object',
        name: 'value_name',
        expect: 'object type',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: false
        }
      },
      {
        method: 'required',
        name: 'valueA',
        expect: 'value other than undefined',
        received: 'any value'
      },
      {
        method: 'string',
        name: 'valueA',
        expect: 'string type',
        received: 'any value'
      },
      {
        method: 'required',
        name: 'valueB',
        expect: 'value other than undefined',
        received: true
      },
      {
        method: 'boolean',
        name: 'valueB',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'valueC',
        expect: 'value other than undefined',
        received: 123
      },
      {
        method: 'number',
        name: 'valueC',
        expect: 'number type',
        received: 123
      },
      {
        method: 'required',
        name: 'valueD',
        expect: 'value other than undefined',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'date',
        name: 'valueD',
        expect: 'ISO8601 date type',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'required',
        name: 'valueE',
        expect: 'value other than undefined',
        received: false
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'object',
      type: 'invalid value',
      name: 'valueE',
      expect: 'object type',
      received: false,
      message: 'valueE value must be an object!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the object and passAll method as equal to true when it is not required abd value is undefined', () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    }).notRequired()

    const sut = objectSchema.test(undefined, 'value_name')

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

  it('Should be able to validate the boolean method and passedAll to equal true if the value is promise and valid', async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const value = async (): Promise<object> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: 'any value',
            valueB: true,
            valueC: 123,
            valueD: new Date('2024-01-28T18:24:55.758Z'),
            valueE: {
              valueF: 'any value'
            }
          })
        }, 100)
      })
    }

    const sut = await objectSchema.testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeTruthy()
    expect(sut.passed).toEqual(14)
    expect(sut.failed).toEqual(0)
    expect(sut.totalTests).toEqual(14)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: {
            valueF: 'any value'
          }
        }
      },
      {
        method: 'object',
        name: 'value_name',
        expect: 'object type',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: {
            valueF: 'any value'
          }
        }
      },
      {
        method: 'required',
        name: 'valueA',
        expect: 'value other than undefined',
        received: 'any value'
      },
      {
        method: 'string',
        name: 'valueA',
        expect: 'string type',
        received: 'any value'
      },
      {
        method: 'required',
        name: 'valueB',
        expect: 'value other than undefined',
        received: true
      },
      {
        method: 'boolean',
        name: 'valueB',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'valueC',
        expect: 'value other than undefined',
        received: 123
      },
      {
        method: 'number',
        name: 'valueC',
        expect: 'number type',
        received: 123
      },
      {
        method: 'required',
        name: 'valueD',
        expect: 'value other than undefined',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'date',
        name: 'valueD',
        expect: 'ISO8601 date type',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'required',
        name: 'valueE',
        expect: 'value other than undefined',
        received: {
          valueF: 'any value'
        }
      },
      {
        method: 'object',
        name: 'valueE',
        expect: 'object type',
        received: {
          valueF: 'any value'
        }
      },
      {
        method: 'required',
        name: 'valueF',
        expect: 'value other than undefined',
        received: 'any value'
      },
      {
        method: 'string',
        name: 'valueF',
        expect: 'string type',
        received: 'any value'
      }
    ])
    expect(sut.errors).toEqual([])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the object method and passedAll to equal false if the value is a promise and invalid', async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const value = async (): Promise<object> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: 'any value',
            valueB: true,
            valueC: 123,
            valueD: new Date('2024-01-28T18:24:55.758Z'),
            valueE: false
          })
        }, 100)
      })
    }

    const sut = await objectSchema.testAsync(value(), 'value_name')

    expect(sut.passedAll).toBeFalsy()
    expect(sut.passed).toEqual(11)
    expect(sut.failed).toEqual(1)
    expect(sut.totalTests).toEqual(12)
    expect(sut.successes).toEqual([
      {
        method: 'required',
        name: 'value_name',
        expect: 'value other than undefined',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: false
        }
      },
      {
        method: 'object',
        name: 'value_name',
        expect: 'object type',
        received: {
          valueA: 'any value',
          valueB: true,
          valueC: 123,
          valueD: new Date('2024-01-28T18:24:55.758Z'),
          valueE: false
        }
      },
      {
        method: 'required',
        name: 'valueA',
        expect: 'value other than undefined',
        received: 'any value'
      },
      {
        method: 'string',
        name: 'valueA',
        expect: 'string type',
        received: 'any value'
      },
      {
        method: 'required',
        name: 'valueB',
        expect: 'value other than undefined',
        received: true
      },
      {
        method: 'boolean',
        name: 'valueB',
        expect: 'boolean type',
        received: true
      },
      {
        method: 'required',
        name: 'valueC',
        expect: 'value other than undefined',
        received: 123
      },
      {
        method: 'number',
        name: 'valueC',
        expect: 'number type',
        received: 123
      },
      {
        method: 'required',
        name: 'valueD',
        expect: 'value other than undefined',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'date',
        name: 'valueD',
        expect: 'ISO8601 date type',
        received: new Date('2024-01-28T18:24:55.758Z')
      },
      {
        method: 'required',
        name: 'valueE',
        expect: 'value other than undefined',
        received: false
      }
    ])
    expect(sut.errors).toEqual([{
      method: 'object',
      type: 'invalid value',
      name: 'valueE',
      expect: 'object type',
      received: false,
      message: 'valueE value must be an object!'
    }])
    expect(typeof sut.time === 'string').toBeTruthy()
  })

  it('Should be able to validate the object method and throw AnyError if the value is invalid', () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const sut = (): void => objectSchema.throw(undefined, 'value_name', AnyError)

    expect(sut).toThrow(AnyError)
    expect(sut).toThrow(new AnyError('value_name is required!'))
  })

  it('Should be able to validate the object method and throw Error if the value is a promise and is not of type object', async () => {
    const objectSchema = schema().object({
      valueA: schema().string(),
      valueB: schema().boolean(),
      valueC: schema().number(),
      valueD: schema().date(),
      valueE: schema().object({
        valueF: schema().string()
      })
    })

    const value = async (): Promise<object> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            valueA: 'any value',
            valueB: true,
            valueC: 123,
            valueD: new Date('2024-01-28T18:24:55.758Z'),
            valueE: false
          })
        }, 100)
      })
    }

    const sut = async (): Promise<void> => await objectSchema.throwAsync(value(), 'value_name')

    await expect(sut).rejects.toThrow('valueE value must be an object!')
  })

  it('Should be able to validate the object method and throw Error if the schema is not of type object', () => {
    try {
      schema().object(null as any)
    } catch (error: any) {
      const sut = error

      expect(sut.message).toEqual('vkrun-schema: object method received invalid parameter!')
    }
  })

  it("Should be able to validate the object's method and throw Error if the schema has a key with different typing than the Validator class", () => {
    try {
      schema().object({
        valueA: schema().string(),
        valueB: true
      })
    } catch (error: any) {
      const sut = error

      expect(sut.message).toEqual('vkrun-schema: object method received invalid parameter!')
    }
  })
})
