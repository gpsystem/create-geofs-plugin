import { commonJestConfig } from "../../jest.config";

export default {
  ...commonJestConfig,
  globalTeardown: "./test/teardown.ts",
  setupFilesAfterEnv: ["./test/setup.ts"],
};
