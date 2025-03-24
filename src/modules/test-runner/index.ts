// import { Expect, Snapshot, TestRunner, MockFunction, Spy, testConfig } from "./helpers";

// export const expect = <T>(value: T) => {
//   let testFilePath = "";

//   const error = new Error();
//   if (error.stack) {
//     const stackLines = error.stack.split("\n");
//     const callerLine = stackLines[2];
//     const fileMatch = callerLine.match(/\((.*?):(\d+):(\d+)\)/);
//     if (fileMatch) testFilePath = fileMatch[1].replace(/\\/g, "/");
//   }

//   return new Expect(value, testFilePath);
// };
// export const testRunner = TestRunner.getInstance();
// export const describe = testRunner.describe.bind(testRunner);
// export const it = testRunner.it.bind(testRunner);
// export const beforeAll = testRunner.beforeAll.bind(testRunner);
// export const beforeEach = testRunner.beforeEach.bind(testRunner);
// export const afterEach = testRunner.afterEach.bind(testRunner);
// export const afterAll = testRunner.afterAll.bind(testRunner);
// export const spyOn = <T extends Record<string, any>, K extends keyof T>(object: T, method: K) => new Spy(object, method);
// export const mockFn = () => {
//   const mockInstance = new MockFunction();
//   const mockFunction = mockInstance.fn.bind(mockInstance);
//   Object.assign(mockFunction, mockInstance);
//   return mockFunction as MockFunction & ((...args: any[]) => any);
// };
// export const snapshotManager = new Snapshot();
// export const setTestConfig = (config: {
//   roots?: string[];
//   typescript?: boolean;
//   testRegex?: RegExp;
//   testPathIgnorePatterns?: string[];
// }) => {
//   if (config.roots !== undefined) testConfig.roots = config.roots;
//   if (config.typescript !== undefined) testConfig.typescript = config.typescript;
//   if (config.testRegex !== undefined) testConfig.testRegex = config.testRegex;
//   if (config.testPathIgnorePatterns !== undefined) testConfig.testPathIgnorePatterns = config.testPathIgnorePatterns;
// };
import { Expect, Snapshot, TestRunner, MockFunction, Spy, testConfig, TestFunction, HookFunction } from "./helpers";

export const testRunner = TestRunner.getInstance();
export const expect = <T>(value: T) => {
  let testFilePath = "";

  const error = new Error();
  if (error.stack) {
    const stackLines = error.stack.split("\n");
    const callerLine = stackLines[2];
    const fileMatch = callerLine.match(/\((.*?):(\d+):(\d+)\)/);
    if (fileMatch) testFilePath = fileMatch[1].replace(/\\/g, "/");
  }

  return new Expect(value, testFilePath);
};

export const describe: (name: string, callback: () => void) => void = testRunner.describe.bind(testRunner);
export const it: (name: string, callback: TestFunction) => void = testRunner.it.bind(testRunner);
export const beforeAll: (callback: HookFunction) => void = testRunner.beforeAll.bind(testRunner);
export const beforeEach: (callback: HookFunction) => void = testRunner.beforeEach.bind(testRunner);
export const afterEach: (callback: HookFunction) => void = testRunner.afterEach.bind(testRunner);
export const afterAll: (callback: HookFunction) => void = testRunner.afterAll.bind(testRunner);
export const spyOn = <T extends Record<string, any>, K extends keyof T>(object: T, method: K) => new Spy(object, method);
export const mockFn = () => {
  const mockInstance = new MockFunction();
  const mockFunction = mockInstance.fn.bind(mockInstance);
  Object.assign(mockFunction, mockInstance);
  return mockFunction as MockFunction & ((...args: any[]) => any);
};
export const snapshotManager = new Snapshot();
export const setTestConfig = (config: {
  roots?: string[];
  typescript?: boolean;
  testRegex?: RegExp;
  testPathIgnorePatterns?: string[];
}) => {
  if (config.roots !== undefined) testConfig.roots = config.roots;
  if (config.typescript !== undefined) testConfig.typescript = config.typescript;
  if (config.testRegex !== undefined) testConfig.testRegex = config.testRegex;
  if (config.testPathIgnorePatterns !== undefined) testConfig.testPathIgnorePatterns = config.testPathIgnorePatterns;
};
