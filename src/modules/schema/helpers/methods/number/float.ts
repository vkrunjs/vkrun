import { SchemaNumberFloatMethod, SchemaParamsMethod } from '../../../../types'

export const numberFloatMethod = (params: SchemaParamsMethod): SchemaNumberFloatMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'float' })

  return {
    min: (value: number) => {
      callbackMethodBuild({ method: 'min', min: value })

      return {
        max: (value: number) => {
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
            max: (value: number) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        negative: () => {
          callbackMethodBuild({ method: 'negative' })

          return {
            max: (value: number) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        ...callbackDefaultReturnMethods()
      }
    },

    max: (value: number) => {
      callbackMethodBuild({ method: 'max', max: value })

      return {
        min: (value: number) => {
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
            min: (value: number) => {
              callbackMethodBuild({ method: 'min', min: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        negative: () => {
          callbackMethodBuild({ method: 'negative' })

          return {
            min: (value: number) => {
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
        min: (value: number) => {
          callbackMethodBuild({ method: 'min', min: value })

          return {
            max: (value: number) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        max: (value: number) => {
          callbackMethodBuild({ method: 'max', max: value })

          return {
            min: (value: number) => {
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
        min: (value: number) => {
          callbackMethodBuild({ method: 'min', min: value })

          return {
            max: (value: number) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        max: (value: number) => {
          callbackMethodBuild({ method: 'max', max: value })

          return {
            min: (value: number) => {
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
