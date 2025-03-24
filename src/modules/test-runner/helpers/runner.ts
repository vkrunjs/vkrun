import { join } from "path";
import { runTests } from "./run-tests";
import { setTestConfig } from "..";

const args = process.argv.slice(2);

let describeFilter = "";
let itFilter = "";
let testFile = "";

if (args.length > 0) {
  testFile = args[0];

  if (args[1] && !args[1].startsWith("-t")) {
    describeFilter = args[1];
  }

  if (args[3] && !args[3].startsWith("-t")) {
    itFilter = args[3];
  }
} else {
  console.log("No test file provided.");
}

const dir = testFile ? testFile : join(process.cwd(), "src");

setTestConfig({
  roots: [dir],
  typescript: true,
  testRegex: /\.test\.(ts|js)$/,
  testPathIgnorePatterns: [],
});

runTests({
  describeFilter,
  itFilter,
});
