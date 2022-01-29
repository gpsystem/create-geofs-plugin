import { copySync, existsSync } from "fs-extra";
import { join } from "path";
import type { Results } from "./Results";

export default function handleSingleFile(
  tempDirFilePath: string,
  relativeFilePath: string,
  targetDirPath: string,
  overwrite: boolean
): Results {
  let skipped = false;
  const newPath = join(targetDirPath, relativeFilePath);
  if (!overwrite) {
    existsSync(newPath)
      ? (skipped = true)
      : copySync(tempDirFilePath, newPath, { overwrite });
  }
  return { path: newPath, skipped };
}
