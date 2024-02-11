export interface SetLocation {
  string?: {
    invalidValue?: string
    minWord?: string
    uuid?: string
    email?: string
    time?: string
    maxLength?: string
    minLength?: string
  }
  number?: {
    invalidValue?: string
    float?: string
    integer?: string
  }
  boolean?: {
    invalidValue?: string
  }
  required?: string
  date?: {
    invalidValue?: string
    min?: string
    max?: string
  }
  object?: string
  array?: string
  equal?: string
  notToEqual?: {
    invalidValue?: string
  }
  oneOf?: {
    invalidValue?: string
  }
  notOneOf?: {
    invalidValue?: string
  }
}

export interface InformativeMessage {
  string: {
    invalidValue: string
    minWord: string
    uuid: string
    email: string
    time: string
    maxLength: string
    minLength: string
  }
  number: {
    invalidValue: string
    float: string
    integer: string
  }
  boolean: {
    invalidValue: string
  }
  required: string
  date: {
    invalidValue: string
    min: string
    max: string
  }
  object: string
  array: string
  equal: string
  notEqual: {
    invalidValue: string
  }
  oneOf: {
    invalidValue: string
  }
  notOneOf: {
    invalidValue: string
  }
}

export type AnyInformativeMessage = InformativeMessage & Record<string, any>
