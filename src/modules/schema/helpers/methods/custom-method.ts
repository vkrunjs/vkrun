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
  } as unknown as SchemaGenericCustomType<I, O>;
};
