import { informativeMessage } from '../informative-message'
import { setTranslationMessage } from '../set-translation-message'
import { resetTranslationMessage } from '../reset-translation-message'

describe('Set translation message', () => {
  beforeEach(() => {
    resetTranslationMessage()
  })

  it('Should be able to able to change all informative message', () => {
    const newInformativeMessage = {
      validator: {
        constructorParams: {
          valueName: {
            missingClassParam: 'parâmetro de classe ausente: valueName é obrigatório!',
            invalidClassParam: 'parâmetro de classe inválido: errorType fornecido não é válido!'
          }
        },
        method: {
          string: {
            strict: '[valueName] deve ser do tipo string!'
          },
          minWord: {
            noMinimumWords: '[valueName] deve ter pelo menos [minWord] palavras!'
          },
          uuid: {
            strict: '[valueName] deve ser do tipo uuid!'
          },
          email: {
            strict: 'email [value] é inválido!'
          },
          maxLength: {
            strict: '[valueName] deve ter no máximo [maxLength] caracteres!'
          },
          minLength: {
            strict: '[valueName] deve ter no mínimo [minLength] caracteres!'
          },
          number: {
            strict: '[valueName] deve ser um tipo number!'
          },
          float: {
            strict: '[valueName] deve ser um number e float!'
          },
          integer: {
            strict: '[valueName] deve ser um number e integer!'
          },
          boolean: {
            strict: '[valueName] deve ser do tipo boolean!'
          },
          required: {
            strict: '[valueName] é obrigatório!'
          },
          date: {
            invalidFormat: 'a data [valueName] não está no formato [type]!',
            invalidParameter: 'método date recebeu parâmetro inválido: type é obrigatório!'
          },
          dateGreaterThan: {
            invalidDate: 'a data fornecida é inválida!',
            limitExceeded: 'a data [valueName] deve ser maior que a data de referência!'
          },
          dateLessThan: {
            invalidDate: 'a data fornecida é inválida!',
            limitExceeded: 'a data [valueName] deve ser menor que a data de referência!'
          },
          time: {
            invalidParameter: 'o método time recebeu parâmetro inválido: o type é obrigatório!',
            invalidFormat: 'a hora [value] não está no formato [type]!'
          }
        }
      },
      schema: {
        validateProperty: {
          itemArray: {
            valueName: 'todos os valores em [keyName]'
          }
        },
        validateSchema: {
          keyNotDeclaredInTheSchema: 'a chave [keyName] não foi declarada no schema'
        },
        validateObject: {
          schemaKeyAbsent: 'a chave [keyName] é obrigatória!',
          notIsArray: 'o valor [keyName] deve ser um array!'
        }
      }
    }

    const sut = setTranslationMessage(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual(newInformativeMessage)
  })

  it('Should be able to able to change a value informational message', () => {
    const newInformativeMessage = {
      validator: {
        method: {
          minWord: {
            noMinimumWords: '[valueName] deve ter pelo menos [minWord] palavras!'
          }
        }
      }
    }

    const sut = setTranslationMessage(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual({
      validator: {
        constructorParams: {
          valueName: {
            missingClassParam: 'missing class param: valueName is required!',
            invalidClassParam: 'invalid class param: errorType provided is not valid!'
          }
        },
        method: {
          string: {
            strict: '[valueName] must be a string type!'
          },
          minWord: {
            noMinimumWords: '[valueName] deve ter pelo menos [minWord] palavras!'
          },
          uuid: {
            strict: '[valueName] must be a uuid type!'
          },
          email: {
            strict: 'email [value] is invalid!'
          },
          maxLength: {
            strict: '[valueName] must have a maximum of [maxLength] characters!'
          },
          minLength: {
            strict: '[valueName] must have a minimum of [minLength] characters!'
          },
          number: {
            strict: '[valueName] must be a number type!'
          },
          float: {
            strict: '[valueName] must be a number and float!'
          },
          integer: {
            strict: '[valueName] must be a number and integer!'
          },
          boolean: {
            strict: '[valueName] must be a boolean type!'
          },
          required: {
            strict: '[valueName] is required!'
          },
          date: {
            invalidFormat: 'the date [valueName] is not in the format [type]!',
            invalidParameter: 'date method received invalid parameter: type is required!'
          },
          dateGreaterThan: {
            invalidDate: 'the provided date is invalid!',
            limitExceeded: 'the date [valueName] must be greater than the reference date!'
          },
          dateLessThan: {
            invalidDate: 'the provided date is invalid!',
            limitExceeded: 'the date [valueName] must be less than the reference date!'
          },
          time: {
            invalidParameter: 'time method received invalid parameter: type is required!',
            invalidFormat: 'the time [value] is not in the format [type]'
          }
        }
      },
      schema: {
        validateProperty: {
          itemArray: {
            valueName: 'all values in the [keyName]'
          }
        },
        validateSchema: {
          keyNotDeclaredInTheSchema: '[keyName] key was not declared in the schema'
        },
        validateObject: {
          schemaKeyAbsent: '[keyName] key is required!',
          notIsArray: '[keyName] value must be an array!'
        }
      }
    })
  })

  it('Should be able to able to throw error if value is different from string and undefined', () => {
    const newInformativeMessage: any = {
      validator: {
        method: {
          minWord: {
            noMinimumWords: true
          }
        }
      }
    }

    const sut = (): any => setTranslationMessage(newInformativeMessage)

    expect(sut).toThrow('setTranslationMessage: newMessages.validator.method.minWord.noMinimumWords must be a string type!')
  })

  it('Should be able to able to throw error if value does not have the reserved keys', () => {
    const newInformativeMessage: any = {
      validator: {
        method: {
          minWord: {
            noMinimumWords: 'valueName deve ter pelo menos minWord palavras!'
          }
        }
      }
    }

    const sut = (): any => setTranslationMessage(newInformativeMessage)

    expect(sut).toThrow('setTranslationMessage: noMinimumWords must contain the reserved key(s) [valueName] and [minWord]!')
  })

  it('Should be able to able to not change the informational message', () => {
    const informativeMessageMock = informativeMessage
    const newInformativeMessage: any = {
      validator: {
        constructorParams: {
          valueName: 'invalid value'
        }
      }
    }

    const sut = setTranslationMessage(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual(informativeMessageMock)
  })

  it('Should be able to able to not change the message when value of newMessages is undefined', () => {
    const informativeMessageMock = informativeMessage
    const newInformativeMessage: any = undefined

    const sut = setTranslationMessage(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual(informativeMessageMock)
  })
})
