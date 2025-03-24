import * as helper from "./helpers";
import type * as type from "../types";

export class SchemaSetup implements type.VkrunSchema {
  private value: any;
  private valueName: any;
  private currentValue: any;
  private defaultValue: any;
  private readonly methods: type.SchemaMethods;
  private tests: type.SchemaTests;

  constructor(config?: type.SchemaConfig) {
    this.valueName = undefined;
    this.methods = [];
    this.tests = {
      passedAll: false,
      passed: 0,
      failed: 0,
      totalTests: 0,
      successes: [],
      errors: [],
      time: "",
      value: undefined,
    };
    this.methodBuild({ method: "required", config });
  }

  string(config?: type.SchemaConfig) {
    return helper.stringMethod(this.schemaMethodParams(), config);
  }

  number(config?: type.SchemaConfig) {
    return helper.numberMethod(this.schemaMethodParams(), config);
  }

  bigInt(config?: type.SchemaConfig) {
    return helper.bigIntMethod(this.schemaMethodParams(), config);
  }

  boolean(config?: type.SchemaConfig) {
    return helper.booleanMethod(this.schemaMethodParams(), config);
  }

  buffer(config?: type.SchemaConfig) {
    return helper.bufferMethod(this.schemaMethodParams(), config);
  }

  function(config?: type.SchemaConfig) {
    return helper.functionMethod(this.schemaMethodParams(), config);
  }

  date(config?: type.SchemaConfig) {
    return helper.dateMethod(this.schemaMethodParams(), config);
  }

  array<Item extends type.SchemaType<any, any>>(schema: Item, config?: type.SchemaArrayConfig) {
    return helper.arrayMethod(this.schemaMethodParams(), schema, config);
  }

  object<Shape extends Record<string, type.SchemaType<any, any>>>(schema: Shape, config?: type.SchemaConfig) {
    return helper.objectMethod(this.schemaMethodParams(), schema, config);
  }

  any() {
    return helper.anyMethod(this.schemaMethodParams());
  }

