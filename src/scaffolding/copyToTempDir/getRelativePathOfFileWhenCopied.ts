import { relative, sep } from "node:path";
import { templatesSourcePath } from "../../getTemplates";

/**
 * Gets and returns the relative path of the filePath inside its respective template.
 * Renames "gitignore" to ".gitignore" where necessary.
 */
export default function getRelativePathOfFileWhenCopied(
  filePath: string,
  handleGitignore?: boolean
): string {
  let relativePath: string = relative(templatesSourcePath, filePath);

  const isGitIgnoreRegex = new RegExp(`${sep}gitignore$`);
  if (handleGitignore && isGitIgnoreRegex.test(relativePath)) {
    relativePath = relativePath.replace(isGitIgnoreRegex, `${sep}.gitignore`);
  }

  // remove the first element (the template name) and return
  return relativePath.split(sep).slice(1).join(sep);
}
