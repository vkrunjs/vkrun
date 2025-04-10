import { received } from "../../../utils";
import { SchemaValidateMethod } from "../../../types";

export const validateAny = (params: SchemaValidateMethod): void => {
  const { value, valueName, callbackAddPassed } = params;

  callbackAddPassed({
    method: "any",
    name: valueName,
    expect: "any value",
    received: received(value),
  });
};
