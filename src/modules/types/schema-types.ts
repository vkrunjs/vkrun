export interface VkrunSchema {
  /**
   * Returns a schema for validating strings.
   *
   * @example
   * const stringSchema = schema().string();
   *
   * console.log(stringSchema.validate("Hello")); // true
   * console.log(stringSchema.validate(123));     // false
   *
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] any message" and the value 123 is validated for the field "value_name",
   *     the resulting error message will be "value_name 123 any message". If not provided, the default message
   *     "value_name must be a string type!" is used.
   *
   * @example
   * const customSchema = schema().string({
   *  message: "[valueName] [value] any message"
   * });
   *
   * const test = customSchema.test(123, "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name 123 any message"
   */
  string: (config?: SchemaConfig) => SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags>;

  /**
   * Returns a schema for validating numbers.
   *
   * @example
   * const numberSchema = schema().number();
   *
   * console.log(numberSchema.validate(123));     // true
   * console.log(numberSchema.validate("Hello")); // false
   *
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] is not a valid number" and the value "Hello" is validated for the field "value_name",
   *     the resulting error message will be "value_name Hello is not a valid number". If not provided, the default message
   *     "value_name must be a number!" is used.
   *
   * @example
   * const customSchema = schema().number({
   *   message: "[valueName] [value] is not a valid number"
   * });
   *
   * const test = customSchema.test("Hello", "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name Hello is not a valid number"
   */
  number: (config?: SchemaConfig) => SchemaGenericNumberType<SchemaDefaultNumberOptions, SchemaDefaultNumberFlags>;

  /**
   * Returns a schema for validating BigInt values.
   *
   * @example
   * const bigIntSchema = schema().bigInt();
   *
   * console.log(bigIntSchema.validate(123n); // true
   * console.log(bigIntSchema.validate(123)); // false
   *
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] is not a valid BigInt" and the value 123 is validated for the field "value_name",
   *     the resulting error message will be "value_name 123 is not a valid BigInt". If not provided, the default message
   *     "value_name must be a BigInt!" is used.
   *
   * @example
   * const customSchema = schema().bigInt({
   *   message: "[valueName] [value] is not a valid BigInt"
   * });
   *
   * const test = customSchema.test(123, "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name 123 is not a valid BigInt"
   */
  bigInt: (config?: SchemaConfig) => SchemaGenericBigIntType<SchemaDefaultBigIntOptions, SchemaDefaultBigIntFlags>;

  /**
   * Returns a schema for validating boolean values.
   *
   * @example
   * const booleanSchema = schema().boolean();
   *
   * console.log(booleanSchema.validate(true));    // true
   * console.log(booleanSchema.validate("false")); // false
   *
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] is not a valid boolean" and the value "false" is validated for the field "value_name",
   *     the resulting error message will be "value_name false is not a valid boolean". If not provided, the default message
   *     "value_name must be a boolean!" is used.
   *
   * @example
   * const customSchema = schema().boolean({
   *   message: "[valueName] [value] is not a valid boolean"
   * });
   *
   * const test = customSchema.test("Hello", "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name Hello is not a valid boolean"
   */
  boolean: (config?: SchemaConfig) => SchemaGenericBooleanType<SchemaDefaultBooleanOptions, SchemaDefaultBooleanFlags>;

  /**
   * Returns a schema for validating Buffer values.
   *
   * @example
   * const bufferSchema = schema().buffer();
   *
   * console.log(bufferSchema.validate(Buffer.from("Hello"))); // true
   * console.log(bufferSchema.validate("Hello"));              // false
   *
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] is not a valid Buffer" and the value "Hello" is validated for the field "value_name",
   *     the resulting error message will be "value_name Hello is not a valid Buffer". If not provided, the default message
   *     "value_name must be a Buffer!" is used.
   *
   * @example
   * const customSchema = schema().buffer({
   *   message: "[valueName] [value] is not a valid Buffer"
   * });
   *
   * const test = customSchema.test(123, "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name 123 is not a valid Buffer"
   */
  buffer: (config?: SchemaConfig) => SchemaGenericBufferType<SchemaDefaultBufferOptions, SchemaDefaultBufferFlags>;

  /**
   * Returns a schema for validating functions.
   *
   * @example
   * const functionSchema = schema().function();
   *
   * console.log(functionSchema.validate(() => {}));  // true
   * console.log(functionSchema.validate(123));       // false
   *
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] is not a valid function" and the value "not a function" is validated for the field "value_name",
   *     the resulting error message will be "value_name not a valid function". If not provided, the default message
   *     "value_name must be a function!" is used.
   *
   * @example
   * const customSchema = schema().function({
   *   message: "[valueName] [value] is not a valid function"
   * });
   *
   * const test = customSchema.test(123, "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name 123 is not a valid function"
   */
  function: (config?: SchemaConfig) => SchemaGenericFunctionType<SchemaDefaultFunctionOptions, SchemaDefaultFunctionFlags>;

  /**
   * Returns a schema for validating Date values.
   *
   * @example
   * const dateSchema = schema().date();
   *
   * console.log(dateSchema.validate(new Date()));   // true
   * console.log(dateSchema.validate("2025-03-19")); // false
   *
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] is not a valid Date" and the value "2025-03-19" is validated for the field "date_field",
   *     the resulting error message will be "date_field 2025-03-19 is not a valid Date". If not provided, the default message
   *     "date_field must be a Date!" is used.
   *
   * @example
   * const customSchema = schema().date({
   *   message: "[valueName] [value] is not a valid Date"
   * });
   *
   * const test = customSchema.test("2025-03-19", "date_field");
   *
   * console.log(test.errors[0].message);
   * // "date_field 2025-03-19 is not a valid Date"
   */
  date: (config?: SchemaConfig) => SchemaGenericDateType<SchemaDefaultDateOptions, SchemaDefaultDateFlags>;

  /**
   * Returns a schema for validating arrays.
   *
   * This method accepts a schema for the array items, ensuring that each element in the array
   * adheres to the provided schema. You can also supply an optional configuration object to
   * customize the error message.
   *
   * @example
   * const arraySchema = schema().array(
   *   schema().string()
   * );
   *
   * console.log(arraySchema.validate("string"))   // return false
   * console.log(arraySchema.validate(["string"])) // return true
   *
   * @param {Item extends SchemaType<any, any>} schema
   * The schema that each item in the array must satisfy.
   * @param {SchemaArrayConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value] any message!" and an invalid array is validated for the field "value_name",
   *     the resulting error message will be "value_name [value] any message!". If not provided, a default error message is used.
   *
   * @example
   * const test = schema().array(
   *   schema().any(),
   *   { message: "[valueName] [value] is not a valid array!" }
   * ).test(123, "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name 123 is not a valid array!!"
   */
  array<Item extends SchemaType<any, any>>(
    schema: Item,
    config?: SchemaArrayConfig,
  ): SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags>;

  /**
   * Returns a schema for validating objects.
   *
   * This method accepts a schema definition—an object whose keys map to individual schemas—to ensure that each property
   * in the object adheres to its corresponding schema. You can also supply an optional configuration object to customize
   * the error message.
   *
   * @example
   * const objectSchema = schema().object({
   *   keyName: schema().string()
   * });
   *
   * console.log(objectSchema.validate({ keyName: "Hello" })); // true
   * console.log(objectSchema.validate({ keyName: 123 }));       // false
   *
   * @param {Shape extends Record<string, SchemaType<any, any>>} schema
   * An object where each key maps to a schema that the corresponding value must satisfy.
   * @param {SchemaConfig} [config]
   * { message: string }
   *
   *   - message: A custom error message template for validation.
   *     It can include the following placeholders:
   *       - `[valueName]`: Will be replaced with the name of the field being validated.
   *       - `[value]`: Will be replaced with the actual value received.
   *     For example, if the message is "[valueName] [value]!" and an invalid object is validated for the field "value_name",
   *     the resulting error message will be "value_name [value]!". If not provided, a default error message is used.
   *
   * @example
   * // Using a custom error message:
   * const objectSchema = schema().object(
   *   {
   *     valueA: schema().string(),
   *   },
   *   { message: "[valueName] [value] is not a valid object!" }
   * );
   *
   * const test = objectSchema.test("Hello", "value_name");
   *
   * console.log(test.errors[0].message);
   * // "value_name Hello is not a valid object!"
   */
  object: <Shape extends Record<string, SchemaType<any, any>>>(
    schema: Shape,
    config?: SchemaConfig,
  ) => SchemaGenericObjectType<Shape, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;

  /**
   * Returns a schema that validates if the value matches **at least one** of the given schemas.
   *
   * This is useful when a field can accept multiple possible types or validation rules.
   * The value is considered valid if **any one** of the provided schemas pass validation.
   *
   * @param {SchemaType[]} comparisonItems - An array of schemas to validate against. The value must match at least one of them.
   * @param {SchemaConfig} [config] - Optional configuration object.
   *
   * @param {string} [config.message] - A custom error message template for validation failures.
   *   It can include the following placeholders:
   *     - `[valueName]`: Replaced with the name of the field being validated.
   *     - `[value]`: Replaced with the actual value received.
   *   For example, if the message is `"[valueName] [value] is invalid"` and the value `true` is validated for the field `"input"`,
   *   the resulting error message will be `"input true is invalid"`. If not provided, the default message is:
   *   `"[valueName] does not have a match!"`.
   *
   * @returns {SchemaGenericOneOfType} A schema that accepts any value matching at least one of the provided schemas.
   *
   * @example
   * const schemaOneOf = schema().oneOf([
   *   schema().string(),
   *   schema().number()
   * ]);
   *
   * console.log(schemaOneOf.validate("hello")); // true
   * console.log(schemaOneOf.validate(42));      // true
   * console.log(schemaOneOf.validate(true));    // false
   *
   * @example
   * // Using a custom error message:
   * const schemaWithMessage = schema().oneOf([
   *   schema().string(),
   *   schema().number()
   * ], {
   *   message: "[valueName] [value] must be string or number"
   * });
   *
   * const result = schemaWithMessage.test(true, "input");
   * console.log(result.errors[0].message);
   * // "input true must be string or number"
   */
  oneOf: <Items extends Array<SchemaType<any, any>>>(
    comparisonItems: Items,
    config?: SchemaConfig,
  ) => SchemaGenericOneOfType<Items, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;

  /**
   * Returns a schema for validating any type of data.
   *
   * This schema accepts any value regardless of its type.
   *
   * @example
   * const anySchema = schema().any();
   *
   * // Always returns true regardless of the input:
   * console.log(anySchema.validate("Hello"));   // true
   * console.log(anySchema.validate(123));       // true
   * console.log(anySchema.validate(123n));      // true
   * console.log(anySchema.validate(null));      // true
   * console.log(anySchema.validate(undefined));  // true
   * console.log(anySchema.validate(new Date()); // true
   */
  any: () => SchemaGenericAnyType<SchemaDefaultAnyOptions, SchemaDefaultAnyFlags>;
}

export interface SchemaMethodParams extends SchemaReturnCommonMethods {
  string: (config?: SchemaConfig) => SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags>;
  number: (config?: SchemaConfig) => SchemaGenericNumberType<SchemaDefaultNumberOptions, SchemaDefaultNumberFlags>;
  bigInt: (config?: SchemaConfig) => SchemaGenericBigIntType<SchemaDefaultBigIntOptions, SchemaDefaultBigIntFlags>;
  boolean: (config?: SchemaConfig) => SchemaGenericBooleanType<SchemaDefaultBooleanOptions, SchemaDefaultBooleanFlags>;
  buffer: (config?: SchemaConfig) => SchemaGenericBufferType<SchemaDefaultBufferOptions, SchemaDefaultBufferFlags>;
  function: (config?: SchemaConfig) => SchemaGenericFunctionType<SchemaDefaultFunctionOptions, SchemaDefaultFunctionFlags>;
  date: (config?: SchemaDateConfig) => SchemaGenericDateType<SchemaDefaultDateOptions, SchemaDefaultDateFlags>;
  array<Item extends SchemaType<any, any>>(
    schema: Item,
    config?: SchemaArrayConfig,
  ): SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags>;
  object: <Shape extends Record<string, SchemaType<any, any>>>(
    schema: Shape,
    config?: SchemaConfig,
  ) => SchemaGenericObjectType<Shape, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;
  any: () => SchemaGenericAnyType<SchemaDefaultAnyOptions, SchemaDefaultAnyFlags>;
  default: (value: any) => void;
  methodBuild: (build: SchemaMethod) => void;
  defaultValue: any;
  methods: SchemaMethods;
}

export type IfAny<I> = I extends any ? any : I;

export interface SchemaReturnCommonMethods<Input = any, Output = any> {
  /**
   * Validates the value and throws an error if validation fails.
   *
   * @param {any} value - The value to validate.
   * @param {string} valueName - The name of the value.
   * @param {SchemaErrorTypes} [ClassError] - Optional error class.
   *
   * @example
   * try {
   *   await schema().number().throw(null, 'value_name')
   * } catch (error: any) {
   *   console.log(error.message) // value_name must be a number type!
   * }
   */
  throw: (value: Input, valueName: string, ClassError?: SchemaErrorTypes) => void;

  /**
   * Asynchronously validates the value and throws an error if validation fails.
   *
   * @param {any} value - The value to validate.
   * @param {string} valueName - The name of the value.
   * @param {SchemaErrorTypes} [ClassError] - Optional error class.
   * @returns {Promise<void>}
   *
   * @example
   * try {
   *   const value = async (): Promise<null> => {
   *      return await new Promise((resolve) => {
   *        setTimeout(() => {
   *          resolve(null)
   *        }, 100)
   *     })
   *   }
   *
   *   await schema().number().throwAsync(value(), 'value_name')
   * } catch (error: any) {
   *   console.log(error.message) // value_name must be a number type!
   * }
   */
  throwAsync: (value: Promise<Input> | Input, valueName: string, ClassError?: SchemaErrorTypes) => Promise<void>;

  /**
   * Validates the value and returns whether all tests passed.
   *
   * @param {any} value - The value to validate.
   * @returns {boolean} True if validation passed false otherwise.
   *
   * @example
   * const stringSchema = schema().string()
   *
   * console.log(stringSchema.validate("Hello"))  // true
   * console.log(stringSchema.validate(123))  // false
   */
  validate: (value: Input) => boolean;

  /**
   * Asynchronously validates the value.
   *
   * @param {any} value - The value to validate.
   * @returns {Promise<boolean>} Resolves to true if validation passed false otherwise.
   *
   * @example
   * const value = async (): Promise<number> => {
   *   return await new Promise((resolve) => {
   *      setTimeout(() => {
   *        resolve(123)
   *      }, 100)
   *   })
   * }
   *
   * const validateAsync = await schema().number().validateAsync(value())
   *
   * console.log(validateAsync) // true
   * @example
   * const value = async (): Promise<null> => {
   *   return await new Promise((resolve) => {
   *      setTimeout(() => {
   *        resolve(null)
   *      }, 100)
   *   })
   * }
   *
   * const validateAsync = await schema().number().validateAsync(value())
   *
   * console.log(validateAsync) // false
   */
  validateAsync: (value: Promise<Input> | Input) => Promise<boolean>;

  /**
   * Validates the value and returns the test results.
   *
   * @param {any} value - The value to test.
   * @param {string} valueName - The name of the value.
   * @returns {SchemaTests} The test results.
   *
   * @example
   * const test = schema().number().test('123', 'value_name')
   *
   * console.log(test)
   * {
   *   passedAll: false,
   *   passed: 1,
   *   failed: 1,
   *   totalTests: 2,
   *   successes: [
   *     {
   *       method: "required",
   *       name: "value_name",
   *       expect: "value other than undefined",
   *       received: "123"
   *     }
   *   ],
   *   errors: [
   *     {
   *       method: "number",
   *       type: "invalid value",
   *       name: "value_name",
   *       expect: "number type",
   *       received: "123",
   *       message: "value_name must be a number type!"
   *     }
   *   ],
   *   time: "0s 1ms",
   *   value: "123"
   * }
   */
  test: (value: Input, valueName?: string) => SchemaTests<Output>;

  /**
   * Asynchronously validates the value and returns the test results.
   *
   * @param {any} value - The value to test.
   * @param {string} valueName - The name of the value.
   * @returns {Promise<SchemaTests>} The test results.
   *
   * @example
   * const value = async (): Promise<string> => {
   *   return await new Promise((resolve) => {
   *      setTimeout(() => {
   *        resolve("123")
   *      }, 100)
   *   })
   * }
   *
   * const testAsync = schema().number().testAsync(value(), 'value_name')
   *
   * console.log(testAsync)
   * {
   *   passedAll: false,
   *   passed: 1,
   *   failed: 1,
   *   totalTests: 2,
   *   successes: [
   *     {
   *       method: "required",
   *       name: "value_name",
   *       expect: "value other than undefined",
   *       received: "123"
   *     }
   *   ],
   *   errors: [
   *     {
   *       method: "number",
   *       type: "invalid value",
   *       name: "value_name",
   *       expect: "number type",
   *       received: "123",
   *       message: "value_name must be a number type!"
   *     }
   *   ],
   *   time: "0s 1ms",
   *   value: "123"
   * }
   */
  testAsync: (value: Promise<Input> | Input, valueName?: string) => Promise<SchemaTests<Output>>;

  /**
   * Synchronously validates and parses the input value.
   *
   * This method validates the provided value using the defined schema and, if the validation passes,
   * returns the parsed value. The parsed value may be the original value or a transformed version,
   * if transformation methods (e.g., `parseTo()`) have been chained.
   *
   * If the validation fails, it throws an error with the corresponding error message.
   * This behavior is similar to the `throw` method.
   *
   * @param {Input} value - The value to validate and parse.
   * @param {string} [valueName] - The name of the value being validated, used in error messages.
   * @returns {Output} The validated (and possibly transformed) value.
   *
   * @example
   * // Synchronous parsing example with transformation:
   * const value = "123";
   * const stringToNumberSchema = schema().string().parseTo().number();
   * console.log(stringToNumberSchema.parse(value)); // 123
   */
  parse: (value: Input, valueName?: string) => Output;

  /**
   * Asynchronously validates and parses the input value.
   *
   * This method works similarly to the synchronous `parse` method but supports asynchronous validation.
   * It returns a Promise that resolves to the validated (and possibly transformed) value if validation succeeds,
   * or rejects with an error if validation fails.
   *
   * @param {Promise<Input> | Input} value - The value (or a promise that resolves to the value) to validate and parse.
   * @param {string} [valueName] - The name of the value being validated, used in error messages.
   * @returns {Promise<Output>} A Promise that resolves to the validated (and possibly transformed) value.
   *
   * @example
   * // Asynchronous parsing example:
   * const value = async (): Promise<string> => {
   *   return await new Promise((resolve) => {
   *     setTimeout(() => {
   *       resolve("123");
   *     }, 100);
   *   });
   * };
   *
   * const stringToNumberSchema = schema().string().parseTo().number();
   * console.log(await stringToNumberSchema.parseAsync(value())); // 123
   */
  parseAsync: (value: Promise<Input> | Input, valueName?: string) => Promise<Output>;
}

export type SchemaErrorClass<T extends Error> = new (message?: string) => T;

export type SchemaErrorTypes = any;

export type SchemaMethodTypes =
  | "any"
  | "equal"
  | "notEqual"
  | "oneOf"
  | "object"
  | "array"
  | "string"
  | "email"
  | "buffer"
  | "function"
  | "UUID"
  | "minWord"
  | "maxLength"
  | "minLength"
  | "regex"
  | "required"
  | "notRequired"
  | "number"
  | "bigInt"
  | "float"
  | "integer"
  | "boolean"
  | "date"
  | "min"
  | "max"
  | "positive"
  | "negative"
  | "time"
  | "alias"
  | "nullable"
  | "parseTo"
  | "custom"
  | "default";

export type SchemaOmitMethod<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface SchemaMethod {
  method: SchemaMethodTypes;
  minWord?: number;
  max?: number | bigint;
  min?: number | bigint;
  dateToCompare?: Date;
  customMethod?: (context: SchemaCustomContext) => void;
  setValue?: (value: any) => void;
  config?:
    | SchemaConfig
    | SchemaNumberMinConfig
    | SchemaBigIntMinConfig
    | SchemaNumberMaxConfig
    | SchemaBigIntMaxConfig
    | SchemaStringUUIDConfig
    | SchemaStringTimeConfig
    | SchemaStringRegexConfig
    | SchemaStringMinLengthConfig
    | SchemaStringMaxLengthConfig
    | SchemaStringMinWordConfig
    | (SchemaArrayConfig & { schema: SchemaReturnCommonMethods<any, any> });
  arrayRules?: any;
  valueToCompare?: any;
  alias?: string;
  schema?: SchemaObjectType;
  uuidVersion?: UUIDVersion;
  comparisonItems?: any[];
}

export type SchemaMethods = SchemaMethod[];

export type SchemaObjectType = Record<string, any>;

export interface SchemaTests<Output = any> {
  /**
   * Indicates whether every validation test passed.
   * True if all tests passed; false if one or more tests failed.
   */
  passedAll: boolean;

  /** The total number of tests that passed. */
  passed: number;

  /** The total number of tests that failed. */
  failed: number;

  /** The overall count of tests executed. */
  totalTests: number;

  /** An array containing detailed information about each successful test. */
  successes: SchemaSuccessTest[];

  /** An array containing detailed information about each failed test. */
  errors: SchemaErrorTest[];

  /**
   * The final value after all validations and any applied conversions.
   * This value may have been transformed by chained conversion methods.
   */
  value: Output;

  /** A string representing the time taken to perform the validation (e.g., "0s 15ms"). */
  time: string;
}

export interface SchemaErrorTest {
  /** (Optional) The class name where the error originated. */
  class?: string;

  /** (Optional) The name of the validation method that failed. */
  method?: string;

  /**
   * The type of error encountered during validation.
   * Possible values are: 'invalid param', 'invalid value', 'missing value', or 'missing key'.
   */
  type: "invalid param" | "invalid value" | "missing value" | "missing key";

  /** The name of the field that failed validation. */
  name: string;

  /** A description of the expected condition or value. */
  expect: string;

  /** The value that was actually received and did not meet expectations. */
  received: any;

  /** (Optional) The index of the element in an array (if applicable). */
  index?: number;

  /** A detailed error message explaining why the validation failed. */
  message: string;

  /** New value for next tests. */
  newValue?: any;
}

export interface SchemaSuccessTest {
  /** (Optional) The class name where this success originated. */
  class?: string;

  /** (Optional) The name of the validation method that passed. */
  method?: string;

  /** The name of the field that was validated. */
  name: string;

  /** A description of the expected condition or value. */
  expect: string;

  /** (Optional) The index of the element in an array (if applicable). */
  index?: number;

  /** The value that was received and passed validation. */
  received: any;

  /** New value for next tests. */
  newValue?: any;
}

