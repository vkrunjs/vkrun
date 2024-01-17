import { hasMethod, isEmpty, isNotEmpty } from '../../../utils'
import { ValidateMethodParams } from '../../../types'
import { validator } from '../../../validator'

export const validateObject = async (params: ValidateMethodParams): Promise<void> => {
  if (hasMethod(params.schemaRules, 'notRequired')) {
    params.callbackAddPassed({
      method: 'notRequired',
      name: params.keyName,
      expect: 'value is not required and of any type',
      received: params.value ?? 'undefined'
    })
    if (isNotEmpty(params.value)) {
      await params.callbackValidateValue(params.value, params.schemaRules[1].object)
    }
  }
  if (hasMethod(params.schemaRules, 'required')) {
    if (isEmpty(params.value)) {
      params.callbackUpdateTest(await validator().required().validate(params.value, params.keyName))
      await params.callbackValidateValue({}, params.schemaRules[1].object)
    } else {
      await params.callbackValidateValue(params.value, params.schemaRules[1].object)
    }
  }
}
