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

function applyAndChainArray(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = arrayMethod({
    params: next,
    schema: extra.schema,
    config: extra.config,
    skipBase: true,
  });

  return nextMethods;
}

export const arrayMethod = <Item extends SchemaType<any, any>>({
  params,
  schema,
  config,
  skipBase = false,
}: {
  params: SchemaMethodParams;
  schema: Item;
  config?: SchemaArrayConfig;
  skipBase?: boolean;
}): SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags> => {
  if (!skipBase) {
    params.methodBuild({ method: "array", config, schema });
  }

  const chain = {
    throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => params.throw(value, valueName, ClassError),
    throwAsync: async (value: any, valueName: string, ClassError?: SchemaErrorTypes) =>
      await params.throwAsync(value, valueName, ClassError),
    validate: (value: any) => params.validate(value),
    validateAsync: async (value: any) => await params.validateAsync(value),
    test: (value: any, valueName?: string) => params.test(value, valueName),
    testAsync: async (value: any, valueName?: string) => await params.testAsync(value, valueName),
    parse: (value: any, valueName?: string) => params.parse(value, valueName),
    parseAsync: async (value: any, valueName?: string) => await params.parseAsync(value, valueName),
    min(config: SchemaArrayMinConfig) {
      if (hasMethod(params.methods, "min")) {
        throw Error("vkrun-schema: min method has already been called!");
      }
      return applyAndChainArray("min", params, { config });
    },
    max(config: SchemaArrayMinConfig) {
      if (hasMethod(params.methods, "max")) {
        throw Error("vkrun-schema: max method has already been called!");
      }
      return applyAndChainArray("max", params, { config });
    },
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChainArray("alias", params, { alias: valueName });
    },
    default: (value: any[]) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = arrayMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
        schema,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChainArray("notRequired", params),
    nullable: (config?: SchemaConfig) => applyAndChainArray("nullable", params, { config }),
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => customMethod(params, method),
    parseTo: () => {
      const next: any = params.clone(params.methods);
      const nextParams = next.schemaMethodParams();
      nextParams.methodBuild({ method: "parseTo" });

      return {
        string: (config?: SchemaConfig) => nextParams.string(config),
        buffer: (config?: SchemaConfig) => nextParams.buffer(config),
        boolean: (config?: SchemaConfig) => nextParams.boolean(config),
      };
    },
  } as unknown as SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags>;

  return chain;
};