export interface SchemaExecuteValidateMethods {
  /** The value to validate. */
  value: any;

  /** The name of the value. */
  valueName: string;

  /** List of methods applied. */
  methods: SchemaMethods;

  /** Function to reset tests. */
  resetTests: () => void;

  /** Callback to update tests. */
  callbackUpdateTest: (test: SchemaTests) => void;

  /** Callback when a test passes. */
  callbackAddPassed: (success: SchemaSuccessTest) => void;

  /** Callback when a test fails. */
  callbackAddFailed: (error: SchemaErrorTest) => void;
}

export interface SchemaParamsMethod {
  /** Callback to build a method configuration. */
  callbackMethodBuild: (build: SchemaMethod) => void;
  /** Callback to get the default return methods. */
  callbackDefaultReturnMethods: () => SchemaReturnCommonMethods;
}

export interface SchemaValidateMethod {
  /** The value to validate. */
  value: any;

  /** The name of the value. */
  valueName: string;

  /** The index of the value (if in an array). */
  indexArray: number;

  /** Callback when a test passes. */
  callbackAddPassed: (success: SchemaSuccessTest) => void;

  /** Callback when a test fails. */
  callbackAddFailed: (error: SchemaErrorTest) => void;
}

export type SchemaArrayTypes =
  | "string"
  | "number"
  | "bigInt"
  | "boolean"
  | "any"
  | "date"
  | "strict"
  | "object"
  | Record<string, any>;

export abstract class SchemaType<Output, Input = Output> {
  protected _output!: Output;
  protected _input!: Input;
}

export type OmitMethods<T, K extends keyof any> = Omit<T, K>;

/* eslint-disable */
/**
 * Infers the expected input type from a given schema.
 *
 * @example
 * const stringSchema = schema().string();
 *
 * type StringInput = InferIn<typeof stringSchema>; // string
 */
// @ts-ignore
export type InferIn<T extends SchemaType<any, any>> = T["_input"];
/**
 * Infers the output type from a given schema.
 *
 * @example
 * const transformedSchema = schema().string().parseTo().number();
 *
 * type NumberOutput = InferOut<typeof transformedSchema>; // number
 */
// @ts-ignore
export type InferOut<T extends SchemaType<any, any>> = T["_output"];
/* eslint-enable */
export type CheckType<TypeA, TypeB> =
  (<T>() => T extends TypeA ? 1 : 2) extends <T>() => T extends TypeB ? 1 : 2 ? true : false;

export type SchemaMerge<T, U> = Omit<T, keyof U> & U;

export type SchemaWithOptionalAndNullable<
  T,
  Options extends {
    nullable: boolean;
    required: boolean;
  },
> = Options["required"] extends false
  ? Options["nullable"] extends true
    ? T | null | undefined
    : T | undefined
  : Options["nullable"] extends true
    ? T | null
    : T;

// String Method Types

export type SchemaDefaultStringOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
  equal: boolean;
};

