import { received } from "../../../utils";
import { SchemaValidateMethod } from "../../../types";

export const validateNullable = (params: SchemaValidateMethod): void => {
  const { value, valueName, callbackAddPassed } = params;

  callbackAddPassed({
    method: "nullable",
    name: valueName,
    expect: "the value can be null, but other than undefined",
    received: received(value),
  });
};
