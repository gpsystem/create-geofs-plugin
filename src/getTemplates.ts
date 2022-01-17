import { join } from "path";
import { readdirSync, readFileSync } from "fs-extra";
import type { Template } from "./types";

export default function getTemplates(): Template[] {
  // it should be ../../, but the join call is executed from inside the bin/ directory
  const templatesSourcePath = join(__dirname, "../templates/");

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
