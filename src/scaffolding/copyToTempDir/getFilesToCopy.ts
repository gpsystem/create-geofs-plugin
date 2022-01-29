import type FileInfo from "./FileInfo";
import separatePossibleFiles from "./separatePossibleFiles";

export default function getFilesToCopy(possibleFiles: FileInfo[]): string[] {
  const filesToCopy: string[] = [];

  const [separatedFileInfo, separatedRelativePathStrings] =
    separatePossibleFiles(possibleFiles);

  separatedFileInfo.forEach((arr) => {
    arr.forEach((file) => {
      if (file.isPartOfCommonTemplate) {
        // if the file is in the specific template, case insensitive
        if (
          new RegExp(separatedRelativePathStrings[0].join("|"), "gi").test(
            file.relativePath
          )
        )
          return;
      }
      filesToCopy.push(file.fullPath);
    });
  });

  return filesToCopy;
}
