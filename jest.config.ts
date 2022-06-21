import type { InitialOptionsTsJest } from "ts-jest";

export const commonJestConfig: InitialOptionsTsJest = {
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
};

const config: InitialOptionsTsJest = {
  projects: ["./packages/cgp-eslint-config", "./packages/create-geofs-plugin"],
  collectCoverage: true,
  collectCoverageFrom: ["packages/**/src/**/*.ts"],
  coveragePathIgnorePatterns: ["/template/"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose: true,
};

export default config;
