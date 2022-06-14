import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { outputFile } from "../src/fsHelpers";
import removePrivateFiles from "../src/removePrivateFiles";
import { createTestDirectory } from "./utils";

describe("remove private files from directory", () => {
  const { targetDir: testTargetDir, teardown } = createTestDirectory();
  // paths should be relative to testTargetDir
  const allFiles: [relPath: string, toDelete: boolean][] = [
    ["./some/nested/file/that/should/not/be/touched.txt", false],
    ["./this/file/should/be/__deleted.txt", true],
    ["./__this/directory/should/also/be/deleted.txt", true],
    ["./do/not/touch/this/file.txt", false],
  ];

  beforeEach(() => {
    mkdirSync(testTargetDir, { recursive: true });
    for (const [fileRelPath] of allFiles) {
      outputFile(join(testTargetDir, fileRelPath), "test data");
    }
  });
  afterEach(() => {
    rmSync(testTargetDir, { recursive: true, force: true });
  });
  afterAll(() => teardown());

  test("removes the correct files", () => {
    const filesThatShouldBeRemoved: string[] = allFiles.reduce<string[]>(
      (acc, [fileRelPath, toDelete]) => {
        // if the file's name starts with __, and the file is marked to be deleted
        if (
          (fileRelPath.split("/").at(-1)?.startsWith("__") ?? false) &&
          toDelete
        )
          return [...acc, fileRelPath];
        else return acc;
      },
      []
    );

    removePrivateFiles(testTargetDir);

    for (const fileRelPath of filesThatShouldBeRemoved) {
      // expecting the file to be removed
      expect(existsSync(join(testTargetDir, fileRelPath))).toBe(false);
    }
  });

  test.todo("removes marked directories");

  test.todo("doesn't touch non-marked files and directories");
});
