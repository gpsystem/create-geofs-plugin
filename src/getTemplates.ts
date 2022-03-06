import { readdirSync, readFileSync } from "fs-extra";
import { join } from "node:path";
import type { Template } from "./types";

export const templatesSourcePath = join(__dirname, "..", "templates/");

/**
 * @returns A list of all the templates and their descriptions.
 */
export default function getTemplates(): Template[] {
  return readdirSync(templatesSourcePath)
    .filter((path) => path.substring(0, 2) !== "__")
    .map((template) => {
      const descFile = join(
        templatesSourcePath,
        template,
        "__description__.txt"
      );
      return {
        name: template,
        description: readFileSync(descFile, "utf-8").trimEnd(),
      };
    });
}
