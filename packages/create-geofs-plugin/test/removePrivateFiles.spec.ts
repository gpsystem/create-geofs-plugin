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

  test("removes marked directories", () => {
    const foldersThatShouldBeRemoved: string[] = allFiles.reduce<string[]>(
      (acc, [relPath, toDelete]) => {
        if (!toDelete) return acc;

        const splitRelPath: string[] = relPath.split("/");
        splitRelPath.forEach((val, i, arr) => {
          // if this is the last iteration (val would be the filename), return
          if (i === arr.length - 1) return;

          if (val.startsWith("__")) {
            acc.push(arr.slice(0, i + 1).join("/"));
          }
        });

        return acc;
      },
      []
    );

    removePrivateFiles(testTargetDir);

    for (const folderRelPath of foldersThatShouldBeRemoved) {
      // expecting the folder to be removed
      expect(existsSync(join(testTargetDir, folderRelPath))).toBe(false);
    }
  });

  test("doesn't touch non-marked files and directories", () => {
    const filesThatShouldNotBeRemoved: string[] = allFiles.reduce<string[]>(
      (acc, [relPath, toDelete]) => {
        if (!toDelete) acc.push(relPath);

        return acc;
      },
      []
    );

    removePrivateFiles(testTargetDir);

    for (const fileRelPath of filesThatShouldNotBeRemoved) {
      // expecting the folder to not be removed
      expect(existsSync(join(testTargetDir, fileRelPath))).toBe(true);
    }
  });
});
