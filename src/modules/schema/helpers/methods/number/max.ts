import * as type from '../../../../types'

export const numberMaxMethod = (value: number, params: type.ParamsMethod): type.NumberMaxMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'max', max: value })

  return {
    float: () => {
      callbackMethodBuild({ method: 'float' })

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
    integer: () => {
      callbackMethodBuild({ method: 'integer' })

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
    min: (value: number) => {
      callbackMethodBuild({ method: 'min', min: value })

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
    negative: () => {
      callbackMethodBuild({ method: 'negative' })

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
