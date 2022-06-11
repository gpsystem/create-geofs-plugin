import {
  Dirent,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

function internalWriteFileSync(targetFile: string, data: string): void {
  writeFileSync(targetFile, data, "utf-8");
}

export function outputFile(targetFile: string, data: string): void {
  const targetFileDirectory: string = dirname(targetFile);

  if (!existsSync(targetFileDirectory))
    mkdirSync(targetFileDirectory, { recursive: true });
  internalWriteFileSync(targetFile, data);
}

export function* getAllFilesInDir(
  dirName: string
): Generator<string, void, void> {
  if (!statSync(dirName).isDirectory())
    throw new Error(`passed directory ${dirName} is not a directory`);

  const directoryDetails: Dirent[] = readdirSync(dirName, {
    withFileTypes: true,
  });

  for (const directoryChild of directoryDetails) {
    const childPath: string = resolve(dirName, directoryChild.name);
    const isDirectory = directoryChild.isDirectory();

    if (isDirectory) yield* getAllFilesInDir(childPath);
    else yield childPath;
  }
}

export function copyDir(srcDir: string, targetDir: string): void {
  for (const srcFilePath of getAllFilesInDir(srcDir)) {
    const newFilePath: string = join(targetDir, relative(srcDir, srcFilePath));

    mkdirSync(dirname(newFilePath), { recursive: true });
    copyFileSync(srcFilePath, newFilePath);
  }
}
