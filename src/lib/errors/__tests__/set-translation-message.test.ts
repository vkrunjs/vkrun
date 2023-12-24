import { errorMessage } from '../error-message'
import { setTranslationMessage } from '../set-translation-message'

describe('Set translation message', () => {
  it('Should be able to able to change error messages', () => {
    const newMessages = {
      validex: {
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
          }
        }
      }
    }

    const sut = setTranslationMessage(newMessages)

    expect(sut).toBeTruthy()
    expect(errorMessage.validex.constructorParams.valueName.invalidClassParam).toEqual(newMessages.validex.constructorParams.valueName.invalidClassParam)
    expect(errorMessage.validex.constructorParams.valueName.missingClassParam).toEqual(newMessages.validex.constructorParams.valueName.missingClassParam)
    expect(errorMessage.validex.method.string.strict).toEqual(newMessages.validex.method.string.strict)
    expect(errorMessage.validex.method.minWord.noMinimumWords).toEqual(newMessages.validex.method.minWord.noMinimumWords)
  })
})
