import * as helper from "./helpers";
import type * as type from "../types";

export class SchemaSetup implements type.VkrunSchema {
  private defaultValue: any;
  private readonly methods: type.SchemaMethods;

  constructor(config?: type.SchemaConfig) {
    this.methods = [];
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

  oneOf<Items extends Array<type.SchemaType<any, any>>>(comparisonItems: Items, config?: type.SchemaConfig) {
    return helper.oneOfMethod(this.schemaMethodParams(), comparisonItems, config);
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

  private validateMethods(ctx: type.ExecutionContext): void {
    if (ctx.value === undefined && helper.hasMethod(this.methods, "default")) {
      ctx.value = ctx.defaultValue;
    }

    ctx.currentValue = ctx.value;
    const blocks = helper.splitIntoMethodBlocks(this.methods);
    ctx.tests.value = ctx.currentValue;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      helper.runValidatorBlock(this.runValidatorBlockParams(ctx), block);
      const nextBlock = blocks[i + 1];

      if (nextBlock) {
        ctx.currentValue = helper.convertValueBlock(block, nextBlock, ctx.currentValue);
      }
    }

    ctx.value = ctx.currentValue;
    ctx.tests.value = ctx.currentValue;
  }

  private async validateMethodsAsync(ctx: type.ExecutionContext): Promise<void> {
    if (ctx.value === undefined && helper.hasMethod(this.methods, "default")) {
      ctx.value = ctx.defaultValue;
    }

    ctx.currentValue = ctx.value;
    const blocks = helper.splitIntoMethodBlocks(this.methods);
    ctx.tests.value = ctx.currentValue;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      await helper.runValidatorBlockAsync(this.runValidatorBlockParams(ctx), block);
      const nextBlock = blocks[i + 1];

      if (nextBlock) {
        ctx.currentValue = helper.convertValueBlock(block, nextBlock, ctx.currentValue);
      }
    }

    ctx.value = ctx.currentValue;
    ctx.tests.value = ctx.currentValue;
  }

  private runValidatorBlockParams(ctx: type.ExecutionContext) {
    return {
      currentValue: ctx.currentValue,
      valueName: ctx.valueName,
      updateTests: (test: type.SchemaTests) => this.updateTests(ctx, test),
      addPassed: (success: type.SchemaSuccessTest) => this.addPassed(ctx, success),
      addFailed: (error: type.SchemaErrorTest) => this.addFailed(ctx, error),
    };
  }

  private methodBuild(build: type.SchemaMethod): void {
    this.methods.push(build);
  }

  private createExecutionContext(value: any, valueName?: string): type.ExecutionContext {
    return {
      value,
      valueName: valueName ?? "value",
      currentValue: value,
      defaultValue: this.defaultValue,
      tests: {
        passedAll: false,
        passed: 0,
        failed: 0,
        totalTests: 0,
        successes: [],
        errors: [],
        time: "",
        value: undefined,
      },
    };
  }

  private updateTests(ctx: type.ExecutionContext, test: type.SchemaTests): void {
    ctx.tests.passed += test.passed;
    ctx.tests.failed += test.failed;
    ctx.tests.totalTests += test.totalTests;
    test.successes.forEach((s) => ctx.tests.successes.push(s));
    test.errors.forEach((e) => ctx.tests.errors.push(e));
    ctx.tests.passedAll = ctx.tests.passed === ctx.tests.totalTests;
  }

  private addPassed(ctx: type.ExecutionContext, success: type.SchemaSuccessTest): void {
    ctx.tests.passed++;
    ctx.tests.totalTests++;
    ctx.tests.successes.push(success);
    ctx.tests.passedAll = ctx.tests.passed === ctx.tests.totalTests;

    if (success.newValue) {
      ctx.currentValue = success.newValue;
    }
  }

  private addFailed(ctx: type.ExecutionContext, error: type.SchemaErrorTest): void {
    ctx.tests.failed++;
    ctx.tests.totalTests++;
    ctx.tests.errors.push(error);
    ctx.tests.passedAll = ctx.tests.passed === ctx.tests.totalTests;
  }

  private throw(value: any, valueName: string, ClassError?: type.SchemaErrorTypes): void {
    const ctx = this.createExecutionContext(value, valueName);
    this.validateMethods(ctx);
    helper.throwError(ctx.tests, ClassError);
  }

  private async throwAsync(value: any, valueName: string, ClassError?: type.SchemaErrorTypes): Promise<void> {
    const ctx = this.createExecutionContext(await value, valueName);
    await this.validateMethodsAsync(ctx);
    helper.throwError(ctx.tests, ClassError);
  }

  private test(value: any, valueName?: string): type.SchemaTests {
    const startTime = performance.now();
    const ctx = this.createExecutionContext(value, valueName);
    this.validateMethods(ctx);
    ctx.tests.time = `${(performance.now() - startTime).toFixed(3)}ms`;
    return ctx.tests;
  }

  private async testAsync(value: any, valueName?: string): Promise<type.SchemaTests> {
    const startTime = performance.now();
    const ctx = this.createExecutionContext(await value, valueName);
    await this.validateMethodsAsync(ctx);
    ctx.tests.time = `${(performance.now() - startTime).toFixed(3)}ms`;
    return ctx.tests;
  }

  private parse(value: any, valueName?: string) {
    const ctx = this.createExecutionContext(value, valueName);
    this.validateMethods(ctx);
    if (!ctx.tests.passedAll) {
      throw new Error(ctx.tests.errors[0].message);
    }
    return ctx.tests.value;
  }

  private async parseAsync(value: any, valueName?: string) {
    const ctx = this.createExecutionContext(await value, valueName);
    await this.validateMethodsAsync(ctx);
    if (!ctx.tests.passedAll) {
      throw new Error(ctx.tests.errors[0].message);
    }
    return ctx.tests.value;
  }

  private validate(value: any): boolean {
    const ctx = this.createExecutionContext(value);
    this.validateMethods(ctx);
    return ctx.tests.passedAll;
  }

  private async validateAsync(value: any): Promise<boolean> {
    const ctx = this.createExecutionContext(await value);
    await this.validateMethodsAsync(ctx);
    return ctx.tests.passedAll;
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
