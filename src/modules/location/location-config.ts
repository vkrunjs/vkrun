export const locationConfig: Array<{ keys: string[] }> = [
  { keys: ['schema', 'string', 'invalidValue'] },
  { keys: ['schema', 'string', 'minWord'] },
  { keys: ['schema', 'string', 'uuid'] },
  { keys: ['schema', 'string', 'email'] },
  { keys: ['schema', 'string', 'maxLength'] },
  { keys: ['schema', 'string', 'minLength'] },
  { keys: ['schema', 'string', 'time'] },
  { keys: ['schema', 'string', 'regex'] },

  { keys: ['schema', 'number', 'invalidValue'] },
  { keys: ['schema', 'number', 'float'] },
  { keys: ['schema', 'number', 'integer'] },
  { keys: ['schema', 'number', 'min'] },
  { keys: ['schema', 'number', 'max'] },
  { keys: ['schema', 'number', 'positive'] },
  { keys: ['schema', 'number', 'negative'] },

  { keys: ['schema', 'bigInt', 'invalidValue'] },
  { keys: ['schema', 'bigInt', 'min'] },
  { keys: ['schema', 'bigInt', 'max'] },
  { keys: ['schema', 'bigInt', 'positive'] },
  { keys: ['schema', 'bigInt', 'negative'] },

  { keys: ['schema', 'boolean', 'invalidValue'] },

  { keys: ['schema', 'buffer', 'invalidValue'] },

  { keys: ['schema', 'function', 'invalidValue'] },

  { keys: ['schema', 'required'] },

  { keys: ['schema', 'date', 'invalidValue'] },
  { keys: ['schema', 'date', 'min'] },
  { keys: ['schema', 'date', 'max'] },

  { keys: ['schema', 'object'] },

  { keys: ['schema', 'nullable'] },

  { keys: ['schema', 'array', 'invalidValue'] },
  { keys: ['schema', 'array', 'min'] },
  { keys: ['schema', 'array', 'max'] },

  { keys: ['schema', 'equal'] },
  { keys: ['schema', 'notEqual'] },
  { keys: ['schema', 'oneOf'] },
  { keys: ['schema', 'notOneOf'] }
]
