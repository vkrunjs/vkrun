import { SchemaConfig, SchemaValidateMethod } from "../../../types";
import { isNotEqual, isString, received } from "../../../utils";
import { getLocation } from "../../../location";

export const validateNotEqual = (
  params: SchemaValidateMethod & {
    valueToCompare: any;
    config: SchemaConfig;
  },
): void => {
  const { value, valueName, valueToCompare, config, callbackAddPassed, callbackAddFailed } = params;

  if (isNotEqual(value, valueToCompare)) {
    callbackAddPassed({
      method: "notEqual",
      name: valueName,
      expect: "value must not match",
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "notEqual",
      type: "invalid value",
      name: valueName,
      expect: "value must not match",
      received: received(value),
      message: (isString(config?.message) ? config.message : getLocation().schema.notEqual)
        .replace("[valueName]", valueName)
        .replace("[value]", value)
        .replace("[valueToCompare]", valueToCompare),
    });
  }
};
