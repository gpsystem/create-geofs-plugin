import type { InitialOptionsTsJest } from "ts-jest";

export const commonJestConfig: InitialOptionsTsJest = {
  clearMocks: true,
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "./tsconfig.json",
    },
  },
  moduleFileExtensions: ["js", "ts", "tsx", "d.ts", "json", "node"],
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  preset: "ts-jest/presets/default-esm",
  resetMocks: true,
  testMatch: ["**/test/**/*.spec.ts"],
};

const config: InitialOptionsTsJest = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/template/"],
  coverageProvider: "v8",
  projects: ["./packages/cgp-eslint-config", "./packages/create-geofs-plugin"],
  verbose: true,
};

export default config;
