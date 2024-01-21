import { informativeMessage } from '../informative-message'
import { setTranslationMessage } from '../set-translation-message'
import { resetTranslationMessage } from '../reset-translation-message'

describe('Set translation message', () => {
  beforeEach(() => {
    resetTranslationMessage()
  })

  it('Should be able to able to change all informative message', () => {
    const newInformativeMessage = {
      string: {
        invalidValue: '[valueName] deve ser do tipo string!'
      },
      minWord: {
        noMinimumWords: '[valueName] deve ter pelo menos [minWord] palavras!'
      },
      uuid: {
        invalidValue: '[valueName] deve ser do tipo uuid!'
      },
      email: {
        invalidValue: 'email [value] é inválido!'
      },
      maxLength: {
        invalidValue: '[valueName] deve ter no máximo [maxLength] caracteres!'
      },
      minLength: {
        invalidValue: '[valueName] deve ter no mínimo [minLength] caracteres!'
      },
      number: {
        invalidValue: '[valueName] deve ser um tipo number!'
      },
      float: {
        invalidValue: '[valueName] deve ser um number e float!'
      },
      integer: {
        invalidValue: '[valueName] deve ser um number e integer!'
      },
      boolean: {
        invalidValue: '[valueName] deve ser do tipo boolean!'
      },
      required: {
        invalidValue: '[valueName] é obrigatório!'
      },
      date: {
        invalidValue: 'a data [valueName] não está no formato [type]!'
      },
      dateGreaterThan: {
        invalidValue: 'a data fornecida é inválida!',
        limitExceeded: 'a data [valueName] deve ser maior que a data de referência!'
      },
      dateLessThan: {
        invalidValue: 'a data fornecida é inválida!',
        limitExceeded: 'a data [valueName] deve ser menor que a data de referência!'
      },
      time: {
        invalidValue: 'a hora [value] não está no formato [type]!',
        invalidParameter: 'o método time recebeu parâmetro inválido: o type é obrigatório!'
      },
      object: {
        invalidValue: '',
        keyAbsent: 'a chave [keyName] é obrigatória!',
        notIsObject: 'o valor [valueName] deve ser um object!'
      },
      array: {
        invalidValue: 'todos os valores em [keyName]',
        notIsArray: 'o valor [keyName] deve ser um array!'
      },
      toEqual: {
        invalidValue: ''
      },
      notToEqual: {
        invalidValue: ''
      },
      oneOf: {
        invalidValue: ''
      },
      notOneOf: {
        invalidValue: ''
      }
    }

    const sut = setTranslationMessage(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual(newInformativeMessage)
  })

  it('Should be able to able to change a value informational message', () => {
    const newInformativeMessage = {
      minWord: {
        noMinimumWords: '[valueName] deve ter pelo menos [minWord] palavras!'
      }
    }

    const sut = setTranslationMessage(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual({
      string: {
        invalidValue: '[valueName] must be a string type!'
      },
      minWord: {
        noMinimumWords: '[valueName] deve ter pelo menos [minWord] palavras!'
      },
      uuid: {
        invalidValue: '[valueName] must be a uuid type!'
      },
      email: {
        invalidValue: 'email [value] is invalid!'
      },
      maxLength: {
        invalidValue: '[valueName] must have a maximum of [maxLength] characters!'
      },
      minLength: {
        invalidValue: '[valueName] must have a minimum of [minLength] characters!'
      },
      number: {
        invalidValue: '[valueName] must be a number type!'
      },
      float: {
        invalidValue: '[valueName] must be a number and float!'
      },
      integer: {
        invalidValue: '[valueName] must be a number and integer!'
      },
      boolean: {
        invalidValue: '[valueName] must be a boolean type!'
      },
      required: {
        invalidValue: '[valueName] is required!'
      },
      date: {
        invalidValue: 'the date [valueName] is not in the format [type]!'
      },
      dateGreaterThan: {
        invalidValue: 'the provided date is invalid!',
        limitExceeded: 'the date [valueName] must be greater than the reference date!'
      },
      dateLessThan: {
        invalidValue: 'the provided date is invalid!',
        limitExceeded: 'the date [valueName] must be less than the reference date!'
      },
      time: {
        invalidValue: 'the time [value] is not in the format [type]',
        invalidParameter: 'time method received invalid parameter: type is required!'
      },
      object: {
        invalidValue: '',
        keyAbsent: '[keyName] key is required!',
        notIsObject: '[valueName] value must be an object!'
      },
      array: {
        invalidValue: 'all values in the [keyName]',
        notIsArray: '[keyName] value must be an array!'
      },
      toEqual: {
        invalidValue: ''
      },
      notToEqual: {
        invalidValue: ''
      },
      oneOf: {
        invalidValue: ''
      },
      notOneOf: {
        invalidValue: ''
      }
    })
  })

  it('Should be able to able to throw error if value is different from string and undefined', () => {
    const newInformativeMessage: any = {
      minWord: {
        noMinimumWords: true
      }
    }

    const sut = (): any => setTranslationMessage(newInformativeMessage)

    expect(sut).toThrow('setTranslationMessage: newMessages.minWord.noMinimumWords must be a string type!')
  })

  it('Should be able to able to throw error if value does not have the reserved keys', () => {
    const newInformativeMessage: any = {
      minWord: {
        noMinimumWords: 'valueName deve ter pelo menos minWord palavras!'
      }
    }

    const sut = (): any => setTranslationMessage(newInformativeMessage)

    expect(sut).toThrow('setTranslationMessage: noMinimumWords must contain the reserved key(s) [valueName] and [minWord]!')
  })

  // it('Should be able to able to not change the informational message', () => {
  //   const informativeMessageMock = informativeMessage
  //   const newInformativeMessage: any = {
  //     validator: {
  //       constructorParams: {
  //         valueName: 'invalid value'
  //       }
  //     }
  //   }

  //   const sut = setTranslationMessage(newInformativeMessage)

  //   expect(sut).toBeTruthy()
  //   expect(informativeMessage).toEqual(informativeMessageMock)
  // })

  it('Should be able to able to not change the message when value of newMessages is undefined', () => {
    const informativeMessageMock = informativeMessage
    const newInformativeMessage: any = undefined

    const sut = setTranslationMessage(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual(informativeMessageMock)
  })
})
