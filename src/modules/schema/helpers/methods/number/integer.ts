import * as type from '../../../../types'

export const integerMethod = (params: type.ParamsMethod): type.NumberIntegerMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'integer' })

  return {
    min: (value: number | bigint) => {
      callbackMethodBuild({ method: 'min', min: value })

      return {
        max: (value: number | bigint) => {
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
            max: (value: number | bigint) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        negative: () => {
          callbackMethodBuild({ method: 'negative' })

          return {
            max: (value: number | bigint) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        ...callbackDefaultReturnMethods()
      }
    },

    max: (value: number | bigint) => {
      callbackMethodBuild({ method: 'max', max: value })

      return {
        min: (value: number | bigint) => {
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
            min: (value: number | bigint) => {
              callbackMethodBuild({ method: 'min', min: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        negative: () => {
          callbackMethodBuild({ method: 'negative' })

          return {
            min: (value: number | bigint) => {
              callbackMethodBuild({ method: 'min', min: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        ...callbackDefaultReturnMethods()
      }
    },

    positive: (): any => {
      callbackMethodBuild({ method: 'positive' })

      return {
        min: (value: number | bigint) => {
          callbackMethodBuild({ method: 'min', min: value })

          return {
            max: (value: number | bigint) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        max: (value: number | bigint) => {
          callbackMethodBuild({ method: 'max', max: value })

          return {
            min: (value: number | bigint) => {
              callbackMethodBuild({ method: 'min', min: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        ...callbackDefaultReturnMethods()
      }
    },

    negative: () => {
      callbackMethodBuild({ method: 'negative' })

      return {
        min: (value: number | bigint) => {
          callbackMethodBuild({ method: 'min', min: value })

          return {
            max: (value: number | bigint) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        max: (value: number | bigint) => {
          callbackMethodBuild({ method: 'max', max: value })

          return {
            min: (value: number | bigint) => {
              callbackMethodBuild({ method: 'min', min: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        ...callbackDefaultReturnMethods()
      }
    },
    ...callbackDefaultReturnMethods()
  }
}
