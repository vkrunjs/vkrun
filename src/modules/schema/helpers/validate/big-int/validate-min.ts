import { SchemaBigIntMinConfig, SchemaValidateMethod } from "../../../../types";
import { isBigInt, isString, received } from "../../../../utils";
import { getLocation } from "../../../../location";

export const validateMinBigInt = (
  params: SchemaValidateMethod & {
    config: SchemaBigIntMinConfig;
  },
): void => {
  const { value, valueName, config, callbackAddPassed, callbackAddFailed } = params;

  const message = {
    expect: "value greater than or equal to the reference",
    error: (isString(config?.message) ? config.message : getLocation().schema.bigInt.min)
      .replace("[valueName]", String(valueName))
      .replace("[value]", isBigInt(value) ? `${value}n` : String(value))
      .replace("[min]", isBigInt(config.min) ? `${config.min}n` : String(config.min)),
  };

  if (isBigInt(value) && value >= config.min) {
    callbackAddPassed({
      method: "min",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "min",
      type: "invalid value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
