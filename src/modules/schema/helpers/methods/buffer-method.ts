import {
  SchemaArrayConfig,
  SchemaConfig,
  SchemaCustomMethod,
  SchemaDateConfig,
  SchemaDefaultBufferFlags,
  SchemaDefaultBufferOptions,
  SchemaGenericBufferType,
  SchemaType,
  isString,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";
import { customMethod } from "./custom-method";

export const bufferMethod = (params: SchemaMethodParams, config?: SchemaConfig) => {
  params.methodBuild({ method: "buffer", config });
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

    notEqual: (valueToCompare: Buffer, config?: SchemaConfig) => {
      params.methodBuild({ method: "notEqual", valueToCompare, config });
      return chain;
    },

    oneOf: (comparisonItems: Buffer[], config?: SchemaConfig) => {
      params.methodBuild({ method: "oneOf", comparisonItems, config });

      delete (chain as any).oneOf;
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

    default(value: Buffer) {
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
        date: (config?: SchemaDateConfig) => that.date(config),
        array: <Item extends SchemaType<any, any>>(schema: Item, config?: SchemaArrayConfig) => that.array(schema, config),
        object: <Shape extends Record<string, SchemaType<any, any>>>(schema: Shape, config?: SchemaConfig) =>
          that.object(schema, config),
      };
    },
  } as unknown as SchemaGenericBufferType<SchemaDefaultBufferOptions, SchemaDefaultBufferFlags>;

  return chain;
};
