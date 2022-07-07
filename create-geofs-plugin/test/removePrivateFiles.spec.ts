import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { outputFile } from "../src/fsHelpers";
import removePrivateFiles from "../src/removePrivateFiles";
import { createDirectoryForTest } from "./utils/index";

describe("remove private files from directory", () => {
  const { cleanup, directoryPath } = createDirectoryForTest();

  afterEach(() => cleanup());

  // paths should be relative to testTargetDir
  const allFiles: [relPath: string, toDelete: boolean][] = [
    ["./some/nested/file/that/should/not/be/touched.txt", false],
    ["./this/file/should/be/__deleted.txt", true],
    ["./__this/directory/should/also/be/deleted.txt", true],
    ["./do/not/touch/this/file.txt", false],
  ];

  beforeEach(() => {
    mkdirSync(directoryPath, { recursive: true });
    for (const [fileRelPath] of allFiles) {
      outputFile(join(directoryPath, fileRelPath), "test data");
    }
  });

  test("removes the correct files", () => {
    // polyfill for Array#at
    // TODO: remove this when node v14 gets dropped in favor of using Array.at
    function arrayAt<T>(arr: Array<T>, index: number): T | undefined {
      // Allow negative indexing from the end
      if (index < 0) index += arr.length;
      // OOB access is guaranteed to return undefined
      if (index < 0 || index >= arr.length) return undefined;
      // Otherwise, this is just normal property access
      return arr[index];
    }

    const filesThatShouldBeRemoved: string[] = allFiles.reduce<string[]>(
      (acc, [fileRelPath, toDelete]) => {
        // if the file's name starts with __, and the file is marked to be deleted
        if (
          (arrayAt(fileRelPath.split("/"), -1) ?? "").startsWith("__") &&
          toDelete
        )
          return [...acc, fileRelPath];
        else return acc;
      },
      []
    );

    removePrivateFiles(directoryPath);

    for (const fileRelPath of filesThatShouldBeRemoved) {
      // expecting the file to be removed
      expect(existsSync(join(directoryPath, fileRelPath))).toBe(false);
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

    removePrivateFiles(directoryPath);

    for (const folderRelPath of foldersThatShouldBeRemoved) {
      // expecting the folder to be removed
      expect(existsSync(join(directoryPath, folderRelPath))).toBe(false);
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

    removePrivateFiles(directoryPath);

    for (const fileRelPath of filesThatShouldNotBeRemoved) {
      // expecting the folder to not be removed
      expect(existsSync(join(directoryPath, fileRelPath))).toBe(true);
    }
  });
});
