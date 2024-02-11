/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/src/.*\\.types\\.ts$'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/.*\\.d\\.ts$',
    '<rootDir>/src/index.ts$',
    '<rootDir>/src/modules/location/index.ts$',
    '<rootDir>/src/modules/location/types.ts$',
    '<rootDir>/src/modules/logger/types.ts$',
    '<rootDir>/src/modules/utils/types.ts$',
    '<rootDir>/src/modules/schema/types.ts$',
  ]
}

export default config
