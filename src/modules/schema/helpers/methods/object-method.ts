import {
  SchemaConfig,
  SchemaCustomMethod,
  isString,
  SchemaDefaultObjectFlags,
  SchemaDefaultObjectOptions,
  SchemaGenericObjectType,
  SchemaType,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";
import { customMethod } from "./custom-method";

export const objectMethod = <Shape extends Record<string, SchemaType<any, any>>>(
  params: SchemaMethodParams,
  schema: Shape,
  config?: SchemaConfig,
) => {
  try {
    for (const [key, rule] of Object.entries(schema) as [string, any]) {
      rule.validate(undefined, key);
    }
  } catch {
    throw Error("vkrun-schema: object method received invalid parameter!");
  }

  params.methodBuild({ method: "object", schema, config });
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

    alias(valueName: string) {
      if (!isString(valueName)) {
        throw Error("vkrun-schema: alias method received invalid parameter!");
      }
      that.methodBuild({ method: "alias", alias: valueName });

      delete (chain as any).alias;
      return chain;
    },

    default(value: object) {
      params.default(value);
      delete (chain as any).default;
      return chain;
    },

    notRequired() {
      that.methodBuild({ method: "notRequired" });

      delete (chain as any).notRequired;
      return chain;
    },

    nullable() {
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
        boolean: (config?: SchemaConfig) => that.boolean(config),
      };
    },
  } as unknown as SchemaGenericObjectType<Shape, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;

  return chain;
};
