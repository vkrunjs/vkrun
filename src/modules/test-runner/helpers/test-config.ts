export const testConfig: {
  roots: string[];
  typescript: boolean;
  testRegex: RegExp;
  testPathIgnorePatterns: string[];
  multiThread: boolean;
} = {
  roots: [process.cwd()],
  typescript: true,
  testRegex: /\.(test|spec)\.(ts|js)$/,
  testPathIgnorePatterns: [],
  multiThread: true,
};
