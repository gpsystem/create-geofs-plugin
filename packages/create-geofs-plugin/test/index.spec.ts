import { start } from "../src/index";
import {
  createArgsForProgram,
  allArgPermutations,
  clearTestTargetDir,
} from "./utils/index";

describe("integration tests", () => {
  afterEach(() => clearTestTargetDir());

  for (const [name, args] of allArgPermutations) {
    // eslint-disable-next-line jest/valid-title
    test(name, async () => {
      // TODO: uncomment this, delete the other one, and regenerate snapshots when implementation actually starts
      // await expect(start(createArgsForProgram(args))).resolves.toBeUndefined();
      await expect(
        start(createArgsForProgram(args))
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  }
});
