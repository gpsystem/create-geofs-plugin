import { commonJestConfig } from "../../jest.config";

export default {
  ...commonJestConfig,
  setupFilesAfterEnv: ["./test/setup.ts"],
  globalTeardown: "./test/teardown.ts",
};
