import {
  SchemaConfig,
  SchemaCustomMethod,
  isString,
  SchemaDefaultBooleanFlags,
  SchemaDefaultBooleanOptions,
  SchemaGenericBooleanType,
  SchemaErrorTypes,
  SchemaMethodParams,
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChainBoolean(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = booleanMethod({
    params: next,
    skipBase: true,
  } as any);

  if (method !== "notEqual") {
    delete nextMethods[method as keyof typeof nextMethods];
  }

  return nextMethods;
}

export const booleanMethod = ({ params, config, skipBase = false }: SchemaMethodOptions) => {
  if (!skipBase) {
    params.methodBuild({ method: "boolean", config });
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
    equal: <T = unknown>(valueToCompare: T, config?: SchemaConfig) =>
      applyAndChainBoolean("equal", params, { valueToCompare, config }),
    notEqual: (valueToCompare: boolean, config?: SchemaConfig) =>
      applyAndChainBoolean("notEqual", params, { valueToCompare, config }),
    oneOf: (comparisonItems: boolean[], config?: SchemaConfig) =>
      applyAndChainBoolean("oneOf", params, { comparisonItems, config }),
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChainBoolean("alias", params, { alias: valueName });
    },
    default: (value: boolean) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = booleanMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChainBoolean("notRequired", params),
    nullable: (config?: SchemaConfig) => applyAndChainBoolean("nullable", params, { config }),
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => customMethod(params, method),
    parseTo: () => {
      const next: any = params.clone(params.methods);
      const nextParams = next.schemaMethodParams();
      nextParams.methodBuild({ method: "parseTo" });

      return {
        string: (config?: SchemaConfig) => nextParams.string(config),
        number: (config?: SchemaConfig) => nextParams.number(config),
        bigInt: (config?: SchemaConfig) => nextParams.bigInt(config),
      };
    },
  } as unknown as SchemaGenericBooleanType<SchemaDefaultBooleanOptions, SchemaDefaultBooleanFlags>;

  return chain;
};