export interface SchemaStringFlags {
  minLengthApplied: boolean;
  maxLengthApplied: boolean;
  minWordApplied: boolean;
  emailApplied: boolean;
  UUIDApplied: boolean;
  timeApplied: boolean;
  regexApplied: boolean;
  dateApplied: boolean;
  aliasApplied: boolean;
  equalApplied: boolean;
  notEqualApplied: boolean;
  oneOfApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultStringFlags = {
  minLengthApplied: false;
  maxLengthApplied: false;
  minWordApplied: false;
  emailApplied: false;
  UUIDApplied: false;
  timeApplied: false;
  regexApplied: false;
  dateApplied: false;
  aliasApplied: false;
  equalApplied: false;
  oneOfApplied: false;
  notEqualApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

type ForceStringIfNotDifferent<O> = [O] extends [string] ? string : O;

type SchemaStringParseToNumber<
  I2 = string,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = SchemaGenericNumberType<
  SchemaDefaultNumberOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaStringParseToBigInt<
  I2 = string,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = SchemaGenericBigIntType<
  SchemaDefaultBigIntOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    equalApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaStringParseToBuffer<
  I2 = string,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = SchemaGenericBufferType<
  SchemaDefaultBufferOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    oneOfApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaStringParseToBoolean<
  I2 = string,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = SchemaGenericBooleanType<
  SchemaDefaultBooleanOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaStringParseToDate<
  I2 = string,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = SchemaGenericDateType<
  SchemaDefaultDateOptions,
  {
    minApplied: false;
    maxApplied: false;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>,
  Date
>;

type SchemaStringParseToArray<
  Item extends SchemaType<any, any>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = SchemaGenericArrayType<
  Item,
  SchemaDefaultArrayOptions,
  {
    minApplied: false;
    maxApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<string, Opts>
>;

type SchemaStringParseToObject<
  Shape extends Record<string, SchemaType<any, any>>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = SchemaGenericObjectType<
  Shape,
  SchemaDefaultObjectOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<string, Opts>
>;

type SchemaStringParseToMethod<
  I2 = string,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaStringFlags = any,
> = {
  /**
   * Converts a string value to a number.
   *
   * This method is used in a conversion chain to transform a string input into a number,
   * allowing you to perform numeric validations on the converted value. When used, the original string
   * is parsed into a number before further tests are executed.
   *
   * @example
   * const numberSchema = schema().string().parseTo().number();
   *
   * console.log(numberSchema.parse("123")); // 123
   */
  number: (config?: SchemaConfig) => SchemaStringParseToNumber<I2, Opts, Flags>;

  /**
   * Converts a string value to a BigInt.
   *
   * This method is used in a conversion chain to transform a string input into a BigInt,
   * allowing you to perform BigInt validations on the converted value. When used, the original string
   * is parsed into a BigInt before further tests are executed.
   *
   * @example
   * const bigIntSchema = schema().string().parseTo().bigInt();
   *
   * console.log(bigIntSchema.parse("123")); // 123n
   */
  bigInt: (config?: SchemaConfig) => SchemaStringParseToBigInt<I2, Opts, Flags>;

  /**
   * Converts a string value to a Buffer.
   *
   * This method is used in a conversion chain to transform a string input into a Buffer,
   * allowing you to perform validations on the converted Buffer value. When used, the original string
   * is parsed into a Buffer before further tests are executed.
   *
   * @example
   * const bufferSchema = schema().string().parseTo().buffer();
   *
   * // Assuming the string "Hello" is converted to a Buffer
   * console.log(bufferSchema.parse("Hello")); // true
   */
  buffer: (config?: SchemaConfig) => SchemaStringParseToBuffer<I2, Opts, Flags>;

  /**
   * Converts a string value to a boolean.
   *
   * This method is used in a conversion chain to transform a string input into a boolean,
   * allowing you to perform boolean validations on the converted value. When used, the original string
   * is parsed into a boolean before further tests are executed.
   *
   * @example
   * const booleanSchema = schema().string().parseTo().boolean();
   *
   * console.log(booleanSchema.parse("string")); // true
   * console.log(booleanSchema.parse("true")); // true
   * console.log(booleanSchema.parse("false")); // false
   * console.log(booleanSchema.parse("123")); // true
   * console.log(booleanSchema.parse(" ")); // true
   * console.log(booleanSchema.parse("")); // false
   */
  boolean: (config?: SchemaConfig) => SchemaStringParseToBoolean<I2, Opts, Flags>;

  /**
   * Converts a string value to a date.
   *
   * This method is used in a conversion chain to transform a string input into a date,
   * allowing you to perform date validations on the converted value. When used, the original string
   * is parsed into a date before further tests are executed.
   *
   * @example
   * const dateSchema = schema().string().parseTo().date();
   *
   * console.log(dateSchema.parse("2000-02-03T02:00:00.000Z"));
   * // 2000-02-03T02:00:00.000Z
   */
  date: (config?: SchemaDateConfig) => SchemaStringParseToDate<I2, Opts, Flags>;

  /**
   * Converts a string value to a array.
   *
   * This method is used in a conversion chain to transform a string input into a array,
   * allowing you to perform array validations on the converted value. When used, the original string
   * is parsed into a array before further tests are executed.
   *
   * @example
   * const arraySchema = schema().string().parseTo().array(
   *   schema().number()
   * );
   *
   * console.log(arraySchema.parse("[1, 2, 3]"));
   * // [ 1, 2, 3 ]
   */
  array<Item extends SchemaType<any, any>>(
    schema: Item,
    config?: SchemaArrayConfig,
  ): SchemaStringParseToArray<Item, Opts, Flags>;

  /**
   * Converts a string value to a object.
   *
   * This method is used in a conversion chain to transform a string input into a object,
   * allowing you to perform object validations on the converted value. When used, the original string
   * is parsed into a object before further tests are executed.
   *
   * @example
   * const objectSchema = schema().string().parseTo().object({
   *   key: schema().number(),
   * });
   *
   * console.log(objectSchema.parse('{"key":123}'));
   * // { key: 123 }
   */
  object: <Shape extends Record<string, SchemaType<any, any>>>(
    schema: Shape,
    config?: SchemaConfig,
  ) => SchemaStringParseToObject<Shape, Opts, Flags>;
};

type SchemaStringCustom<
  I = string,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  O = SchemaWithOptionalAndNullable<I, Opts>,
> = SchemaGenericCustomType<
  SchemaWithOptionalAndNullable<I, Opts>,
  SchemaWithOptionalAndNullable<ForceStringIfNotDifferent<O>, Opts>,
  Opts,
  O
>;

export type SchemaAllowedStringMethods<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaStringFlags,
  I = string,
> = {
  /**
   * Adds a custom validation method to the schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's type.
   *   - If a generic type parameter is provided, it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   *        It should call `context.success(newValue)` if validation passes, or
   *        `context.failed(errorMessage)` if it fails.
   *        If no type parameter is specified, the schema’s original type is preserved.
   *        If a type parameter is specified (e.g., `<number>`), it requires that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's type):
   * const schemaCustom = schema().string().custom((context) => {
   *   if (context.value === "valid") {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse("valid");
   * console.log(result); // "valid"
   *
   * @example
   * // The custom method enforces that context.success returns a number.
   * const schemaCustom = schema()
   *   .string()
   *   .custom<number>((context) => {
   *     if (context.value === "success") {
   *       context.success(123);
   *     } else {
   *       context.failed("Custom validation failed");
   *     }
   *   });
   *
   * const result = schemaCustom.parse("success");
   * console.log(result); // 123
   */
  custom: <O = SchemaWithOptionalAndNullable<I, Opts>>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<I, Opts>, O>,
  ) => SchemaStringCustom<I, Opts, O>;

  /**
   * Returns an object with conversion methods that allow you to transform the value
   * before performing further validations.
   *
   * This method supports two main contexts:
   *
   * 1. **Chaining Conversions:** The conversion methods (such as `number()`, `date()`, etc.)
   *    transform the original value so that subsequent validations work with the newly converted value.
   *    For example, converting a string `"123"` into the number `123` allows you to chain numeric validations.
   *
   * 2. **Accessing the Parsed Value:** After running the validation (via `.test()` or `.testAsync()`),
   *    the final converted value is stored in the test result’s `.value` property. This lets you retrieve
   *    the processed value as it was transformed through the conversion chain.
   *
   * @returns {SchemaParseToMethod} An object containing conversion methods for:
   * - number
   * - bigInt
   * - boolean
   * - buffer
   * - date
   * - array
   * - object
   *
   * @example
   * // Example 1: Chaining conversion – convert a string to a number for further tests.
   * const schemaStringToNumber = schema().string().parseTo().number();
   *
   * const result = schemaStringToNumber.parse("123");
   *
   * // In the chain above, "123" is converted to the number 123 before testing.
   * console.log(result); // 123
   */
  parseTo: <I2 = I>() => SchemaStringParseToMethod<I2, Opts, Flags>;
} & (Flags["minLengthApplied"] extends false
  ? {
      /**
       * Adds a minimum length validation rule to a string schema.
       *
       * This method extends a string schema by enforcing that the string must have at least a specified number
       * of characters. The configuration object must include a `min` property, which sets this minimum length.
       *
       * @param {Object} config - The configuration for the minimum length validation.
       * @param {number} config.min - The minimum number of characters required.
       *
       * @example
       * const minLengthSchema = schema().string().minLength({ min: 5 });
       *
       * console.log(minLengthSchema.validate("Hello")); // true (length is 5)
       * console.log(minLengthSchema.validate("Hi"));    // false (length is 2)
       *
       * @param {string} [config.message] - An optional custom error message template.
       * This message is used when the validation fails and may contain the following placeholders:
       *   - `[valueName]`: Replaced with the name of the field being validated.
       *   - `[value]`: Replaced with the actual value received.
       *   - `[min]`: Replaced with the specified minimum value.
       *
       * @example
       * const customMinLengthSchema = schema().string().minLength({
       *   min: 5,
       *   message: "[valueName] must be at least [min] characters long, but got [value]"
       * });
       *
       * const test = customMinLengthSchema.test("Hi", "username");
       *
       * console.log(test.errors[0].message);
       * // "username must be at least 5 characters long, but got Hi"
       */
      minLength: (
        config: SchemaStringMinLengthConfig,
      ) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { minLengthApplied: true }>, I>;
    }
  : {}) &
  (Flags["maxLengthApplied"] extends false
    ? {
        /**
         * Adds a maximum length validation rule to a string schema.
         *
         * This method extends a string schema by enforcing that the string must have at most a specified number
         * of characters. The configuration object must include a `max` property, which sets this maximum length.
         *
         * @param {Object} config - The configuration for the maximum length validation.
         * @param {number} config.max - The maximum number of characters allowed.
         *
         * @example
         * const maxLengthSchema = schema().string().maxLength({ max: 10 });
         *
         * console.log(maxLengthSchema.validate("Hello")); // true (length is 5, which is <= 10)
         * console.log(maxLengthSchema.validate("Hello, world!")); // false (length is > 10)
         *
         * @param {string} [config.message] - An optional custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[max]`: Replaced with the specified maximum value.
         *
         * @example
         * const customMaxLengthSchema = schema().string().maxLength({
         *   max: 10,
         *   message: "[valueName] must be at most [max] characters long, but got [value]"
         * });
         *
         * const test = customMaxLengthSchema.test("Hello, world!", "username");
         *
         * console.log(test.errors[0].message);
         * // "username must be at most 10 characters long, but got Hello, world!"
         */
        maxLength: (
          config: SchemaStringMaxLengthConfig,
        ) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { maxLengthApplied: true }>, I>;
      }
    : {}) &
  (Flags["minWordApplied"] extends false
    ? {
        /**
         * Adds a minimum word count validation rule to a string schema.
         *
         * This method extends a string schema by enforcing that the string must contain at least a specified number of words.
         * The configuration object must include a `min` property, which defines the minimum number of words required.
         *
         * @param {Object} config - The configuration for the minimum word count validation.
         * @param {number} config.min - The minimum number of words required.
         *
         * @example
         * const minWordSchema = schema().string().minWord({ min: 2 });
         *
         * console.log(minWordSchema.validate("Hello world")); // true
         * console.log(minWordSchema.validate("Hello "));      // false
         * console.log(minWordSchema.validate("Hello"));       // false
         *
         * @param {string} [config.message] - An optional custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[min]`: Replaced with the specified minimum word count.
         *
         * @example
         * const customMinWordSchema = schema().string().minWord({
         *   min: 2,
         *   message: "[valueName] must contain at least [min] words, but got [value]"
         * });
         *
         * const test = customMinWordSchema.test("Hello", "username");
         *
         * console.log(test.errors[0].message);
         * // "username must contain at least 2 words, but got Hello"
         */
        minWord: (
          config: SchemaStringMinLengthConfig,
        ) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { minWordApplied: true }>, I>;
      }
    : {}) &
  (Flags["emailApplied"] extends false
    ? {
        /**
         * Adds an email validation rule to a string schema.
         *
         * This method extends a string schema to enforce that the value is a valid email address.
         * You can optionally provide a custom error message template via the configuration object.
         *
         * @example
         * const emailSchema = schema().string().email();
         *
         * console.log(emailSchema.validate("test@example.com")); // true
         * console.log(emailSchema.validate("invalid-email"));    // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for email validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * const customEmailSchema = schema().string().email({
         *   message: "[valueName] must be a valid email address, but got [value]"
         * });
         *
         * const test = customEmailSchema.test("invalid-email", "value_name");
         *
         * console.log(test.errors[0].message);
         * // "value_name must be a valid email address, but got invalid-email"
         */
        email: (config?: SchemaConfig) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { emailApplied: true }>, I>;
      }
    : {}) &
  (Flags["UUIDApplied"] extends false
    ? {
        /**
         * Adds a UUID validation rule to a string schema.
         *
         * This method extends a string schema to enforce that the value is a valid UUID (Universally Unique Identifier).
         * You can optionally provide a custom error message template via the configuration object.
         *
         * @example
         * const uuidSchema = schema().string().UUID();
         *
         * console.log(
         *   uuidSchema.validate("550e8400-e29b-41d4-a716-446655440000")
         * ); // true
         * console.log(
         *   uuidSchema.validate("invalid-uuid")
         * ); // false
         *
         * @param {SchemaStringUUIDConfig} [config] - Optional configuration for UUID validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * const customUUIDSchema = schema().string().UUID({
         *   message: "[valueName] must be a valid UUID, but got [value]"
         * });
         *
         * const test = customUUIDSchema.test("invalid-uuid", "value_name");
         *
         * console.log(test.errors[0].message);
         * // "value_name must be a valid UUID, but got invalid-uuid"
         *
         * @returns
         * A chainable string schema with the UUID validation rule applied.
         */
        UUID: (config?: SchemaStringUUIDConfig) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { UUIDApplied: true }>, I>;
      }
    : {}) &
  (Flags["timeApplied"] extends false
    ? {
        /**
         * Adds a time format validation rule to a string schema.
         *
         * This method extends a string schema by enforcing that the value is a valid time string in a specified format.
         * The configuration object must include a `type` property, which determines the expected time format:
         *   - `"HH:MM"`: Hours and minutes.
         *   - `"HH:MM:SS"`: Hours, minutes, and seconds.
         *   - `"HH:MM:SS.MS"`: Hours, minutes, seconds, and milliseconds.
         *
         *
         * @param {SchemaStringTimeConfig} config - Configuration for time validation.
         * @param {"HH:MM" | "HH:MM:SS" | "HH:MM:SS.MS"} config.type - The time format to validate against.
         *
         * @example
         * // Validate time in "HH:MM" format:
         * const timeSchema = schema().string().time({ type: "HH:MM" });
         *
         * console.log(timeSchema.validate("09:30")); // true
         * console.log(timeSchema.validate("24:00")); // false
         *
         * @example
         * // Validate time in "HH:MM:SS" format:
         * const timeMsSchema = schema().string().time({ type: "HH:MM:SS" });
         *
         * console.log(timeMsSchema.validate("12:61:30")); // false
         * console.log(timeMsSchema.validate("12:45:30")); // true
         *
         * @example
         * // Validate time in "HH:MM:SS.MS" format:
         * const timeMsSchema = schema().string().time({ type: "HH:MM:SS.MS" });
         *
         * console.log(timeMsSchema.validate("12:61:30.123")); // false
         * console.log(timeMsSchema.validate("12:45:30.123")); // true
         *
         * @param {string} [config.message] - An optional custom error message template for validation failures.
         * Optionally, you can provide a custom error message using the `message` property.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[type]`: Replaced with the specified time format.
         *
         * @example
         * // Validate time in "HH:MM:SS" format with a custom error message:
         * const customTimeSchema = schema().string().time({
         *   type: "HH:MM:SS",
         *   message: "[valueName] must be a valid time in [type] format, but got [value]"
         * });
         *
         * const test = customTimeSchema.test("24:00:60", "startTime");
         *
         * console.log(test.errors[0].message);
         * // "startTime must be a valid time in HH:MM:SS format, but got 24:00:60"
         */
        time: (config: SchemaStringTimeConfig) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { timeApplied: true }>, I>;
      }
    : {}) &
  (Flags["dateApplied"] extends false
    ? {
        /**
         * Adds a date validation rule to a string schema.
         *
         * This method extends a string schema to enforce that the value is a valid date according to a specified format.
         * The configuration object must include a `type` property, which determines the expected date format.
         *
         * @example
         * // Validate using the "YYYY-MM-DD" format:
         * const dateSchema = schema().string().date({ type: "YYYY-MM-DD" });
         *
         * console.log(dateSchema.validate("2025-03-19")); // true
         * console.log(dateSchema.validate("19/03/2025")); // false
         *
         * @param {SchemaDateConfig} config - Optional configuration for date validation.
         * @param {SchemaDateTypes} config.type - The expected date format. One of:
         * "ISO8601", "DD/MM/YYYY", "MM/DD/YYYY", "DD-MM-YYYY", "MM-DD-YYYY", "YYYY/MM/DD", "YYYY/DD/MM", "YYYY-MM-DD" or "YYYY-DD-MM".
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[type]`: Replaced with the specified date format.
         *
         * @example
         * // Using a custom error message:
         * const customDateSchema = schema().string().date({
         *   type: "YYYY-MM-DD",
         *   message: "[valueName] must be a valid date in [type] format, but got [value]"
         * });
         *
         * const test = customDateSchema.test("19/03/2025", "date_field");
         *
         * console.log(test.errors[0].message);
         * // "date_field must be a valid date in YYYY-MM-DD format, but got 19/03/2025"
         */
        date: (config?: SchemaDateConfig) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { dateApplied: true }>, I>;
      }
    : {}) &
  (Flags["regexApplied"] extends false
    ? {
        /**
         * Adds a regex validation rule to a string schema.
         *
         * This method extends a string schema by enforcing that the string value matches a specified regular expression.
         * The configuration object must include a `regExp` property, which defines the regular expression that the value must satisfy.
         *
         * @param {Object} config - The configuration for the regex validation.
         * @param {RegExp} config.regExp - The regular expression that the string must match.
         *
         * @example
         * // Validate if string contains only numeric digits:
         * const regexSchema = schema().string().regex({ regExp: /^\d+$/ });
         *
         * console.log(regexSchema.validate("12345")); // true
         * console.log(regexSchema.validate("abc123")); // false
         *
         * @param {string} [config.message] - An optional custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[regExp]`: Replaced with the string representation of the specified regular expression.
         *
         * @example
         * // Using a custom error message:
         * const customRegexSchema = schema().string().regex({
         *   regExp: /^\d+$/,
         *   message: "[valueName] must match the pattern [regExp], but got [value]"
         * });
         *
         * const test = customRegexSchema.test("abc", "user_id");
         * console.log(test.errors[0].message);
         * // "user_id must match the pattern /^\\d+$/, but got abc"
         */
        regex: (
          config: SchemaStringRegexConfig,
        ) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { regexApplied: true }>, I>;
      }
    : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   objKey: schema().string()
         * })
         *
         * const testWithoutAlias = schemaWithoutAlias.test({ objKey: 123 })
         *
         * console.log(testWithoutAlias.errors[0].message)
         * // "objKey must be a string type!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   objKey: schema().string().alias('object key')
         * })
         *
         * const testWithAlias = schemaWithAlias.test({ objKey: 123 })
         *
         * console.log(testWithAlias.errors[0].message)
         * // "object key must be a string type!"
         */
        alias: (valueName: string) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { aliasApplied: true }>, I>;
      }
    : {}) &
  (Flags["equalApplied"] extends false
    ? {
        /**
         * Adds an equality validation rule to a string schema.
         *
         * This method extends a string schema by enforcing that the input value exactly matches a specified target value.
         * If the input does not match the target, the validation will fail.
         *
         * @param {T} valueToCompare - The target value that the input string must equal.
         *
         * @example
         * const valueToCompare = "string";
         * const equalSchema = schema().string().equal(valueToCompare);
         *
         * console.log(equalSchema.validate("string"));    // true
         * console.log(equalSchema.validate("different")); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the equality validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const customEqualSchema = schema().string().equal("string", {
         *   message: "[valueName] must exactly match [valueToCompare], but got [value]"
         * });
         *
         * const test = customEqualSchema.test("different", "username");
         *
         * console.log(test.errors[0].message);
         * // "username must exactly match string, but got different"
         */
        equal: <T extends string>(
          valueToCompare: T,
          config?: SchemaConfig,
        ) => SchemaGenericStringType<
          SchemaMerge<Opts, { equal: true }>,
          SchemaMerge<Flags, { equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["notEqualApplied"] extends false
    ? {
        /**
         * Adds a not-equal validation rule to a string schema.
         *
         * This method extends a string schema by enforcing that the input value does not exactly match a specified target value.
         * If the input value matches the target, the validation will fail.
         *
         * @param {string} valueToCompare - The target value that the input string must not equal.
         *
         * @example
         * const notEqualSchema = schema().string().notEqual("forbidden");
         *
         * console.log(notEqualSchema.validate("allowed"));   // true
         * console.log(notEqualSchema.validate("forbidden")); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the not-equal validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const notEqualSchema = schema().string().notEqual("forbidden", {
         *   message: "[valueName] must not be [valueToCompare], but got [value]"
         * });
         *
         * const test = notEqualSchema.test("forbidden", "username");
         *
         * console.log(test.errors[0].message);
         * // "username must not be forbidden, but got forbidden"
         */
        notEqual: (
          valueToCompare: string,
          config?: SchemaConfig,
        ) => SchemaGenericStringType<Opts, SchemaMerge<Flags, { equalApplied: true }>, I>;
      }
    : {}) &
  (Flags["oneOfApplied"] extends false
    ? {
        /**
         * Adds a one-of validation rule to a string schema.
         *
         * This method extends a string schema by enforcing that the input value must exactly match one of the values
         * provided in the `comparisonItems` array. If the input does not match any of the specified values, the validation will fail.
         *
         * @param {T[]} comparisonItems - An array of allowed string values. The input value must match one of these values.
         *
         * @example
         * const oneOfSchema = schema().string().oneOf(["hello", "world"]);
         *
         * console.log(oneOfSchema.validate("hi"));    // false
         * console.log(oneOfSchema.validate("hello")); // true
         * console.log(oneOfSchema.validate("world")); // true
         *
         * @param {SchemaConfig} [config] - Optional configuration for the one-of validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * // Using a custom error message:
         * const customOneOfSchema = schema().string().oneOf(["hello", "world"], {
         *   message: "[valueName] must be either 'hello' or 'world', but got [value]"
         * });
         *
         * const test = customOneOfSchema.test("hi", "greeting");
         *
         * console.log(test.errors[0].message);
         * // "greeting must be either 'hello' or 'world', but got hi"
         */
        oneOf: <T extends string>(
          comparisonItems: T[],
          config?: SchemaConfig,
        ) => SchemaGenericStringType<
          Opts,
          SchemaMerge<Flags, { oneOfApplied: true; equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a string schema.
         *
         * This method extends a string schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default value.
         *
         * @param {string} value - The default value to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default value "default value" is used:
         * const defaultSchema = schema().string().default("default value");
         * console.log(defaultSchema.parse(undefined)); // "default value"
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse("hello")); // "hello"
         */
        default: (
          value: string,
        ) => SchemaGenericStringType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the string schema as not required.
         *
         * This method modifies a string schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the string type.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().string().notRequired();
         *
         * console.log(optionalSchema.validate("text"));   // true
         * console.log(optionalSchema.validate(undefined)); // true
         * console.log(optionalSchema.validate(null));     // false
         */
        notRequired: () => SchemaGenericStringType<
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the string schema as nullable.
         *
         * This method modifies a string schema to allow the input value to be either a string or null.
         * When applied, the schema will consider null values as valid alongside string values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().string().nullable();
         *
         * console.log(nullableSchema.validate("text"));   // true
         * console.log(nullableSchema.validate(null));     // true
         * console.log(nullableSchema.validate(undefined)); // false
         */
        nullable: () => SchemaGenericStringType<
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericStringType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaStringFlags,
  I = string,
> = SchemaType<
  Flags["oneOfApplied"] extends true
    ? SchemaWithOptionalAndNullable<I, Opts>
    : Opts["equal"] extends true
      ? SchemaWithOptionalAndNullable<I, Opts>
      : Opts["default"] extends true
        ? string
        : SchemaWithOptionalAndNullable<string, Opts>,
  SchemaWithOptionalAndNullable<I, Opts>
> &
  SchemaAllowedStringMethods<Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Flags["oneOfApplied"] extends true
          ? SchemaWithOptionalAndNullable<I, Opts>
          : Opts["equal"] extends true
            ? SchemaWithOptionalAndNullable<I, Opts>
            : Opts["default"] extends true
              ? string
              : SchemaWithOptionalAndNullable<string, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

export type UUIDVersion = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7";

export interface SchemaStringUUIDConfig extends SchemaConfig {
  version?: UUIDVersion;
}

export interface SchemaStringTimeConfig extends SchemaConfig {
  type: "HH:MM" | "HH:MM:SS" | "HH:MM:SS.MS";
}

export interface SchemaStringRegexConfig extends SchemaConfig {
  regExp: RegExp;
}

export interface SchemaStringMinLengthConfig extends SchemaConfig {
  min: number;
}

export interface SchemaStringMaxLengthConfig extends SchemaConfig {
  max: number;
}

export interface SchemaStringMinWordConfig extends SchemaConfig {
  min: number;
}

// Number Method Types

export type SchemaDefaultNumberOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
  equal: boolean;
};

export interface SchemaNumberFlags {
  floatApplied: boolean;
  integerApplied: boolean;
  minApplied: boolean;
  maxApplied: boolean;
  positiveApplied: boolean;
  negativeApplied: boolean;
  aliasApplied: boolean;
  defaultApplied: boolean;
  oneOfApplied: boolean;
  notEqualApplied: boolean;
  equalApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultNumberFlags = {
  floatApplied: false;
  integerApplied: false;
  minApplied: false;
  maxApplied: false;
  positiveApplied: false;
  negativeApplied: false;
  aliasApplied: false;
  defaultApplied: false;
  notEqualApplied: false;
  oneOfApplied: false;
  equalApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

type ForceNumberIfNotDifferent<O> = [O] extends [number] ? number : O;

type SchemaNumberCustom<
  I = number,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  O = SchemaWithOptionalAndNullable<I, Opts>,
> = SchemaGenericCustomType<
  SchemaWithOptionalAndNullable<number, Opts>,
  SchemaWithOptionalAndNullable<ForceNumberIfNotDifferent<O>, Opts>,
  Opts,
  O
>;

type SchemaNumberParseToString<
  I2 = number,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaNumberFlags = any,
> = SchemaGenericStringType<
  SchemaDefaultStringOptions,
  {
    minLengthApplied: false;
    maxLengthApplied: false;
    minWordApplied: false;
    emailApplied: false;
    UUIDApplied: false;
    timeApplied: false;
    regexApplied: false;
    dateApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaNumberParseToBigInt<
  I2 = number,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaNumberFlags = any,
> = SchemaGenericBigIntType<
  SchemaDefaultBigIntOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    equalApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaNumberParseToBoolean<
  I2 = number,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaNumberFlags = any,
> = SchemaGenericBooleanType<
  SchemaDefaultBooleanOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaNumberParseToDate<
  I2 = number,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaNumberFlags = any,
> = SchemaGenericDateType<
  SchemaDefaultDateOptions,
  {
    minApplied: false;
    maxApplied: false;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>,
  Date
>;

type SchemaNumberParseToMethod<
  I2 = number,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaNumberFlags = any,
> = {
  /**
   * Converts a number value to a string.
   *
   * This method is used in a conversion chain to transform a number input into a string,
   * allowing you to perform string validations on the converted value. When used, the original number
   * is converted to its string representation before further tests are executed.
   *
   * @example
   * const stringSchema = schema().number().parseTo().string();
   *
   * console.log(stringSchema.parse(123)); // "123"
   */
  string: (config?: SchemaConfig) => SchemaNumberParseToString<I2, Opts, Flags>;

  /**
   * Converts a number value to a BigInt.
   *
   * This method is used in a conversion chain to transform a number input into a BigInt,
   * allowing you to perform BigInt validations on the converted value. When used, the original number
   * is parsed into a BigInt before further tests are executed.
   *
   * @example
   * const bigIntSchema = schema().number().parseTo().bigInt();
   *
   * console.log(bigIntSchema.parse(123)); // 123n
   */
  bigInt: (config?: SchemaConfig) => SchemaNumberParseToBigInt<I2, Opts, Flags>;

  /**
   * Converts a number value to a boolean.
   *
   * This method is used in a conversion chain to transform a number input into a boolean,
   * allowing you to perform boolean validations on the converted value. When used, the original number
   * is parsed into a boolean before further tests are executed.
   *
   * @example
   * const booleanSchema = schema().number().parseTo().boolean();
   *
   * console.log(booleanSchema.parse(1));  // true
   * console.log(booleanSchema.parse(0));  // false
   * console.log(booleanSchema.parse(-1)); // true
   */
  boolean: (config?: SchemaConfig) => SchemaNumberParseToBoolean<I2, Opts, Flags>;

  /**
   * Converts a number value to a date.
   *
   * This method is used in a conversion chain to transform a number input into a date,
   * allowing you to perform date validations on the converted value. When used, the original number
   * is parsed into a date before further tests are executed.
   *
   * @example
   * const dateSchema = schema().number().parseTo().date();
   *
   * console.log(dateSchema.parse(1672531200000));
   * // 2023-01-01T00:00:00.000Z
   */
  date: (config?: SchemaDateConfig) => SchemaNumberParseToDate<I2, Opts, Flags>;
};

export type SchemaAllowedNumberMethods<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaNumberFlags,
  I = number,
> = {
  /**
   * Adds a custom validation method to the schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's original type.
   *   - If a generic type parameter is provided (e.g., `<string>` when used on a number schema), it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented either synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   * It should call `context.success(newValue)` if validation passes, or
   * `context.failed(errorMessage)` if it fails.
   * If no type parameter is specified, the schema’s original type is preserved.
   * If a type parameter is specified (e.g., `<string>`), it enforces that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's original type):
   * const schemaCustom = schema().number().custom((context) => {
   *   if (context.value === 123) {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse(123);
   * console.log(result); // 123
   *
   * @example
   * // Custom validation with type transformation:
   * // In this example, the custom method enforces that context.success returns a string.
   * const schemaCustom = schema()
   *   .number()
   *   .custom<string>((context) => {
   *     if (context.value === 123) {
   *       context.success("ok");
   *     } else {
   *       context.failed("Custom validation failed");
   *     }
   *   });
   *
   * const result = schemaCustom.parse(123);
   * console.log(result); // "ok"
   */
  custom: <O = SchemaWithOptionalAndNullable<ForceNumberIfNotDifferent<number>, Opts>>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<number, Opts>, O>,
  ) => SchemaNumberCustom<I, Opts, O>;

  /**
   * Returns an object with conversion methods that allow you to transform the value
   * before performing further validations.
   *
   * This method supports two main contexts:
   *
   * 1. **Chaining Conversions:** The conversion methods (such as `string()`, `bigInt()`, etc.)
   *    transform the original value so that subsequent validations work with the newly converted value.
   *    For example, converting a number `123` into the string `"123"` allows you to chain string validations.
   *
   * 2. **Accessing the Parsed Value:** After running the validation (via `.test()` or `.testAsync()`),
   *    the final converted value is stored in the test result’s `.value` property. This lets you retrieve
   *    the processed value as it was transformed through the conversion chain.
   *
   * @returns {SchemaParseToMethod} An object containing conversion methods for:
   * - string
   * - bigInt
   * - boolean
   * - buffer
   * - date
   *
   * @example
   * // Example 1: Chaining conversion – convert a number to a string for further tests.
   * const schemaNumberToString = schema().number().parseTo().string();
   *
   * const result = schemaNumberToString.parse(123);
   *
   * // In the chain above, the number 123 is converted to the string "123" before testing.
   * console.log(result); // "123"
   */
  parseTo: <I2 = I>() => SchemaNumberParseToMethod<I2, Opts, Flags>;
} & (Flags["floatApplied"] extends false
  ? {
      /**
       * Adds a float validation rule to a number schema.
       *
       * This method extends a number schema by enforcing that the input value is a valid float,
       * meaning it must be a number that can have a fractional component. If the input value is not a float,
       * the validation will fail.
       *
       * @example
       * const floatSchema = schema().number().float();
       *
       * console.log(floatSchema.validate(3.14)); // true
       * console.log(floatSchema.validate(42));   // false
       *
       * @param {SchemaConfig} [config] - Optional configuration for float validation.
       * @param {string} [config.message] - A custom error message template for validation failures.
       * This message can include the following placeholders:
       *   - `[valueName]`: Replaced with the name of the field being validated.
       *   - `[value]`: Replaced with the actual value received.
       *
       * @example
       * const customFloatSchema = schema().number().float({
       *   message: "[valueName] must be a float, but got [value]"
       * });
       *
       * const test = customFloatSchema.test(42, "price");
       *
       * console.log(test.errors[0].message);
       * // "price must be a float, but got 42"
       */
      float: (config?: SchemaConfig) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { floatApplied: true }>, I>;
    }
  : {}) &
  (Flags["integerApplied"] extends false
    ? {
        /**
         * Adds an integer validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value is a valid integer.
         * If the input value is not an integer, the validation will fail.
         *
         * @example
         * const integerSchema = schema().number().integer();
         *
         * console.log(integerSchema.validate(42));    // true
         * console.log(integerSchema.validate(3.14));  // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for integer validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * const customIntegerSchema = schema().number().integer({
         *   message: "[valueName] must be an integer, but got [value]"
         * });
         *
         * const test = customIntegerSchema.test(3.14, "quantity");
         *
         * console.log(test.errors[0].message);
         * // "quantity must be an integer, but got 3.14"
         */
        integer: (config?: SchemaConfig) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { integerApplied: true }>, I>;
      }
    : {}) &
  (Flags["minApplied"] extends false
    ? {
        /**
         * Adds a minimum value validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value must be greater than or equal to a specified minimum.
         * The configuration object must include a `min` property, which sets this minimum value.
         *
         * @param {Object} config - The configuration for the minimum value validation.
         * @param {number} config.min - The minimum value required.
         *
         * @example
         * const minSchema = schema().number().min({ min: 5 });
         *
         * console.log(minSchema.validate(5));  // true
         * console.log(minSchema.validate(10)); // true
         * console.log(minSchema.validate(3));  // false
         *
         * @param {string} [config.message] - An optional custom error message template.
         * This message is used when the validation fails and may contain the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[min]`: Replaced with the specified minimum value.
         *
         * @example
         * const customMinSchema = schema().number().min({
         *   min: 5,
         *   message: "[valueName] must be at least [min], but got [value]"
         * });
         *
         * const test = customMinSchema.test(3, "age");
         *
         * console.log(test.errors[0].message);
         * // "age must be at least 5, but got 3"
         */
        min: (config: SchemaNumberMinConfig) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { minApplied: true }>, I>;
      }
    : {}) &
  (Flags["maxApplied"] extends false
    ? {
        /**
         * Adds a maximum value validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value must be less than or equal to a specified maximum.
         * The configuration object must include a `max` property, which sets this maximum value.
         *
         * @param {Object} config - The configuration for the maximum value validation.
         * @param {number} config.max - The maximum value allowed.
         *
         * @example
         * const maxSchema = schema().number().max({ max: 10 });
         *
         * console.log(maxSchema.validate(10)); // true
         * console.log(maxSchema.validate(8));  // true
         * console.log(maxSchema.validate(15)); // false
         *
         * @param {string} [config.message] - An optional custom error message template.
         * This message is used when the validation fails and may contain the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[max]`: Replaced with the specified maximum value.
         *
         * @example
         * const customMaxSchema = schema().number().max({
         *   max: 10,
         *   message: "[valueName] must be at most [max], but got [value]"
         * });
         *
         * const test = customMaxSchema.test(15, "age");
         *
         * console.log(test.errors[0].message);
         * // "age must be at most 10, but got 15"
         */
        max: (config: SchemaNumberMaxConfig) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { maxApplied: true }>, I>;
      }
    : {}) &
  (Flags["positiveApplied"] extends false
    ? {
        /**
         * Adds a positive validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value is positive (greater than 0).
         * If the input value is not positive, the validation will fail.
         *
         * @example
         * const positiveSchema = schema().number().positive();
         *
         * console.log(positiveSchema.validate(10)); // true
         * console.log(positiveSchema.validate(-5)); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for positive number validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * const customPositiveSchema = schema().number().positive({
         *   message: "[valueName] must be a positive number, but got [value]"
         * });
         *
         * const test = customPositiveSchema.test(-5, "price");
         *
         * console.log(test.errors[0].message);
         * // "price must be a positive number, but got -5"
         */
        positive: (config?: SchemaConfig) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { positiveApplied: true }>, I>;
      }
    : {}) &
  (Flags["negativeApplied"] extends false
    ? {
        /**
         * Adds a negative validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value is negative (less than 0).
         * If the input value is not negative, the validation will fail.
         *
         * @example
         * const negativeSchema = schema().number().negative();
         *
         * console.log(negativeSchema.validate(-10)); // true
         * console.log(negativeSchema.validate(5));   // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for negative number validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * const customNegativeSchema = schema().number().negative({
         *   message: "[valueName] must be a negative number, but got [value]"
         * });
         *
         * const test = customNegativeSchema.test(5, "balance");
         *
         * console.log(test.errors[0].message);
         * // "balance must be a negative number, but got 5"
         */
        negative: (config?: SchemaConfig) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { negativeApplied: true }>, I>;
      }
    : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   objKey: schema().number()
         * });
         *
         * const testWithoutAlias = schemaWithoutAlias.test({ objKey: "123" });
         *
         * console.log(testWithoutAlias.errors[0].message);
         * // "objKey must be a number type!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   objKey: schema().number().alias('object key')
         * });
         *
         * const testWithAlias = schemaWithAlias.test({ objKey: "123" });
         *
         * console.log(testWithAlias.errors[0].message);
         * // "object key must be a number type!"
         */
        alias: (valueName: string) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { aliasApplied: true }>, I>;
      }
    : {}) &
  (Flags["equalApplied"] extends false
    ? {
        /**
         * Adds an equality validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value exactly matches a specified target value.
         * If the input does not match the target, the validation will fail.
         *
         * @param {T} valueToCompare - The target value that the input number must equal.
         *
         * @example
         * const valueToCompare = 42;
         * const equalSchema = schema().number().equal(valueToCompare);
         *
         * console.log(equalSchema.validate(42));  // true
         * console.log(equalSchema.validate(100)); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the equality validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const customEqualSchema = schema().number().equal(42, {
         *   message: "[valueName] must exactly match [valueToCompare], but got [value]"
         * });
         *
         * const test = customEqualSchema.test(100, "age");
         *
         * console.log(test.errors[0].message);
         * // "age must exactly match 42, but got 100"
         */
        equal: <T extends number>(
          valueToCompare: T,
          config?: SchemaConfig,
        ) => SchemaGenericNumberType<SchemaMerge<Opts, { equal: true }>, SchemaMerge<Flags, { equalApplied: true }>, T>;
      }
    : {}) &
  (Flags["notEqualApplied"] extends false
    ? {
        /**
         * Adds a not-equal validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value does not exactly match a specified target value.
         * If the input value matches the target, the validation will fail.
         *
         * @param {number} valueToCompare - The target value that the input number must not equal.
         *
         * @example
         * const notEqualSchema = schema().number().notEqual(0);
         *
         * console.log(notEqualSchema.validate(5)); // true
         * console.log(notEqualSchema.validate(0)); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the not-equal validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const customNotEqualSchema = schema().number().notEqual(0, {
         *   message: "[valueName] must not equal [valueToCompare], but got [value]"
         * });
         *
         * const test = customNotEqualSchema.test(0, "balance");
         *
         * console.log(test.errors[0].message);
         * // "balance must not equal 0, but got 0"
         */
        notEqual: (
          valueToCompare: number,
          config?: SchemaConfig,
        ) => SchemaGenericNumberType<Opts, SchemaMerge<Flags, { equalApplied: true }>, I>;
      }
    : {}) &
  (Flags["oneOfApplied"] extends false
    ? {
        /**
         * Adds a one-of validation rule to a number schema.
         *
         * This method extends a number schema by enforcing that the input value must exactly match one of the values
         * provided in the `comparisonItems` array. If the input does not match any of the specified values, the validation will fail.
         *
         * @param {T[]} comparisonItems - An array of allowed number values. The input value must match one of these values.
         *
         * @example
         * const oneOfSchema = schema().number().oneOf([1, 2, 3]);
         *
         * console.log(oneOfSchema.validate(4)); // false
         * console.log(oneOfSchema.validate(1)); // true
         * console.log(oneOfSchema.validate(3)); // true
         *
         * @param {SchemaConfig} [config] - Optional configuration for the one-of validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * // Using a custom error message:
         * const customOneOfSchema = schema().number().oneOf([1, 2, 3], {
         *   message: "[valueName] must be one of 1, 2, or 3, but got [value]"
         * });
         *
         * const test = customOneOfSchema.test(4, "numberField");
         *
         * console.log(test.errors[0].message);
         * // "numberField must be one of 1, 2, or 3, but got 4"
         */
        oneOf: <T extends number>(
          comparisonItems: T[],
          config?: SchemaConfig,
        ) => SchemaGenericNumberType<
          Opts,
          SchemaMerge<Flags, { oneOfApplied: true; equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a number schema.
         *
         * This method extends a number schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default value.
         *
         * @param {number} value - The default value to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default value 42 is used:
         * const defaultSchema = schema().number().default(42);
         * console.log(defaultSchema.parse(undefined)); // 42
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse(10)); // 10
         */
        default: (
          value: number,
        ) => SchemaGenericNumberType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the number schema as not required.
         *
         * This method modifies a number schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the number type.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().number().notRequired();
         *
         * console.log(optionalSchema.validate(123));      // true
         * console.log(optionalSchema.validate(undefined)); // true
         * console.log(optionalSchema.validate(null));     // false
         */
        notRequired: () => SchemaGenericNumberType<
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the number schema as nullable.
         *
         * This method modifies a number schema to allow the input value to be either a number or null.
         * When applied, the schema will consider null values as valid alongside number values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().number().nullable();
         *
         * console.log(nullableSchema.validate(123));      // true
         * console.log(nullableSchema.validate(null));     // true
         * console.log(nullableSchema.validate(undefined)); // false
         */
        nullable: () => SchemaGenericNumberType<
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericNumberType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaNumberFlags,
  I = number,
> = SchemaType<
  Flags["oneOfApplied"] extends true
    ? SchemaWithOptionalAndNullable<I, Opts>
    : Opts["equal"] extends true
      ? SchemaWithOptionalAndNullable<I, Opts>
      : Opts["default"] extends true
        ? number
        : SchemaWithOptionalAndNullable<number, Opts>,
  SchemaWithOptionalAndNullable<I, Opts>
> &
  SchemaAllowedNumberMethods<Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Flags["oneOfApplied"] extends true
          ? SchemaWithOptionalAndNullable<I, Opts>
          : Opts["equal"] extends true
            ? SchemaWithOptionalAndNullable<I, Opts>
            : Opts["default"] extends true
              ? number
              : SchemaWithOptionalAndNullable<number, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

export interface SchemaNumberMaxConfig extends SchemaConfig {
  max: number;
}

export interface SchemaNumberMinConfig extends SchemaConfig {
  min: number;
}

// BigInt Method Types

export type SchemaDefaultBigIntOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
  equal: boolean;
};

export interface SchemaBigIntFlags {
  floatApplied: boolean;
  integerApplied: boolean;
  minApplied: boolean;
  maxApplied: boolean;
  positiveApplied: boolean;
  negativeApplied: boolean;
  aliasApplied: boolean;
  oneOfApplied: boolean;
  notEqualApplied: boolean;
  equalApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultBigIntFlags = {
  floatApplied: false;
  integerApplied: false;
  minApplied: false;
  maxApplied: false;
  positiveApplied: false;
  negativeApplied: false;
  aliasApplied: false;
  defaultApplied: false;
  notEqualApplied: false;
  oneOfApplied: false;
  equalApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

type ForceBigIntIfNotDifferent<O> = [O] extends [bigint] ? bigint : O;

type SchemaBigIntCustom<
  I = bigint,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  O = SchemaWithOptionalAndNullable<I, Opts>,
> = SchemaGenericCustomType<
  SchemaWithOptionalAndNullable<bigint, Opts>,
  SchemaWithOptionalAndNullable<ForceBigIntIfNotDifferent<O>, Opts>,
  Opts,
  O
>;

type SchemaBigIntParseToString<
  I2 = bigint,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBigIntFlags = any,
> = SchemaGenericStringType<
  SchemaDefaultStringOptions,
  {
    minLengthApplied: false;
    maxLengthApplied: false;
    minWordApplied: false;
    emailApplied: false;
    UUIDApplied: false;
    timeApplied: false;
    regexApplied: false;
    dateApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBigIntParseToNumber<
  I2 = bigint,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBigIntFlags = any,
> = SchemaGenericNumberType<
  SchemaDefaultNumberOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBigIntParseToBoolean<
  I2 = bigint,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBigIntFlags = any,
> = SchemaGenericBooleanType<
  SchemaDefaultBooleanOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBigIntParseToMethod<
  I2 = bigint,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBigIntFlags = any,
> = {
  /**
   * Converts a BigInt value to a string.
   *
   * This method is used in a conversion chain to transform a BigInt input into a string,
   * allowing you to perform string validations on the converted value. When used, the original BigInt
   * is converted to its string representation before further tests are executed.
   *
   * @example
   * const stringSchema = schema().bigInt().parseTo().string();
   *
   * console.log(stringSchema.parse(123n)); // "123"
   */
  string: (config?: SchemaConfig) => SchemaBigIntParseToString<I2, Opts, Flags>;

  /**
   * Converts a BigInt value to a number.
   *
   * This method is used in a conversion chain to transform a BigInt input into a number,
   * allowing you to perform numeric validations on the converted value. When used, the original BigInt
   * is converted to its number representation before further tests are executed.
   *
   * @example
   * const numberSchema = schema().bigInt().parseTo().number();
   *
   * console.log(numberSchema.parse(123n)); // 123
   */
  number: (config?: SchemaConfig) => SchemaBigIntParseToNumber<I2, Opts, Flags>;

  /**
   * Converts a BigInt value to a boolean.
   *
   * This method is used in a conversion chain to transform a BigInt input into a boolean,
   * allowing you to perform boolean validations on the converted value. When used, the original BigInt
   * is parsed into a boolean before further tests are executed.
   *
   * @example
   * const booleanSchema = schema().bigInt().parseTo().boolean();
   *
   * console.log(booleanSchema.parse(1n));  // true
   * console.log(booleanSchema.parse(0n));  // false
   * console.log(booleanSchema.parse(-1n)); // true
   */
  boolean: (config?: SchemaConfig) => SchemaBigIntParseToBoolean<I2, Opts, Flags>;
};

export type SchemaAllowedBigIntMethods<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaBigIntFlags,
  I = bigint,
> = {
  /**
   * Adds a custom validation method to the schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's original type.
   *   - If a generic type parameter is provided (e.g., `<string>` when used on a bigInt schema), it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented either synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   * It should call `context.success(newValue)` if validation passes, or
   * `context.failed(errorMessage)` if it fails.
   * If no type parameter is specified, the schema’s original type is preserved.
   * If a type parameter is specified (e.g., `<string>`), it enforces that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's original type):
   * const schemaCustom = schema().bigInt().custom((context) => {
   *   if (context.value === 123n) {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse(123n);
   * console.log(result); // 123n
   *
   * @example
   * // Custom validation with type transformation:
   * // In this example, the custom method enforces that context.success returns a string.
   * const schemaCustom = schema().bigInt()
   *   .custom<string>((context) => {
   *     if (context.value === 123n) {
   *       context.success("ok");
   *     } else {
   *       context.failed("Custom validation failed");
   *     }
   *   });
   *
   * const result = schemaCustom.parse(123n);
   * console.log(result); // "ok"
   */
  custom: <O = SchemaWithOptionalAndNullable<ForceBigIntIfNotDifferent<bigint>, Opts>>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<bigint, Opts>, O>,
  ) => SchemaBigIntCustom<I, Opts, O>;

  /**
   * Returns an object with conversion methods that allow you to transform the BigInt value
   * before performing further validations.
   *
   * This method supports two main contexts:
   *
   * 1. **Chaining Conversions:** The conversion methods (such as `string()`, `bigInt()`, etc.)
   *    transform the original value so that subsequent validations work with the newly converted value.
   *    For example, converting a BigInt `123n` into the string `"123"` allows you to chain string validations.
   *
   * 2. **Accessing the Parsed Value:** After running the validation (via `.test()` or `.testAsync()`),
   *    the final converted value is stored in the test result’s `.value` property. This lets you retrieve
   *    the processed value as it was transformed through the conversion chain.
   *
   * @returns {SchemaParseToMethod} An object containing conversion methods for:
   * - string
   * - bigInt
   * - boolean
   *
   * @example
   * // Example 1: Chaining conversion – convert a BigInt to a string for further tests.
   * const schemaBigIntToString = schema().bigInt().parseTo().string();
   *
   * const result = schemaBigIntToString.parse(123n);
   *
   * // In the chain above, the BigInt 123n is converted to the string "123" before testing.
   * console.log(result); // "123"
   */
  parseTo: <I2 = I>() => SchemaBigIntParseToMethod<I2, Opts, Flags>;
} & (Flags["minApplied"] extends false
  ? {
      /**
       * Adds a minimum value validation rule to a BigInt schema.
       *
       * This method extends a BigInt schema by enforcing that the input value must be greater than or equal to a specified minimum.
       * The configuration object must include a `min` property, which sets this minimum value.
       *
       * @param {Object} config - The configuration for the minimum value validation.
       * @param {bigint} config.min - The minimum value required.
       *
       * @example
       * const minSchema = schema().bigInt().min({ min: 5n });
       *
       * console.log(minSchema.validate(5n));   // true
       * console.log(minSchema.validate(10n));  // true
       * console.log(minSchema.validate(3n));   // false
       *
       * @param {string} [config.message] - An optional custom error message template.
       * This message is used when the validation fails and may contain the following placeholders:
       *   - `[valueName]`: Replaced with the name of the field being validated.
       *   - `[value]`: Replaced with the actual value received.
       *   - `[min]`: Replaced with the specified minimum value.
       *
       * @example
       * const customMinSchema = schema().bigInt().min({
       *   min: 5n,
       *   message: "[valueName] must be at least [min], but got [value]"
       * });
       *
       * const test = customMinSchema.test(3n, "age");
       *
       * console.log(test.errors[0].message);
       * // "age must be at least 5n, but got 3n"
       */
      min: (config: SchemaBigIntMinConfig) => SchemaGenericBigIntType<Opts, SchemaMerge<Flags, { minApplied: true }>, I>;
    }
  : {}) &
  (Flags["maxApplied"] extends false
    ? {
        /**
         * Adds a maximum value validation rule to a BigInt schema.
         *
         * This method extends a BigInt schema by enforcing that the input value must be less than or equal to a specified maximum.
         * The configuration object must include a `max` property, which sets this maximum value.
         *
         * @param {Object} config - The configuration for the maximum value validation.
         * @param {bigint} config.max - The maximum value allowed.
         *
         * @example
         * const maxSchema = schema().bigInt().max({ max: 10n });
         *
         * console.log(maxSchema.validate(10n)); // true
         * console.log(maxSchema.validate(8n));  // true
         * console.log(maxSchema.validate(15n)); // false
         *
         * @param {string} [config.message] - An optional custom error message template.
         * This message is used when the validation fails and may contain the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[max]`: Replaced with the specified maximum value.
         *
         * @example
         * const customMaxSchema = schema().bigInt().max({
         *   max: 10n,
         *   message: "[valueName] must be at most [max], but got [value]"
         * });
         *
         * const test = customMaxSchema.test(15n, "age");
         *
         * console.log(test.errors[0].message);
         * // "age must be at most 10n, but got 15n"
         */
        max: (config: SchemaBigIntMaxConfig) => SchemaGenericBigIntType<Opts, SchemaMerge<Flags, { maxApplied: true }>, I>;
      }
    : {}) &
  (Flags["positiveApplied"] extends false
    ? {
        /**
         * Adds a positive validation rule to a BigInt schema.
         *
         * This method extends a BigInt schema by enforcing that the input value is positive (greater than 0n).
         * If the input value is not positive, the validation will fail.
         *
         * @example
         * const positiveSchema = schema().bigInt().positive();
         *
         * console.log(positiveSchema.validate(10n)); // true
         * console.log(positiveSchema.validate(-5n)); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for positive BigInt validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * const customPositiveSchema = schema().bigInt().positive({
         *   message: "[valueName] must be a positive BigInt, but got [value]"
         * });
         *
         * const test = customPositiveSchema.test(-5n, "price");
         *
         * console.log(test.errors[0].message);
         * // "price must be a positive BigInt, but got -5n"
         */
        positive: (config?: SchemaConfig) => SchemaGenericBigIntType<Opts, SchemaMerge<Flags, { positiveApplied: true }>, I>;
      }
    : {}) &
  (Flags["negativeApplied"] extends false
    ? {
        /**
         * Adds a negative validation rule to a BigInt schema.
         *
         * This method extends a BigInt schema by enforcing that the input value is negative (less than 0n).
         * If the input value is not negative, the validation will fail.
         *
         * @example
         * const negativeSchema = schema().bigInt().negative();
         *
         * console.log(negativeSchema.validate(-10n)); // true
         * console.log(negativeSchema.validate(5n));   // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for negative BigInt validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * const customNegativeSchema = schema().bigInt().negative({
         *   message: "[valueName] must be a negative BigInt, but got [value]"
         * });
         *
         * const test = customNegativeSchema.test(5n, "balance");
         *
         * console.log(test.errors[0].message);
         * // "balance must be a negative BigInt, but got 5n"
         */
        negative: (config?: SchemaConfig) => SchemaGenericBigIntType<Opts, SchemaMerge<Flags, { negativeApplied: true }>, I>;
      }
    : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   objKey: schema().bigInt()
         * });
         *
         * const testWithoutAlias = schemaWithoutAlias.test({ objKey: "123" });
         *
         * console.log(testWithoutAlias.errors[0].message);
         * // "objKey must be a BigInt type!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   objKey: schema().bigInt().alias('object key')
         * });
         *
         * const testWithAlias = schemaWithAlias.test({ objKey: "123" });
         *
         * console.log(testWithAlias.errors[0].message);
         * // "object key must be a BigInt type!"
         */
        alias: (valueName: string) => SchemaGenericBigIntType<Opts, SchemaMerge<Flags, { aliasApplied: true }>, I>;
      }
    : {}) &
  (Flags["equalApplied"] extends false
    ? {
        /**
         * Adds an equality validation rule to a BigInt schema.
         *
         * This method extends a BigInt schema by enforcing that the input value exactly matches a specified target value.
         * If the input does not match the target, the validation will fail.
         *
         * @param {T} valueToCompare - The target value that the input BigInt must equal.
         *
         * @example
         * const valueToCompare = 42n;
         * const equalSchema = schema().bigInt().equal(valueToCompare);
         *
         * console.log(equalSchema.validate(42n));   // true
         * console.log(equalSchema.validate(100n));  // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the equality validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const customEqualSchema = schema().bigInt().equal(42n, {
         *   message: "[valueName] must exactly match [valueToCompare], but got [value]"
         * });
         *
         * const test = customEqualSchema.test(100n, "balance");
         *
         * console.log(test.errors[0].message);
         * // "balance must exactly match 42n, but got 100n"
         */
        equal: <T extends bigint>(
          valueToCompare: T,
          config?: SchemaConfig,
        ) => SchemaGenericBigIntType<SchemaMerge<Opts, { equal: true }>, SchemaMerge<Flags, { equalApplied: true }>, T>;
      }
    : {}) &
  (Flags["notEqualApplied"] extends false
    ? {
        /**
         * Adds a not-equal validation rule to a bigInt schema.
         *
         * This method extends a bigInt schema by enforcing that the input value does not exactly match a specified target value.
         * If the input value matches the target, the validation will fail.
         *
         * @param {bigint} valueToCompare - The target value that the input bigInt must not equal.
         *
         * @example
         * const notEqualSchema = schema().bigInt().notEqual(1n);
         *
         * console.log(notEqualSchema.validate(5n)); // true
         * console.log(notEqualSchema.validate(1n)); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the not-equal validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const customNotEqualSchema = schema().bigInt().notEqual(1n, {
         *   message: "[valueName] must not equal [valueToCompare], but got [value]"
         * });
         *
         * const test = customNotEqualSchema.test(1n, "balance");
         *
         * console.log(test.errors[0].message);
         * // "balance must not equal 1n, but got 1n"
         */
        notEqual: (
          valueToCompare: bigint,
          config?: SchemaConfig,
        ) => SchemaGenericBigIntType<Opts, SchemaMerge<Flags, { equalApplied: true }>, I>;
      }
    : {}) &
  (Flags["oneOfApplied"] extends false
    ? {
        /**
         * Adds a one-of validation rule to a bigInt schema.
         *
         * This method extends a bigInt schema by enforcing that the input value must exactly match one of the values
         * provided in the `comparisonItems` array. If the input does not match any of the specified values, the validation will fail.
         *
         * @param {T[]} comparisonItems - An array of allowed bigInt values. The input value must match one of these values.
         *
         * @example
         * const oneOfSchema = schema().bigInt().oneOf([1n, 2n, 3n]);
         *
         * console.log(oneOfSchema.validate(4n)); // false
         * console.log(oneOfSchema.validate(1n)); // true
         * console.log(oneOfSchema.validate(3n)); // true
         *
         * @param {SchemaConfig} [config] - Optional configuration for the one-of validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * // Using a custom error message:
         * const customOneOfSchema = schema().bigInt().oneOf([1n, 2n, 3n], {
         *   message: "[valueName] must be one of 1n, 2n, or 3n, but got [value]"
         * });
         *
         * const test = customOneOfSchema.test(4n, "bigIntField");
         *
         * console.log(test.errors[0].message);
         * // "bigIntField must be one of 1n, 2n, or 3n, but got 4n"
         */
        oneOf: <T extends bigint>(
          comparisonItems: T[],
          config?: SchemaConfig,
        ) => SchemaGenericBigIntType<
          Opts,
          SchemaMerge<Flags, { oneOfApplied: true; equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a bigInt schema.
         *
         * This method extends a bigInt schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default value.
         *
         * @param {bigint} value - The default value to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default value 42n is used:
         * const defaultSchema = schema().bigInt().default(42n);
         * console.log(defaultSchema.parse(undefined)); // 42n
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse(10n)); // 10n
         */
        default: (
          value: bigint,
        ) => SchemaGenericBigIntType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the bigInt schema as not required.
         *
         * This method modifies a bigInt schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the bigInt type.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().bigInt().notRequired();
         *
         * console.log(optionalSchema.validate(123n));     // true
         * console.log(optionalSchema.validate(undefined)); // true
         * console.log(optionalSchema.validate(null));     // false
         */
        notRequired: () => SchemaGenericBigIntType<
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the bigInt schema as nullable.
         *
         * This method modifies a bigInt schema to allow the input value to be either a bigInt or null.
         * When applied, the schema will consider null values as valid alongside bigInt values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().bigInt().nullable();
         *
         * console.log(nullableSchema.validate(123n));     // true
         * console.log(nullableSchema.validate(null));     // true
         * console.log(nullableSchema.validate(undefined)); // false
         */
        nullable: () => SchemaGenericBigIntType<
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericBigIntType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaBigIntFlags,
  I = bigint,
> = SchemaType<
  Flags["oneOfApplied"] extends true
    ? SchemaWithOptionalAndNullable<I, Opts>
    : Opts["equal"] extends true
      ? SchemaWithOptionalAndNullable<I, Opts>
      : Opts["default"] extends true
        ? bigint
        : SchemaWithOptionalAndNullable<bigint, Opts>,
  SchemaWithOptionalAndNullable<I, Opts>
> &
  SchemaAllowedBigIntMethods<Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Flags["oneOfApplied"] extends true
          ? SchemaWithOptionalAndNullable<I, Opts>
          : Opts["equal"] extends true
            ? SchemaWithOptionalAndNullable<I, Opts>
            : Opts["default"] extends true
              ? bigint
              : SchemaWithOptionalAndNullable<bigint, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

export interface SchemaBigIntMaxConfig extends SchemaConfig {
  max: bigint;
}

export interface SchemaBigIntMinConfig extends SchemaConfig {
  min: bigint;
}

// Boolean Method Types

export type SchemaDefaultBooleanOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
  equal: boolean;
};

export interface SchemaBooleanFlags {
  aliasApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
  equalApplied: boolean;
  oneOfApplied: boolean;
  notEqualApplied: boolean;
}

export type SchemaDefaultBooleanFlags = {
  aliasApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
  equalApplied: false;
  oneOfApplied: false;
  notEqualApplied: false;
};

type ForceBooleanIfNotDifferent<O> = [O] extends [boolean] ? boolean : O;

type SchemaBooleanParseToString<
  I2 = boolean,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBooleanFlags = any,
> = SchemaGenericStringType<
  SchemaDefaultStringOptions,
  {
    minLengthApplied: false;
    maxLengthApplied: false;
    minWordApplied: false;
    emailApplied: false;
    UUIDApplied: false;
    timeApplied: false;
    regexApplied: false;
    dateApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBooleanParseToNumber<
  I2 = boolean,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBooleanFlags = any,
> = SchemaGenericNumberType<
  SchemaDefaultNumberOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBooleanParseToBigInt<
  I2 = boolean,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBooleanFlags = any,
> = SchemaGenericBigIntType<
  SchemaDefaultBigIntOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    equalApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBooleanParseToMethod<
  I2 = boolean,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBooleanFlags = any,
> = {
  /**
   * Converts a boolean value to a string.
   *
   * This method is used in a conversion chain to transform a boolean input into a string,
   * allowing you to perform string validations on the converted value. When used, the original boolean
   * is converted to its string representation before further tests are executed.
   *
   * @example
   * const stringSchema = schema().boolean().parseTo().string();
   *
   * console.log(stringSchema.parse(true));  // "true"
   * console.log(stringSchema.parse(false)); // "false"
   */
  string: (config?: SchemaConfig) => SchemaBooleanParseToString<I2, Opts, Flags>;

  /**
   * Converts a boolean value to a number.
   *
   * This method is used in a conversion chain to transform a boolean input into a number,
   * allowing you to perform numeric validations on the converted value. When used, the original boolean
   * is converted to its numeric representation (true becomes 1 and false becomes 0) before further tests are executed.
   *
   * @example
   * const numberSchema = schema().boolean().parseTo().number();
   *
   * console.log(numberSchema.parse(true));  // 1
   * console.log(numberSchema.parse(false)); // 0
   */
  number: (config?: SchemaConfig) => SchemaBooleanParseToNumber<I2, Opts, Flags>;

  /**
   * Converts a boolean value to a BigInt.
   *
   * This method is used in a conversion chain to transform a boolean input into a BigInt,
   * allowing you to perform BigInt validations on the converted value. When used, the original boolean
   * is converted to its BigInt representation (true becomes 1n and false becomes 0n) before further tests are executed.
   *
   * @example
   * const bigIntSchema = schema().boolean().parseTo().bigInt();
   *
   * console.log(bigIntSchema.parse(true));  // 1n
   * console.log(bigIntSchema.parse(false)); // 0n
   */
  bigInt: (config?: SchemaConfig) => SchemaBooleanParseToBigInt<I2, Opts, Flags>;
};

type BooleanStringCustom<
  I = boolean,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  O = SchemaWithOptionalAndNullable<I, Opts>,
> = SchemaGenericCustomType<
  SchemaWithOptionalAndNullable<boolean, Opts>,
  SchemaWithOptionalAndNullable<ForceBooleanIfNotDifferent<O>, Opts>,
  Opts,
  O
>;

export type SchemaAllowedBooleanMethods<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaBooleanFlags,
  I = boolean,
> = {
  /**
   * Adds a custom validation method to the boolean schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current boolean value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's original type (boolean).
   *   - If a generic type parameter is provided (e.g., `<string>`), it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented either synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   * It should call `context.success(newValue)` if validation passes, or
   * `context.failed(errorMessage)` if it fails.
   * If no type parameter is specified, the schema’s original type (boolean) is preserved.
   * If a type parameter is specified (e.g., `<string>`), it enforces that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's original boolean type):
   * const schemaCustom = schema().boolean().custom((context) => {
   *   if (context.value === true) {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse(true);
   * console.log(result); // true
   *
   * @example
   * // Custom validation with type transformation:
   * // In this example, the custom method enforces that context.success returns a string.
   * const schemaCustom = schema()
   *   .boolean()
   *   .custom<string>((context) => {
   *     if (context.value === true) {
   *       context.success("ok");
   *     } else {
   *       context.failed("Custom validation failed");
   *     }
   *   });
   *
   * const result = schemaCustom.parse(true);
   * console.log(result); // "ok"
   */
  custom: <O = SchemaWithOptionalAndNullable<ForceBooleanIfNotDifferent<boolean>, Opts>>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<boolean, Opts>, O>,
  ) => BooleanStringCustom<I, Opts, O>;

  /**
   * Returns an object with conversion methods that allow you to transform the boolean value
   * before performing further validations.
   *
   * This method supports two main contexts:
   *
   * 1. **Chaining Conversions:** The conversion methods (such as `string()`, `number()`, `bigInt()`, etc.)
   *    transform the original value so that subsequent validations work with the newly converted value.
   *    For example, converting a boolean `true` into the string `"true"` allows you to chain string validations.
   *
   * 2. **Accessing the Parsed Value:** After running the validation (via `.test()` or `.testAsync()`),
   *    the final converted value is stored in the test result’s `.value` property. This lets you retrieve
   *    the processed value as it was transformed through the conversion chain.
   *
   * @returns {SchemaParseToMethod} An object containing conversion methods for:
   * - string
   * - number
   * - bigInt
   *
   * @example
   * // Example 1: Chaining conversion – convert a boolean to a string for further tests.
   * const schemaBooleanToString = schema().boolean().parseTo().string();
   *
   * const result = schemaBooleanToString.parse(true);
   *
   * // In the chain above, true is converted to the string "true" before testing.
   * console.log(result); // "true"
   */
  parseTo: <I2 = I>() => SchemaBooleanParseToMethod<I2, Opts, Flags>;
} & (Flags["aliasApplied"] extends false
  ? {
      /**
       * Adds an alias to a schema property.
       *
       * This method allows you to rename the field key in error messages for clearer output
       * when validating objects. When used, the alias value will replace the original key
       * name in validation error messages.
       *
       * @param {string} valueName - The alias name to be used in error messages.
       * @returns {SchemaAliasMethod} Chainable alias schema.
       *
       * @example
       * // Without alias, the error message uses the actual key name.
       * const schemaWithoutAlias = schema().object({
       *   objKey: schema().boolean()
       * });
       *
       * const testWithoutAlias = schemaWithoutAlias.test({ objKey: "not a boolean" });
       *
       * console.log(testWithoutAlias.errors[0].message);
       * // "objKey must be a boolean type!"
       *
       * // With alias, the error message uses the provided alias.
       * const schemaWithAlias = schema().object({
       *   objKey: schema().boolean().alias('object key')
       * });
       *
       * const testWithAlias = schemaWithAlias.test({ objKey: "not a boolean" });
       *
       * console.log(testWithAlias.errors[0].message);
       * // "object key must be a boolean type!"
       */
      alias: (valueName: string) => SchemaGenericBooleanType<Opts, SchemaMerge<Flags, { aliasApplied: true }>, I>;
    }
  : {}) &
  (Flags["equalApplied"] extends false
    ? {
        /**
         * Adds an equality validation rule to a boolean schema.
         *
         * This method extends a boolean schema by enforcing that the input value exactly matches a specified target value.
         * If the input does not match the target, the validation will fail.
         *
         * @param {T} valueToCompare - The target value that the input boolean must equal.
         *
         * @example
         * const valueToCompare = true;
         * const equalSchema = schema().boolean().equal(valueToCompare);
         *
         * console.log(equalSchema.validate(true));  // true
         * console.log(equalSchema.validate(false)); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the equality validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const customEqualSchema = schema().boolean().equal(true, {
         *   message: "[valueName] must exactly match [valueToCompare], but got [value]"
         * });
         *
         * const test = customEqualSchema.test(false, "active");
         *
         * console.log(test.errors[0].message);
         * // "active must exactly match true, but got false"
         */
        equal: <T extends boolean>(
          valueToCompare: T,
          config?: SchemaConfig,
        ) => SchemaGenericBooleanType<
          SchemaMerge<Opts, { equal: true }>,
          SchemaMerge<Flags, { equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["notEqualApplied"] extends false
    ? {
        /**
         * Adds a not-equal validation rule to a boolean schema.
         *
         * This method extends a boolean schema by enforcing that the input value does not exactly match a specified target value.
         * If the input value matches the target, the validation will fail.
         *
         * @param {boolean} valueToCompare - The target value that the input boolean must not equal.
         *
         * @example
         * const notEqualSchema = schema().boolean().notEqual(true);
         *
         * console.log(notEqualSchema.validate(false)); // true
         * console.log(notEqualSchema.validate(true));  // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the not-equal validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const notEqualSchema = schema().boolean().notEqual(true, {
         *   message: "[valueName] must not be [valueToCompare], but got [value]"
         * });
         *
         * const test = notEqualSchema.test(true, "active");
         *
         * console.log(test.errors[0].message);
         * // "active must not be true, but got true"
         */
        notEqual: (
          valueToCompare: boolean,
          config?: SchemaConfig,
        ) => SchemaGenericBooleanType<Opts, SchemaMerge<Flags, { equalApplied: true }>, I>;
      }
    : {}) &
  (Flags["oneOfApplied"] extends false
    ? {
        /**
         * Adds a one-of validation rule to a boolean schema.
         *
         * This method extends a boolean schema by enforcing that the input value must exactly match one of the values
         * provided in the `comparisonItems` array. If the input does not match any of the specified values, the validation will fail.
         *
         * @param {T[]} comparisonItems - An array of allowed boolean values. The input value must match one of these values.
         *
         * @example
         * // Valid case: the input value true is one of the allowed values.
         * const oneOfSchema = schema().boolean().oneOf([true, false]);
         *
         * console.log(oneOfSchema.validate(true));   // true
         * console.log(oneOfSchema.validate(false));  // true
         * console.log(oneOfSchema.validate("true")); // false (input must be a boolean)
         *
         * @param {SchemaConfig} [config] - Optional configuration for the one-of validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * // Using a custom error message:
         * const customOneOfSchema = schema().boolean().oneOf([true], {
         *   message: "[valueName] must be true, but got [value]"
         * });
         *
         * const test = customOneOfSchema.test(false, "active");
         *
         * console.log(test.errors[0].message);
         * // "active must be true, but got false"
         */
        oneOf: <T extends boolean>(
          comparisonItems: T[],
          config?: SchemaConfig,
        ) => SchemaGenericBooleanType<
          Opts,
          SchemaMerge<Flags, { oneOfApplied: true; equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a boolean schema.
         *
         * This method extends a boolean schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default value.
         *
         * @param {boolean} value - The default value to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default value true is used:
         * const defaultSchema = schema().boolean().default(true);
         * console.log(defaultSchema.parse(undefined)); // true
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse(false)); // false
         */
        default: (
          value: boolean,
        ) => SchemaGenericBooleanType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the boolean schema as not required.
         *
         * This method modifies a boolean schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the boolean type.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().boolean().notRequired();
         *
         * console.log(optionalSchema.validate(true));     // true
         * console.log(optionalSchema.validate(false));    // true
         * console.log(optionalSchema.validate(undefined)); // true
         * console.log(optionalSchema.validate(null));     // false
         */
        notRequired: () => SchemaGenericBooleanType<
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the boolean schema as nullable.
         *
         * This method modifies a boolean schema to allow the input value to be either a boolean or null.
         * When applied, the schema will consider null values as valid alongside boolean values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().boolean().nullable();
         *
         * console.log(nullableSchema.validate(true));     // true
         * console.log(nullableSchema.validate(false));    // true
         * console.log(nullableSchema.validate(null));     // true
         * console.log(nullableSchema.validate(undefined)); // false
         */
        nullable: () => SchemaGenericBooleanType<
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericBooleanType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaBooleanFlags,
  I = boolean,
> = SchemaType<
  Opts["equal"] extends true
    ? SchemaWithOptionalAndNullable<I, Opts>
    : Opts["default"] extends true
      ? boolean
      : SchemaWithOptionalAndNullable<boolean, Opts>,
  SchemaWithOptionalAndNullable<I, Opts>
> &
  SchemaAllowedBooleanMethods<Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Opts["equal"] extends true
          ? SchemaWithOptionalAndNullable<I, Opts>
          : Opts["default"] extends true
            ? boolean
            : SchemaWithOptionalAndNullable<boolean, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

// Buffer Method Types

export type SchemaDefaultBufferOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
  equal: boolean;
};

export interface SchemaBufferFlags {
  aliasApplied: boolean;
  defaultApplied: boolean;
  equalApplied: boolean;
  notEqualApplied: boolean;
  oneOfApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultBufferFlags = {
  aliasApplied: false;
  defaultApplied: false;
  equalApplied: false;
  notEqualApplied: false;
  oneOfApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

type ForceBufferIfNotDifferent<O> = [O] extends [Buffer] ? Buffer : O;

type SchemaBufferCustom<
  I = Buffer,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  O = SchemaWithOptionalAndNullable<I, Opts>,
> = SchemaGenericCustomType<
  SchemaWithOptionalAndNullable<I, Opts>,
  SchemaWithOptionalAndNullable<ForceBufferIfNotDifferent<O>, Opts>,
  Opts,
  O
>;

type SchemaBufferParseToString<
  I2 = Buffer,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = SchemaGenericStringType<
  SchemaDefaultStringOptions,
  {
    minLengthApplied: false;
    maxLengthApplied: false;
    minWordApplied: false;
    emailApplied: false;
    UUIDApplied: false;
    timeApplied: false;
    regexApplied: false;
    dateApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBufferParseToNumber<
  I2 = Buffer,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = SchemaGenericNumberType<
  SchemaDefaultNumberOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBufferParseToBigInt<
  I2 = Buffer,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = SchemaGenericBigIntType<
  SchemaDefaultBigIntOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    equalApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBufferParseToBoolean<
  I2 = Buffer,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = SchemaGenericBooleanType<
  SchemaDefaultBooleanOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaBufferParseToArray<
  Item extends SchemaType<any, any>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = SchemaGenericArrayType<
  Item,
  SchemaDefaultArrayOptions,
  {
    minApplied: false;
    maxApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<Buffer, Opts>
>;

type SchemaBufferParseToDate<
  I2 = Buffer,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = SchemaGenericDateType<
  SchemaDefaultDateOptions,
  {
    minApplied: false;
    maxApplied: false;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>,
  Date
>;

type SchemaBufferParseToObject<
  Shape extends Record<string, SchemaType<any, any>>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = SchemaGenericObjectType<
  Shape,
  SchemaDefaultObjectOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<Buffer, Opts>
>;

type SchemaBufferParseToMethod<
  I2 = Buffer,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaBufferFlags = any,
> = {
  /**
   * Converts a buffer value to a string.
   *
   * This method is used in a conversion chain to transform a buffer input into a string,
   * allowing you to perform string validations on the converted value. When used, the original buffer
   * is converted to its string representation (using the default encoding, such as UTF-8) before further tests are executed.
   *
   * @example
   * const stringSchema = schema().buffer().parseTo().string();
   *
   * console.log(stringSchema.parse(Buffer.from("hello"))); // "hello"
   */
  string: (config?: SchemaConfig) => SchemaBufferParseToString<I2, Opts, Flags>;

  /**
   * Converts a buffer value to a number.
   *
   * This method is used in a conversion chain to transform a buffer input into a number,
   * allowing you to perform numeric validations on the converted value. When used, the original buffer
   * is parsed into a number before further tests are executed.
   *
   * @example
   * const numberSchema = schema().buffer().parseTo().number();
   *
   * console.log(numberSchema.parse(Buffer.from("123"))); // 123
   */
  number: (config?: SchemaConfig) => SchemaBufferParseToNumber<I2, Opts, Flags>;

  /**
   * Converts a buffer value to a BigInt.
   *
   * This method is used in a conversion chain to transform a buffer input into a BigInt,
   * allowing you to perform BigInt validations on the converted value. When used, the original buffer
   * is parsed into a BigInt before further tests are executed.
   *
   * @example
   * const bigIntSchema = schema().buffer().parseTo().bigInt();
   *
   * console.log(bigIntSchema.parse(Buffer.from("123"))); // 123n
   */
  bigInt: (config?: SchemaConfig) => SchemaBufferParseToBigInt<I2, Opts, Flags>;

  /**
   * Converts a buffer value to a boolean.
   *
   * This method is used in a conversion chain to transform a buffer input into a boolean,
   * allowing you to perform boolean validations on the converted value. When used, the original buffer
   * is parsed into a boolean before further tests are executed.
   *
   * The conversion typically interprets the buffer's string representation:
   * - Non-empty strings (except for "false") are converted to true.
   * - The string "false" or an empty string are converted to false.
   *
   * @example
   * const booleanSchema = schema().buffer().parseTo().boolean();
   *
   * console.log(booleanSchema.parse(Buffer.from("true")));  // true
   * console.log(booleanSchema.parse(Buffer.from("false"))); // false
   * console.log(booleanSchema.parse(Buffer.from("hello"))); // true
   * console.log(booleanSchema.parse(Buffer.from("")));      // false
   */
  boolean: (config?: SchemaConfig) => SchemaBufferParseToBoolean<I2, Opts, Flags>;

  /**
   * Converts a buffer value to a date.
   *
   * This method is used in a conversion chain to transform a buffer input into a date,
   * allowing you to perform date validations on the converted value. When used, the original buffer
   * is parsed into a date before further tests are executed.
   *
   * @example
   * const dateSchema = schema().buffer().parseTo().date();
   *
   * console.log(dateSchema.parse(Buffer.from("2000-02-03T02:00:00.000Z")));
   * // 2000-02-03T02:00:00.000Z
   */
  date: (config?: SchemaDateConfig) => SchemaBufferParseToDate<I2, Opts, Flags>;

  /**
   * Converts a buffer value to an array.
   *
   * This method is used in a conversion chain to transform a buffer input into an array,
   * allowing you to perform array validations on the converted value. When used, the original buffer
   * is parsed into an array before further tests are executed.
   *
   * @example
   * const arraySchema = schema().buffer().parseTo().array(
   *   schema().number()
   * );
   *
   * console.log(arraySchema.parse(Buffer.from("[1, 2, 3]")));
   * // [ 1, 2, 3 ]
   */
  array<Item extends SchemaType<any, any>>(
    schema: Item,
    config?: SchemaArrayConfig,
  ): SchemaBufferParseToArray<Item, Opts, Flags>;

  /**
   * Converts a buffer value to an object.
   *
   * This method is used in a conversion chain to transform a buffer input into an object,
   * allowing you to perform object validations on the converted value. When used, the original buffer
   * is parsed into an object before further tests are executed.
   *
   * @example
   * const objectSchema = schema().buffer().parseTo().object({
   *   key: schema().number(),
   * });
   *
   * console.log(objectSchema.parse(Buffer.from('{"key":123}')));
   * // { key: 123 }
   */
  object: <Shape extends Record<string, SchemaType<any, any>>>(
    schema: Shape,
    config?: SchemaConfig,
  ) => SchemaBufferParseToObject<Shape, Opts, Flags>;
};

export type SchemaAllowedBufferMethods<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaBufferFlags,
  I = Buffer,
> = {
  /**
   * Adds a custom validation method to the Buffer schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current Buffer value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's original type (Buffer).
   *   - If a generic type parameter is provided (e.g., `<string>`), it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented either synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   * It should call `context.success(newValue)` if validation passes, or
   * `context.failed(errorMessage)` if it fails.
   * If no type parameter is specified, the schema’s original type (Buffer) is preserved.
   * If a type parameter is specified (e.g., `<string>`), it enforces that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's original Buffer type):
   * const schemaCustom = schema().buffer().custom((context) => {
   *   if (context.value.equals(Buffer.from("valid"))) {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse(Buffer.from("valid"));
   * console.log(result);
   * // <Buffer 76 61 6c 69 64> (or equivalent)
   *
   * @example
   * // Custom validation with type transformation:
   * // In this example, the custom method enforces that context.success returns a string.
   * const schemaCustom = schema()
   *   .buffer()
   *   .custom<string>((context) => {
   *     if (context.value.equals(Buffer.from("success"))) {
   *       context.success("ok");
   *     } else {
   *       context.failed("Custom validation failed");
   *     }
   *   });
   *
   * const result = schemaCustom.parse(Buffer.from("success"));
   * console.log(result); // "ok"
   */
  custom: <O = SchemaWithOptionalAndNullable<I, Opts>>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<I, Opts>, O>,
  ) => SchemaBufferCustom<I, Opts, O>;

  /**
   * Returns an object with conversion methods that allow you to transform the Buffer value
   * before performing further validations.
   *
   * This method supports two main contexts:
   *
   * 1. **Chaining Conversions:** The conversion methods (such as `string()`, `number()`, `bigInt()`, etc.)
   *    transform the original value so that subsequent validations work with the newly converted value.
   *    For example, converting a Buffer to a string allows you to chain string validations.
   *
   * 2. **Accessing the Parsed Value:** After running the validation (via `.test()` or `.testAsync()`),
   *    the final converted value is stored in the test result’s `.value` property. This lets you retrieve
   *    the processed value as it was transformed through the conversion chain.
   *
   * @returns {SchemaParseToMethod} An object containing conversion methods for:
   * - string
   * - number
   * - bigInt
   * - boolean
   * - date
   * - array
   * - object
   *
   * @example
   * // Example: Chaining conversion – convert a Buffer to a string for further tests.
   * const schemaBufferToString = schema().buffer().parseTo().string();
   *
   * const result = schemaBufferToString.parse(Buffer.from("Hello"));
   *
   * // In the chain above, the Buffer is converted to the string "Hello" before testing.
   * console.log(result); // "Hello"
   */
  parseTo: <I2 = I>() => SchemaBufferParseToMethod<I2, Opts, Flags>;
} & (Flags["equalApplied"] extends false
  ? {
      /**
       * Adds an equality validation rule to a buffer schema.
       *
       * This method extends a buffer schema by enforcing that the input value exactly matches a specified target value.
       * If the input does not match the target, the validation will fail.
       *
       * @param {T} valueToCompare - The target Buffer that the input buffer must equal.
       *
       * @example
       * const valueToCompare = Buffer.from("data");
       * const equalSchema = schema().buffer().equal(valueToCompare);
       *
       * console.log(equalSchema.validate(Buffer.from("data")));      // true
       * console.log(equalSchema.validate(Buffer.from("different"))); // false
       *
       * @param {SchemaConfig} [config] - Optional configuration for the equality validation.
       * @param {string} [config.message] - A custom error message template for validation failures.
       * This message can include the following placeholders:
       *   - `[valueName]`: Replaced with the name of the field being validated.
       *   - `[value]`: Replaced with the actual value received.
       *   - `[valueToCompare]`: Replaced with the target value.
       *
       * @example
       * // Using a custom error message:
       * const customEqualSchema = schema().buffer().equal(Buffer.from("data"), {
       *   message: "[valueName] must exactly match [valueToCompare], but got [value]"
       * });
       *
       * const test = customEqualSchema.test(Buffer.from("different"), "file");
       *
       * console.log(test.errors[0].message);
       * // "file must exactly match data, but got different"
       */
      equal: (
        valueToCompare: Buffer,
        config?: SchemaConfig,
      ) => SchemaGenericBufferType<SchemaMerge<Opts, { equal: true }>, SchemaMerge<Flags, { equalApplied: true }>, Buffer>;
    }
  : {}) &
  (Flags["notEqualApplied"] extends false
    ? {
        /**
         * Adds a not-equal validation rule to a buffer schema.
         *
         * This method extends a buffer schema by enforcing that the input value does not exactly match a specified target value.
         * If the input value matches the target, the validation will fail.
         *
         * @param {Buffer} valueToCompare - The target Buffer that the input buffer must not equal.
         *
         * @example
         * const notEqualSchema = schema().buffer().notEqual(Buffer.from("forbidden"));
         *
         * console.log(notEqualSchema.validate(Buffer.from("allowed")));   // true
         * console.log(notEqualSchema.validate(Buffer.from("forbidden"))); // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the not-equal validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *   - `[valueToCompare]`: Replaced with the target value.
         *
         * @example
         * // Using a custom error message:
         * const customNotEqualSchema = schema().buffer().notEqual(Buffer.from("forbidden"), {
         *   message: "[valueName] must not equal [valueToCompare], but got [value]"
         * });
         *
         * const test = customNotEqualSchema.test(Buffer.from("forbidden"), "file");
         *
         * console.log(test.errors[0].message);
         * // "file must not equal forbidden, but got forbidden"
         */
        notEqual: (
          valueToCompare: Buffer,
          config?: SchemaConfig,
        ) => SchemaGenericBufferType<Opts, SchemaMerge<Flags, { equalApplied: true }>, I>;
      }
    : {}) &
  (Flags["oneOfApplied"] extends false
    ? {
        /**
         * Adds a one-of validation rule to a buffer schema.
         *
         * This method extends a buffer schema by enforcing that the input value must exactly match one of the values
         * provided in the `comparisonItems` array. If the input does not match any of the specified values, the validation will fail.
         *
         * @param {Buffer[]} comparisonItems - An array of allowed Buffer values. The input value must match one of these values.
         *
         * @example
         * const oneOfSchema = schema().buffer().oneOf([Buffer.from("hello"), Buffer.from("world")]);
         *
         * console.log(oneOfSchema.validate(Buffer.from("hi")));      // false
         * console.log(oneOfSchema.validate(Buffer.from("hello")));   // true
         * console.log(oneOfSchema.validate(Buffer.from("world")));   // true
         *
         * @param {SchemaConfig} [config] - Optional configuration for the one-of validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual value received.
         *
         * @example
         * // Using a custom error message:
         * const customOneOfSchema = schema().buffer().oneOf([Buffer.from("hello"), Buffer.from("world")], {
         *   message: "[valueName] must be either 'hello' or 'world', but got [value]"
         * });
         *
         * const test = customOneOfSchema.test(Buffer.from("hi"), "greeting");
         *
         * console.log(test.errors[0].message);
         * // "greeting must be either 'hello' or 'world', but got hi"
         */
        oneOf: (
          comparisonItems: Buffer[],
          config?: SchemaConfig,
        ) => SchemaGenericBufferType<
          Opts,
          SchemaMerge<Flags, { oneOfApplied: true; equalApplied: true; notEqualApplied: true }>,
          Buffer
        >;
      }
    : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   objKey: schema().buffer()
         * });
         *
         * const testWithoutAlias = schemaWithoutAlias.test({ objKey: "not a buffer" });
         *
         * console.log(testWithoutAlias.errors[0].message);
         * // "objKey must be a Buffer type!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   objKey: schema().buffer().alias('object key')
         * });
         *
         * const testWithAlias = schemaWithAlias.test({ objKey: "not a buffer" });
         *
         * console.log(testWithAlias.errors[0].message);
         * // "object key must be a Buffer type!"
         */
        alias: (
          valueName: string,
        ) => SchemaGenericBufferType<SchemaMerge<Opts, { alias: Buffer }>, SchemaMerge<Flags, { aliasApplied: true }>, I>;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a buffer schema.
         *
         * This method extends a buffer schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default value.
         *
         * @param {Buffer} value - The default value to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default value Buffer.from("default value") is used:
         * const defaultSchema = schema().buffer().default(Buffer.from("default value"));
         * console.log(defaultSchema.parse(undefined));
         * // <Buffer 64 65 66 61 75 6c 74 20 76 61 6c 75 65>
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse(Buffer.from("hello")));
         * // <Buffer 68 65 6c 6c 6f>
         */
        default: (
          value: Buffer,
        ) => SchemaGenericBufferType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the buffer schema as not required.
         *
         * This method modifies a buffer schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the Buffer type.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().buffer().notRequired();
         *
         * console.log(optionalSchema.validate(Buffer.from("data"))); // true
         * console.log(optionalSchema.validate(undefined));            // true
         * console.log(optionalSchema.validate(null));                // false
         */
        notRequired: () => SchemaGenericBufferType<
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the buffer schema as nullable.
         *
         * This method modifies a buffer schema to allow the input value to be either a Buffer or null.
         * When applied, the schema will consider null values as valid alongside Buffer values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().buffer().nullable();
         *
         * console.log(nullableSchema.validate(Buffer.from("data"))); // true
         * console.log(nullableSchema.validate(null));                // true
         * console.log(nullableSchema.validate(undefined));            // false
         */
        nullable: () => SchemaGenericBufferType<
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericBufferType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaBufferFlags,
  I = Buffer,
> = SchemaType<
  Flags["oneOfApplied"] extends true
    ? SchemaWithOptionalAndNullable<I, Opts>
    : Opts["equal"] extends true
      ? SchemaWithOptionalAndNullable<I, Opts>
      : Opts["default"] extends true
        ? Buffer
        : SchemaWithOptionalAndNullable<Buffer, Opts>,
  SchemaWithOptionalAndNullable<I, Opts>
> &
  SchemaAllowedBufferMethods<Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Flags["oneOfApplied"] extends true
          ? SchemaWithOptionalAndNullable<I, Opts>
          : Opts["equal"] extends true
            ? SchemaWithOptionalAndNullable<I, Opts>
            : Opts["default"] extends true
              ? Buffer
              : SchemaWithOptionalAndNullable<Buffer, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

// Function Method Types

export type SchemaDefaultFunctionOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
};

export interface SchemaFunctionFlags {
  aliasApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultFunctionFlags = {
  aliasApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

type ForceFunctionIfNotDifferent<O> = [O] extends [Function] ? Function : O;

type SchemaFunctionCustom<
  I = Function,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  } = any,
  O = SchemaWithOptionalAndNullable<I, Opts>,
> = SchemaGenericCustomType<
  SchemaWithOptionalAndNullable<I, Opts>,
  SchemaWithOptionalAndNullable<ForceFunctionIfNotDifferent<O>, Opts>,
  Opts,
  O
>;

export type SchemaAllowedFunctionMethods<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  },
  Flags extends SchemaFunctionFlags,
  I = Function,
> = {
  /**
   * Adds a custom validation method to the function schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current function value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's original type (function).
   *   - If a generic type parameter is provided (e.g., `<number>`), it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented either synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   *        It should call `context.success(newValue)` if validation passes, or
   *        `context.failed(errorMessage)` if it fails.
   *        If no type parameter is specified, the schema’s original type (function) is preserved.
   *        If a type parameter is specified (e.g., `<number>`), it enforces that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's original function type):
   * const schemaCustom = schema().function().custom((context) => {
   *   // Check if the function has a specific name (as an example of validation)
   *   if (context.value.name === "validFunction") {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * // Passing a function with the name "validFunction"
   * const result = schemaCustom.parse(() => "custom function");
   * console.log(result); // () => "custom function"
   *
   * @example
   * // Custom validation with type transformation:
   * // In this example, the custom method enforces that context.success returns a number.
   * const schemaCustom = schema().function().custom<number>((context) => {
   *   // Call the function and check its return value
   *   if (context.value() === 123) {
   *     context.success(123);
   *   } else {
   *     context.failed("Custom validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse(() => 123);
   * console.log(result); // 123
   */
  custom: <O = SchemaWithOptionalAndNullable<I, Opts>>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<I, Opts>, O>,
  ) => SchemaFunctionCustom<I, Opts, O>;
} & (Flags["aliasApplied"] extends false
  ? {
      /**
       * Adds an alias to a schema property.
       *
       * This method allows you to rename the field key in error messages for clearer output
       * when validating objects. When used, the alias value will replace the original key
       * name in validation error messages.
       *
       * @param {string} valueName - The alias name to be used in error messages.
       * @returns {SchemaAliasMethod} Chainable alias schema.
       *
       * @example
       * // Without alias, the error message uses the actual key name.
       * const schemaWithoutAlias = schema().object({
       *   objKey: schema().function()
       * });
       *
       * const testWithoutAlias = schemaWithoutAlias.test({ objKey: "not a function" });
       *
       * console.log(testWithoutAlias.errors[0].message);
       * // "objKey must be a function type!"
       *
       * // With alias, the error message uses the provided alias.
       * const schemaWithAlias = schema().object({
       *   objKey: schema().function().alias('object key')
       * });
       *
       * const testWithAlias = schemaWithAlias.test({ objKey: "not a function" });
       *
       * console.log(testWithAlias.errors[0].message);
       * // "object key must be a function type!"
       */
      alias: (valueName: string) => SchemaGenericFunctionType<Opts, SchemaMerge<Flags, { aliasApplied: true }>, I>;
    }
  : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a function schema.
         *
         * This method extends a function schema by specifying a default function that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default function.
         *
         * @param {Function} value - The default function to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default function is used:
         * const defaultSchema = schema().function().default(
         *   () => () => "default function"
         * );
         * console.log(defaultSchema.parse(undefined)); // "default function"
         *
         * // If the input is provided, that function is used:
         * const customFunction = () => "custom function";
         * console.log(defaultSchema.parse(customFunction));
         * // () => "custom function"
         */
        default: (
          value: Function,
        ) => SchemaGenericFunctionType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the function schema as not required.
         *
         * This method modifies a function schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the function type.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().function().notRequired();
         *
         * console.log(optionalSchema.validate(() => {}));   // true
         * console.log(optionalSchema.validate(undefined));  // true
         * console.log(optionalSchema.validate(null));       // false
         */
        notRequired: () => SchemaGenericFunctionType<
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the function schema as nullable.
         *
         * This method modifies a function schema to allow the input value to be either a function or null.
         * When applied, the schema will consider null values as valid alongside function values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().function().nullable();
         *
         * console.log(nullableSchema.validate(() => {})); // true
         * console.log(nullableSchema.validate(null));       // true
         * console.log(nullableSchema.validate(undefined));  // false
         */
        nullable: () => SchemaGenericFunctionType<
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericFunctionType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  },
  Flags extends SchemaFunctionFlags,
  I = Function,
> = SchemaType<
  Opts["default"] extends true ? Function : SchemaWithOptionalAndNullable<Function, Opts>,
  SchemaWithOptionalAndNullable<I, Opts>
> &
  SchemaAllowedFunctionMethods<Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Opts["default"] extends true ? Function : SchemaWithOptionalAndNullable<Function, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

// Date Method Types

export type SchemaDefaultDateOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
  equal: boolean;
};

export interface SchemaDateFlags {
  minApplied: boolean;
  maxApplied: boolean;
  aliasApplied: boolean;
  defaultApplied: boolean;
  equalApplied: boolean;
  notEqualApplied: boolean;
  oneOfApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultDateFlags = {
  minApplied: false;
  maxApplied: false;
  aliasApplied: false;
  defaultApplied: false;
  equalApplied: false;
  oneOfApplied: false;
  notEqualApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

type ForceDateIfNotDifferent<O> = [O] extends [Date] ? Date : O;

type SchemaDateCustom<
  I = Date,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  O = SchemaWithOptionalAndNullable<I, Opts>,
> = SchemaGenericCustomType<
  SchemaWithOptionalAndNullable<Date, Opts>,
  SchemaWithOptionalAndNullable<ForceDateIfNotDifferent<O>, Opts>,
  Opts,
  O
>;

type SchemaDateParseToString<
  I2 = Date,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaDateFlags = any,
> = SchemaGenericStringType<
  SchemaDefaultStringOptions,
  {
    minLengthApplied: false;
    maxLengthApplied: false;
    minWordApplied: false;
    emailApplied: false;
    UUIDApplied: false;
    timeApplied: false;
    regexApplied: false;
    dateApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaDateParseToNumber<
  I2 = Date,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaDateFlags = any,
> = SchemaGenericNumberType<
  SchemaDefaultNumberOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    equalApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaDateParseToBigInt<
  I2 = Date,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaDateFlags = any,
> = SchemaGenericBigIntType<
  SchemaDefaultBigIntOptions,
  {
    floatApplied: false;
    integerApplied: false;
    minApplied: false;
    maxApplied: false;
    positiveApplied: false;
    negativeApplied: false;
    notEqualApplied: false;
    oneOfApplied: false;
    equalApplied: false;
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaDateParseToBoolean<
  I2 = Date,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaDateFlags = any,
> = SchemaGenericBooleanType<
  SchemaDefaultBooleanOptions,
  {
    aliasApplied: Flags["aliasApplied"];
    defaultApplied: Flags["defaultApplied"];
    notRequiredApplied: true;
    nullableApplied: true;
    equalApplied: false;
    oneOfApplied: false;
    notEqualApplied: false;
  },
  SchemaWithOptionalAndNullable<I2, Opts>
>;

type SchemaDateParseToMethod<
  I2 = Date,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  } = any,
  Flags extends SchemaDateFlags = any,
> = {
  /**
   * Converts a date value to a string.
   *
   * This method is used in a conversion chain to transform a date input into a string,
   * allowing you to perform string validations on the converted value. When used, the original date
   * is converted to its string representation (using a default format, such as "YYYY/MM/DD HH:MM:SS.MS")
   * before further tests are executed.
   *
   * @example
   * const stringSchema = schema().date().parseTo().string();
   *
   * console.log(stringSchema.parse(new Date("2025/03/19 00:00:00.000")));
   * // "2025/03/19 00:00:00.000"
   */
  string: (config?: SchemaConfig) => SchemaDateParseToString<I2, Opts, Flags>;

  /**
   * Converts a date value to a number.
   *
   * This method is used in a conversion chain to transform a date input into a number,
   * allowing you to perform numeric validations on the converted value. When used, the original date
   * is converted to its numeric representation (typically the Unix timestamp in milliseconds)
   * before further tests are executed.
   *
   * @example
   * const numberSchema = schema().date().parseTo().number();
   *
   * console.log(numberSchema.parse(new Date("2025/03/19 00:00:00.000")));
   * // 1742353200000
   */
  number: (config?: SchemaConfig) => SchemaDateParseToNumber<I2, Opts, Flags>;

  /**
   * Converts a date value to a BigInt.
   *
   * This method is used in a conversion chain to transform a date input into a BigInt,
   * allowing you to perform BigInt validations on the converted value. When used, the original date
   * is converted to its BigInt representation (typically the Unix timestamp in milliseconds as a BigInt)
   * before further tests are executed.
   *
   * @example
   * const bigIntSchema = schema().date().parseTo().bigInt();
   *
   * console.log(bigIntSchema.parse(new Date("2025/03/19 00:00:00.000")));
   * // 1742353200000n
   */
  bigInt: (config?: SchemaConfig) => SchemaDateParseToBigInt<I2, Opts, Flags>;

  /**
   * Converts a date value to a boolean.
   *
   * This method is used in a conversion chain to transform a date input into a boolean,
   * allowing you to perform boolean validations on the converted value. When used, the original date
   * is converted to its boolean representation before further tests are executed.
   *
   * @example
   * const booleanSchema = schema().date().parseTo().boolean();
   *
   * console.log(booleanSchema.parse(new Date("2025/03/19 00:00:00.000")));
   * // true
   *
   * const booleanNotRequiredSchema = schema().date().notRequired().parseTo().boolean();
   *
   * console.log(booleanSchema.parse(undefined));
   * // false
   */
  boolean: (config?: SchemaConfig) => SchemaDateParseToBoolean<I2, Opts, Flags>;
};

export type SchemaAllowedDateMethods<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaDateFlags,
  I = Date,
> = {
  /**
   * Adds a custom validation method to the date schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current Date value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's original type (Date).
   *   - If a generic type parameter is provided (e.g., `<string>` when used on a date schema), it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented either synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   * It should call `context.success(newValue)` if validation passes, or
   * `context.failed(errorMessage)` if it fails.
   * If no type parameter is specified, the schema’s original type is preserved.
   * If a type parameter is specified (e.g., `<string>`), it enforces that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's original Date type):
   * const schemaCustom = schema().date().custom((context) => {
   *   const targetDate = new Date("2025-03-19T00:00:00.000Z");
   *   if (context.value.getTime() === targetDate.getTime()) {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse(new Date("2025-03-19T00:00:00.000Z"));
   * console.log(result); // 2025-03-19T00:00:00.000Z
   *
   * @example
   * // Custom validation with type transformation:
   * // In this example, the custom method enforces that context.success returns a string.
   * const schemaCustom = schema()
   *   .date()
   *   .custom<string>((context) => {
   *     const targetDate = new Date("2025-03-19T00:00:00.000Z");
   *     if (context.value.getTime() === targetDate.getTime()) {
   *       context.success("ok");
   *     } else {
   *       context.failed("Custom validation failed");
   *     }
   *   });
   *
   * const result = schemaCustom.parse(new Date("2025-03-19T00:00:00.000Z"));
   * console.log(result); // "ok"
   */
  custom: <O = SchemaWithOptionalAndNullable<ForceDateIfNotDifferent<Date>, Opts>>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<Date, Opts>, O>,
  ) => SchemaDateCustom<I, Opts, O>;

  parseTo: <I2 = I>() => SchemaDateParseToMethod<I2, Opts, Flags>;
} & (Flags["minApplied"] extends false
  ? {
      /**
       * Adds a minimum value validation rule to a date schema.
       *
       * This method extends a date schema by enforcing that the input Date value must be greater than or equal to a specified minimum.
       * The configuration object must include a `min` property, which sets this minimum Date.
       *
       * **Note:** The date values are expected to be in UTC format (e.g., "YYYY/MM/DD HH:MM:SS.MS").
       *
       * @param {Object} config - The configuration for the minimum value validation.
       * @param {Date} config.min - The minimum Date required.
       *
       * @example
       * const minSchema = schema().date().min({ min: new Date("2020/01/01 00:00:00.000") });
       *
       * console.log(minSchema.validate(new Date("2020/01/01 00:00:00.000")));
       * // true
       * console.log(minSchema.validate(new Date("2020/06/01 00:00:00.000")));
       * // true
       * console.log(minSchema.validate(new Date("2019/12/31 23:59:59.999")));
       * // false
       *
       * @param {string} [config.message] - An optional custom error message template.
       * This message can include the following placeholders:
       *   - `[valueName]`: Replaced with the name of the field being validated.
       *   - `[value]`: Replaced with the actual Date value received.
       *   - `[min]`: Replaced with the specified minimum Date.
       *
       * @example
       * const customMinSchema = schema().date().min({
       *   min: new Date("2020/01/01 00:00:00.000"),
       *   message: "[valueName] must be on or after [min], but got [value]"
       * });
       *
       * const test = customMinSchema.test(new Date("2019/12/31 23:59:59.999"), "startDate");
       *
       * console.log(test.errors[0].message);
       * // "startDate must be on or after 2020/01/01 00:00:00.000, but got 2019/12/31 23:59:59.999"
       */
      min: (config: SchemaDateMinConfig) => SchemaGenericDateType<Opts, SchemaMerge<Flags, { minApplied: true }>, I>;
    }
  : {}) &
  (Flags["maxApplied"] extends false
    ? {
        /**
         * Adds a maximum value validation rule to a date schema.
         *
         * This method extends a date schema by enforcing that the input Date value must be less than or equal to a specified maximum.
         * The configuration object must include a `max` property, which sets this maximum Date.
         *
         * **Note:** The date values are expected to be in UTC format (e.g., "YYYY/MM/DD HH:MM:SS.MS").
         *
         * @param {Object} config - The configuration for the maximum value validation.
         * @param {Date} config.max - The maximum Date allowed.
         *
         * @example
         * const maxSchema = schema().date().max({ max: new Date("2020/12/31 23:59:59.999") });
         *
         * console.log(maxSchema.validate(new Date("2020/12/31 23:59:59.999")));
         * // true
         * console.log(maxSchema.validate(new Date("2020/06/01 00:00:00.000")));
         * // true
         * console.log(maxSchema.validate(new Date("2021/01/01 00:00:00.000")));
         * // false
         *
         * @param {string} [config.message] - An optional custom error message template.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual Date value received (formatted as "YYYY/MM/DD HH:MM:SS.MS").
         *   - `[max]`: Replaced with the specified maximum Date (formatted as "YYYY/MM/DD HH:MM:SS.MS").
         *
         * @example
         * const customMaxSchema = schema().date().max({
         *   max: new Date("2020/12/31 23:59:59.999"),
         *   message: "[valueName] must be on or before [max], but got [value]"
         * });
         *
         * const test = customMaxSchema.test(new Date("2021/01/01 00:00:00.000"), "endDate");
         *
         * console.log(test.errors[0].message);
         * // "endDate must be on or before 2020/12/31 23:59:59.999, but got 2021/01/01 00:00:00.000"
         */
        max: (config: SchemaDateMaxConfig) => SchemaGenericDateType<Opts, SchemaMerge<Flags, { maxApplied: true }>, I>;
      }
    : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   objKey: schema().date()
         * });
         *
         * // Here, an invalid value is provided (not a Date object)
         * const testWithoutAlias = schemaWithoutAlias.test({ objKey: "invalid-date" });
         *
         * console.log(testWithoutAlias.errors[0].message);
         * // "objKey must be a Date type!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   objKey: schema().date().alias('event date')
         * });
         *
         * const testWithAlias = schemaWithAlias.test({ objKey: "invalid-date" });
         *
         * console.log(testWithAlias.errors[0].message);
         * // "event date must be a Date type!"
         */
        alias: (valueName: string) => SchemaGenericDateType<Opts, SchemaMerge<Flags, { aliasApplied: true }>, I>;
      }
    : {}) &
  (Flags["equalApplied"] extends false
    ? {
        /**
         * Adds an equality validation rule to a date schema.
         *
         * This method extends a date schema by enforcing that the input value exactly matches a specified target Date.
         * If the input does not match the target, the validation will fail.
         *
         * **Note:** By default, dates in error messages are formatted as "YYYY/MM/DD HH:MM:SS.MS".
         *
         * @param {T} valueToCompare - The target Date that the input date must equal.
         *
         * @example
         * const valueToCompare = new Date("2025-03-19T00:00:00.000Z");
         * const equalSchema = schema().date().equal(valueToCompare);
         *
         * console.log(equalSchema.validate(new Date("2025-03-19T00:00:00.000Z")));
         * // true
         * console.log(equalSchema.validate(new Date("2025-04-01T00:00:00.000Z")));
         * // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the equality validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual Date value received (formatted as "YYYY/MM/DD HH:MM:SS.MS").
         *   - `[valueToCompare]`: Replaced with the target Date (formatted as "YYYY/MM/DD HH:MM:SS.MS").
         *
         * @example
         * // Using a custom error message:
         * const customEqualSchema = schema().date().equal(
         *   new Date("2025-03-19T00:00:00.000Z"),
         *   { message: "[valueName] must be equal to [valueToCompare] (formatted as YYYY/MM/DD HH:MM:SS.MS), but got [value]" }
         * );
         *
         * const test = customEqualSchema.test(new Date("2025-04-01T00:00:00.000Z"), "eventDate");
         *
         * console.log(test.errors[0].message);
         * // "eventDate must be equal to 2025/03/19 00:00:00.000, but got 2025/04/01 00:00:00.000"
         */
        equal: <T extends Date>(
          valueToCompare: T,
          config?: SchemaConfig,
        ) => SchemaGenericDateType<
          SchemaMerge<Opts, { equal: true }>,
          SchemaMerge<Flags, { equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["notEqualApplied"] extends false
    ? {
        /**
         * Adds a not-equal validation rule to a date schema.
         *
         * This method extends a date schema by enforcing that the input value does not exactly match a specified target date.
         * If the input value matches the target, the validation will fail.
         *
         * **Note:** By default, dates in error messages are formatted as "YYYY/MM/DD HH:MM:SS.MS".
         *
         * @param {Date} valueToCompare - The target Date that the input date must not equal.
         *
         * @example
         * const notEqualSchema = schema().date().notEqual(
         *   new Date("2025/03/19 00:00:00.000")
         * );
         *
         * console.log(notEqualSchema.validate(new Date("2025/03/20 00:00:00.000")));
         * // true
         * console.log(notEqualSchema.validate(new Date("2025/03/19 00:00:00.000")));
         * // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the not-equal validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual Date value received, formatted as "YYYY/MM/DD HH:MM:SS.MS".
         *   - `[valueToCompare]`: Replaced with the target Date, formatted as "YYYY/MM/DD HH:MM:SS.MS".
         *
         * @example
         * // Using a custom error message:
         * const customNotEqualSchema = schema().date().notEqual(
         *   new Date("2025/03/19 00:00:00.000"),
         *   { message: "[valueName] must not be [valueToCompare], but got [value]" }
         * );
         *
         * const test = customNotEqualSchema.test(new Date("2025/03/19 00:00:00.000"), "eventDate");
         *
         * console.log(test.errors[0].message);
         * // "eventDate must not be 2025/03/19 00:00:00.000, but got 2025/03/19 00:00:00.000"
         */
        notEqual: (
          valueToCompare: Date,
          config?: SchemaConfig,
        ) => SchemaGenericDateType<Opts, SchemaMerge<Flags, { equalApplied: true }>, I>;
      }
    : {}) &
  (Flags["oneOfApplied"] extends false
    ? {
        /**
         * Adds a one-of validation rule to a date schema.
         *
         * This method extends a date schema by enforcing that the input value must exactly match one of the Date values
         * provided in the `comparisonItems` array. If the input does not match any of the specified dates, the validation will fail.
         *
         * **Note:** By default, dates in error messages are formatted as "YYYY/MM/DD HH:MM:SS.MS".
         *
         * @param {Date[]} comparisonItems - An array of allowed Date values. The input value must match one of these dates.
         *
         * @example
         * const allowedDates = [
         *   new Date("2025/03/19 00:00:00.000"),
         *   new Date("2025/04/01 00:00:00.000")
         * ];
         *
         * const oneOfSchema = schema().date().oneOf(allowedDates);
         *
         * console.log(oneOfSchema.validate(new Date("2025/03/19 00:00:00.000")));
         * // true
         * console.log(oneOfSchema.validate(new Date("2025/03/20 00:00:00.000")));
         * // false
         *
         * @param {SchemaConfig} [config] - Optional configuration for the one-of validation.
         * @param {string} [config.message] - A custom error message template for validation failures.
         * This message can include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual Date value received (formatted as "YYYY/MM/DD HH:MM:SS.MS").
         *
         * @example
         * // Using a custom error message:
         * const customOneOfSchema = schema().date().oneOf(allowedDates, {
         *   message: "[valueName] must be one of the allowed dates, but got [value]"
         * });
         *
         * const test = customOneOfSchema.test(new Date("2025/03/20 00:00:00.000"), "eventDate");
         *
         * console.log(test.errors[0].message);
         * // "eventDate must be one of the allowed dates, but got 2025/03/20 00:00:00.000" (formatted accordingly)
         */
        oneOf: <T extends Date>(
          comparisonItems: T[],
          config?: SchemaConfig,
        ) => SchemaGenericDateType<
          Opts,
          SchemaMerge<Flags, { oneOfApplied: true; equalApplied: true; notEqualApplied: true }>,
          T
        >;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a date schema.
         *
         * This method extends a date schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default Date.
         *
         * @param {Date} value - The default Date to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default Date is used:
         * const defaultSchema = schema().date().default(new Date("2025-03-19T00:00:00.000Z"));
         * console.log(defaultSchema.parse(undefined));
         * // 2025-03-19T00:00:00.000Z
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse(new Date("2020-01-01T00:00:00.000Z")));
         * // 2020-01-01T00:00:00.000Z
         */
        default: (
          value: Date,
        ) => SchemaGenericDateType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the date schema as not required.
         *
         * This method modifies a date schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to a date format.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().date().notRequired();
         *
         * console.log(optionalSchema.validate(new Date())); // true
         * console.log(optionalSchema.validate(undefined));   // true
         * console.log(optionalSchema.validate(null));       // false
         */
        notRequired: () => SchemaGenericDateType<
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the date schema as nullable.
         *
         * This method modifies a date schema to allow the input value to be either a date or null.
         * When applied, the schema will consider null values as valid alongside date values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().date().nullable();
         *
         * console.log(nullableSchema.validate(new Date())); // true
         * console.log(nullableSchema.validate(null));       // true
         * console.log(nullableSchema.validate(undefined));   // false
         */
        nullable: () => SchemaGenericDateType<
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericDateType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    equal: boolean;
  },
  Flags extends SchemaDateFlags,
  I = Date,
  O = I,
> = SchemaType<
  Flags["oneOfApplied"] extends true
    ? SchemaWithOptionalAndNullable<I, Opts>
    : Opts["equal"] extends true
      ? SchemaWithOptionalAndNullable<I, Opts>
      : Opts["default"] extends true
        ? Date
        : SchemaWithOptionalAndNullable<O, Opts>,
  SchemaWithOptionalAndNullable<I, Opts>
> &
  SchemaAllowedDateMethods<Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Flags["oneOfApplied"] extends true
          ? SchemaWithOptionalAndNullable<I, Opts>
          : Opts["equal"] extends true
            ? SchemaWithOptionalAndNullable<I, Opts>
            : Opts["default"] extends true
              ? Date
              : SchemaWithOptionalAndNullable<O, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

export type SchemaDateTypes =
  | "ISO8601"
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "DD-MM-YYYY"
  | "MM-DD-YYYY"
  | "YYYY/MM/DD"
  | "YYYY/DD/MM"
  | "YYYY-MM-DD"
  | "YYYY-DD-MM";

export interface SchemaDateConfig extends SchemaConfig {
  type: SchemaDateTypes;
}

export interface SchemaDateMinConfig extends SchemaConfig {
  min: Date;
}

export interface SchemaDateMaxConfig extends SchemaConfig {
  max: Date;
}

// Array Method Types

export type SchemaDefaultArrayOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
};

export interface SchemaArrayFlags {
  minApplied: boolean;
  maxApplied: boolean;
  aliasApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultArrayFlags = {
  minApplied: false;
  maxApplied: false;
  aliasApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

type SchemaArrayParseToMethod<
  I2 = any[],
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  } = any,
> = {
  /**
   * Converts an array value to a string.
   *
   * This method is used in a conversion chain to transform an array input into its string representation,
   * allowing you to perform string validations on the converted value. When used, the entire array is converted
   * to a single string (for example, using JSON.stringify) before further tests are executed.
   *
   * @example
   * const stringSchema = schema().array(
   *   schema().number()
   * ).parseTo().string();
   *
   * console.log(stringSchema.parse([123, 456]));
   * // "[123,456]"
   */
  string: (
    config?: SchemaConfig,
  ) => SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags, SchemaWithOptionalAndNullable<I2, Opts>>;

  /**
   * Converts an array value to a Buffer.
   *
   * This method is used in a conversion chain to transform an array input into a Buffer,
   * allowing you to perform buffer validations on the converted value. When used, the input array
   * is directly converted into a Buffer using `Buffer.from(value)`.
   *
   * @example
   * const bufferSchema = schema().array(
   *   schema().number()
   * ).parseTo().buffer();
   *
   * console.log(bufferSchema.parse([1, 2, 3]));
   * // <Buffer 7b c8>
   */
  buffer: (
    config?: SchemaConfig,
  ) => SchemaGenericBufferType<SchemaDefaultBufferOptions, SchemaDefaultBufferFlags, SchemaWithOptionalAndNullable<I2, Opts>>;

  /**
   * Converts an array value to a boolean.
   *
   * This method is used in a conversion chain to transform an entire array input into a boolean,
   * allowing you to perform boolean validations on the converted value. The conversion is performed using
   * JavaScript's native truthiness evaluation. Since arrays are objects and are always truthy—even an empty array
   * will be converted to `true`—this method will always return `true` when the input is an array.
   *
   * @example
   * const booleanSchema = schema().array(schema().number()).parseTo().boolean();
   *
   * console.log(booleanSchema.parse([123, 456])); // true (non-empty array is truthy)
   * console.log(booleanSchema.parse([]));         // true (empty array is also truthy)
   */
  boolean: (
    config?: SchemaConfig,
  ) => SchemaGenericBooleanType<
    SchemaDefaultBooleanOptions,
    SchemaDefaultBooleanFlags,
    SchemaWithOptionalAndNullable<I2, Opts>
  >;
};

export type SchemaAllowedArrayMethods<
  Item extends SchemaType<any, any>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  },
  Flags extends SchemaArrayFlags,
  I = any[],
> = {
  /**
   * Adds a custom validation method to the array schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current array being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's original type.
   *   - If a generic type parameter is provided (e.g., `<string[]>` when used on an array schema), it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented either synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   * It should call `context.success(newValue)` if validation passes, or
   * `context.failed(errorMessage)` if it fails.
   * If no type parameter is specified, the schema’s original type is preserved.
   * If a type parameter is specified (e.g., `<string[]>`), it enforces that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's original array type):
   * const schemaCustom = schema().array(
   *   schema().number()
   * ).custom((context) => {
   *   if (Array.isArray(context.value) && context.value.length > 0) {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse([1, 2, 3]);
   * console.log(result); // [1, 2, 3]
   *
   * @example
   * // Custom validation with type transformation:
   * // In this example, the custom method enforces that context.success returns a string array.
   * const schemaCustom = schema().array(
   *   schema().number()
   * ).custom<string[]>((context) => {
   *   if (context.value.every(num => num > 0)) {
   *     context.success(context.value.map(num => `Number: ${num}`));
   *   } else {
   *     context.failed("Custom validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse([1, 2, 3]);
   *
   * console.log(result);
   * // ["Number: 1", "Number: 2", "Number: 3"]
   */
  custom: <O = I>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<I, Opts>, O>,
  ) => SchemaGenericCustomType<SchemaWithOptionalAndNullable<I, Opts>, O>;

  /**
   * Returns an object with conversion methods that allow you to transform the array value
   * before performing further validations.
   *
   * This method supports two main contexts:
   *
   * 1. **Chaining Conversions:** The conversion methods (such as `string()`, `buffer()`, `boolean()`)
   *    transform the original array so that subsequent validations work with the newly converted value.
   *    For example, converting an array of numbers into an array of strings allows you to chain string validations.
   *
   * 2. **Accessing the Parsed Value:** After running the validation (via `.test()` or `.testAsync()`),
   *    the final converted value is stored in the test result’s `.value` property. This lets you retrieve
   *    the processed value as it was transformed through the conversion chain.
   *
   * @returns {SchemaParseToMethod} An object containing conversion methods for:
   * - string
   * - buffer
   * - boolean
   *
   * @example
   * // Example: Chaining conversion – convert an array of numbers to an array of strings.
   * const schemaArrayToString = schema().array(schema().number()).parseTo().string();
   *
   * const result = schemaArrayToString.parse([1, 2, 3]);
   *
   * // In the chain above, the array [1, 2, 3] is converted to ["1", "2", "3"] before testing.
   * console.log(result); // ["1", "2", "3"]
   *
   * @example
   * // Example: Chaining conversion – convert an array of booleans to an array of buffers.
   * const schemaArrayToBuffer = schema().array(schema().boolean()).parseTo().buffer();
   *
   * const resultBuffer = schemaArrayToBuffer.parse([true, false, true]);
   *
   * // In the chain above, the array [true, false, true] is converted to an array of Buffers.
   * console.log(resultBuffer);
   */
  parseTo: <I2 = I>() => SchemaArrayParseToMethod<I2, Opts>;
} & (Flags["minApplied"] extends false
  ? {
      /**
       * Adds a minimum length validation rule to an array schema.
       *
       * This method extends an array schema by enforcing that the input array must have at least a specified number
       * of elements. The configuration object must include a `min` property, which sets this minimum length.
       *
       * @param {Object} config - The configuration for the minimum length validation.
       * @param {number} config.min - The minimum number of elements required.
       *
       * @example
       * const minSchema = schema().array(
       *   schema().number()
       * ).min({ min: 3 });
       *
       * console.log(minSchema.validate([1, 2, 3])); // true
       * console.log(minSchema.validate([1, 2]));    // false
       *
       * @param {string} [config.message] - An optional custom error message template.
       * This message is used when the validation fails and may contain the following placeholders:
       *   - `[valueName]`: Replaced with the name of the field being validated.
       *   - `[value]`: Replaced with the actual array value received.
       *   - `[min]`: Replaced with the specified minimum number of elements.
       *
       * @example
       * const customMinSchema = schema().array(
       *   schema().number()
       * ).min({
       *   min: 3,
       *   message: "[valueName] must contain at least [min] elements, but got [value]"
       * });
       *
       * const test = customMinSchema.test([1, 2], "numbers");
       *
       * console.log(test.errors[0].message);
       * // "numbers must contain at least 3 elements, but got [1,2]"
       */
      min: (config: SchemaArrayMinConfig) => SchemaGenericArrayType<Item, Opts, SchemaMerge<Flags, { minApplied: true }>>;
    }
  : {}) &
  (Flags["maxApplied"] extends false
    ? {
        /**
         * Adds a maximum length validation rule to an array schema.
         *
         * This method extends an array schema by enforcing that the input array must have at most a specified number
         * of elements. The configuration object must include a `max` property, which sets this maximum length.
         *
         * @param {Object} config - The configuration for the maximum length validation.
         * @param {number} config.max - The maximum number of elements allowed.
         *
         * @example
         * const maxSchema = schema().array(
         *   schema().number()
         * ).max({ max: 5 });
         *
         * console.log(maxSchema.validate([1, 2, 3]));          // true
         * console.log(maxSchema.validate([1, 2, 3, 4, 5]));    // true
         * console.log(maxSchema.validate([1, 2, 3, 4, 5, 6])); // false
         *
         * @param {string} [config.message] - An optional custom error message template.
         * This message is used when the validation fails and may include the following placeholders:
         *   - `[valueName]`: Replaced with the name of the field being validated.
         *   - `[value]`: Replaced with the actual array value received.
         *   - `[max]`: Replaced with the specified maximum number of elements.
         *
         * @example
         * const customMaxSchema = schema().array(
         *   schema().number()
         * ).max({
         *   max: 5,
         *   message: "[valueName] must contain at most [max] elements, but got [value]"
         * });
         *
         * const test = customMaxSchema.test([1, 2, 3, 4, 5, 6], "numbers");
         *
         * console.log(test.errors[0].message);
         * // "numbers must contain at most 5 elements, but got [1,2,3,4,5,6]"
         */
        max: (config: SchemaArrayMaxConfig) => SchemaGenericArrayType<Item, Opts, SchemaMerge<Flags, { maxApplied: true }>>;
      }
    : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   arrKey: schema().array(schema().number())
         * });
         *
         * const testWithoutAlias = schemaWithoutAlias.test({ arrKey: "not an array" });
         *
         * console.log(testWithoutAlias.errors[0].message);
         * // "arrKey must be an array type!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   arrKey: schema().array(schema().number()).alias('array key')
         * });
         *
         * const testWithAlias = schemaWithAlias.test({ arrKey: "not an array" });
         *
         * console.log(testWithAlias.errors[0].message);
         * // "array key must be an array type!"
         */
        alias: (valueName: string) => SchemaGenericArrayType<Item, Opts, SchemaMerge<Flags, { aliasApplied: true }>>;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to an array schema.
         *
         * This method extends an array schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default array.
         *
         * @param {Array} value - The default array to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default array ["default", "value"] is used:
         * const defaultSchema = schema().array(schema().string()).default(["default", "value"]);
         *
         * console.log(defaultSchema.parse(undefined));
         * // ["default", "value"]
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse(["hello", "world"]));
         * // ["hello", "world"]
         */
        default: (
          value: I,
        ) => SchemaGenericArrayType<
          Item,
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the array schema as not required.
         *
         * This method modifies an array schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the array type.
         * Note that null values will not be considered valid.
         *
         * @example
         * const optionalSchema = schema().array(schema().number()).notRequired();
         *
         * console.log(optionalSchema.validate([1, 2, 3])); // true
         * console.log(optionalSchema.validate(undefined));  // true
         * console.log(optionalSchema.validate(null));      // false
         */
        notRequired: () => SchemaGenericArrayType<
          Item,
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the array schema as nullable.
         *
         * This method modifies an array schema to allow the input value to be either an array or null.
         * When applied, the schema will consider null values as valid alongside array values.
         * Note that undefined values will not be considered valid unless combined with `notRequired`.
         *
         * @example
         * const nullableSchema = schema().array(
         *   schema().number()
         * ).nullable();
         *
         * console.log(nullableSchema.validate([1, 2, 3])); // true
         * console.log(nullableSchema.validate(null));      // true
         * console.log(nullableSchema.validate(undefined));  // false
         */
        nullable: () => SchemaGenericArrayType<
          Item,
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>
        >;
      }
    : {});

