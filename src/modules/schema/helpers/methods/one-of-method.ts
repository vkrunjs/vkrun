import {
  SchemaConfig,
  isString,
  SchemaDefaultObjectFlags,
  SchemaDefaultObjectOptions,
  SchemaType,
  SchemaErrorTypes,
  SchemaMethodParams,
  SchemaGenericOneOfType,
  SchemaMethodOptions,
} from "../../../../index";

function applyAndChain<Items extends Array<SchemaType<any, any>>>(
  method: string,
  methodParams: SchemaMethodParams,
  extra: { comparisonItems?: Items; [key: string]: any } = {},
) {
  const next: any = methodParams.clone(methodParams.methods);
  next.methodBuild({ method, ...extra });

  const nextMethods: any = oneOfMethod({
    params: next,
    comparisonItems: extra.comparisonItems || [],
    config: extra.config,
    skipBase: true,
  });

  return nextMethods;
}

export const oneOfMethod = <Items extends Array<SchemaType<any, any>>>({
  params,
  comparisonItems,
  config,
  skipBase = false,
}: SchemaMethodOptions & { comparisonItems: Items }) => {
  if (!skipBase) {
    params.methodBuild({ method: "oneOf", comparisonItems, config });
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
    default: (value: object) => {
      const next: any = params.clone(params.methods);
      next.schemaMethodParams().default(value);

      const nextMethods: any = oneOfMethod({
        params: next.schemaMethodParams(),
        skipBase: true,
        comparisonItems,
      });

      delete nextMethods.default;
      return nextMethods;
    },
    notRequired: () => applyAndChain("notRequired", params),
    nullable: () => applyAndChain("nullable", params),
  } as unknown as SchemaGenericOneOfType<Items, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;

  return chain;
};
