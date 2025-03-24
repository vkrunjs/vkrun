import { workerData, parentPort } from "worker_threads";
import { testRunner } from "..";
import { red } from "./output-colors";

console.log = (message: string) => {
  parentPort?.postMessage({ type: "log", message });
};

console.info = (message: string) => {
  parentPort?.postMessage({ type: "info", message });
};

console.error = (message: string) => {
  parentPort?.postMessage({ type: "error", message });
};

(async () => {
  try {
    process.env["TS_NODE_CACHE"] = "1";
    process.env["TS_NODE_FAST"] = "1";
    process.env["TS_NODE_TRANSPILE_ONLY"] = "1";
    process.env["TS_NODE_COMPILER_OPTIONS"] = JSON.stringify({
      module: "CommonJS",
      target: "ESNext",
      skipLibCheck: true,
      strict: false,
    });

    const { testFile, describe, it } = workerData;
    try {
      await import(testFile);
    } catch (error: any) {
      parentPort?.postMessage({ type: "error", message: `${red("Error:")} ${error.message}` });
      process.exit(0);
    }
    const filter = { describe, it };
    let results;

    try {
      results = await testRunner.run(filter);
    } catch (error: any) {
      parentPort?.postMessage({ type: "error", message: error.message });
      process.exit(0);
    }

    parentPort?.postMessage({
      type: "done",
      results: JSON.stringify(results),
    });

    process.exit(0);
  } catch (error: any) {
    parentPort?.postMessage({ type: "error", error: error.message });
    process.exit(1);
  }
})();
