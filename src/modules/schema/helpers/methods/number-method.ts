import {
  SchemaConfig,
  SchemaNumberMinConfig,
  SchemaNumberMaxConfig,
  SchemaCustomMethod,
  SchemaDateConfig,
  SchemaGenericNumberType,
  SchemaDefaultNumberOptions,
  SchemaDefaultNumberFlags,
  isString,
  SchemaErrorTypes,
  SchemaMethodParams,
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChain(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = numberMethod({ params: next, skipBase: true });

  // Only delete chainable methods for numbers if not "notEqual"
  if (method !== "notEqual") {
    delete nextMethods[method as keyof typeof nextMethods];
  }

  return nextMethods;
}

export const numberMethod = ({ params, config, skipBase = false }: SchemaMethodOptions) => {
  if (!skipBase) {
    params.methodBuild({ method: "number", config });
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
    equal: (valueToCompare: number, config?: SchemaConfig) => applyAndChain("equal", params, { valueToCompare, config }),
    notEqual: (valueToCompare: number, config?: SchemaConfig) => applyAndChain("notEqual", params, { valueToCompare, config }),
    oneOf: (comparisonItems: number[], config?: SchemaConfig) => applyAndChain("oneOf", params, { comparisonItems, config }),
    float: (config?: SchemaConfig) => applyAndChain("float", params, { config }),
    integer: (config?: SchemaConfig) => applyAndChain("integer", params, { config }),
    min: (config: SchemaNumberMinConfig) => applyAndChain("min", params, { config }),
    max: (config: SchemaNumberMaxConfig) => applyAndChain("max", params, { config }),
    positive: (config?: SchemaConfig) => applyAndChain("positive", params, { config }),
    negative: (config?: SchemaConfig) => applyAndChain("negative", params, { config }),
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChain("alias", params, { alias: valueName });
    },
    default: (value: number) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = numberMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChain("notRequired", params),
    nullable: () => applyAndChain("nullable", params),
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => customMethod(params, method),
    parseTo: () => {
      const next: any = params.clone(params.methods);
      const nextParams = next.schemaMethodParams();
      nextParams.methodBuild({ method: "parseTo" });

      return {
        string: (config?: SchemaConfig) => nextParams.string(config),
        bigInt: (config?: SchemaConfig) => nextParams.bigInt(config),
        boolean: (config?: SchemaConfig) => nextParams.boolean(config),
        date: (config?: SchemaDateConfig) => nextParams.date(config),
      };
    },
  } as unknown as SchemaGenericNumberType<SchemaDefaultNumberOptions, SchemaDefaultNumberFlags>;

  return chain;
};
