import {
  SchemaConfig,
  SchemaCustomMethod,
  SchemaDefaultFunctionFlags,
  SchemaDefaultFunctionOptions,
  SchemaGenericFunctionType,
  isString,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";
import { customMethod } from "./custom-method";

export const functionMethod = (params: SchemaMethodParams, config?: SchemaConfig) => {
  params.methodBuild({ method: "function", config });
  const that = params;

  const chain = {
    throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => {
      params.throw(value, valueName, ClassError);
    },
    throwAsync: async (value: any, valueName: string, ClassError?: SchemaErrorTypes) => {
      await params.throwAsync(value, valueName, ClassError);
    },
    validate: (value: any) => params.validate(value),
    validateAsync: async (value: any) => await params.validateAsync(value),
    test: (value: any, valueName?: string) => params.test(value, valueName),
    testAsync: async (value: any, valueName?: string) => await params.testAsync(value, valueName),
    parse: (value: any, valueName?: string) => params.parse(value, valueName),
    parseAsync: async (value: any, valueName?: string) => await params.parseAsync(value, valueName),

    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => {
      return customMethod(params, method);
    },

    alias(valueName: string) {
      if (!isString(valueName)) {
        throw Error("vkrun-schema: alias method received invalid parameter!");
      }

      that.methodBuild({ method: "alias", alias: valueName });

      delete (chain as any).alias;
      return chain;
    },

    default(value: Function) {
      params.default(value);
      delete (chain as any).default;
      return chain;
    },

    notRequired() {
      that.methodBuild({ method: "notRequired" });

      delete (chain as any).notRequired;
      return chain;
    },

    nullable(config?: SchemaConfig) {
      that.methodBuild({ method: "nullable", config });

      delete (chain as any).nullable;
      return chain;
    },
  } as unknown as SchemaGenericFunctionType<SchemaDefaultFunctionOptions, SchemaDefaultFunctionFlags>;

  return chain;
};
