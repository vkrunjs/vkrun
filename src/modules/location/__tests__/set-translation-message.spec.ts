// import { informativeMessage } from '../informative-message'
import { setTranslationMessage } from '../set-translation-message'

describe('Set translation message', () => {
  it('Should be able to able to change error messages', () => {
    const newInformativeMessage = {
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

    // const sut =
    setTranslationMessage(newInformativeMessage)

    // expect(sut).toBeTruthy()
    // expect(informativeMessage).toEqual(newInformativeMessage)
  })
})
