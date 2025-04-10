import {
  SchemaConfig,
  SchemaCustomMethod,
  isString,
  SchemaArrayMinConfig,
  SchemaDefaultArrayFlags,
  SchemaDefaultArrayOptions,
  SchemaGenericArrayType,
  SchemaType,
  SchemaArrayConfig,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";
import { hasMethod } from "../has-method";
import { customMethod } from "./custom-method";

export const arrayMethod = <Item extends SchemaType<any, any>>(
  params: SchemaMethodParams,
  schema: Item,
  config?: SchemaArrayConfig,
): SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags> => {
  params.methodBuild({ method: "array", config, schema });
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

    min(config: SchemaArrayMinConfig) {
      if (hasMethod(that.methods, "min")) {
        throw Error("vkrun-schema: min method has already been called!");
      }
      that.methodBuild({ method: "min", config });

      delete (chain as any).min;
      return chain;
    },

    max(config: SchemaArrayMinConfig) {
      if (hasMethod(that.methods, "max")) {
        throw Error("vkrun-schema: max method has already been called!");
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

    default(value: any[]) {
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
        buffer: (config?: SchemaConfig) => that.buffer(config),
        boolean: (config?: SchemaConfig) => that.boolean(config),
      };
    },
  } as unknown as SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags>;

  return chain;
};
