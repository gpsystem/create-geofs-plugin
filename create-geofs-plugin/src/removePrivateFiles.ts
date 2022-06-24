import { rmSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { getAllFilesInDir } from "./fsHelpers";

export default function removePrivateFiles(directoryPath: string): void {
  for (const fullFilePath of getAllFilesInDir(directoryPath)) {
    const relFilePathParts: string[] = relative(
      directoryPath,
      fullFilePath
    ).split(sep);

    for (const [i, pathPortion] of relFilePathParts.entries()) {
      // all private entries start with __
      if (pathPortion.startsWith("__")) {
        const relativePathPortion: string = relFilePathParts
          .slice(0, i + 1)
          .join("/");
        // keep in mind that fullPath can be a directory or file
        const fullPath: string = join(directoryPath, relativePathPortion);

        // fullPath could be a directory or a file
        rmSync(fullPath, { force: true, recursive: true });
        // if there are more parts to the path, they would have to be nested files or subdirectories
        // they would have been removed by the rmSync call, so skip over all of them
        break;
      }
    }
  }
}
