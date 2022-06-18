import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
      isolatedModules: true,
    },
  },
  // TODO: someday, we need to mock fs so we can run tests in parallel
  maxWorkers: 1,
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  testMatch: ["**/test/**/*.spec.ts"],
  moduleFileExtensions: ["js", "ts", "tsx", "d.ts", "json", "node"],
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["packages/**/src/**/*.ts"],
  coveragePathIgnorePatterns: ["/template/"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose: true,
};

export default config;
