import { SuccessTest } from '../../../types'
import { received } from '../../../utils'

export const validateNotRequired = ({
  value,
  valueName,
  callbackAddPassed
}: {
  value: any
  valueName: string
  callbackAddPassed: (success: SuccessTest) => void
}): void => {
  callbackAddPassed({
    method: 'notRequired',
    name: valueName,
    expect: 'value is not required and of any type',
    received: received(value)
  })
}
