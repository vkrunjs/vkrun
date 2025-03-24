import { SchemaConfig, SchemaValidateMethod } from "../../../../types";
import { isFloat, isString, received } from "../../../../utils";
import { getLocation } from "../../../../location";

export const validateFloatNumber = (
  params: SchemaValidateMethod & {
    config: SchemaConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "float type",
    error: (isString(config?.message) ? config.message : getLocation().schema.number.float)
      .replace("[value]", String(value))
      .replace("[valueName]", String(valueName)),
  };

  if (isFloat(value)) {
    callbackAddPassed({
      method: "float",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "float",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
