import { existsSync, readFileSync } from "fs";
import { join } from "path";

/**
 * Gets the template.
 * @returns null if there is no template, otherwise, returns a Buffer of the template.zip
 */
export function getTemplateZip(): Buffer | null {
  const pathToTemplate = join(__dirname, "template.zip");
  if (!existsSync(pathToTemplate)) {
    return null;
  }
  return readFileSync(pathToTemplate);
}
