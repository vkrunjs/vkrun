import { SchemaBigIntMaxMethod, SchemaParamsMethod } from '../../../../types'

export const bigIntMaxMethod = (value: bigint, params: SchemaParamsMethod): SchemaBigIntMaxMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'max', max: value })

  return {
    min: (value: bigint) => {
      callbackMethodBuild({ method: 'min', min: value })

      return {
        positive: () => {
          callbackMethodBuild({ method: 'positive' })

          return callbackDefaultReturnMethods()
        },
        negative: () => {
          callbackMethodBuild({ method: 'negative' })

          return callbackDefaultReturnMethods()
        },
        ...callbackDefaultReturnMethods()
      }
    },
    positive: () => {
      callbackMethodBuild({ method: 'positive' })

      return {
        min: (value: bigint) => {
          callbackMethodBuild({ method: 'min', min: value })

          return callbackDefaultReturnMethods()
        },
        ...callbackDefaultReturnMethods()
      }
    },
    negative: () => {
      callbackMethodBuild({ method: 'negative' })

      return {
        min: (value: bigint) => {
          callbackMethodBuild({ method: 'min', min: value })

          return callbackDefaultReturnMethods()
        },
        ...callbackDefaultReturnMethods()
      }
    },
    ...callbackDefaultReturnMethods()
  }
}
