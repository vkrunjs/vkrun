import { SchemaConfig, SchemaReturnCommonMethods, SchemaValidateMethod } from "../../../types";
import { isString, oneOf, received } from "../../../utils";
import { getLocation } from "../../../location";

export const validateOneOf = (
  params: SchemaValidateMethod & {
    comparisonItems: SchemaReturnCommonMethods[] | any[];
    config: SchemaConfig;
  },
): void => {
  const { value, valueName, comparisonItems, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "value matches",
    error: (isString(config?.message) ? config.message : getLocation().schema.oneOf)
      .replace("[valueName]", valueName)
      .replace("[value]", value),
  };

  if (oneOf(value, comparisonItems)) {
    callbackAddPassed({
      method: "oneOf",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "oneOf",
      type: "invalid value",
      name: valueName,
      expect: "value matches",
      received: received(value),
      message: message.error,
    });
  }
};
