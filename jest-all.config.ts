import jestConfig from "./jest.config"

export default {
  ...jestConfig,
  testRegex: [".test.ts$", ".spec.ts$"]
}
