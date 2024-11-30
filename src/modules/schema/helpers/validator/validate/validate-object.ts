import { getLocation } from '../../../../location'
import { SchemaErrorTest, SchemaSuccessTest, SchemaTests } from '../../../../types'
import { isObject, received } from '../../../../utils'

export const validateObject = ({
  value,
  valueName,
  schema,
  indexArray,
  callbackUpdateTest,
  callbackAddPassed,
  callbackAddFailed
}: {
  value: any
  valueName: string
  schema: any
  indexArray: number
  callbackUpdateTest: (test: SchemaTests) => void
  callbackAddPassed: (success: SchemaSuccessTest) => void
  callbackAddFailed: (error: SchemaErrorTest) => void
}): void => {
  const message = {
    expect: indexArray !== undefined ? 'array index in object type' : 'object type',
    error: getLocation().schema.object
      .replace('[valueName]', valueName)
      .replace('[value]', value)
  }

  if (isObject(value)) {
    callbackAddPassed({
      method: 'object',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: value
    })
    for (const [key, rule] of Object.entries(schema) as [string, any]) {
      callbackUpdateTest(rule.test(value[key], key))
    }
  } else {
    callbackAddFailed({
      method: 'object',
      type: 'invalid value',
      name: valueName,
      expect: message.expect,
      index: indexArray,
      received: received(value),
      message: message.error
    })
  }
}