type SchemaArrayOutput<
  Item extends SchemaType<any, any>,
  Options extends { nullable: boolean; required: boolean; default: boolean },
> = SchemaWithOptionalAndNullable<InferOut<Item>[], Options>;

export type SchemaArrayInput<
  Item extends SchemaType<any, any>,
  Options extends { nullable: boolean; required: boolean; default: boolean },
> = Options["required"] extends false
  ? Options["nullable"] extends true
    ? Array<InferIn<Item>> | null | undefined
    : Array<InferIn<Item>> | undefined
  : Options["nullable"] extends true
    ? Array<InferIn<Item>> | null
    : Array<InferIn<Item>>;

export type SchemaGenericArrayType<
  Item extends SchemaType<any, any>,
  Opts extends { nullable: boolean; required: boolean; default: boolean },
  Flags extends SchemaArrayFlags,
  I = SchemaArrayInput<Item, Opts>,
> = SchemaType<Opts["default"] extends true ? Array<InferIn<Item>> : SchemaArrayOutput<Item, Opts>, I> &
  SchemaAllowedArrayMethods<Item, Opts, Flags, I> &
  SchemaReturnCommonMethods<any, SchemaArrayOutput<Item, Opts>>;

export interface SchemaArrayConfig {
  message?: string;
}

