import * as type from '../../../../types'
import { floatMethod } from './float'
import { integerMethod } from './integer'
import { maxMethod } from './max'
import { minMethod } from './min'
import { negativeMethod } from './negative'
import { positiveMethod } from './positive'

export const numberMethod = (params: type.ParamsMethod): type.NumberMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'number' })

  return {
    float: () => floatMethod(params),
    integer: () => integerMethod(params),
    min: (value: number) => minMethod(value, params),
    max: (value: number) => maxMethod(value, params),
    positive: () => positiveMethod(params),
    negative: () => negativeMethod(params),
    ...callbackDefaultReturnMethods()
  }
}
