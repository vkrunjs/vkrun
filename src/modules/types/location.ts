export interface SetLocation {
  schema?: {
    string?: {
      invalidValue?: string;
      minWord?: string;
      uuid?: string;
      email?: string;
      time?: string;
      maxLength?: string;
      minLength?: string;
      regex?: string;
      date?: string;
    };
    number?: {
      invalidValue?: string;
      float?: string;
      integer?: string;
      min?: string;
      max?: string;
      positive?: string;
      negative?: string;
    };
    bigInt?: {
      invalidValue?: string;
      min?: string;
      max?: string;
      positive?: string;
      negative?: string;
    };
    boolean?: {
      invalidValue?: string;
    };
    buffer?: {
      invalidValue?: string;
    };
    function?: {
      invalidValue?: string;
    };
    required?: string;
    date?: {
      invalidValue?: string;
      min?: string;
      max?: string;
    };
    object?: string;
    array?: {
      invalidValue?: string;
      min?: string;
      max?: string;
    };
    equal?: string;
    notEqual?: string;
    oneOf?: string;
    notOneOf?: string;
  };
}

export interface InformativeMessage {
  schema: {
    string: {
      invalidValue: string;
      minWord: string;
      uuid: string;
      email: string;
      time: string;
      maxLength: string;
      minLength: string;
      regex: string;
      date: string;
    };
    number: {
      invalidValue: string;
      float: string;
      integer: string;
      min: string;
      max: string;
      positive: string;
      negative: string;
    };
    bigInt: {
      invalidValue: string;
      min: string;
      max: string;
      positive: string;
      negative: string;
    };
    boolean: {
      invalidValue: string;
    };
    buffer: {
      invalidValue: string;
    };
    function: {
      invalidValue: string;
    };
    required: string;
    date: {
      invalidValue: string;
      min: string;
      max: string;
    };
    object: string;
    array: {
      invalidValue: string;
      min: string;
      max: string;
    };
    equal: string;
    notEqual: string;
    oneOf: string;
    notOneOf: string;
  };
}