export interface SchemaArrayMaxConfig extends SchemaConfig {
  max: number;
}

export interface SchemaArrayMinConfig extends SchemaConfig {
  min: number;
}

// Object Method Types

export type SchemaDefaultObjectOptions = {
  nullable: false;
  required: true;
  default: false;
  alias: false;
};

export type SchemaObjectOutput<
  Shape extends Record<string, SchemaType<any, any>>,
  Options extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    alias: boolean;
  },
> = SchemaWithOptionalAndNullable<{ [K in keyof Shape]: InferOut<Shape[K]> }, Options>;

export type SchemaObjectInput<
  Shape extends Record<string, SchemaType<any, any>>,
  Options extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    alias: boolean;
  },
> = SchemaWithOptionalAndNullable<{ [K in keyof Shape]: InferIn<Shape[K]> }, Options>;

export interface SchemaObjectFlags {
  nullableApplied: boolean;
  notRequiredApplied: boolean;
  defaultApplied: boolean;
  aliasApplied: boolean;
}

export type SchemaDefaultObjectFlags = {
  nullableApplied: false;
  notRequiredApplied: false;
  defaultApplied: false;
  aliasApplied: false;
};

type ForceObjectIfNotDifferent<
  O,
  Shape extends Record<string, SchemaType<any, any>>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    alias: boolean;
  },
