import handleSingleFile from "./handleSingleFile";
import { relative } from "node:path";
import type { Results } from "./Results";

export default async function copyToFinalDir(
  tempDirFilePaths: string[],
  tempDirName: string,
  targetDirPath: string,
  overwrite: boolean
): Promise<Results[]> {
  const results: Results[] = [];

  tempDirFilePaths.forEach((path) => {
    const relativeFilePath = relative(tempDirName, path);
    results.push(
      handleSingleFile(path, relativeFilePath, targetDirPath, overwrite)
    );
  });

  return results.sort((a, b) => (a.path > b.path ? 1 : -1));
}
