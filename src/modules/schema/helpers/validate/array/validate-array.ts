import { getLocation } from "../../../../location";
import {
  SchemaArrayConfig,
  SchemaMethod,
  SchemaMethods,
  SchemaReturnCommonMethods,
  SchemaValidateMethod,
} from "../../../../types";
import { isArray, isString, received } from "../../../../utils";

export const validateArray = (
  params: SchemaValidateMethod & {
    methods: SchemaMethods;
  },
): void => {
  const { value, valueName, methods, callbackAddPassed, callbackAddFailed } = params;

  const schema = methods.find((filteredMethod: SchemaMethod) => filteredMethod.method === "array")
    ?.schema as SchemaReturnCommonMethods;

  const config = methods.find((filteredMethod: SchemaMethod) => filteredMethod.method === "array")?.config as SchemaArrayConfig;

  if (isArray(value)) {
    value.forEach((indexValue: any, index: number) => {
      const test = schema.test(indexValue, valueName);

      if (test.passedAll) {
        callbackAddPassed({
          method: "array",
          name: valueName,
          expect: "array type",
          received: received(value),
        });
      } else {
        callbackAddFailed({
          method: "array",
          type: test.errors[0].type,
          name: test.errors[0].name,
          index,
          expect: test.errors[0].expect,
          received: test.errors[0].received,
          message: test.errors[0].message,
        });
      }
    });
  } else {
    callbackAddFailed({
      method: "array",
      type: "invalid value",
      name: valueName,
      expect: "array type",
      received: received(value),
      message: (isString(config?.message) ? config.message : getLocation().schema.array.invalidValue)
        .replace("[valueName]", String(valueName))
        .replace("[value]", isArray(value) ? JSON.stringify(value) : String(value)),
    });
  }
};
