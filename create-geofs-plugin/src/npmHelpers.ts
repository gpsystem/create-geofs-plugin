import { execSync } from "node:child_process";
import { join } from "node:path";
import { outputFile } from "./fsHelpers";

export function initializeNpm(
  targetDir: string,
  templateDeps: string[],
  { ci = false } = {}
): void {
  let firstPackageJson: Record<string, unknown> = {
    name: "geofs-plugin",
    version: "",
    private: true,
    scripts: {
      build: "webpack",
      test: "npm run lint",
    },
  };

  if (ci) firstPackageJson = { ...firstPackageJson, templateDeps };

  outputFile(
    join(targetDir, "package.json"),
    JSON.stringify(firstPackageJson, null, 2),
    {
      force: true,
    }
  );
  if (!ci) execSync(`npm i ${templateDeps.join(" ")} -D`, { cwd: targetDir });
}