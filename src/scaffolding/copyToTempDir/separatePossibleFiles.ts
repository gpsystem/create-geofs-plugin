import type FileInfo from "./FileInfo";

export default function separatePossibleFiles(
  possibleFiles: FileInfo[]
): [[FileInfo[], FileInfo[]], [string[], string[]]] {
  // the first array is everything in the specific template, the second is everything in the common template
  const separatedFileInfo: [FileInfo[], FileInfo[]] = [[], []];
  const separatedRelativePathStrings: [string[], string[]] = [[], []];

  possibleFiles.forEach((file) => {
    const arrayToPushIndex = file.isPartOfCommonTemplate ? 1 : 0;
    separatedFileInfo[arrayToPushIndex].push(file);
    separatedRelativePathStrings[arrayToPushIndex].push(file.relativePath);
  });

  return [separatedFileInfo, separatedRelativePathStrings];
}
