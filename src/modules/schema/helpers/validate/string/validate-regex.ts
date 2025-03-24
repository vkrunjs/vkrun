import { getLocation } from "../../../../location";
import { SchemaStringRegexConfig, SchemaValidateMethod } from "../../../../types";
import { received, regexMatch } from "../../../../utils";

export const validateRegex = (
  params: SchemaValidateMethod & {
    config: SchemaStringRegexConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "regex format",
    error: (config?.message ? config.message : getLocation().schema.string.regex)
      .replace("[value]", String(value))
      .replace("[valueName]", valueName)
      .replace("[regExp]", config.regExp.toString()),
  };

  if (regexMatch(value, config.regExp)) {
    callbackAddPassed({
      method: "regex",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "regex",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
