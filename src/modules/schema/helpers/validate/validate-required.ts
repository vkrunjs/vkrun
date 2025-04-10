import { getLocation } from "../../../location";
import { SchemaMethod, SchemaValidateMethod } from "../../../types";
import { isString, received } from "../../../utils";

export const validateRequired = (
  params: SchemaValidateMethod & {
    methods: SchemaMethod[];
  },
): void => {
  const { value, valueName, methods, callbackAddPassed, callbackAddFailed } = params;

  const config = methods.find((method: any) => method.method === "required")?.config;

  const message = {
    expect: "value other than undefined",
    error: (isString(config?.message) ? config.message : getLocation().schema.required)
      .replace("[valueName]", valueName)
      .replace("[value]", value),
  };

  if (value !== undefined) {
    callbackAddPassed({
      method: "required",
      name: valueName,
      expect: message.expect,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "required",
      type: "missing value",
      name: valueName,
      expect: message.expect,
      received: received(value),
      message: message.error,
    });
  }
};
