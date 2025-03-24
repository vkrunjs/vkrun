import { randomUUID } from "../../utils";
import { red } from "./output-colors";

export type HookFunction = () => void | Promise<void>;
export type TestFunction = () => void | Promise<void>;

interface TestSuite {
  id: string;
  name: string;
  filename: string;
  tests: TestCase[];
  beforeAll: HookFunction[];
  beforeEach: HookFunction[];
  afterEach: HookFunction[];
  afterAll: HookFunction[];
}

interface TestCase {
  id: string;
  name: string;
  callback: TestFunction;
}

export class TestRunner {
  private static instance: TestRunner;
  private suites: Record<string, TestSuite> = {};
  private currentSuite: TestSuite | null = null;
  private snapshotCount = 0; // ➕ Contador de snapshots

  private constructor() {}

  static getInstance(): TestRunner {
    if (!TestRunner.instance) {
      TestRunner.instance = new TestRunner();
    }
    return TestRunner.instance;
  }

  incrementSnapshotCount(): void {
    this.snapshotCount++;
  }

  getSnapshotCount(): number {
    return this.snapshotCount;
  }

  describe(name: string, callback: () => void): void {
    const suiteId = randomUUID();

    let filename = "";
    const error = new Error();
    if (error.stack) {
      const stackLines = error.stack.split("\n");
      const callerLine = stackLines[2];
      const fileMatch = callerLine.match(/\((.*?):(\d+):(\d+)\)/);
      if (fileMatch) filename = fileMatch[1].replace(/\\/g, "/");
    }

    const suite: TestSuite = {
      id: suiteId,
      name,
      filename,
      tests: [],
      beforeAll: [],
      beforeEach: [],
      afterEach: [],
      afterAll: [],
    };

    this.suites[suiteId] = suite;
    this.currentSuite = suite;
    callback();
    this.currentSuite = null;
  }

  it(name: string, callback: TestFunction): void {
    if (!this.currentSuite) throw new Error(red("✘") + " 'it()' must be inside a 'describe()'");
    this.currentSuite.tests.push({ id: randomUUID(), name, callback });
  }

  beforeAll(callback: HookFunction): void {
    if (!this.currentSuite) throw new Error(red("✘") + " 'beforeAll()' must be inside a 'describe()'");
    this.currentSuite.beforeAll.push(callback);
  }

  beforeEach(callback: HookFunction): void {
    if (!this.currentSuite) throw new Error(red("✘") + " 'beforeEach()' must be inside a 'describe()'");
    this.currentSuite.beforeEach.push(callback);
  }

  afterEach(callback: HookFunction): void {
    if (!this.currentSuite) throw new Error(red("✘") + " 'afterEach()' must be inside a 'describe()'");
    this.currentSuite.afterEach.push(callback);
  }

  afterAll(callback: HookFunction): void {
    if (!this.currentSuite) throw new Error(red("✘") + " 'afterAll()' must be inside a 'describe()'");
    this.currentSuite.afterAll.push(callback);
  }

  async run(filter?: { describe: string; it: string }): Promise<any[]> {
    let results: any[] = [];

    for (const suiteId in this.suites) {
      const suite = this.suites[suiteId];
      if (filter?.describe && !suite.name.includes(filter.describe)) {
        continue;
      }

      let suiteResults = {
        id: suite.id,
        name: suite.name,
        filename: suite.filename,
        tests: [] as any[],
      };

      await Promise.all(suite.beforeAll.map((hook) => hook()));

      for (const test of suite.tests) {
        if (filter?.it && !test.name.includes(filter.it)) {
          suiteResults.tests.push({ id: test.id, name: test.name, status: "skipped" });
          continue;
        }

        try {
          await Promise.all(suite.beforeEach.map((hook) => hook()));
          await test.callback();
          await Promise.all(suite.afterEach.map((hook) => hook()));

          suiteResults.tests.push({ id: test.id, name: test.name, status: "passed" });
        } catch (error: any) {
          suiteResults.tests.push({
            id: test.id,
            name: test.name,
            status: "failed",
            error: error.message,
          });
        }
      }

      await Promise.all(suite.afterAll.map((hook) => hook()));
      results.push(suiteResults);
    }

    return results;
  }
}
