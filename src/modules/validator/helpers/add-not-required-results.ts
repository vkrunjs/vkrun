import { SuccessTest, ValidatorValue, ValidatorValueName } from '../../types'
import { received } from '../../utils'

export const addNotRequiredResults = ({
  value,
  valueName,
  callbackAddPassed
}: {
  value: ValidatorValue
  valueName: ValidatorValueName
  callbackAddPassed: (success: SuccessTest) => void
}): void => {
  callbackAddPassed({
    method: 'notRequired',
    name: valueName,
    expect: 'value is not required and of any type',
    received: received(value)
  })
}
