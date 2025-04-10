import { SchemaConfig, SchemaValidateMethod } from "../../../../types";
import { isNumber, isString, received } from "../../../../utils";
import { getLocation } from "../../../../location";

export const validateNegativeNumber = (
  params: SchemaValidateMethod & {
    config: SchemaConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "negative number",
    error: (isString(config?.message) ? config.message : getLocation().schema.number.negative)
      .replace("[value]", String(value))
      .replace("[valueName]", String(valueName)),
  };

  if (isNumber(value) && value < 0) {
    callbackAddPassed({
      method: "negative",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "negative",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
