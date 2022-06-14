import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { copyDir, getAllFilesInDir, outputFile } from "../src/fsHelpers";
import { createTestDirectory } from "./utils/index";

const { targetDir: testTargetDir, teardown } = createTestDirectory();

afterAll(() => teardown());

function createTargetDir(): void {
  mkdirSync(testTargetDir, { recursive: true });
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
    const filePath: string = joinWithTargetDir("first", "file.txt");
    const fileContents = "test contents, 12345, 1.2345";

    outputFile(filePath, fileContents);

    expect(readFileSync(filePath, "utf-8")).toBe(fileContents);
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
      // TODO: this will randomly fail
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
  /** The directory that will contain the files that will be copied into {@link firstCopyDir}. */
  const originalCopyDir: string = joinWithTargetDir("second/");
  /** The directory that will have files copied into it. */
  const targetCopyDir: string = joinWithTargetDir("first/");

  // leaving setup specifics to each test
  beforeEach(() => {
    createTargetDir();
    mkdirSync(originalCopyDir);
    mkdirSync(targetCopyDir);
  });
  afterEach(deleteTargetDir);

  test("throws when source and target directories are the same", () => {
    expect(() =>
      copyDir(originalCopyDir, originalCopyDir)
    ).toThrowErrorMatchingSnapshot();
  });

  test("throws when the passed source path isn't a directory", () => {
    const exampleFile: string = joinWithTargetDir("test.txt");

    writeFileSync(exampleFile, "test data");

    expect(() =>
      copyDir(exampleFile, targetCopyDir)
    ).toThrowErrorMatchingSnapshot();
  });

  test("skips files that already exist", () => {
    // setup
    const allFiles: string[] = [
      "./first/some/file.txt",
      "./first/conflicting/file.txt",
      "./second/conflicting/file.txt",
      "./second/some/other/file.txt",
    ];
    const firstDirContents = "test 1";
    const secondDirContents = "test 2";

    for (const filePath of allFiles) {
      const expandedFilePath: string = joinWithTargetDir(filePath);

      outputFile(
        expandedFilePath,
        filePath.includes("first") ? firstDirContents : secondDirContents
      );
    }

    // test
    copyDir(originalCopyDir, targetCopyDir);

    // if the file was overwritten, its contents would be secondDirContents
    expect(
      readFileSync(joinWithTargetDir("./first/conflicting/file.txt"), "utf-8")
    ).toBe(firstDirContents);
  });

  test("overwrites files when overwrite=true", () => {
    // setup
    const allFiles: string[] = [
      "./first/some/file.txt",
      "./first/conflicting/file.txt",
      "./second/conflicting/file.txt",
      "./second/some/other/file.txt",
    ];
    const firstDirContents = "test 1";
    const secondDirContents = "test 2";

    for (const filePath of allFiles) {
      const expandedFilePath: string = joinWithTargetDir(filePath);

      outputFile(
        expandedFilePath,
        filePath.includes("first") ? firstDirContents : secondDirContents
      );
    }

    // test
    copyDir(originalCopyDir, targetCopyDir, {
      overwrite: true,
    });

    // if the file wasn't overwritten, its contents would be firstDirContents
    expect(
      readFileSync(joinWithTargetDir("./first/conflicting/file.txt"), "utf-8")
    ).toBe(secondDirContents);
  });
});