> = [O] extends [object] ? InferOut<SchemaType<SchemaObjectOutput<Shape, Opts>>> : O;

export type SchemaAllowedObjectMethods<
  Shape extends Record<string, SchemaType<any, any>>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
    alias: boolean;
  },
  Flags extends SchemaObjectFlags,
  I = object,
> = {
  /**
   * Adds a custom validation method to the object schema.
   *
   * This method allows you to implement custom validation logic for objects.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current object being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's type.
   *   - If a generic type parameter is provided, it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   *        It should call `context.success(newValue)` if validation passes, or
   *        `context.failed(errorMessage)` if it fails.
   *        If no type parameter is specified, the schema’s original type is preserved.
   *        If a type parameter is specified (e.g., `<CustomObject>`), it requires that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation that ensures an object has a required key:
   * const schemaCustom = schema().object({
   *   id: schema().number()
   * }).custom((context) => {
   *   if (context.value === 1) {
   *     context.success(context.value);
   *   } else {
   *     context.failed("invalid id!");
   *   }
   * });
   *
   * console.log(schemaCustom.parse({ id: 1 }));   // { id: 1 }
   * console.log(schemaCustom.parse({ id: 123 })); // Throws: "invalid id!"
   *
   * @example
   * // Custom transformation: Convert an object to a new structure
   * const schemaCustom = schema().object({
   *   id: schema().number()
   * }).custom<>((context) => {
   *   if (context.value === 1) {
   *     context.success("ok");
   *   } else {
   *     context.failed("invalid id!");
   *   }
   * });
   *
   * console.log(schemaCustom.parse({ id: 1 })); // "ok"
   * console.log(schemaCustom.parse({ id: 2 })); // Throws: "invalid id!"
   */
  custom: <O = SchemaWithOptionalAndNullable<ForceObjectIfNotDifferent<I, Shape, Opts>, Opts>>(
    customMethod: SchemaCustomMethod<InferOut<SchemaType<SchemaObjectOutput<Shape, Opts>>>, O>,
  ) => SchemaGenericCustomType<I, O>;

  /**
   * Returns an object with conversion methods that allow you to transform the value
   * before performing further validations.
   *
   * This method supports two main contexts:
   *
   * 1. **Chaining Conversions:** The conversion methods (such as `string()`, `boolean()`, etc.)
   *    transform the original value so that subsequent validations work with the newly converted value.
   *    For example, converting an object into a JSON string allows you to chain string-based validations.
   *
   * 2. **Accessing the Parsed Value:** After running the validation (via `.test()` or `.testAsync()`),
   *    the final converted value is stored in the test result’s `.value` property. This lets you retrieve
   *    the processed value as it was transformed through the conversion chain.
   *
   * @returns {SchemaParseToMethod} An object containing conversion methods for:
   * - string
   * - boolean
   *
   * @example
   * // Example 1: Chaining conversion – convert an object to a JSON string for further tests.
   * const schemaObjectToString = schema().object({
   *   key: schema().string()
   * }).parseTo().string();
   *
   * const result = schemaObjectToString.parse({ key: "value" });
   *
   * // The object is converted into a JSON string before testing.
   * console.log(result); // '{"key":"value"}'
   */
  parseTo: <I2 = I>() => {
    /**
     * Converts a object value to a string.
     *
     * This method is used in a conversion chain to transform a object input into a string,
     * allowing you to perform numeric validations on the converted value. When used, the original object
     * is parsed into a string before further tests are executed.
     *
     * @example
     * const stringSchema = schema().object({
     *   key: schema().number()
     * }).parseTo().string();
     *
     * console.log(stringSchema.parse({"key":"value"})); // '{"key":"value"}'
     */
    string: (
      config?: SchemaConfig,
    ) => SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags, SchemaWithOptionalAndNullable<I2, Opts>>;

    /**
     * Converts a object value to a boolean.
     *
     * This method is used in a conversion chain to transform a object input into a boolean,
     * allowing you to perform numeric validations on the converted value. When used, the original object
     * is parsed into a boolean before further tests are executed.
     *
     * @example
     * const booleanSchema = schema().object({
     *   key: schema().number()
     * }).parseTo().boolean();
     *
     * console.log(booleanSchema.parse({"key":"value"})); // true
     *
     * @example
     * const booleanSchema = schema().object({
     *   key: schema().number()
     * }).nullable().notRequired().parseTo().boolean();
     *
     * console.log(booleanSchema.parse(undefined)); // false
     * console.log(booleanSchema.parse(null));      // false
     */
    boolean: (
      config?: SchemaConfig,
    ) => SchemaGenericBooleanType<
      SchemaDefaultBooleanOptions,
      SchemaDefaultBooleanFlags,
      SchemaWithOptionalAndNullable<I2, Opts>
    >;
  };
} & (Flags["nullableApplied"] extends false
  ? {
      /**
       * Marks the object schema as nullable.
       *
       * This method modifies an object schema to allow the input value to be either an object or null.
       * When applied, the schema will consider null values as valid alongside object values.
       * Note that undefined values will not be considered valid unless combined with `notRequired`.
       *
       * @example
       * const nullableObjectSchema = schema().object({
       *   key: schema().string()
       * }).nullable();
       *
       * console.log(nullableObjectSchema.validate({ key: "value" })); // true
       * console.log(nullableObjectSchema.validate(null));             // true
       * console.log(nullableObjectSchema.validate(undefined));        // false
       */
      nullable: () => SchemaGenericObjectType<
        Shape,
        SchemaMerge<Opts, { nullable: true }>,
        SchemaMerge<Flags, { nullableApplied: true }>
      >;
    }
  : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   objKey: schema().object({
         *     key: schema().string()
         *   })
         * })
         *
         * const testWithoutAlias = schemaWithoutAlias.test({
         *   objKey: {
         *     key: "string"
         *   }
         * })
         *
         * console.log(testWithoutAlias.errors[0].message)
         * // "objKey must be a object type!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   objKey: schema().object({
         *     key: schema().string()
         *   }).alias("object key")
         * })
         *
         * const testWithAlias = schemaWithAlias.test({ objKey: 123 })
         *
         * console.log(testWithAlias.errors[0].message)
         * // "object key must be a object type!"
         */
        alias: (
          valueName: string,
        ) => SchemaGenericObjectType<Shape, SchemaMerge<Opts, { default: true }>, SchemaMerge<Flags, { defaultApplied: true }>>;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to an object schema.
         *
         * This method extends an object schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default value.
         *
         * @param {Object} value - The default object value to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default object { key: "default" } is used:
         * const defaultObjectSchema = schema().object({
         *   key: schema().string()
         * }).default({ key: "default" });
         *
         * console.log(defaultObjectSchema.parse(undefined)); // { key: "default" }
         *
         * // If the input is provided, that value is used:
         * console.log(defaultObjectSchema.parse({ key: "custom" })); // { key: "custom" }
         */
        default: (
          value: I,
        ) => SchemaGenericObjectType<
          Shape,
          SchemaMerge<Opts, { defaultValue: string; default: true; required: true }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the object schema as not required.
         *
         * This method modifies an object schema to make the input value optional.
         * When applied, the schema will consider undefined values as valid while still requiring that any provided value conforms to the object type.
         * Note that null values will not be considered valid unless combined with `nullable()`.
         *
         * @example
         * const optionalObjectSchema = schema().object({
         *   key: schema().string()
         * }).notRequired();
         *
         * console.log(optionalObjectSchema.validate({ key: "value" })); // true
         * console.log(optionalObjectSchema.validate(undefined));        // true
         * console.log(optionalObjectSchema.validate(null));            // false
         */
        notRequired: () => SchemaGenericObjectType<
          Shape,
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>
        >;
      }
    : {});

