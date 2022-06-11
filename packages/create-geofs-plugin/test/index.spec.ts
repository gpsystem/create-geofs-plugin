import { start } from "../src/index";
import {
  allArgPermutations,
  clearTestTargetDir,
  createArgsForProgram,
} from "./utils/index";

describe("integration tests", () => {
  afterEach(() => clearTestTargetDir());

  for (const [name, args] of allArgPermutations) {
    test(`doesn't throw on valid params ${name}`, async () => {
      await expect(start(createArgsForProgram(args))).resolves.toBeUndefined();
    });
  }
});
