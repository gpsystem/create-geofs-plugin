import { start } from "../src/index";
import {
  allArgPermutations,
  createArgsForProgram,
  createTestDirectory__RENAME_LATER,
  TestDirectoryResults,
} from "./utils/index";

describe("integration tests", () => {
  const { cleanup, directoryPath }: TestDirectoryResults =
    createTestDirectory__RENAME_LATER();

  afterEach(() => cleanup());

  for (const [name, args] of allArgPermutations) {
    test(`doesn't throw on valid params ${name}`, async () => {
      await expect(
        start(createArgsForProgram(args, directoryPath), true)
      ).resolves.toBeUndefined();
    });
  }
});
