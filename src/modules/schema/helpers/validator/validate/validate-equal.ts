import { getLocation } from '../../../../location'
import { SchemaErrorTest, SchemaSuccessTest } from '../../../../types'
import { received } from '../../../../utils'
import { isEqual } from '../../../../utils/is-equal'

export const validateEqual = ({
  value,
  valueToCompare,
  valueName,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueToCompare: any
  valueName: string
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  if (isEqual(value, valueToCompare)) {
    callbackAddPassed({
      method: 'equal',
      name: valueName,
      expect: valueToCompare,
      received: value
    })
  } else {
    callbackAddFailed({
      method: 'equal',
      type: 'invalid value',
      name: valueName,
      expect: valueToCompare,
      received: received(value),
      message: getLocation().schema.equal
        .replace('[valueName]', valueName)
        .replace('[value]', value)
    })
  }
}
