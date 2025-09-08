import { SchemaSetup } from "../..";
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
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChain(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = stringMethod({
    params: next.schemaMethodParams(),
    skipBase: true,
  });

  // Only delete method for chainable methods except notEqual
  if (method !== "notEqual") {
    delete nextMethods[method as keyof typeof nextMethods];
  }

  return nextMethods;
}

export const stringMethod = ({ params, config, skipBase = false }: SchemaMethodOptions) => {
  if (!skipBase) {
    params.methodBuild({ method: "string", config });
  }

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
    equal: <T = unknown>(valueToCompare: T, config?: SchemaConfig) =>
      applyAndChain("equal", params, { valueToCompare, config }),
    notEqual: (valueToCompare: string, config?: SchemaConfig) => applyAndChain("notEqual", params, { valueToCompare, config }),
    oneOf: (comparisonItems: string[], config?: SchemaConfig) => applyAndChain("oneOf", params, { comparisonItems, config }),
    minLength: (config: SchemaStringMinLengthConfig) => applyAndChain("minLength", params, { config }),
    maxLength: (config: SchemaStringMaxLengthConfig) => applyAndChain("maxLength", params, { config }),
    minWord: (config: SchemaStringMinWordConfig) => applyAndChain("minWord", params, { config }),
    email: (config: SchemaConfig) => applyAndChain("email", params, { config }),
    UUID: (config: SchemaStringUUIDConfig) => applyAndChain("UUID", params, { config }),
    time: (config: SchemaStringTimeConfig) => applyAndChain("time", params, { config }),
    regex: (config: SchemaStringRegexConfig) => applyAndChain("regex", params, { config }),
    date: (config?: SchemaDateConfig) => {
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

      return applyAndChain("date", params, { config });
    },
    notRequired: () => applyAndChain("notRequired", params),
    nullable: () => applyAndChain("nullable", params),
    alias: (valueName: string) => {
      if (!isString(valueName)) {
        throw Error("vkrun-schema: alias method received invalid parameter!");
      }
      return applyAndChain("alias", params, { alias: valueName });
    },
    default(value: string) {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = stringMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => {
      return customMethod(params, method);
    },
    parseTo() {
      const next: any = params.clone(params.methods);
      const nextParams = next.schemaMethodParams();
      nextParams.methodBuild({ method: "parseTo" });

      return {
        string: (config?: SchemaConfig) => nextParams.string(config),
        number: (config?: SchemaConfig) => nextParams.number(config),
        bigInt: (config?: SchemaConfig) => nextParams.bigInt(config),
        boolean: (config?: SchemaConfig) => nextParams.boolean(config),
        buffer: (config?: SchemaConfig) => nextParams.buffer(config),
        date: (config?: SchemaDateConfig) => nextParams.date(config),
        array: <Item extends SchemaType<any, any>>(schema: Item, config?: SchemaArrayConfig) =>
          nextParams.array(schema, config),
        object: <Shape extends Record<string, SchemaType<any, any>>>(schema: Shape, config?: SchemaConfig) =>
          nextParams.object(schema, config),
      };
    },
  } as unknown as SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags>;

  return chain;
};