  private schemaMethodParams() {
    return {
      string: (config?: type.SchemaConfig) => this.string(config),
      number: (config?: type.SchemaConfig) => this.number(config),
      bigInt: (config?: type.SchemaConfig) => this.bigInt(config),
      boolean: (config?: type.SchemaConfig) => this.boolean(config),
      buffer: (config?: type.SchemaConfig) => this.buffer(config),
      function: (config?: type.SchemaConfig) => this.function(config),
      date: () => this.date(),
      array: <Item extends type.SchemaType<any, any>>(
        schema: Item,
        config?: type.SchemaArrayConfig,
      ): type.SchemaGenericArrayType<Item, type.SchemaDefaultArrayOptions, type.SchemaDefaultArrayFlags> => {
        return this.array(schema, config);
      },
      object: <Shape extends Record<string, type.SchemaType<any, any>>>(
        schema: Shape,
        config?: type.SchemaConfig,
      ): type.SchemaGenericObjectType<Shape, type.SchemaDefaultObjectOptions, type.SchemaDefaultObjectFlags> => {
        return this.object(schema, config);
      },
      any: () => this.any(),
      throw: (value: any, valueName: string, ClassError?: type.SchemaErrorTypes) => {
        this.throw(value, valueName, ClassError);
      },
      throwAsync: async (value: any, valueName: string, ClassError?: type.SchemaErrorTypes) => {
        await this.throwAsync(value, valueName, ClassError);
      },
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName?: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName?: string) => await this.testAsync(value, valueName),
      parse: (value: any, valueName?: string) => this.parse(value, valueName),
      parseAsync: async (value: any, valueName?: string) => await this.parseAsync(value, valueName),
      default: (value: string) => {
        this.methodBuild({ method: "default" });
        this.defaultValue = value;
      },
      methodBuild: (build: type.SchemaMethod) => this.methodBuild(build),
      defaultValue: this.defaultValue,
      methods: this.methods,
    };
  }

  private validateMethods(): void {
    this.resetTests();

    if (this.value === undefined && helper.hasMethod(this.methods, "default")) {
      this.value = this.defaultValue;
    }

    this.currentValue = this.value;
    const blocks = helper.splitIntoMethodBlocks(this.methods);
    this.tests.value = this.currentValue;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      helper.runValidatorBlock(this.runValidatorBlockParams(), block);
      const nextBlock = blocks[i + 1];

      if (nextBlock) {
        this.currentValue = helper.convertValueBlock(block, nextBlock, this.currentValue);
      }
    }

    this.value = this.currentValue;
    this.tests.value = this.currentValue;
  }

  private async validateMethodsAsync(): Promise<void> {
    this.resetTests();

    if (this.value === undefined && helper.hasMethod(this.methods, "default")) {
      this.value = this.defaultValue;
    }

    this.currentValue = this.value;
    const blocks = helper.splitIntoMethodBlocks(this.methods);
    this.tests.value = this.currentValue;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      await helper.runValidatorBlockAsync(this.runValidatorBlockParams(), block);
      const nextBlock = blocks[i + 1];

      if (nextBlock) {
        this.currentValue = helper.convertValueBlock(block, nextBlock, this.currentValue);
      }
    }

    this.value = this.currentValue;
    this.tests.value = this.currentValue;
  }

  private runValidatorBlockParams() {
    return {
      currentValue: this.currentValue,
      valueName: this.valueName,
      updateTests: (test: type.SchemaTests) => this.updateTests(test),
      addPassed: (success: type.SchemaSuccessTest) => this.addPassed(success),
      addFailed: (error: type.SchemaErrorTest) => this.addFailed(error),
    };
  }

  private methodBuild(build: type.SchemaMethod): void {
    this.methods.push(build);
  }

  private resetTests(): void {
    this.tests = {
      passedAll: false,
      passed: 0,
      failed: 0,
      totalTests: 0,
      successes: [],
      errors: [],
      time: "",
      value: undefined,
    };
  }

  private updateTests(test: type.SchemaTests): void {
    this.tests.passed += test.passed;
    this.tests.failed += test.failed;
    this.tests.totalTests += test.totalTests;
    test.successes.forEach((s) => this.tests.successes.push(s));
    test.errors.forEach((e) => this.tests.errors.push(e));
    this.tests.passedAll = this.tests.passed === this.tests.totalTests;
  }

  private addPassed(success: type.SchemaSuccessTest): void {
    this.tests.passed++;
    this.tests.totalTests++;
    this.tests.successes.push(success);
    this.tests.passedAll = this.tests.passed === this.tests.totalTests;

    if (success.newValue) {
      this.currentValue = success.newValue;
    }
  }

  private addFailed(error: type.SchemaErrorTest): void {
    this.tests.failed++;
    this.tests.totalTests++;
    this.tests.errors.push(error);
    this.tests.passedAll = this.tests.passed === this.tests.totalTests;
  }

  private throw(value: any, valueName: string, ClassError?: type.SchemaErrorTypes): void {
    this.value = value;
    this.valueName = valueName;
    this.validateMethods();
    helper.throwError(this.tests, ClassError);
  }

  private async throwAsync(value: any, valueName: string, ClassError?: type.SchemaErrorTypes): Promise<void> {
    this.value = await value;
    this.valueName = valueName;
    await this.validateMethodsAsync();
    helper.throwError(this.tests, ClassError);
  }

  private test(value: any, valueName?: string): type.SchemaTests {
    const startTime = performance.now();
    this.valueName = valueName ?? "value";
    this.value = value;
    this.validateMethods();
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    this.tests.time = `${elapsedTime.toFixed(3)}ms`;
    return this.tests;
  }

  private async testAsync(value: any, valueName?: string): Promise<type.SchemaTests> {
    const startTime = performance.now();
    this.valueName = valueName ?? "value";
    this.value = await value;
    await this.validateMethodsAsync();
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    this.tests.time = `${elapsedTime.toFixed(3)}ms`;
    return this.tests;
  }

  private parse(value: any, valueName?: string) {
    this.valueName = valueName ?? "value";
    this.value = value;
    this.validateMethods();
    if (!this.tests.passedAll) {
      throw new Error(this.tests.errors[0].message);
    }
    return this.tests.value;
  }

  private async parseAsync(value: any, valueName?: string) {
    this.valueName = valueName ?? "value";
    this.value = await value;
    await this.validateMethodsAsync();
    if (!this.tests.passedAll) {
      throw new Error(this.tests.errors[0].message);
    }
    return this.tests.value;
  }

  private validate(value: any): boolean {
    this.value = value;
    this.validateMethods();
    return this.tests.passedAll;
  }

  private async validateAsync(value: any): Promise<boolean> {
    this.value = await value;
    await this.validateMethodsAsync();
    return this.tests.passedAll;
  }
}

/**
 * @function schema
 *
 * The `schema` construct provides several methods to validate schema rules such as string, number, date, and more. It supports custom error handling, asynchronous validation, and testing.
 *
 * **Usage Example:**
 * ```ts
 * import { schema } from 'vkrun'
 *
 * const emailSchema = schema().string().email()
 *
 * const validateA = emailSchema.validate('any_email@mail.com')
 * const validateB = emailSchema.validate('any_email@mail')
 *
 * console.log(validateA) // true
 * console.log(validateB) // false
 * ```
 */
const schema = (config?: type.SchemaConfig): type.VkrunSchema => new SchemaSetup(config);

export { schema };
