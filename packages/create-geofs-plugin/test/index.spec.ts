import { start } from "../src/index";
import {
  createArgsForProgram,
  allArgPermutations,
  clearTestTargetDir,
} from "./utils";

describe("integration tests", () => {
  afterEach(() => clearTestTargetDir());

  for (const [name, args] of allArgPermutations) {
    // eslint-disable-next-line jest/valid-title
    test(name, async () => {
      await expect(start(createArgsForProgram(args))).resolves.toBeUndefined();
    });
  }
});
