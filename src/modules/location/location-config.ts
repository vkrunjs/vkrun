export const locationConfig: Array<{ keys: string[], reservedKeys?: string[] }> = [
  { keys: ['string', 'invalidValue'], reservedKeys: ['[valueName]'] },
  { keys: ['string', 'minWord'], reservedKeys: ['[valueName]', '[minWord]'] },
  { keys: ['string', 'uuid'], reservedKeys: ['[valueName]'] },
  { keys: ['string', 'email'], reservedKeys: ['[value]'] },
  { keys: ['string', 'maxLength'], reservedKeys: ['[valueName]', '[maxLength]'] },
  { keys: ['string', 'minLength'], reservedKeys: ['[valueName]', '[minLength]'] },
  { keys: ['string', 'time'], reservedKeys: ['[value]', '[type]'] },

  { keys: ['number', 'invalidValue'], reservedKeys: ['[valueName]'] },
  { keys: ['number', 'float'], reservedKeys: ['[valueName]'] },
  { keys: ['number', 'integer'], reservedKeys: ['[valueName]'] },

  { keys: ['boolean', 'invalidValue'], reservedKeys: ['[valueName]'] },

  { keys: ['required'], reservedKeys: ['[valueName]'] },

  { keys: ['date', 'invalidValue'], reservedKeys: ['[valueName]', '[type]'] },
  { keys: ['date', 'min'], reservedKeys: ['[value]', '[valueName]', '[refDate]'] },
  { keys: ['date', 'max'], reservedKeys: ['[value]', '[valueName]', '[refDate]'] },

  { keys: ['object'], reservedKeys: ['[valueName]'] },

  { keys: ['array', 'invalidValue'], reservedKeys: ['[valueName]', '[arrayType]'] },
  { keys: ['array', 'notIsArray'], reservedKeys: ['[valueName]'] },

  { keys: ['toEqual'] },
  { keys: ['notToEqual', 'invalidValue'] },
  { keys: ['oneOf', 'invalidValue'] },
  { keys: ['notOneOf', 'invalidValue'] }
]
