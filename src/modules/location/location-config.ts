export const locationConfig: Array<{ keys: string[], reservedKeys?: string[] }> = [
  // Validator
  { keys: ['validator', 'constructorParams', 'valueName', 'invalidClassParam'] },
  { keys: ['validator', 'constructorParams', 'valueName', 'missingClassParam'] },
  { keys: ['validator', 'method', 'string', 'strict'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'minWord', 'noMinimumWords'], reservedKeys: ['[valueName]', '[minWord]'] },
  { keys: ['validator', 'method', 'uuid', 'strict'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'email', 'strict'], reservedKeys: ['[value]'] },
  { keys: ['validator', 'method', 'maxLength', 'strict'], reservedKeys: ['[valueName]', '[maxLength]'] },
  { keys: ['validator', 'method', 'minLength', 'strict'], reservedKeys: ['[valueName]', '[minLength]'] },
  { keys: ['validator', 'method', 'number', 'strict'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'float', 'strict'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'integer', 'strict'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'boolean', 'strict'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'required', 'strict'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'date', 'invalidFormat'], reservedKeys: ['[valueName]', '[type]'] },
  { keys: ['validator', 'method', 'dateGreaterThan', 'invalidDate'] },
  { keys: ['validator', 'method', 'dateGreaterThan', 'limitExceeded'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'dateLessThan', 'invalidDate'] },
  { keys: ['validator', 'method', 'dateLessThan', 'limitExceeded'], reservedKeys: ['[valueName]'] },
  { keys: ['validator', 'method', 'time', 'invalidParameter'] },
  { keys: ['validator', 'method', 'time', 'invalidFormat'], reservedKeys: ['[value]', '[type]'] },

  // Schema
  { keys: ['schema', 'validateProperty', 'itemArray', 'valueName'], reservedKeys: ['[keyName]'] },
  { keys: ['schema', 'validateObject', 'schemaKeyAbsent'], reservedKeys: ['[keyName]'] },
  { keys: ['schema', 'validateObject', 'notIsArray'], reservedKeys: ['[keyName]'] }
]
