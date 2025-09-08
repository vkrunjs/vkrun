import {
  SchemaConfig,
  SchemaCustomMethod,
  SchemaDateConfig,
  isString,
  SchemaArrayConfig,
  SchemaDefaultAnyFlags,
  SchemaDefaultAnyOptions,
  SchemaGenericAnyType,
  SchemaType,
  SchemaMethodParams,
  SchemaErrorTypes,
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChain(method: string, methodParams: SchemaMethodParams, extra: Record<string, any> = {}) {
  const next: any = methodParams.clone(methodParams.methods);

  next.methodBuild({ method, ...extra });

  const nextMethods: any = anyMethod({
    params: next,
    skipBase: true,
  } as any);

  if (method !== "notEqual") {
    delete nextMethods[method as keyof typeof nextMethods];
  }

  return nextMethods;
}

export const anyMethod = ({ params, skipBase = false }: SchemaMethodOptions) => {
  if (!skipBase) {
    params.methodBuild({ method: "any" });
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
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChain("alias", params, { alias: valueName });
    },
    default: (value: any) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = anyMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
      });

      delete nextMethods.default;
      return nextMethods;
    },
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
        buffer: (config?: SchemaConfig) => nextParams.buffer(config),
        date: (config?: SchemaDateConfig) => nextParams.date(config),
        array: <Item extends SchemaType<any, any>>(schema: Item, config?: SchemaArrayConfig) =>
          nextParams.array(schema, config),
        object: <Shape extends Record<string, SchemaType<any, any>>>(schema: Shape, config?: SchemaConfig) =>
          nextParams.object(schema, config),
      };
    },
  } as unknown as SchemaGenericAnyType<SchemaDefaultAnyOptions, SchemaDefaultAnyFlags>;

  return chain;
};
