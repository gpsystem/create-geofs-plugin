import { readFileSync } from "fs";
import { join } from "path";

/**
 * Gets the template.
 * @returns a Buffer of the template.zip
 */
export function getTemplateZip(): Buffer {
  const pathToTemplate = join(__dirname, "template.zip");
  return readFileSync(pathToTemplate);
}