export type SchemaGenericObjectType<
  Shape extends Record<string, SchemaType<any, any>>,
  Opts extends { nullable: boolean; required: boolean; default: boolean; alias: boolean },
  Flags extends SchemaObjectFlags,
  I = "SCHEMA_OBJECT_DEFAULT",
> = SchemaType<SchemaObjectOutput<Shape, Opts>, I extends "SCHEMA_OBJECT_DEFAULT" ? SchemaObjectInput<Shape, Opts> : I> &
  SchemaAllowedObjectMethods<Shape, Opts, Flags, I extends "SCHEMA_OBJECT_DEFAULT" ? SchemaObjectInput<Shape, Opts> : I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<
      SchemaType<
        Opts["default"] extends true
          ? SchemaObjectOutput<Shape, Opts>
          : SchemaWithOptionalAndNullable<SchemaObjectOutput<Shape, Opts>, Opts>,
        SchemaWithOptionalAndNullable<I, Opts>
      >
    >
  >;

// OneOf Method Types

export type SchemaDefaultOneOfOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
};

export interface SchemaOneOfFlags {
  aliasApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultOneOfFlags = {
  aliasApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

export type SchemaAllowedOneOfMethods<
  Items extends Array<SchemaType<any, any>>,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  },
  Flags extends SchemaOneOfFlags,
  I = any,
> = (Flags["defaultApplied"] extends false
  ? {
      /**
       * Sets a default value for a oneOf schema.
       *
       * This method specifies a default value that is applied when the input is undefined.
       * When validating, if the input is `undefined`, the schema will automatically return the provided default value.
       *
       * @param {any} value - The default value to be used when the input is undefined.
       *
       * @example
       * // If the input is undefined, the default value 123 is used:
       * const defaultSchema = schema().oneOf([
       *   schema().string(),
       *   schema().number()
       * ]).default(123);
       *
       * console.log(defaultSchema.parse(undefined)); // 123
       *
       * // If a valid value is provided, it is used instead:
       * console.log(defaultSchema.parse("abc")); // "abc"
       */

      default: (
        value: I,
      ) => SchemaGenericOneOfType<
        Items,
        SchemaMerge<Opts, { default: true; required: false }>,
        SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>
      >;
    }
  : {}) &
  (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating values. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   key: schema().oneOf([
         *     schema().string(),
         *     schema().number()
         *   ])
         * });
         *
         * const testWithoutAlias = schemaWithoutAlias.test({ key: true });
         *
         * console.log(testWithoutAlias.errors[0].message);
         * // "value does not have a match!"
         *
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   key: schema().oneOf([
         *     schema().string(),
         *     schema().number()
         *   ]).alias("oneOf key")
         * }, { message: "[valueName] does not have a match!" });
         *
         * const testWithAlias = schemaWithAlias.test({ key: true });
         *
         * console.log(testWithAlias.errors[0].message);
         * // "oneOf key does not have a match!"
         */
        alias: (valueName: string) => SchemaGenericOneOfType<Items, Opts, SchemaMerge<Flags, { aliasApplied: true }>>;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        /**
         * Marks the oneOf schema as not required.
         *
         * This method makes the schema accept `undefined` as a valid value.
         * Use this when the input value is optional. If `default()` is used, this is applied automatically.
         *
         * @example
         * const optionalSchema = schema().oneOf([
         *   schema().string(),
         *   schema().number()
         * ]).notRequired();
         *
         * console.log(optionalSchema.validate("text")); // true
         * console.log(optionalSchema.validate(undefined)); // true
         * console.log(optionalSchema.validate(null)); // false
         */

        notRequired: () => SchemaGenericOneOfType<
          Items,
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        /**
         * Marks the oneOf schema as nullable.
         *
         * This method makes the schema accept `null` as a valid value.
         * Use this when you want to explicitly allow `null` inputs alongside the defined types.
         *
         * @example
         * const nullableSchema = schema().oneOf([
         *   schema().string(),
         *   schema().number()
         * ]).nullable();
         *
         * console.log(nullableSchema.validate("abc")); // true
         * console.log(nullableSchema.validate(null));  // true
         * console.log(nullableSchema.validate(undefined)); // false unless combined with `notRequired()`
         */

        nullable: () => SchemaGenericOneOfType<
          Items,
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>
        >;
      }
    : {});

