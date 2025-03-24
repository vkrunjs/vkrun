import { readdirSync, statSync, existsSync } from "fs";
import { isAbsolute, join, normalize } from "path";
import { Worker } from "worker_threads";
import os from "os";
import { testRunner } from "..";

import { blackOnGray, blackOnGreen, bold, dim, green, red, testConfig, whiteOnRed, yellow } from ".";

const MAX_WORKERS = Math.max(1, Math.floor(os.cpus().length * 0.9));

const getTestFiles = (roots: string[], testRegex: RegExp): string[] => {
  let files: string[] = [];

  const getFilesRecursive = (basePath: string) => {
    const items = readdirSync(basePath, { withFileTypes: true });

    items.forEach((item) => {
      const fullPath = normalize(join(basePath, item.name));

      if (item.isDirectory()) {
        getFilesRecursive(fullPath);
      } else if (item.isFile() && testRegex.test(item.name)) {
        files.push(fullPath);
      }
    });
  };

  roots.forEach((root) => {
    const basePath = normalize(isAbsolute(root) ? root : join(process.cwd(), root));

    if (!basePath || !statSync(basePath, { throwIfNoEntry: false })) {
      throw new Error(`Arquivo ou diretório não encontrado: ${basePath}`);
    }

    const stats = statSync(basePath);

    if (stats.isFile() && testRegex.test(basePath)) {
      files.push(basePath);
    } else if (stats.isDirectory()) {
      getFilesRecursive(basePath);
    }
  });

  return files;
};

export const runTests = async ({ describeFilter = "", itFilter = "" }: { describeFilter: string; itFilter: string }) => {
  const testFiles = getTestFiles(testConfig.roots, testConfig.testRegex);
  const startTime = Date.now();
  let results: any[] = [];
  let completedTests = 0;

  console.log(`\n  Running ${testFiles.length} test file${testFiles.length > 1 ? "s" : ""}`);

  const activeWorkers = new Set<Promise<void>>();
  let countExe = 0;

  const runWorker = (testFile: string) => {
    return new Promise<void>((resolve, reject) => {
      const worker = new Worker(join(__dirname, "worker.ts"), {
        workerData: { testFile, describe: describeFilter, it: itFilter },
        execArgv: ["--require", "ts-node/register"],
      });

      worker.on("message", (msg) => {
        if (msg.type === "done") {
          countExe++;
          results.push(...JSON.parse(msg.results));
          completedTests++;
          printSummary(JSON.parse(msg.results));
          worker.terminate();
          resolve();
        } else if (msg.type === "log" || msg.type === "error" || msg.type === "info") {
          const type: "log" | "info" | "error" = msg.type;
          console[type](msg.message);
        } else {
          throw new Error(msg?.error);
        }
      });

      worker.on("error", (err) => {
        console.error(`🔥 Fatal error in Worker ${testFile}:`, err);
        reject(err);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`⚠️ Error executing file: ${testFile}`);
        }
      });
    });
  };

  for (const testFile of testFiles) {
    if (activeWorkers.size >= MAX_WORKERS) {
      await Promise.race(activeWorkers);
    }

    const workerPromise = runWorker(testFile);
    activeWorkers.add(workerPromise);
    workerPromise.finally(() => activeWorkers.delete(workerPromise));
  }

  await Promise.all(activeWorkers);
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(3);
  return printResults(results, totalTime);
};

type Test =
  | {
      status: "passed";
      id: string;
      name: string;
    }
  | {
      status: "skipped";
      id: string;
      name: string;
    }
  | {
      status: "failed";
      id: string;
      name: string;
      error: string;
    };

type Result = {
  id: string;
  name: string;
  filename: string;
  tests: Test[];
};

const printSummary = (results: Result[]) => {
  results.forEach((suite) => {
    const passAll =
      suite.tests.length > 0 && suite.tests.every((test) => test.status === "passed" || test.status === "skipped");

    if (passAll) {
      console.log("");
      console.log(" ", blackOnGreen(bold(" PASS ")), blackOnGray(` ${suite.name}`), " - ", dim(bold(`${suite.filename}\n`)));
    } else {
      console.log("");
      console.log(" ", whiteOnRed(bold(" FAIL ")), blackOnGray(` ${suite.name}`), " - ", dim(bold(`${suite.filename}\n`)));
    }

    suite.tests.forEach((test) => {
      if (test.status === "passed") {
        console.log(green("    🗸 "), dim(`${test.name}`));
      } else if (test.status === "skipped") {
        console.log(yellow("    ○ "), dim(`skipped ${test.name}`));
      } else {
        console.log(red("    ✘ "), dim(`${test.name}`));
      }
    });
  });
};

const printResults = (results: Result[], totalTime: string) => {
  let totalSuites = 0;
  let failedSuites = 0;
  let passedSuites = 0;
  let totalTests = 0;
  let failedTests = 0;
  let passedTests = 0;
  let skippedTests = 0;

  results.forEach((suite) => {
    totalSuites++;
    const failedAll =
      suite.tests.length > 0 && suite.tests.every((test) => test.status === "failed" || test.status === "skipped");

    if (failedAll) {
      failedSuites++;
    } else {
      passedSuites++;
    }

    suite.tests.forEach((test) => {
      totalTests++;
      if (test.status === "failed") {
        failedTests++;
        console.log(red(`\n  ● ${suite.name} > ${test.name}`));
        console.log(test.error);
      } else if (test.status === "skipped") {
        skippedTests++;
      } else {
        passedTests++;
      }
    });
  });

  // Função para remover códigos de cores ANSI
  const removeColors = (str: string): string => {
    return str.replace(/\x1B\[([0-9]{1,2}(?:;[0-9]{1,2})?)?[m|K]/g, "");
  };

  const snapshotCount = testRunner.getSnapshotCount();
  const testSuitesLine = ` Test Suites: ${failedSuites > 0 ? red(`${failedSuites} failed`) + ", " : ""}${passedSuites > 0 ? green(`${passedSuites} passed`) + ", " : ""}${totalSuites} total`;
  const testsLine = ` Tests:       ${failedTests > 0 ? red(`${failedTests} failed`) + ", " : ""}${passedTests > 0 ? green(`${passedTests} passed`) + ", " : ""}${skippedTests > 0 ? yellow(`${skippedTests} skipped`) + ", " : ""}${totalTests} total`;
  const testSuitesLineNoColors = removeColors(testSuitesLine);
  const testsLineNoColors = removeColors(testsLine);
  const maxLength = Math.max(testSuitesLineNoColors.length, testsLineNoColors.length);
  const separator = "━".repeat(maxLength);

  console.log(separator);
  console.log(testSuitesLine);
  console.log(testsLine);
  console.log(` Snapshots:   ${bold(`${snapshotCount} total`)}`);
  console.log(` Time:        ${totalTime} s`);
  console.log(separator, "\n");
};
