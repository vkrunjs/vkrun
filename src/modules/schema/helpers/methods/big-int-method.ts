import {
  SchemaConfig,
  SchemaCustomMethod,
  SchemaDateConfig,
  isString,
  SchemaBigIntMaxConfig,
  SchemaBigIntMinConfig,
  SchemaDefaultBigIntFlags,
  SchemaDefaultBigIntOptions,
  SchemaGenericBigIntType,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";
import { customMethod } from "./custom-method";

export const bigIntMethod = (params: SchemaMethodParams, config?: SchemaConfig) => {
  params.methodBuild({ method: "bigInt", config });
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

    notEqual: (valueToCompare: bigint, config?: SchemaConfig) => {
      params.methodBuild({ method: "notEqual", valueToCompare, config });
      return chain;
    },

    oneOf: (comparisonItems: bigint[], config?: SchemaConfig) => {
      params.methodBuild({ method: "oneOf", comparisonItems, config });

      delete (chain as any).oneOf;
      return chain;
    },

    min(config: SchemaBigIntMinConfig) {
      that.methodBuild({ method: "min", config });

      delete (chain as any).min;
      return chain;
    },

    max(config: SchemaBigIntMaxConfig) {
      that.methodBuild({ method: "max", config });

      delete (chain as any).max;
      return chain;
    },

    positive(config?: SchemaConfig) {
      that.methodBuild({ method: "positive", config });

      delete (chain as any).positive;
      return chain;
    },

    negative(config?: SchemaConfig) {
      that.methodBuild({ method: "negative", config });

      delete (chain as any).negative;
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

    default(value: bigint) {
      params.default(value);
      delete (chain as any).default;
      return chain;
    },

    notRequired() {
      that.methodBuild({ method: "notRequired" });

      delete (chain as any).notRequired;
      return chain;
    },

    nullable(config: SchemaConfig) {
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
        boolean: (config?: SchemaConfig) => that.boolean(config),
        date: (config?: SchemaDateConfig) => that.date(config),
      };
    },
  } as unknown as SchemaGenericBigIntType<SchemaDefaultBigIntOptions, SchemaDefaultBigIntFlags>;

  return chain;
};
