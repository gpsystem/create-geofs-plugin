import type FileInfo from "./FileInfo";
import getRelativePathOfFileWhenCopied from "./getRelativePathOfFileWhenCopied";
import klaw from "klaw";

export default async function getAllPossibleFiles(
  templatePath: string,
  commonTemplatePath: string
): Promise<FileInfo[]> {
  const allPossiblePaths: string[] = [];

  await Promise.all(
    [templatePath, commonTemplatePath].map(async (path) => {
      for await (const file of klaw(path)) {
        if (!file.stats.isFile()) continue;
        allPossiblePaths.push(file.path);
      }
    })
  );

  return allPossiblePaths.map(
    (path): FileInfo => ({
      fullPath: path,
      relativePath: getRelativePathOfFileWhenCopied(path),
      isPartOfCommonTemplate: path.indexOf("__common__") !== -1,
    })
  );
}