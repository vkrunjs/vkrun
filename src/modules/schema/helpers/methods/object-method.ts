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
  SchemaMethodOptions,
} from "../../../../index";
import { customMethod } from "./custom-method";

function applyAndChain<Shape extends Record<string, SchemaType<any, any>>>(
  method: string,
  methodParams: SchemaMethodParams,
  extra: { schema?: Shape; [key: string]: any } = {},
) {
  const next: any = methodParams.clone(methodParams.methods);

  if (extra.schema) {
    try {
      for (const [key, rule] of Object.entries(extra.schema) as [string, any][]) {
        rule.validate(undefined, key);
      }
    } catch {
      throw Error("vkrun-schema: object method received invalid parameter!");
    }
  }

  next.methodBuild({ method, ...extra });

  const nextMethods: any = objectMethod({
    params: next,
    schema: {},
    config: extra.config,
  });

  return nextMethods;
}

export const objectMethod = <Shape extends Record<string, SchemaType<any, any>>>({
  params,
  schema,
  config,
  skipBase = false,
}: SchemaMethodOptions & { schema: Shape }) => {
  if (!skipBase) {
    try {
      for (const [key, rule] of Object.entries(schema) as [string, any][]) {
        rule.validate(undefined, key);
      }
    } catch {
      throw Error("vkrun-schema: object method received invalid parameter!");
    }

    params.methodBuild({ method: "object", schema, config });
  }

  const chain = {
    throw: (value: any, valueName: string, ClassError?: SchemaErrorTypes) => params.throw(value, valueName, ClassError),
    throwAsync: async (value: any, valueName: string, ClassError?: SchemaErrorTypes) =>
      await params.throwAsync(value, valueName, ClassError),
    validate: (value: any) => params.validate(value),
    validateAsync: async (value: any) => await params.validateAsync(value),
    test: (value: any, valueName?: string) => params.test(value, valueName),
    testAsync: async (value: any, valueName?: string) => params.testAsync(value, valueName),
    parse: (value: any, valueName?: string) => params.parse(value, valueName),
    parseAsync: async (value: any, valueName?: string) => params.parseAsync(value, valueName),
    alias: (valueName: string) => {
      if (!isString(valueName)) throw Error("vkrun-schema: alias method received invalid parameter!");
      return applyAndChain("alias", params, { alias: valueName, schema });
    },
    default: (value: object) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = objectMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
        schema,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChain("notRequired", params, { schema }),
    nullable: () => applyAndChain("nullable", params, { schema }),
    custom: <O = any, I = any>(method: SchemaCustomMethod<I, O>) => customMethod(params, method),
    parseTo: () => {
      const next: any = params.clone(params.methods);
      const nextParams = next.schemaMethodParams();
      nextParams.methodBuild({ method: "parseTo" });

      return {
        string: (config?: SchemaConfig) => nextParams.string(config),
        boolean: (config?: SchemaConfig) => nextParams.boolean(config),
      };
    },
  } as unknown as SchemaGenericObjectType<Shape, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;

  return chain;
};
