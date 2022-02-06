import { readdirSync, readFileSync } from "fs-extra";
import { join } from "node:path";
import mainDir from "./mainDir";
import type { Template } from "./types";

export const templatesSourcePath = join(mainDir, "templates/");

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
        description: readFileSync(descFile, "utf-8").toString().trimEnd(),
      };
    });
}
