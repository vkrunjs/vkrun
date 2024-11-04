import { SchemaBigIntNegativeMethod, SchemaParamsMethod } from '../../../../types'

export const bigIntNegativeMethod = (params: SchemaParamsMethod): SchemaBigIntNegativeMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'negative' })

  return {
    min: (value: bigint) => {
      callbackMethodBuild({ method: 'min', min: value })

      return {
        max: (value: bigint) => {
          callbackMethodBuild({ method: 'max', max: value })

          return callbackDefaultReturnMethods()
        },
        ...callbackDefaultReturnMethods()
      }
    },
    max: (value: bigint) => {
      callbackMethodBuild({ method: 'max', max: value })

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
