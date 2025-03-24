import { getLocation } from "../../../location";
import { SchemaConfig, SchemaValidateMethod } from "../../../types";
import { isBuffer, isString, received } from "../../../utils";

export const validateBuffer = (
  params: SchemaValidateMethod & {
    config: SchemaConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "buffer type",
    error: (isString(config?.message) ? config.message : getLocation().schema.buffer.invalidValue)
      .replace("[value]", String(value))
      .replace("[valueName]", valueName),
  };

  if (isBuffer(value)) {
    callbackAddPassed({
      method: "buffer",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "buffer",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
