import {
  SchemaConfig,
  SchemaDateConfig,
  SchemaArrayConfig,
  SchemaGenericCustomType,
  SchemaGenericEqualType,
  SchemaReturnCommonMethods,
  SchemaType,
  SchemaCustomMethod,
  SchemaErrorTypes,
  SchemaMethodParams,
} from "../../../../index";

export const customMethod = <O = any, I = any>(params: SchemaMethodParams, customMethod: SchemaCustomMethod<I, O>) => {
  params.methodBuild({ method: "custom", customMethod });

  return {
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
    string: (config?: SchemaConfig) => params.string(config),
    number: (config?: SchemaConfig) => params.number(config),
    bigInt: (config?: SchemaConfig) => params.bigInt(config),
    boolean: (config?: SchemaConfig) => params.boolean(config),
    buffer: (config?: SchemaConfig) => params.buffer(config),
    function: (config?: SchemaConfig) => params.function(config),
    date: (config?: SchemaDateConfig) => params.date(config),
    array: <Item extends SchemaType<any, any>>(schema: Item, config?: SchemaArrayConfig) => params.array(schema, config),
    object: <Shape extends Record<string, SchemaType<any, any>>>(schema: Shape, config?: SchemaConfig) =>
      params.object(schema, config),
    any: () => params.any(),
  } as unknown as SchemaGenericCustomType<I, O>;
};
