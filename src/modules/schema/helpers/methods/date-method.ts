import {
  SchemaConfig,
  SchemaCustomMethod,
  SchemaDateMaxConfig,
  SchemaDateMinConfig,
  SchemaDefaultDateFlags,
  SchemaDefaultDateOptions,
  SchemaGenericDateType,
  isString,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";
import { customMethod } from "./custom-method";

export const dateMethod = (params: SchemaMethodParams, config?: SchemaConfig) => {
  params.methodBuild({ method: "date", config });
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

    equal: <T = unknown>(valueToCompare: T, config?: SchemaConfig) => {
      params.methodBuild({ method: "equal", valueToCompare, config });

      delete (chain as any).equal;
      return chain;
    },

    notEqual: (valueToCompare: Date, config?: SchemaConfig) => {
      params.methodBuild({ method: "notEqual", valueToCompare, config });
      return chain;
    },

    oneOf: (comparisonItems: Date[], config?: SchemaConfig) => {
      params.methodBuild({ method: "oneOf", comparisonItems, config });

      delete (chain as any).oneOf;
      return chain;
    },

    min(config: SchemaDateMinConfig) {
      if (!(config.min instanceof Date)) {
        throw Error("vkrun-schema: min method received invalid parameter!");
      }
      that.methodBuild({ method: "min", config });

      delete (chain as any).min;
      return chain;
    },

    max(config: SchemaDateMaxConfig) {
      if (!(config.max instanceof Date)) {
        throw Error("vkrun-schema: max method received invalid parameter!");
      }
      that.methodBuild({ method: "max", config });

      delete (chain as any).max;
      return chain;
    },

    alias(valueName: string) {
      if (!isString(valueName)) {
        throw Error("vkrun-schema: alias method received invalid parameter!");
      }

      that.methodBuild({ method: "alias", alias: valueName });

      delete (chain as any).alias;
      return chain;
    },

    default(value: Date) {
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

    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => {
      return customMethod(params, method);
    },

    parseTo() {
      that.methodBuild({ method: "parseTo" });
      return {
        string: (config?: SchemaConfig) => that.string(config),
        number: (config?: SchemaConfig) => that.number(config),
        bigInt: (config?: SchemaConfig) => that.bigInt(config),
        boolean: (config?: SchemaConfig) => that.boolean(config),
      };
    },
  } as unknown as SchemaGenericDateType<SchemaDefaultDateOptions, SchemaDefaultDateFlags>;

  return chain;
};
