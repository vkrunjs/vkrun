import { getLocation } from "../../../location";
import { received } from "../../../utils";
import { SchemaValidateMethod, SchemaCustomContext } from "../../../types";

export const validateCustom = async (
  params: SchemaValidateMethod & {
    customMethod: (customMethod: SchemaCustomContext) => Promise<void>;
  },
): Promise<void> => {
  const { value, valueName, customMethod, callbackAddPassed, callbackAddFailed } = params;

  const context: SchemaCustomContext = {
    success: (newValue) => {
      callbackAddPassed({
        method: "custom",
        name: valueName,
        expect: "must pass the custom method",
        received: received(value),
        newValue,
      });
    },
    failed: (message) => {
      callbackAddFailed({
        method: "custom",
        type: "invalid value",
        name: valueName,
        expect: "must pass the custom method",
        received: received(value),
        message: message ?? "value failed custom method test",
      });
    },
    value,
  };

  try {
    await customMethod(context);
  } catch (error: any) {
    callbackAddFailed({
      method: "custom",
      type: "invalid value",
      name: valueName,
      expect: "must pass the custom method",
      received: received(value),
      message: error?.message,
    });
  }
};
