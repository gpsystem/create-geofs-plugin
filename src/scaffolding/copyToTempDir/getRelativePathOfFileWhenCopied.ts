import { join, relative, sep } from "node:path";
import { templatesSourcePath } from "../../getTemplates";

export default function getRelativePathOfFileWhenCopied(
  filePath: string,
  handleGitignore?: true
): string {
  const filePathArray = relative(templatesSourcePath, filePath).split(sep);
  filePathArray.shift();

  let joinedPath = join(...filePathArray);

  if (handleGitignore) {
    if (
      joinedPath.endsWith("gitignore") &&
      !joinedPath.endsWith(".gitignore")
    ) {
      joinedPath = join(...filePathArray).replace(/gitignore$/, ".gitignore");
    }
  }

  return joinedPath;
}
