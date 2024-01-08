import { InformativeMessage } from '../types'

export const informativeMessage: InformativeMessage = {
  validator: {
    constructorParams: {
      valueName: {
        missingClassParam: 'missing class param: valueName is required!',
        invalidClassParam: 'invalid class param: class error provided is not valid!'
      }
    },
    method: {
      string: {
        strict: '[valueName] must be a string type!'
      },
      minWord: {
        noMinimumWords: '[valueName] must have at least [minWord] words!'
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
        invalidFormat: 'the date [valueName] is not in the format [type]!'
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
    constructorParams: {
      schema: 'the schema must be an object, object method, or array of objects method!'
    },
    validateProperty: {
      itemArray: {
        valueName: 'all values in the [keyName]'
      }
    },
    validateObject: {
      schemaKeyAbsent: '[keyName] key is required!',
      notIsArray: '[keyName] value must be an array!',
      notIsObject: '[valueName] value must be an object!'
    }
  }
}
