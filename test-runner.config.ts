import { setTestConfig } from "./src/modules/test-runner";

setTestConfig({
  roots: ["src"],
  typescript: true,
  testRegex: /\.test\.(ts|js)$/,
  testPathIgnorePatterns: ["src/modules/test-runner"],
});
