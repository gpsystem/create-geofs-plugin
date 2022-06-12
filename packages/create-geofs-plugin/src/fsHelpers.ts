import {
  Dirent,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

function pathIsDirectory(path: string): boolean {
  return statSync(path).isDirectory();
}

function internalWriteFileSync(targetFile: string, data: string): void {
  writeFileSync(targetFile, data, "utf-8");
}

export function outputFile(
  targetFile: string,
  data: string,
  force = false
): void {
  if (!force && existsSync(targetFile)) throw new Error("file already exists");

  const targetFileDirectory: string = dirname(targetFile);

  if (!existsSync(targetFileDirectory))
    mkdirSync(targetFileDirectory, { recursive: true });
  internalWriteFileSync(targetFile, data);
}

// TODO: should we make a wrapper for this that throws on initialization and returns the full string[]?
export function* getAllFilesInDir(
  dirName: string
): Generator<string, void, void> {
  if (!pathIsDirectory(dirName))
    throw new Error(`passed path is not a directory`);

  const directoryDetails: Dirent[] = readdirSync(dirName, {
    withFileTypes: true,
  });

  for (const directoryChild of directoryDetails) {
    const childPath: string = resolve(dirName, directoryChild.name);

    if (directoryChild.isDirectory()) yield* getAllFilesInDir(childPath);
    else if (directoryChild.isFile()) yield childPath;
  }
}

export interface CopyDirOptions {
  overwrite?: boolean;
}

export function copyDir(
  srcDir: string,
  targetDir: string,
  { overwrite = false }: CopyDirOptions = {}
): void {
  if (srcDir === targetDir)
    throw new Error("source and target directories can't be the same");
  if (!pathIsDirectory(srcDir))
    throw new Error("source path isn't a directory");

  for (const srcFilePath of getAllFilesInDir(srcDir)) {
    const newFilePath: string = join(targetDir, relative(srcDir, srcFilePath));

    if (existsSync(newFilePath) && overwrite === false) continue;
    else outputFile(newFilePath, readFileSync(srcFilePath, "utf-8"), overwrite);
  }
}
