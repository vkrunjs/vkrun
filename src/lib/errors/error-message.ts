/* eslint-disable prefer-const */
/* eslint-disable no-template-curly-in-string */
export let errorMessage = {
  validex: {
    constructorParams: {
      valueName: {
        missingClassParam: 'missing class param: valueName is required!',
        invalidClassParam: 'invalid class param: errorType provided is not valid!'
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
      }
    }
  }
}
