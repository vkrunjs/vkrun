import { SchemaNumberPositiveMethod, SchemaParamsMethod } from '../../../../types'

export const numberPositiveMethod = (params: SchemaParamsMethod): SchemaNumberPositiveMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'positive' })

  return {
    float: () => {
      callbackMethodBuild({ method: 'float' })

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
    integer: () => {
      callbackMethodBuild({ method: 'integer' })

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
    min: (value: number) => {
      callbackMethodBuild({ method: 'min', min: value })

      return {
        max: (value: number) => {
          callbackMethodBuild({ method: 'max', max: value })

          return {
            float: () => {
              callbackMethodBuild({ method: 'float' })
              return callbackDefaultReturnMethods()
            },
            integer: () => {
              callbackMethodBuild({ method: 'integer' })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        float: () => {
          callbackMethodBuild({ method: 'float' })

          return {
            max: (value: number) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        integer: () => {
          callbackMethodBuild({ method: 'integer' })

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
            float: () => {
              callbackMethodBuild({ method: 'float' })
              return callbackDefaultReturnMethods()
            },
            integer: () => {
              callbackMethodBuild({ method: 'integer' })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        float: () => {
          callbackMethodBuild({ method: 'float' })

          return {
            min: (value: number) => {
              callbackMethodBuild({ method: 'min', min: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        integer: () => {
          callbackMethodBuild({ method: 'integer' })

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
