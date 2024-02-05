import { informativeMessage } from '../informative-message'
import { setLocation } from '../set-location'
import { resetTranslationMessage } from '../reset-translation-message'

describe('Set translation message', () => {
  beforeEach(() => {
    resetTranslationMessage()
  })

  it('Should be able to able to change all informative message', () => {
    const newInformativeMessage = {
      string: {
        invalidValue: '[valueName] deve ser do tipo string!',
        minWord: '[valueName] deve ter pelo menos [minWord] palavras!',
        uuid: '[valueName] deve ser do tipo UUID!',
        email: 'o email [value] é inválido!',
        time: 'o horário [value] não está no formato [type]!',
        maxLength: '[valueName] deve ter no máximo [maxLength] caracteres!',
        minLength: '[valueName] deve ter no mínimo [minLength] caracteres!'
      },
      number: {
        invalidValue: '[valueName] deve ser do tipo numérico!',
        float: '[valueName] deve ser um número decimal!',
        integer: '[valueName] deve ser um número inteiro!'
      },
      boolean: {
        invalidValue: '[valueName] deve ser do tipo booleano!'
      },
      required: '[valueName] é obrigatório!',
      date: {
        invalidValue: 'a data [valueName] não está no formato [type]!',
        min: 'o [valueName] [value] deve ser maior ou igual a [refDate]!',
        max: 'o [valueName] [value] deve ser menor ou igual a [refDate]!'
      },
      object: 'o valor de [valueName] deve ser um objeto!',
      array: 'o valor de [valueName] deve ser um array!',
      equal: 'o valor não corresponde!',
      notEqual: {
        invalidValue: ''
      },
      oneOf: {
        invalidValue: ''
      },
      notOneOf: {
        invalidValue: ''
      }
    }

    const sut = setLocation(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual(newInformativeMessage)
  })

  it('Should be able to able to change a value informational message without a reserved keys', () => {
    const newInformativeMessage = {
      string: {
        minWord: 'o valor não tem a quantidade minima de palavras!'
      }
    }

    const sut = setLocation(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual({
      string: {
        invalidValue: '[valueName] must be a string type!',
        minWord: 'o valor não tem a quantidade minima de palavras!',
        uuid: '[valueName] must be a UUID type!',
        email: 'email [value] is invalid!',
        time: 'the time [value] is not in the format [type]!',
        maxLength: '[valueName] must have a maximum of [maxLength] characters!',
        minLength: '[valueName] must have a minimum of [minLength] characters!'
      },
      number: {
        invalidValue: '[valueName] must be a number type!',
        float: '[valueName] must be a float!',
        integer: '[valueName] must be a integer!'
      },
      boolean: {
        invalidValue: '[valueName] must be a boolean type!'
      },
      required: '[valueName] is required!',
      date: {
        invalidValue: 'the date [valueName] is not in the format [type]!',
        min: 'the [valueName] [value] must be greater than or equal to the [refDate]!',
        max: 'the [valueName] [value] must be less than or equal to the [refDate]!'
      },
      object: '[valueName] value must be an object!',
      array: '[valueName] value must be an array!',
      equal: 'value does not match!',
      notEqual: {
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
      string: {
        minWord: {
          noMinimumWords: true
        }
      }
    }

    const sut = (): any => setLocation(newInformativeMessage)

    expect(sut).toThrow('vkrun: setLocation string.minWord must be a string type!')
  })

  it('Should be able to able to not change the message when value of newMessages is undefined', () => {
    const informativeMessageMock = informativeMessage
    const newInformativeMessage: any = undefined

    const sut = setLocation(newInformativeMessage)

    expect(sut).toBeTruthy()
    expect(informativeMessage).toEqual(informativeMessageMock)
  })
})