type UnionOfInferOut<Items extends any[]> = {
  [K in keyof Items]: Items[K] extends SchemaType<any, any> ? InferOut<Items[K]> : never;
}[number];

type SchemaOneOfOutput<
  Items extends any[],
  Options extends { nullable: boolean; required: boolean; default: boolean },
> = Options["default"] extends true
  ? Options["nullable"] extends true
    ? UnionOfInferOut<Items> | null
    : UnionOfInferOut<Items>
  : Options["required"] extends false
    ? Options["nullable"] extends true
      ? UnionOfInferOut<Items> | null | undefined
      : UnionOfInferOut<Items> | undefined
    : Options["nullable"] extends true
      ? UnionOfInferOut<Items> | null
      : UnionOfInferOut<Items>;

export type SchemaOneOfInput<
  Items extends SchemaType<any, any>[],
  Options extends { nullable: boolean; required: boolean; default: boolean },
> = Options["required"] extends false
  ? Options["nullable"] extends true
    ? { [K in keyof Items]: InferIn<Items[K]> }[number] | null | undefined
    : { [K in keyof Items]: InferIn<Items[K]> }[number] | undefined
  : Options["nullable"] extends true
    ? { [K in keyof Items]: InferIn<Items[K]> }[number] | null
    : { [K in keyof Items]: InferIn<Items[K]> }[number];

export type SchemaGenericOneOfType<
  Items extends SchemaType<any, any>[],
  Opts extends { nullable: boolean; required: boolean; default: boolean },
  Flags extends SchemaOneOfFlags,
> = SchemaType<SchemaOneOfOutput<Items, Opts>, SchemaOneOfInput<Items, Opts>> &
  SchemaAllowedOneOfMethods<Items, Opts, Flags> &
  SchemaReturnCommonMethods<any, SchemaOneOfOutput<Items, Opts>>;

// Any Method Types

export type SchemaDefaultAnyOptions = {
  nullable: boolean;
  required: boolean;
  default: boolean;
};

export interface SchemaAnyFlags {
  aliasApplied: boolean;
  defaultApplied: boolean;
  nullableApplied: boolean;
  notRequiredApplied: boolean;
}

export type SchemaDefaultAnyFlags = {
  aliasApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

export type SchemaAllowedAnyMethods<
  Opts extends { nullable: boolean; required: boolean; default: boolean },
  Flags extends SchemaAnyFlags,
  I = any,
> = SchemaReturnCommonMethods<any, any> & {
  /**
   * Adds a custom validation method to the schema.
   *
   * This method allows you to implement custom validation logic that can optionally transform the validated value.
   * The custom method receives a context object with the following properties:
   *
   * - **value**: The current value being validated.
   * - **success(newValue)**: A callback to invoke if the validation passes.
   *   - If no generic type parameter is provided, the returned value inherits the schema's type.
   *   - If a generic type parameter is provided, it enforces that the new (transformed) value is of that type.
   * - **failed(message)**: A callback to invoke if the validation fails, with an appropriate error message.
   *
   * The custom method can be implemented synchronously or asynchronously:
   *
   * - Use `test()`, `validate()`, `parse()` or `throw()` for synchronous validations.
   * - Use `testAsync()`, `validateAsync()`, `parseAsync()` or `throwAsync()` for asynchronous validations (when the method returns a Promise).
   *
   * @param {SchemaCustomMethod} customMethod - A function that performs custom validation.
   *        It should call `context.success(newValue)` if validation passes, or
   *        `context.failed(errorMessage)` if it fails.
   *        If no type parameter is specified, the schema’s original type is preserved.
   *        If a type parameter is specified (e.g., `<number>`), it requires that the value passed to `success` is of that type.
   *
   * @returns {VkrunSchema} The schema instance with the custom validation method added.
   *
   * @example
   * // Custom validation without type transformation (inherits the schema's type):
   * const schemaCustom = schema().any().custom((context) => {
   *   if (context.value === "valid") {
   *     context.success(context.value);
   *   } else {
   *     context.failed("Validation failed");
   *   }
   * });
   *
   * const result = schemaCustom.parse("valid");
   * console.log(result); // "valid"
   *
   * @example
   * // The custom method enforces that context.success returns a number.
   * const schemaCustom = schema()
   *   .any()
   *   .custom<number>((context) => {
   *     if (context.value === "success") {
   *       context.success(123);
   *     } else {
   *       context.failed("Custom validation failed");
   *     }
   *   });
   *
   * const result = schemaCustom.parse("success");
   * console.log(result); // 123
   */
  custom: <O = I>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<any, Opts>, O>,
  ) => SchemaGenericCustomType<SchemaWithOptionalAndNullable<any, Opts>, O, Opts>;
} & (Flags["aliasApplied"] extends false
    ? {
        /**
         * Adds an alias to a schema property.
         *
         * This method allows you to rename the field key in error messages for clearer output
         * when validating objects. When used, the alias value will replace the original key
         * name in validation error messages.
         *
         * @param {string} valueName - The alias name to be used in error messages.
         * @returns {SchemaAliasMethod} Chainable alias schema.
         *
         * @example
         * // Without alias, the error message uses the actual key name.
         * const schemaWithoutAlias = schema().object({
         *   objKey: schema()
         *     .any()
         *     .parseTo()
         *     .string()
         *     .minLength({ min: 1 })
         * })
         *
         * const testWithoutAlias = schemaWithoutAlias.test({ objKey: "" })
         *
         * console.log(testWithoutAlias.errors[0].message)
         * // "objKey must have a minimum of 1 characters!"
         *
         * @example
         * // With alias, the error message uses the provided alias.
         * const schemaWithAlias = schema().object({
         *   objKey: schema()
         *     .any()
         *     .alias('object key')
         *     .parseTo()
         *     .string()
         *     .minLength({ min: 1 })
         * })
         *
         * const testWithAlias = schemaWithAlias.test({ objKey: "" })
         *
         * console.log(testWithAlias.errors[0].message)
         * // "object key must have a minimum of 1 characters!"
         */
        alias: (valueName: string) => SchemaGenericAnyType<Opts, SchemaMerge<Flags, { aliasApplied: true }>, I>;
      }
    : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        /**
         * Adds a default value to a any schema.
         *
         * This method extends a any schema by specifying a default value that is applied when the input value is undefined.
         * When validating, if the value is undefined, the schema will automatically use the provided default value.
         *
         * @param {any} value - The default value to be used when the input value is undefined.
         *
         * @example
         * // If the input is undefined, the default value "default value" is used:
         * const defaultSchema = schema().any().default("default value");
         * console.log(defaultSchema.parse(undefined)); // "default value"
         *
         * // If the input is provided, that value is used:
         * console.log(defaultSchema.parse("hello")); // "hello"
         */
        default: (
          value: any,
        ) => SchemaGenericAnyType<
          SchemaMerge<Opts, { default: true; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericAnyType<
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  },
  Flags extends SchemaAnyFlags,
  I = any,
> = SchemaType<SchemaWithOptionalAndNullable<any, Opts>, SchemaWithOptionalAndNullable<I, Opts>> &
  SchemaAllowedAnyMethods<Opts, Flags, I>;

// Equal Method Types

export type SchemaDefaultEqualOptions<T = any> = {
  nullable: boolean;
  required: boolean;
  valueToCompare?: T;
};

export interface SchemaEqualFlags {
  aliasApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultEqualFlags = {
  aliasApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

export type SchemaAllowedEqualMethods<
  T,
  Opts extends {
    nullable: boolean;
    required: boolean;
  },
  Flags extends SchemaEqualFlags,
  I = T,
> = {
  custom: <O = I>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<I, Opts>, O>,
  ) => SchemaGenericCustomType<SchemaWithOptionalAndNullable<I, Opts>, O, Opts>;
  parseTo: <I2 = I>() => {
    string: (
      config?: SchemaConfig,
    ) => SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    number: (
      config?: SchemaConfig,
    ) => SchemaGenericNumberType<SchemaDefaultNumberOptions, SchemaDefaultNumberFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    bigInt: (
      config?: SchemaConfig,
    ) => SchemaGenericBigIntType<SchemaDefaultBigIntOptions, SchemaDefaultBigIntFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    buffer: (
      config?: SchemaConfig,
    ) => SchemaGenericBufferType<SchemaDefaultBufferOptions, SchemaDefaultBufferFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    boolean: (
      config?: SchemaConfig,
    ) => SchemaGenericBooleanType<
      SchemaDefaultBooleanOptions,
      SchemaDefaultBooleanFlags,
      SchemaWithOptionalAndNullable<I2, Opts>
    >;
    date: (
      config?: SchemaDateConfig,
    ) => SchemaGenericDateType<SchemaDefaultDateOptions, SchemaDefaultDateFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    array<Item extends SchemaType<any, any>>(
      schema: Item,
      config?: SchemaArrayConfig,
    ): SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags>;
    object: <Shape extends Record<string, SchemaType<any, any>>>(
      schema: Shape,
      config?: SchemaConfig,
    ) => SchemaGenericObjectType<Shape, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;
  };
} & (Flags["aliasApplied"] extends false
  ? {
      alias: (
        valueName: string,
      ) => SchemaGenericEqualType<T, SchemaMerge<Opts, { alias: string }>, SchemaMerge<Flags, { aliasApplied: true }>, I>;
    }
  : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        default: (
          value: T,
        ) => SchemaGenericEqualType<
          T,
          SchemaMerge<Opts, { defaultValue: T; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        notRequired: () => SchemaGenericEqualType<
          T,
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        nullable: () => SchemaGenericEqualType<
          T,
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericEqualType<
  T,
  Opts extends {
    nullable: boolean;
    required: boolean;
  } = SchemaDefaultEqualOptions<T>,
  Flags extends SchemaEqualFlags = SchemaDefaultEqualFlags,
  I = T,
> = SchemaType<SchemaWithOptionalAndNullable<T, Opts>, SchemaWithOptionalAndNullable<I, Opts>> &
  SchemaAllowedEqualMethods<T, Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<SchemaType<SchemaWithOptionalAndNullable<T, Opts>, SchemaWithOptionalAndNullable<I, Opts>>>
  >;

// Custom Method Types

export interface SchemaCustomContext {
  value: any;
  success: (value: any) => void;
  failed: (message: string) => void;
}

export type SchemaCustomMethod<Input = any, Output = Input> =
  | ((ctx: { value: Input; success: (value: Output) => void; failed: (message: string) => void }) => void)
  | ((ctx: { value: Input; success: (value: Output) => void; failed: (message: string) => void }) => Promise<void>);

type ForceCustomIfNotDifferent<
  Output,
  NewOutput,
  Opts extends { nullable: boolean; required: boolean } = {
    nullable: false;
    required: true;
  },
> = [NewOutput] extends ["SCHEMA_CUSTOM_DEFAULT"] ? SchemaWithOptionalAndNullable<Output, Opts> : NewOutput;

export type SchemaGenericCustomType<
  Input = any,
  Output = Input,
  Opts extends { nullable: boolean; required: boolean } = {
    nullable: false;
    required: true;
  },
  NewOutput = "SCHEMA_CUSTOM_DEFAULT",
> = SchemaType<ForceCustomIfNotDifferent<Output, NewOutput, Opts>, Input> &
  SchemaReturnCommonMethods<any, ForceCustomIfNotDifferent<Output, NewOutput, Opts>>;

export interface SchemaConfig {
  message?: string;
}

// NotEqual

export type SchemaDefaultNotEqualOptions<T = any> = {
  nullable: boolean;
  required: boolean;
  default: boolean;
  valueToCompare?: T;
};

export interface SchemaNotEqualFlags {
  aliasApplied: boolean;
  defaultApplied: boolean;
  notRequiredApplied: boolean;
  nullableApplied: boolean;
}

export type SchemaDefaultNotEqualFlags = {
  aliasApplied: false;
  defaultApplied: false;
  notRequiredApplied: false;
  nullableApplied: false;
};

export type SchemaAllowedNotEqualMethods<
  T,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  },
  Flags extends SchemaNotEqualFlags,
  I = T,
> = {
  custom: <O = I>(
    customMethod: SchemaCustomMethod<SchemaWithOptionalAndNullable<I, Opts>, O>,
  ) => SchemaGenericCustomType<SchemaWithOptionalAndNullable<I, Opts>, O, Opts>;
  parseTo: <I2 = I>() => {
    string: (
      config?: SchemaConfig,
    ) => SchemaGenericStringType<SchemaDefaultStringOptions, SchemaDefaultStringFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    number: (
      config?: SchemaConfig,
    ) => SchemaGenericNumberType<SchemaDefaultNumberOptions, SchemaDefaultNumberFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    bigInt: (
      config?: SchemaConfig,
    ) => SchemaGenericBigIntType<SchemaDefaultBigIntOptions, SchemaDefaultBigIntFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    buffer: (
      config?: SchemaConfig,
    ) => SchemaGenericBufferType<SchemaDefaultBufferOptions, SchemaDefaultBufferFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    boolean: (
      config?: SchemaConfig,
    ) => SchemaGenericBooleanType<
      SchemaDefaultBooleanOptions,
      SchemaDefaultBooleanFlags,
      SchemaWithOptionalAndNullable<I2, Opts>
    >;
    date: (
      config?: SchemaDateConfig,
    ) => SchemaGenericDateType<SchemaDefaultDateOptions, SchemaDefaultDateFlags, SchemaWithOptionalAndNullable<I2, Opts>>;
    array<Item extends SchemaType<any, any>>(
      schema: Item,
      config?: SchemaArrayConfig,
    ): SchemaGenericArrayType<Item, SchemaDefaultArrayOptions, SchemaDefaultArrayFlags>;
    object: <Shape extends Record<string, SchemaType<any, any>>>(
      schema: Shape,
      config?: SchemaConfig,
    ) => SchemaGenericObjectType<Shape, SchemaDefaultObjectOptions, SchemaDefaultObjectFlags>;
  };
} & (Flags["aliasApplied"] extends false
  ? {
      alias: (
        valueName: string,
      ) => SchemaGenericNotEqualType<T, SchemaMerge<Opts, { alias: string }>, SchemaMerge<Flags, { aliasApplied: true }>, I>;
    }
  : {}) &
  (Flags["defaultApplied"] extends false
    ? {
        default: (
          value: T,
        ) => SchemaGenericNotEqualType<
          T,
          SchemaMerge<Opts, { defaultValue: T; required: false }>,
          SchemaMerge<Flags, { defaultApplied: true; notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["notRequiredApplied"] extends false
    ? {
        notRequired: () => SchemaGenericNotEqualType<
          T,
          SchemaMerge<Opts, { required: false }>,
          SchemaMerge<Flags, { notRequiredApplied: true }>,
          I
        >;
      }
    : {}) &
  (Flags["nullableApplied"] extends false
    ? {
        nullable: () => SchemaGenericNotEqualType<
          T,
          SchemaMerge<Opts, { nullable: true }>,
          SchemaMerge<Flags, { nullableApplied: true }>,
          I
        >;
      }
    : {});

export type SchemaGenericNotEqualType<
  T,
  Opts extends {
    nullable: boolean;
    required: boolean;
    default: boolean;
  } = SchemaDefaultNotEqualOptions<T>,
  Flags extends SchemaNotEqualFlags = SchemaDefaultNotEqualFlags,
  I = T,
> = SchemaType<SchemaWithOptionalAndNullable<T, Opts>, SchemaWithOptionalAndNullable<I, Opts>> &
  SchemaAllowedNotEqualMethods<T, Opts, Flags, I> &
  SchemaReturnCommonMethods<
    any,
    InferOut<SchemaType<SchemaWithOptionalAndNullable<T, Opts>, SchemaWithOptionalAndNullable<I, Opts>>>
  >;
