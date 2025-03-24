/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const commonConfig: Partial<Config> = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  //collectCoverage: true,
  //collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  //coverageProvider: "v8",
  testEnvironment: "node",
  transform: {
    // Configuração do ts-jest dentro de transform
    ".+\\.ts$": [
      "ts-jest",
      {
        diagnostics: { warnOnly: false },
      },
    ],
  },
  testRegex: ".spec.ts",
  testPathIgnorePatterns: ["<rootDir>/src/.*\\.types\\.ts$"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/.*\\.d\\.ts$",
    "<rootDir>/src/index.ts$",
    "<rootDir>/src/modules/location/index.ts$",
    "<rootDir>/src/modules/location/types.ts$",
    "<rootDir>/src/modules/logger/types.ts$",
    "<rootDir>/src/modules/utils/types.ts$",
    "<rootDir>/src/modules/schema/types.ts$",
  ],
};

const config: Config = {
  projects: [
    {
      ...commonConfig,
      displayName: "test-runner",
      roots: ["<rootDir>/src/modules/test-runner"],
    },
    {
      ...commonConfig,
      displayName: "cors",
      roots: ["<rootDir>/src/modules/cors"],
    },
    {
      ...commonConfig,
      displayName: "jwt",
      roots: ["<rootDir>/src/modules/jwt"],
    },
    {
      ...commonConfig,
      displayName: "load-env",
      roots: ["<rootDir>/src/modules/load-env"],
    },
    {
      ...commonConfig,
      displayName: "location",
      roots: ["<rootDir>/src/modules/location"],
    },
    {
      ...commonConfig,
      displayName: "logger",
      roots: ["<rootDir>/src/modules/logger"],
    },
    {
      ...commonConfig,
      displayName: "mime",
      roots: ["<rootDir>/src/modules/mime"],
    },
    {
      ...commonConfig,
      displayName: "parse-data",
      roots: ["<rootDir>/src/modules/parse-data"],
    },
    {
      ...commonConfig,
      displayName: "rate-limit",
      roots: ["<rootDir>/src/modules/rate-limit"],
    },
    {
      ...commonConfig,
      displayName: "router",
      roots: ["<rootDir>/src/modules/router"],
    },
    {
      ...commonConfig,
      displayName: "schema",
      roots: ["<rootDir>/src/modules/schema"],
    },
    {
      ...commonConfig,
      displayName: "serve-static-file",
      roots: ["<rootDir>/src/modules/serve-static-file"],
    },
    {
      ...commonConfig,
      displayName: "super-request",
      roots: ["<rootDir>/src/modules/super-request"],
    },
    {
      ...commonConfig,
      displayName: "swagger-ui",
      roots: ["<rootDir>/src/modules/swagger-ui"],
    },
    {
      ...commonConfig,
      displayName: "upload",
      roots: ["<rootDir>/src/modules/upload"],
    },
    {
      ...commonConfig,
      displayName: "utils",
      roots: ["<rootDir>/src/modules/utils"],
    },
  ],
};

export default config;
