import * as type from '../../../../types'
import { numberFloatMethod } from './float'
import { numberIntegerMethod } from './integer'
import { numberMaxMethod } from './max'
import { numberMinMethod } from './min'
import { numberNegativeMethod } from './negative'
import { numberPositiveMethod } from './positive'

export const numberMethod = (params: type.ParamsMethod): type.NumberMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'number' })

  return {
    float: () => numberFloatMethod(params),
    integer: () => numberIntegerMethod(params),
    min: (value: number) => numberMinMethod(value, params),
    max: (value: number) => numberMaxMethod(value, params),
    positive: () => numberPositiveMethod(params),
    negative: () => numberNegativeMethod(params),
    ...callbackDefaultReturnMethods()
  }
}
