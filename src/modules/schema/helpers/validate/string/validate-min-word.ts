import { getLocation } from "../../../../location";
import { SchemaStringMinWordConfig, SchemaValidateMethod } from "../../../../types";
import { isString, received } from "../../../../utils";

export const validateMinWord = (
  params: SchemaValidateMethod & {
    config: SchemaStringMinWordConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  if (typeof config.min !== "number" || config.min < 0) {
    console.error("vkrun-schema: minWord method received invalid parameter!");
    throw Error("vkrun-schema: minWord method received invalid parameter!");
  }

  const trimmedValue = String(value).trim();
  const words = trimmedValue.split(/\s+/);
  const hasMinOfWords = words.length >= config.min;
  const message = {
    expect: "minimum of words",
    error: (isString(config?.message) ? config.message : getLocation().schema.string.minWord)
      .replace("[value]", String(value))
      .replace("[valueName]", valueName)
      .replace("[minWord]", String(config.min)),
  };

  if (hasMinOfWords) {
    callbackAddPassed({
      method: "minWord",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "minWord",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
