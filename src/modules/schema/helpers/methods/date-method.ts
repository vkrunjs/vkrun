import {
  SchemaConfig,
  SchemaCustomMethod,
  SchemaDateMaxConfig,
  SchemaDateMinConfig,
  SchemaDefaultDateFlags,
  SchemaDefaultDateOptions,
  SchemaGenericDateType,
  isString,
  SchemaErrorTypes,
  SchemaMethodParams,
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChainDate(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = dateMethod({ params: next, skipBase: true });

  // Only delete chainable methods for dates if not "notEqual"
  if (method !== "notEqual") {
    delete nextMethods[method as keyof typeof nextMethods];
  }

  return nextMethods;
}

export const dateMethod = ({ params, config, skipBase = false }: SchemaMethodOptions) => {
  if (!skipBase) {
    params.methodBuild({ method: "date", config });
  }
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
    equal: (valueToCompare: Date, config?: SchemaConfig) => applyAndChainDate("equal", params, { valueToCompare, config }),
    notEqual: (valueToCompare: Date, config?: SchemaConfig) =>
      applyAndChainDate("notEqual", params, { valueToCompare, config }),
    oneOf: (comparisonItems: Date[], config?: SchemaConfig) => applyAndChainDate("oneOf", params, { comparisonItems, config }),
    min: (config: SchemaDateMinConfig) => {
      if (!(config.min instanceof Date)) {
        throw Error("vkrun-schema: min method received invalid parameter!");
      }
      return applyAndChainDate("min", params, { config });
    },
    max: (config: SchemaDateMaxConfig) => {
      if (!(config.max instanceof Date)) {
        throw Error("vkrun-schema: max method received invalid parameter!");
      }
      return applyAndChainDate("max", params, { config });
    },
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChainDate("alias", params, { alias: valueName });
    },
    default: (value: Date) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = dateMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChainDate("notRequired", params),
    nullable: (config?: SchemaConfig) => applyAndChainDate("nullable", params, { config }),
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => customMethod(params, method),
    parseTo: () => {
      const next: any = params.clone(params.methods);
      const nextParams = next.schemaMethodParams();
      nextParams.methodBuild({ method: "parseTo" });

      return {
        string: (config?: SchemaConfig) => nextParams.string(config),
        number: (config?: SchemaConfig) => nextParams.number(config),
        bigInt: (config?: SchemaConfig) => nextParams.bigInt(config),
        boolean: (config?: SchemaConfig) => nextParams.boolean(config),
      };
    },
  } as unknown as SchemaGenericDateType<SchemaDefaultDateOptions, SchemaDefaultDateFlags>;

  return chain;
};
