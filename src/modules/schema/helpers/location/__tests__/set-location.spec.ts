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
        minLength: '[valueName] deve ter no mínimo [minLength] caracteres!',
        regex: 'o valor não corresponde!'
      },
      number: {
        invalidValue: '[valueName] deve ser do tipo numérico!',
        float: '[valueName] deve ser um número decimal!',
        integer: '[valueName] deve ser um número inteiro!',
        min: '[valueName] deve ser maior ou igual a [min]!',
        max: '[valueName] deve ser menor ou igual a [max]!',
        positive: '[valueName] deve ser positivo!',
        negative: '[valueName] deve ser negativo!'
      },
      bigInt: {
        invalidValue: '[valueName] deve ser do tipo grande inteiro!',
        min: '[valueName] deve ser maior ou igual a [min]!',
        max: '[valueName] deve ser menor ou igual a [max]!',
        positive: '[valueName] deve ser positivo!',
        negative: '[valueName] deve ser negativo!'
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
      array: {
        invalidValue: '[valueName] value deve ser um array!',
        min: 'a lista [valueName] deve ter o número mínimo de itens, sendo igual ou maior que [min]!',
        max: 'a lista [valueName] deve ter o número máximo de itens, sendo igual ou menor que [max]!'
      },
      nullable: 'o valor [valueName] pode ser nulo, mas não pode ser undefined!',
      equal: 'o valor não corresponde!',
      notEqual: 'o valor pode não corresponder!',
      oneOf: 'o valor não corresponde!',
      notOneOf: 'o valor não pode ter corresponder!'
    }

    setLocation(newInformativeMessage)

    expect(informativeMessage).toEqual(newInformativeMessage)
  })

  it('Should be able to able to change a value informational message without a reserved keys', () => {
    const newInformativeMessage = {
      string: {
        minWord: 'o valor não tem a quantidade minima de palavras!'
      }
    }

    setLocation(newInformativeMessage)

    expect(informativeMessage).toEqual({
      string: {
        invalidValue: '[valueName] must be a string type!',
        minWord: 'o valor não tem a quantidade minima de palavras!',
        uuid: '[valueName] must be a UUID type!',
        email: 'email [value] is invalid!',
        time: 'the time [value] is not in the format [type]!',
        maxLength: '[valueName] must have a maximum of [maxLength] characters!',
        minLength: '[valueName] must have a minimum of [minLength] characters!',
        regex: 'value does not match!'
      },
      number: {
        invalidValue: '[valueName] must be a number type!',
        float: '[valueName] must be a float!',
        integer: '[valueName] must be a integer!',
        min: '[valueName] must be greater than or equal to [min]!',
        max: '[valueName] must be less than or equal to [max]!',
        positive: '[valueName] must be positive!',
        negative: '[valueName] must be negative!'
      },
      bigInt: {
        invalidValue: '[valueName] must be a bigint type!',
        min: '[valueName] must be greater than or equal to [min]!',
        max: '[valueName] must be less than or equal to [max]!',
        positive: '[valueName] must be positive!',
        negative: '[valueName] must be negative!'
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
      array: {
        invalidValue: '[valueName] value must be an array!',
        min: 'the list [valueName] must have the minimum number of items, being equal to or greater than [min]!',
        max: 'e list [valueName] must have the maximum number of items, being equal to or less than [max]!'
      },
      nullable: '[valueName] value can be null, but other than undefined!',
      equal: 'value does not match!',
      notEqual: 'value may not match!',
      oneOf: 'value does not have a match!',
      notOneOf: 'value cannot have a matches!'
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

    const sut = (): any => { setLocation(newInformativeMessage) }

    expect(sut).toThrow('vkrun: setLocation string.minWord must be a string type!')
  })

  it('Should be able to able to not change the message when value of newMessages is undefined', () => {
    const informativeMessageMock = informativeMessage
    const newInformativeMessage: any = undefined

    setLocation(newInformativeMessage)

    expect(informativeMessage).toEqual(informativeMessageMock)
  })
})
