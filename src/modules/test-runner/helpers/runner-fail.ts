import { runTests } from "./run-tests";
import { setTestConfig } from "..";

setTestConfig({
  roots: ["src/modules/test-runner"],
  typescript: true,
  testRegex: /fail-test\.ts$/,
  testPathIgnorePatterns: [],
});

runTests({
  describeFilter: "",
  itFilter: "",
});
