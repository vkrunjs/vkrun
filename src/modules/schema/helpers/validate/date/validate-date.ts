import { getLocation } from "../../../../location";
import { SchemaDateConfig, SchemaValidateMethod } from "../../../../types";
import { isString, received, isDate } from "../../../../utils";

export const validateDate = (
  params: SchemaValidateMethod & {
    config: SchemaDateConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: `Date type`,
    error: (isString(config?.message) ? config.message : getLocation().schema.date.invalidValue)
      .replace("[value]", String(value))
      .replace("[valueName]", valueName),
  };

  if (!isDate(value)) {
    callbackAddFailed({
      method: "date",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  } else {
    callbackAddPassed({
      method: "date",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  }
};
