import { getLocation } from "../../../../location";
import { SchemaConfig, SchemaValidateMethod } from "../../../../types";
import { isEmail, isString, received } from "../../../../utils";

export const validateEmail = (
  params: SchemaValidateMethod & {
    config: SchemaConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "email format",
    error: (isString(config?.message) ? config.message : getLocation().schema.string.email)
      .replace("[value]", String(value))
      .replace("[valueName]", valueName),
  };

  if (isEmail(value)) {
    callbackAddPassed({
      method: "email",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "email",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
