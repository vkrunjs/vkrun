import { SchemaNumberMaxConfig, SchemaValidateMethod } from "../../../../types";
import { isNumber, isString, received } from "../../../../utils";
import { getLocation } from "../../../../location";

export const validateMaxNumber = (
  params: SchemaValidateMethod & {
    config: SchemaNumberMaxConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "value less than or equal to the reference",
    error: (isString(config?.message) ? config.message : getLocation().schema.number.max)
      .replace("[valueName]", String(valueName))
      .replace("[value]", String(value))
      .replace("[max]", String(config.max)),
  };

  if (isNumber(value) && value <= config.max) {
    callbackAddPassed({
      method: "max",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "max",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
