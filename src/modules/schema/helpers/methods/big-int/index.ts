import * as type from '../../../../types'
import { bigIntMaxMethod } from './max'
import { bigIntMinMethod } from './min'
import { bigIntNegativeMethod } from './negative'
import { bigIntPositiveMethod } from './positive'

export const bigIntMethod = (params: type.ParamsMethod): type.BigIntMethod => {
  const { callbackMethodBuild, callbackDefaultReturnMethods } = params
  callbackMethodBuild({ method: 'bigInt' })

  return {
    min: (value: bigint) => bigIntMinMethod(value, params),
    max: (value: bigint) => bigIntMaxMethod(value, params),
    positive: () => bigIntPositiveMethod(params),
    negative: () => bigIntNegativeMethod(params),
    ...callbackDefaultReturnMethods()
  }
}
