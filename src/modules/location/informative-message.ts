import { InformativeMessage } from '../types'

// change informativeMessage object
export const informativeMessage: InformativeMessage = {
  string: {
    invalidValue: '[valueName] must be a string type!'
  },
  minWord: {
    noMinimumWords: '[valueName] must have at least [minWord] words!'
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
    invalidValue: 'the array value does not match',
    keyAbsent: '[keyName] key is required!',
    notIsObject: '[valueName] value must be an object!'
  },
  array: {
    invalidValue: 'all values in the array [valueName] must be type [arrayType]!',
    notIsArray: '[keyName] value must be an array!'
  },
  toEqual: {
    invalidValue: 'value does not match'
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
