import { join, relative, sep } from "node:path";
import { templatesSourcePath } from "../../getTemplates";

export default function getRelativePathOfFileWhenCopied(
  filePath: string
): string {
  const filePathArray = relative(templatesSourcePath, filePath).split(sep);
  filePathArray.shift();

  return join(...filePathArray);
}
