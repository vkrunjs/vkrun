export const locationConfig: Array<{ keys: string[] }> = [
  { keys: ['string', 'invalidValue'] },
  { keys: ['string', 'minWord'] },
  { keys: ['string', 'uuid'] },
  { keys: ['string', 'email'] },
  { keys: ['string', 'maxLength'] },
  { keys: ['string', 'minLength'] },
  { keys: ['string', 'time'] },
  { keys: ['string', 'regex'] },

  { keys: ['number', 'invalidValue'] },
  { keys: ['number', 'float'] },
  { keys: ['number', 'integer'] },
  { keys: ['number', 'min'] },
  { keys: ['number', 'max'] },
  { keys: ['number', 'positive'] },
  { keys: ['number', 'negative'] },

  { keys: ['bigInt', 'invalidValue'] },
  { keys: ['bigInt', 'min'] },
  { keys: ['bigInt', 'max'] },
  { keys: ['bigInt', 'positive'] },
  { keys: ['bigInt', 'negative'] },

  { keys: ['boolean', 'invalidValue'] },

  { keys: ['required'] },

  { keys: ['date', 'invalidValue'] },
  { keys: ['date', 'min'] },
  { keys: ['date', 'max'] },

  { keys: ['object'] },

  { keys: ['nullable'] },

  { keys: ['array', 'invalidValue'] },
  { keys: ['array', 'min'] },
  { keys: ['array', 'max'] },

  { keys: ['equal'] },
  { keys: ['notEqual'] },
  { keys: ['oneOf'] },
  { keys: ['notOneOf'] }
]
