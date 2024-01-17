import { DateTypes } from '../../types'

const addValidation = (method: string, params?: any): any[] => {
  return { method, private: true, ...params }
}

export const object = (object: object): {
  required: () => any
  notRequired: () => any
} => ({
  required: () => [
    addValidation('required'),
    addValidation('object', { object })
  ],
  notRequired: () => [
    addValidation('notRequired'),
    addValidation('object', { object })
  ]
})

export const array: {
  required: () => {
    string: () => any
    number: () => any
    boolean: () => any
    date: (type?: DateTypes) => any
    strict: (array: any[]) => any
    object: (object: any) => any
    any: () => any
  }
  notRequired: () => {
    string: () => any
    number: () => any
    boolean: () => any
    date: (type?: DateTypes) => any
    strict: (array: any[]) => any
    object: (object: any) => any
    any: () => any
  }

} = {
  required: () => {
    return {
      string: () => [
        addValidation('required'),
        addValidation('array', { arrayType: 'string' })
      ],
      number: () => [
        addValidation('required'),
        addValidation('array', { arrayType: 'number' })
      ],
      boolean: () => [
        addValidation('required'),
        addValidation('array', { arrayType: 'boolean' })
      ],
      date: (type?: DateTypes) => [
        addValidation('required'),
        addValidation('array', { arrayType: 'date', dateType: type })
      ],
      strict: (array: any[]) => [
        addValidation('required'),
        addValidation('array', { arrayType: 'strict', arrayRules: array })
      ],
      object: (object: any) => [
        addValidation('required'),
        addValidation('array', { arrayType: 'object', arrayRules: object })
      ],
      any: () => [
        addValidation('required'),
        addValidation('array', { arrayType: 'any' })
      ]
    }
  },
  notRequired: () => {
    return {
      string: () => [
        addValidation('notRequired'),
        addValidation('array', { arrayType: 'string' })
      ],
      number: () => [
        addValidation('notRequired'),
        addValidation('array', { arrayType: 'number' })
      ],
      boolean: () => [
        addValidation('notRequired'),
        addValidation('array', { arrayType: 'boolean' })
      ],
      date: (type?: DateTypes) => [
        addValidation('notRequired'),
        addValidation('array', { arrayType: 'date', dateType: type })
      ],
      strict: (array: any[]) => [
        addValidation('notRequired'),
        addValidation('array', { arrayType: 'strict', arrayRules: array })
      ],
      object: (object: any) => [
        addValidation('notRequired'),
        addValidation('array', { arrayType: 'object', arrayRules: object })
      ],
      any: () => [
        addValidation('notRequired'),
        addValidation('array', { arrayType: 'any' })
      ]
    }
  }
}
