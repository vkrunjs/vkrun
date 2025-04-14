import { SchemaErrorTest, SchemaMethod, SchemaSuccessTest, SchemaTests } from "../../../index";
import { hasMethod } from "./has-method";
import { parseObjectSubSchemas } from "./parse-object-sub-schemas";
import {
  validateObject,
  validateCustom,
  validateString,
  validateMinWord,
  validateEmail,
  validateUUID,
  validateMaxLength,
  validateMinLength,
  validateRegex,
  validateStringDate,
  validateNumber,
  validateBigInt,
  validateFloatNumber,
  validateIntegerNumber,
  validatePositiveNumber,
  validatePositiveBigInt,
  validateNegativeNumber,
  validateNegativeBigInt,
  validateBoolean,
  validateBuffer,
  validateFunction,
  validateDate,
  validateMinDate,
  validateMinNumber,
  validateMinBigInt,
  validateMaxDate,
  validateMaxNumber,
  validateMaxBigInt,
  validateTime,
  validateEqual,
  validateNotEqual,
  validateOneOf,
  validateAny,
  validateNullable,
  validateNotRequired,
  validateRequired,
  validateMinArray,
  validateMaxArray,
  validateArray,
} from "./validate";

export const runValidatorBlock = (
  params: {
    currentValue: any;
    valueName: string;
    updateTests: (test: SchemaTests) => void;
    addPassed: (success: SchemaSuccessTest) => void;
    addFailed: (error: SchemaErrorTest) => void;
  },
  blockMethods: SchemaMethod[],
): void => {
  const validateMethodParams: any = {
    value: params.currentValue,
    valueName: params.valueName,
    methods: blockMethods,
    resetTests: () => {},
    callbackUpdateTest: (test: any) => {
      params.updateTests(test);
    },
    callbackAddPassed: (success: any) => {
      params.addPassed(success);
    },
    callbackAddFailed: (error: any) => {
      params.addFailed(error);
    },
  };

  const validateOtherMethods = (rule: any): void => {
    validateMethodParams.value = params.currentValue;

    if (rule.method === "object") {
      validateObject({
        ...validateMethodParams,
        schema: rule.schema,
        config: rule.config,
      });
    } else if (rule.method === "custom") {
      validateCustom({ ...validateMethodParams, ...rule });
    } else if (rule.method === "string") {
      validateString({ ...validateMethodParams, config: rule.config });
    } else if (rule.method === "minWord") {
      validateMinWord({
        ...validateMethodParams,
        config: rule.config,
      });
    } else if (rule.method === "email") {
      validateEmail({ ...validateMethodParams, config: rule.config });
    } else if (rule.method === "UUID") {
      validateUUID({
        ...validateMethodParams,
        uuidVersion: rule.uuidVersion,
        config: rule.config,
      });
    } else if (rule.method === "maxLength") {
      validateMaxLength({
        ...validateMethodParams,
        config: rule.config,
      });
    } else if (rule.method === "minLength") {
      validateMinLength({
        ...validateMethodParams,
        config: rule.config,
      });
    } else if (rule.method === "regex") {
      validateRegex({
        ...validateMethodParams,
        regExp: rule.regExp,
        config: rule.config,
      });
    } else if (rule.method === "number") {
      validateNumber({ ...validateMethodParams, config: rule.config });
    } else if (rule.method === "bigInt") {
      validateBigInt({ ...validateMethodParams, config: rule.config });
    } else if (rule.method === "float") {
      validateFloatNumber({
        ...validateMethodParams,
        config: rule.config,
      });
    } else if (rule.method === "integer") {
      validateIntegerNumber({
        ...validateMethodParams,
        config: rule.config,
      });
    } else if (rule.method === "positive") {
      if (hasMethod(validateMethodParams.methods, "number")) {
        validatePositiveNumber({
          ...validateMethodParams,
          config: rule.config,
        });
      } else if (hasMethod(validateMethodParams.methods, "bigInt")) {
        validatePositiveBigInt({
          ...validateMethodParams,
          config: rule.config,
        });
      }
    } else if (rule.method === "negative") {
      if (hasMethod(validateMethodParams.methods, "number")) {
        validateNegativeNumber({
          ...validateMethodParams,
          config: rule.config,
        });
      } else if (hasMethod(validateMethodParams.methods, "bigInt")) {
        validateNegativeBigInt({
          ...validateMethodParams,
          config: rule.config,
        });
      }
    } else if (rule.method === "boolean") {
      validateBoolean({
        ...validateMethodParams,
        config: rule.config,
      });
    } else if (rule.method === "buffer") {
      validateBuffer({ ...validateMethodParams, config: rule.config });
    } else if (rule.method === "function") {
      validateFunction({
        ...validateMethodParams,
        config: rule.config,
      });
    } else if (rule.method === "date") {
      if (hasMethod(validateMethodParams.methods, "string")) {
        validateStringDate({ ...validateMethodParams, config: rule.config });
      } else {
        validateDate({ ...validateMethodParams, config: rule.config });
      }
    } else if (rule.method === "min") {
      if (hasMethod(validateMethodParams.methods, "date")) {
        validateMinDate({
          ...validateMethodParams,
          config: rule.config,
        });
      } else if (hasMethod(validateMethodParams.methods, "number")) {
        validateMinNumber({
          ...validateMethodParams,
          config: rule.config,
        });
      } else if (hasMethod(validateMethodParams.methods, "bigInt")) {
        validateMinBigInt({
          ...validateMethodParams,
          config: rule.config,
        });
      }
    } else if (rule.method === "max") {
      if (hasMethod(validateMethodParams.methods, "date")) {
        validateMaxDate({
          ...validateMethodParams,
          config: rule.config,
        });
      } else if (hasMethod(validateMethodParams.methods, "number")) {
        validateMaxNumber({
          ...validateMethodParams,
          config: rule.config,
        });
      } else if (hasMethod(validateMethodParams.methods, "bigInt")) {
        validateMaxBigInt({
          ...validateMethodParams,
          config: rule.config,
        });
      }
    } else if (rule.method === "time") {
      validateTime({ ...validateMethodParams, config: rule.config });
    } else if (rule.method === "equal") {
      validateEqual({
        ...validateMethodParams,
        valueToCompare: rule.valueToCompare,
        config: rule.config,
      });
    } else if (rule.method === "notEqual") {
      validateNotEqual({
        ...validateMethodParams,
        valueToCompare: rule.valueToCompare,
        config: rule.config,
      });
    } else if (rule.method === "oneOf") {
      validateOneOf({
        ...validateMethodParams,
        comparisonItems: rule.comparisonItems,
        config: rule.config,
      });
    }
  };

  if (hasMethod(validateMethodParams.methods, "alias")) {
    const method = validateMethodParams.methods.find((item: SchemaMethod) => item.method === "alias");
    if (method) validateMethodParams.valueName = method.alias;
  }

  if (hasMethod(validateMethodParams.methods, "any")) {
    validateAny(validateMethodParams);
    validateMethodParams.methods.map(async (rule: any) => {
      validateOtherMethods(rule);
    });
    return;
  }

  if (hasMethod(validateMethodParams.methods, "nullable")) {
    if (validateMethodParams.value === null) {
      validateNullable(validateMethodParams);
      return;
    }
  }

  if (hasMethod(validateMethodParams.methods, "notRequired")) {
    validateNotRequired(validateMethodParams);
    if (validateMethodParams.value === undefined) return;
  } else if (hasMethod(validateMethodParams.methods, "required")) {
    validateRequired(validateMethodParams);
  }

  if (hasMethod(validateMethodParams.methods, "array")) {
    validateMinArray(validateMethodParams);
    validateMaxArray(validateMethodParams);
    validateArray(validateMethodParams);
  } else {
    validateMethodParams.methods.map((rule: any) => {
      validateOtherMethods(rule);
    });
  }

  const hadObject = blockMethods.some((m) => m.method === "object");
  if (hadObject && typeof params.currentValue === "object" && params.currentValue !== null) {
    parseObjectSubSchemas(params, blockMethods);
  }
};
