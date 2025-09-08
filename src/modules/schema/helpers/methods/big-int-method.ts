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
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChain(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = bigIntMethod({ params: next, skipBase: true });

  // Only delete chainable methods for bigInt if not "notEqual"
  if (method !== "notEqual") {
    delete nextMethods[method as keyof typeof nextMethods];
  }

  return nextMethods;
}

export const bigIntMethod = ({ params, config, skipBase = false }: SchemaMethodOptions) => {
  if (!skipBase) {
    params.methodBuild({ method: "bigInt", config });
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
    equal: (valueToCompare: bigint, config?: SchemaConfig) => applyAndChain("equal", params, { valueToCompare, config }),
    notEqual: (valueToCompare: bigint, config?: SchemaConfig) => applyAndChain("notEqual", params, { valueToCompare, config }),
    oneOf: (comparisonItems: bigint[], config?: SchemaConfig) => applyAndChain("oneOf", params, { comparisonItems, config }),
    min: (config: SchemaBigIntMinConfig) => applyAndChain("min", params, { config }),
    max: (config: SchemaBigIntMaxConfig) => applyAndChain("max", params, { config }),
    positive: (config?: SchemaConfig) => applyAndChain("positive", params, { config }),
    negative: (config?: SchemaConfig) => applyAndChain("negative", params, { config }),
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChain("alias", params, { alias: valueName });
    },
    default: (value: bigint) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = bigIntMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChain("notRequired", params),
    nullable: (config?: SchemaConfig) => applyAndChain("nullable", params, { config }),
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => customMethod(params, method),
    parseTo: () => {
      const next: any = params.clone(params.methods);
      const nextParams = next.schemaMethodParams();
      nextParams.methodBuild({ method: "parseTo" });

      return {
        string: (config?: SchemaConfig) => nextParams.string(config),
        number: (config?: SchemaConfig) => nextParams.number(config),
        boolean: (config?: SchemaConfig) => nextParams.boolean(config),
        date: (config?: SchemaDateConfig) => nextParams.date(config),
      };
    },
  } as unknown as SchemaGenericBigIntType<SchemaDefaultBigIntOptions, SchemaDefaultBigIntFlags>;

  return chain;
};
