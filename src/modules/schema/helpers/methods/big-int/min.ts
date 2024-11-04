import { SchemaBigIntMinMethod, SchemaParamsMethod } from '../../../../types'

export const bigIntMinMethod = (value: bigint, params: SchemaParamsMethod): SchemaBigIntMinMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'min', min: value })

  return {
    max: (value: bigint) => {
      callbackMethodBuild({ method: 'max', max: value })

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
        max: (value: bigint) => {
          callbackMethodBuild({ method: 'max', max: value })

          return callbackDefaultReturnMethods()
        },
        ...callbackDefaultReturnMethods()
      }
    },
    negative: () => {
      callbackMethodBuild({ method: 'negative' })

      return {
        max: (value: bigint) => {
          callbackMethodBuild({ method: 'max', max: value })

          return callbackDefaultReturnMethods()
        },
        ...callbackDefaultReturnMethods()
      }
    },
    ...callbackDefaultReturnMethods()
  }
}
