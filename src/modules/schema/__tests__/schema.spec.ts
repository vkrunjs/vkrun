import { array, createSchema, date, minWord, notRequired, string, uuid } from '../index'
import { InvalidParamError } from '../../errors'

describe('Validator', () => {
  it('should validate an object with ObjectValidator', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()]
    })

    try {
      userSchema.validate({
        name: false,
        email: 'john@example.com'
      })
    } catch (error: any) {
      expect(error.message).toEqual('name must be a string type!')
    }
  })

  it('should validate an object with ObjectValidator 2', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()]
    })

    try {
      userSchema.validate({
        name: '',
        email: 'john@example.com'
      })
    } catch (error: any) {
      expect(error.message).toEqual('name is required!')
    }
  })

  it('should validate an object with ObjectValidator 3', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()]
      }
    }, { errorType: InvalidParamError })

    try {
      userSchema.validate({
        name: 'john lenon',
        email: 'john@example.com'
      })
    } catch (error: any) {
      expect(error.message).toEqual('invalid param: dados key is required!')
    }
  })

  it('should validate an object with ObjectValidator 4', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()]
      }
    }, { errorType: InvalidParamError })

    try {
      userSchema.validate({
        name: 'john lenon',
        email: 'john@example.com',
        dados: {
          documento: false
        }
      })
    } catch (error: any) {
      expect(error.message).toEqual('invalid param: documento must be a string type!')
    }
  })

  it('should validate an object with ObjectValidator 5', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()]
      }
    }, { errorType: InvalidParamError })

    try {
      userSchema.validate({
        name: 'john lenon',
        email: 'john@example.com',
        dados: {
          documento: ''
        }
      })
    } catch (error: any) {
      expect(error.message).toEqual('invalid param: documento is required!')
    }
  })

  it('should validate an object with ObjectValidator 6', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()]
      }
    }, { errorType: InvalidParamError })

    expect(() => {
      userSchema.validate({
        name: 'john lenon',
        email: 'john@example.com',
        dados: {
          documento: '123'
        }
      })
    }).not.toThrow()
  })

  it('should validate an object with ObjectValidator 7', () => {
    const userSchema = createSchema(
      {
        name: [string()],
        email: [string()],
        dados: {
          documento: {
            testeA: {
              testeB: [string()]
            }
          }
        }
      },
      { errorType: InvalidParamError }
    )

    expect(() => {
      userSchema.validate({
        name: 'john lenon',
        email: 'john@example.com',
        dados: {
          documento: {
            testeA: {
              testeB: '123'
            }
          },
          lista: 'some value' // This key is not declared in the schema

        }
      })
    }).toThrow('lista key was not declared in the schema')
  })

  it('should validate an object with ObjectValidator 8', () => {
    const userSchema = createSchema(
      {
        name: [string()],
        email: [string()],
        dados: {
          documento: {
            testeA: {
              testeB: [string()]
            }
          }
        }
      },
      { errorType: InvalidParamError }
    )

    expect(() => {
      userSchema.validate({
        name: 'john lenon',
        email: 'john@example.com',
        dados: {
          documento: {
            testeA: {
              testeB: '123'
            }
          }
        }
      })
    }).not.toThrow()
  })

  it('should validate an object with ObjectValidator 9', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()],
        lista: array('string')
      }
    }, { errorType: InvalidParamError })

    try {
      userSchema.validate({
        name: ' ',
        email: 'john@example.com',
        dados: {
          documento: '123',
          lista: ['a', 'b', true]
        }
      })
    } catch (error: any) {
      expect(error.message).toEqual('invalid param: all values in the lista must be a string type!')
    }
  })

  it('should validate an object with ObjectValidator 10', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()],
        lista: array({
          perfil: [string()],
          website: [string()]
        })
      }
    }, { errorType: InvalidParamError })

    expect(() => {
      userSchema.validate({
        name: 'jhon lenon',
        email: 'john@example.com',
        dados: {
          documento: '123',
          lista: [{
            perfil: 'desenvolvedor',
            website: ''
          }]
        }
      })
    }).toThrow('invalid param: website is required!')
  })

  it('should validate an object with ObjectValidator 11', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()],
        lista: array({
          perfil: [string()],
          website: [string()]
        })
      }
    }, { errorType: InvalidParamError })

    expect(() => {
      userSchema.validate({
        name: 'jhon lenon',
        email: 'john@example.com',
        dados: {
          documento: '123',
          lista: [{
            perfil: 'desenvolvedor',
            website: ''
          }]
        }
      })
    }).toThrow('invalid param: website is required!')
  })

  it('should validate an object with ObjectValidator 12', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()],
        lista: array({
          perfil: [string()],
          website: [string(), notRequired()]
        })
      }
    })

    const sut = userSchema.validate({
      name: 'jhon lenon',
      email: 'john@example.com',
      dados: {
        documento: '123',
        lista: [{
          perfil: 'desenvolvedor',
          website: false
        }]
      }
    })
    expect(sut).toBeFalsy()
  })

  it('should validate an object with ObjectValidator 13', () => {
    const userSchema = createSchema({
      name: [string()],
      email: [string()],
      dados: {
        documento: [string()],
        lista: array({
          perfil: [string(), notRequired()],
          website: [string()]
        })
      }
    })

    const sut = userSchema.validate({
      name: 'jhon lenon',
      email: 'john@example.com',
      dados: {
        documento: '123',
        lista: [
          {
            perfil: 'desenvolvedor',
            website: 'www.any.com'
          },
          {
            perfil: '',
            website: 'www.any.com'
          }
        ]
      }
    })
    expect(sut).toBeTruthy()
  })

  it('should 13', () => {
    const schema = createSchema({
      productList: array({
        id: [string(), uuid()],
        name: [string()],
        description: [string(), minWord(5)],
        createdAt: [date('ISO8601')],
        updatedAt: [date('ISO8601'), notRequired()]
      })
    })

    const sut = schema.validate({
      productList: [{
        id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
        name: 'Nome do Produto',
        description: 'Exemplo aleatório de descrição de produto.',
        createdAt: '2023-12-23T15:02:05.622Z'
      }]
    })
    expect(sut).toBeTruthy()
  })

  it('should 11233', () => {
    class MissingParamError extends Error {
      constructor (message: string) {
        super(`missing param: ${message}`)
        this.name = 'MissingParamError'
      }
    }

    const productListSchema = createSchema({
      productList: array({
        id: [string(), uuid()],
        name: [string()],
        description: [string(), notRequired()]
      })
    }, { errorType: MissingParamError })

    try {
      productListSchema.validate({
        productList: [
          {
            id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
            name: 'Nome do Produto A',
            description: 'Exemplo de descrição do produto A.'
          },
          {
            id: 'a61aec6b-1ec3-4859-aa19-4181e95200a6',
            description: 'Exemplo de descrição do produto B.'
          }
        ]
      })
    } catch (error: any) {
      if (error instanceof MissingParamError) {
        console.log(error.message) // missing param: name key is required!
      }
    }
  })
})
