import * as type from '../../../types'

export const informativeMessage: type.InformativeMessage = {
  string: {
    invalidValue: '[valueName] must be a string type!',
    minWord: '[valueName] must have at least [minWord] words!',
    uuid: '[valueName] must be a UUID type!',
    email: 'email [value] is invalid!',
    time: 'the time [value] is not in the format [type]!',
    maxLength: '[valueName] must have a maximum of [maxLength] characters!',
    minLength: '[valueName] must have a minimum of [minLength] characters!'
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
  array: '[valueName] value must be an array!',
  nullable: '[valueName] value can be null, but other than undefined!',
  equal: 'value does not match!',
  notEqual: 'value may not match!',
  oneOf: 'value does not have a match!',
  notOneOf: 'value cannot have a matches!'
}
