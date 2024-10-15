import * as type from '../../../../types'

export const bigIntPositiveMethod = (params: type.ParamsMethod): type.BigIntPositiveMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'positive' })

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
