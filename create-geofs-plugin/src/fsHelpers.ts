import {
  Dirent,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

/**
 * Checks if a path is a directory.
 *
 * @param path The path to check.
 */
function pathIsDirectory(path: string): boolean {
  return statSync(path).isDirectory();
}

/**
 * Writes a file to the filesystem.
 * This is a wrapper around writeFileSync with the preferred encoding, utf-8.
 *
 * @param targetFile The path to the file to write.
 * @param data The data to write to the file.
 */
function internalWriteFileSync(targetFile: string, data: string): void {
  writeFileSync(targetFile, data, "utf-8");
}

/**
 * Outputs a file to the filesystem, recursively creating the directories the file in nested inside of where necessary.
 * This is a wrapper around {@link internalWriteFileSync} that uses {@link mkdirSync} to create the directories.
 *
 * @param targetFile The path to the file to write.
 * @param data The data to write to the file.
 * @param options The options to use.
 * @param options.force Whether to overwrite an existing file.
 */
export function outputFile(
  targetFile: string,
  data: string,
  {
    force = false,
  }: {
    force?: boolean;
  } = {}
): void {
  if (!force && existsSync(targetFile)) throw new Error("file already exists");

  const targetFileDirectory: string = dirname(targetFile);

  if (!existsSync(targetFileDirectory))
    mkdirSync(targetFileDirectory, { recursive: true });
  internalWriteFileSync(targetFile, data);
}

/**
 * Recursively finds all files in a directory and its subdirectories.
 * This is a generator, so it's preferred usage is either a for-of loop or spread syntax.
 *
 * @param dirPath The path to the directory to look through.
 */
export function* getAllFilesInDir(
  dirPath: string
): Generator<string, void, void> {
  if (!pathIsDirectory(dirPath))
    throw new Error(`passed path is not a directory`);

  const directoryDetails: Dirent[] = readdirSync(dirPath, {
    withFileTypes: true,
  });

  for (const directoryChild of directoryDetails) {
    const childPath: string = resolve(dirPath, directoryChild.name);

    if (directoryChild.isDirectory()) yield* getAllFilesInDir(childPath);
    else if (directoryChild.isFile()) yield childPath;
  }
}

/**
 * Copies a directory and all of its contents to a new location.
 * This does not move the directory, but instead copies it.
 *
 * @param srcDir The path to the directory to copy from.
 * @param targetDir The path to the directory to copy to.
 * @param options The options to use.
 * @param options.overwrite Whether to overwrite existing files.
 */
export function copyDir(
  srcDir: string,
  targetDir: string,
  {
    overwrite = false,
  }: {
    overwrite?: boolean;
  } = {}
): void {
  if (srcDir === targetDir)
    throw new Error("source and target directories can't be the same");
  if (!pathIsDirectory(srcDir))
    throw new Error("source path isn't a directory");

  for (const srcFilePath of getAllFilesInDir(srcDir)) {
    const newFilePath: string = join(targetDir, relative(srcDir, srcFilePath));

    if (existsSync(newFilePath) && overwrite === false) continue;
    else
      outputFile(newFilePath, readFileSync(srcFilePath, "utf-8"), {
        force: overwrite,
      });
  }
}
