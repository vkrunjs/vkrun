import { getLocation } from "../../../location";
import { SchemaConfig, SchemaValidateMethod } from "../../../types";
import { isBoolean, isString, received } from "../../../utils";

export const validateBoolean = (
  params: SchemaValidateMethod & {
    config: SchemaConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "boolean type",
    error: (isString(config?.message) ? config.message : getLocation().schema.boolean.invalidValue)
      .replace("[value]", String(value))
      .replace("[valueName]", valueName),
  };

  if (isBoolean(value)) {
    callbackAddPassed({
      method: "boolean",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "boolean",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
