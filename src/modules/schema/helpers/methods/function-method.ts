import {
  SchemaConfig,
  SchemaCustomMethod,
  SchemaDefaultFunctionFlags,
  SchemaDefaultFunctionOptions,
  SchemaGenericFunctionType,
  isString,
  SchemaErrorTypes,
  SchemaMethodParams,
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChainFunction(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = functionMethod({ params: next, skipBase: true });

  // Remove chainable method unless it's a special case (if needed)
  delete nextMethods[method as keyof typeof nextMethods];

  return nextMethods;
}

export const functionMethod = ({ params, config, skipBase = false }: SchemaMethodOptions & { params: SchemaMethodParams }) => {
  if (!skipBase) {
    params.methodBuild({ method: "function", config });
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
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => customMethod(params, method),
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChainFunction("alias", params, { alias: valueName });
    },
    default: (value: Function) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = functionMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChainFunction("notRequired", params),
    nullable: (config?: SchemaConfig) => applyAndChainFunction("nullable", params, { config }),
  } as unknown as SchemaGenericFunctionType<SchemaDefaultFunctionOptions, SchemaDefaultFunctionFlags>;

  return chain;
};
