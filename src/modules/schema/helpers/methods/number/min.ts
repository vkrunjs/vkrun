import * as type from '../../../../types'

export const minMethod = (value: number | bigint, params: type.ParamsMethod): type.NumberMinMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'min', min: value })

  return {
    float: () => {
      callbackMethodBuild({ method: 'float' })

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
    integer: () => {
      callbackMethodBuild({ method: 'integer' })

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
        float: () => {
          callbackMethodBuild({ method: 'float' })

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
        integer: () => {
          callbackMethodBuild({ method: 'integer' })

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
        negative: () => {
          callbackMethodBuild({ method: 'negative' })

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
        ...callbackDefaultReturnMethods()
      }
    },
    positive: () => {
      callbackMethodBuild({ method: 'positive' })

      return {
        max: (value: number | bigint) => {
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
            max: (value: number | bigint) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        integer: () => {
          callbackMethodBuild({ method: 'integer' })

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
    negative: () => {
      callbackMethodBuild({ method: 'negative' })

      return {
        max: (value: number | bigint) => {
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
            max: (value: number | bigint) => {
              callbackMethodBuild({ method: 'max', max: value })
              return callbackDefaultReturnMethods()
            },
            ...callbackDefaultReturnMethods()
          }
        },
        integer: () => {
          callbackMethodBuild({ method: 'integer' })

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
    ...callbackDefaultReturnMethods()
  }
}
