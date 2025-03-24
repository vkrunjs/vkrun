import {
  SchemaConfig,
  SchemaStringMinLengthConfig,
  SchemaStringMaxLengthConfig,
  SchemaStringMinWordConfig,
  SchemaStringUUIDConfig,
  SchemaStringTimeConfig,
  SchemaStringRegexConfig,
  SchemaCustomMethod,
  SchemaDateConfig,
  SchemaType,
  SchemaArrayConfig,
  SchemaGenericStringType,
  SchemaDefaultStringOptions,
  SchemaDefaultStringFlags,
  isString,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";
import { customMethod } from "./custom-method";

export const stringMethod = (params: SchemaMethodParams, config?: SchemaConfig) => {
  params.methodBuild({ method: "string", config });

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

    notEqual: (valueToCompare: string, config?: SchemaConfig) => {
      params.methodBuild({ method: "notEqual", valueToCompare, config });
      return chain;
    },

    oneOf: (comparisonItems: string[], config?: SchemaConfig) => {
      params.methodBuild({ method: "oneOf", comparisonItems, config });

      delete (chain as any).oneOf;
      return chain;
    },

    minLength(config: SchemaStringMinLengthConfig) {
      that.methodBuild({ method: "minLength", config });

      delete (chain as any).minLength;
      return chain;
    },

    maxLength(config: SchemaStringMaxLengthConfig) {
      that.methodBuild({ method: "maxLength", config });

      delete (chain as any).maxLength;
      return chain;
    },

    minWord(config: SchemaStringMinWordConfig) {
      that.methodBuild({ method: "minWord", config });

      delete (chain as any).minWord;
      return chain;
    },

    email(config: SchemaConfig) {
      that.methodBuild({ method: "email", config });

      delete (chain as any).email;
      return chain;
    },

    UUID(config: SchemaStringUUIDConfig) {
      that.methodBuild({ method: "UUID", config });

      delete (chain as any).UUID;
      return chain;
    },

    time(config: SchemaStringTimeConfig) {
      that.methodBuild({ method: "time", config });

      delete (chain as any).time;
      return chain;
    },

    regex(config: SchemaStringRegexConfig) {
      that.methodBuild({ method: "regex", config });

      delete (chain as any).regex;
      return chain;
    },

    date(config?: SchemaDateConfig) {
      const dateTypes = [
        "ISO8601",
        "DD/MM/YYYY",
        "MM/DD/YYYY",
        "DD-MM-YYYY",
        "MM-DD-YYYY",
        "YYYY/MM/DD",
        "YYYY/DD/MM",
        "YYYY-MM-DD",
        "YYYY-DD-MM",
      ];

      if (config?.type && !dateTypes.includes(config.type)) {
        throw Error("vkrun-schema: date method received invalid parameter!");
      }

      that.methodBuild({ method: "date", config });

      delete (chain as any).date;
      return chain;
    },

    notRequired() {
      that.methodBuild({ method: "notRequired" });

      delete (chain as any).notRequired;
      return chain;
    },

    nullable() {
      that.methodBuild({ method: "nullable" });

      delete (chain as any).nullable;
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

    default(value: string) {
      params.default(value);
      delete (chain as any).default;
      return chain;
    },

    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => {
      return customMethod(params, method);
    },

    parseTo() {
      that.methodBuild({ method: "parseTo" });

      return {
        number: (config?: SchemaConfig) => that.number(config),
        bigInt: (config?: SchemaConfig) => that.bigInt(config),
        boolean: (config?: SchemaConfig) => that.boolean(config),
        buffer: (config?: SchemaConfig) => that.buffer(config),
        date: (config?: SchemaDateConfig) => that.date(config),
        array: <Item extends SchemaType<any, any>>(schema: Item, config?: SchemaArrayConfig) => {
          return that.array(schema, config);
        },
        object: <Shape extends Record<string, SchemaType<any, any>>>(schema: Shape, config?: SchemaConfig) => {
          return that.object(schema, config);
        },
      };
    },
  } as unknown as SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags>;

  return chain;
};
