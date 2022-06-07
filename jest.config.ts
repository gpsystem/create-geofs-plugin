import type { InitialOptionsTsJest } from "ts-jest";

const config: InitialOptionsTsJest = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
      isolatedModules: true,
    },
  },
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  testMatch: ["**/test/**/*.spec.ts"],
  moduleFileExtensions: ["js", "ts", "tsx", "d.ts", "json", "node"],
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["packages/**/*.ts"],
  coveragePathIgnorePatterns: ["/dist/", "/node_modules/"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose: true,
};

export default config;
