import { getLocation } from "../../../location";
import { SchemaConfig, SchemaValidateMethod } from "../../../types";
import { isString, received } from "../../../utils";
import { isEqual } from "../../../utils/is-equal";

export const validateEqual = (
  params: SchemaValidateMethod & {
    config: SchemaConfig;
    valueToCompare: any;
  },
): void => {
  const { value, valueName, valueToCompare, config, callbackAddPassed, callbackAddFailed } = params;

  if (isEqual(value, valueToCompare)) {
    callbackAddPassed({
      method: "equal",
      name: valueName,
      expect: valueToCompare,
      received: value,
    });
  } else {
    callbackAddFailed({
      method: "equal",
      type: "invalid value",
      name: valueName,
      expect: valueToCompare,
      received: received(value),
      message: (isString(config?.message) ? config.message : getLocation().schema.equal)
        .replace("[valueName]", valueName)
        .replace("[value]", value)
        .replace("[valueToCompare]", valueToCompare),
    });
  }
};
