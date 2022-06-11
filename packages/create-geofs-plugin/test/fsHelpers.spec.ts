import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { copyDir, getAllFilesInDir, outputFile } from "../src/fsHelpers";
import { testTargetDir } from "./utils/index";

function createTargetDir(): void {
  mkdirSync(testTargetDir);
}

function deleteTargetDir(): void {
  rmSync(testTargetDir, { recursive: true, force: true });
}

function joinWithTargetDir(...paths: string[]): string {
  return join(testTargetDir, ...paths);
}

describe("output file", () => {
  beforeEach(createTargetDir);
  afterEach(deleteTargetDir);

  test("throws on already existing file", () => {
    const filePath: string = joinWithTargetDir("first", "test.txt");

    mkdirSync(dirname(filePath));
    writeFileSync(filePath, "1");

    expect(() => {
      outputFile(filePath, "2");
    }).toThrowErrorMatchingSnapshot();
  });

  test("overwrites file when force=true", () => {
    const filePath: string = joinWithTargetDir("first", "test.txt");

    mkdirSync(dirname(filePath));
    writeFileSync(filePath, "1");

    const newFileData = "2";
    outputFile(filePath, newFileData, true);

    expect(readFileSync(filePath, "utf-8")).toBe(newFileData);
  });

  test("creates directories when they don't already exist", () => {
    const directoryPath: string = joinWithTargetDir("first", "second");
    const filePath: string = join(directoryPath, "test.txt");
    const fileContents = "1";

    outputFile(filePath, fileContents);

    expect(existsSync(directoryPath)).toBe(true);
  });

  test("doesn't create an already existing directory", () => {
    const directoryPath: string = joinWithTargetDir("first/");
    const firstFilePath: string = join(directoryPath, "test.txt");
    const firstFileContents = "1";

    mkdirSync(directoryPath);
    writeFileSync(firstFilePath, firstFileContents);
    outputFile(join(directoryPath, "test2.txt"), "2");

    // if it recreated the directory, the first file would no longer exist
    expect(existsSync(firstFilePath)).toBe(true);
  });

  test("writes correctly", () => {
    // DO NOT TOUCH THE CONSTANTS
    // if you do touch these constants, remember to regenerate the snapshots
    const filePath: string = joinWithTargetDir("first", "file.txt");
    const fileContents = "test contents, 12345, 1.2345";

    outputFile(filePath, fileContents);

    expect(readFileSync(filePath, "utf-8")).toMatchSnapshot(
      relative(testTargetDir, filePath).split(sep).join("/")
    );
  });
});

describe("get all files in a directory", () => {
  // use only relative paths from testTargetDir
  const allFiles: string[] = [
    "./file.txt",
    "./.hidden/file.txt",
    "./some/deeply/nested/file.txt",
  ];

  beforeEach(() => {
    createTargetDir();
    for (const fileName of allFiles) {
      outputFile(joinWithTargetDir(fileName), "test data");
    }
  });
  afterEach(deleteTargetDir);

  test("throws when passed path isn't a directory", () => {
    expect(() => [
      ...getAllFilesInDir(joinWithTargetDir("file.txt")),
    ]).toThrowErrorMatchingSnapshot();
  });

  test("always returns real paths", () => {
    const allPaths: string[] = [...getAllFilesInDir(testTargetDir)];

    for (const filePath of allPaths) {
      expect(statSync(filePath).isFile()).toBe(true);
    }
  });

  test("gets the correct paths", () => {
    const allPaths: string[] = [...getAllFilesInDir(testTargetDir)];

    expect(
      allFiles.map((relPath) => joinWithTargetDir(relPath)).sort()
    ).toEqual(allPaths.sort());
  });
});

describe("copy directories", () => {
  test.todo("throws when the passed source path isn't a directory");

  test.todo("skips files that already exist");

  test.todo("overwrites files when overwrite=true");

  test.todo("doesn't modify directory structure");

  test.todo("doesn't modify file contents");
});
