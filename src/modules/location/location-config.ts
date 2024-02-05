export const locationConfig: Array<{ keys: string[] }> = [
  { keys: ['string', 'invalidValue'] },
  { keys: ['string', 'minWord'] },
  { keys: ['string', 'uuid'] },
  { keys: ['string', 'email'] },
  { keys: ['string', 'maxLength'] },
  { keys: ['string', 'minLength'] },
  { keys: ['string', 'time'] },

  { keys: ['number', 'invalidValue'] },
  { keys: ['number', 'float'] },
  { keys: ['number', 'integer'] },

  { keys: ['boolean', 'invalidValue'] },

  { keys: ['required'] },

  { keys: ['date', 'invalidValue'] },
  { keys: ['date', 'min'] },
  { keys: ['date', 'max'] },

  { keys: ['object'] },

  { keys: ['array'] },

  { keys: ['equal'] },
  { keys: ['notEqual', 'invalidValue'] },
  { keys: ['oneOf', 'invalidValue'] },
  { keys: ['notOneOf', 'invalidValue'] }
]
