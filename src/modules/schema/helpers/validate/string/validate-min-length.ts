import { getLocation } from "../../../../location";
import { SchemaStringMinLengthConfig, SchemaValidateMethod } from "../../../../types";
import { isString, received } from "../../../../utils";

export const validateMinLength = (
  params: SchemaValidateMethod & {
    config: SchemaStringMinLengthConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  if (typeof config.min !== "number" || config.min < 0) {
    console.error("vkrun-schema: minLength method received invalid parameter!");
    throw Error("vkrun-schema: minLength method received invalid parameter!");
  }

  const message = {
    expect: "value with a length greater than or equal to the limit",
    error: (isString(config?.message) ? config.message : getLocation().schema.string.minLength)
      .replace("[value]", String(value))
      .replace("[valueName]", valueName)
      .replace("[minLength]", String(config.min)),
  };

  const exceededLimit = String(value).length < config.min;

  if (exceededLimit) {
    callbackAddFailed({
      method: "minLength",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  } else {
    callbackAddPassed({
      method: "minLength",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  }
};
