import { execSync } from "node:child_process";
import { join } from "node:path";
import { outputFile } from "./fsHelpers";

export function initializeNpm(
  targetDir: string,
  templateDeps: string[],
  ci: boolean
): void {
  const firstPackageJson: Record<string, unknown> = {
    name: "geofs-plugin",
    version: "",
    private: true,
  };

  outputFile(
    join(targetDir, "package.json"),
    JSON.stringify(firstPackageJson, null, 2),
    {
      force: true,
    }
  );
  if (!ci) execSync(`npm i ${templateDeps.join(" ")} -D`, { cwd: targetDir });
}
