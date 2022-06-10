import { rm } from "node:fs";
import { join } from "node:path";
import { argv0 as nodeExecPath } from "node:process";

export const testTargetDir: string = join(__dirname, "..", "target/");

/**
 * Clears {@link testTargetDir} for the next test.
 */
export function clearTestTargetDir(): Promise<void> {
  return new Promise((resolve) => {
    rm(testTargetDir, { recursive: true, force: true }, () => resolve());
  });
}

export interface CommandLineArgs {
  template?: "typescript" | "react" | "react-ts";
  overwrite?: boolean;
}

export function createArgsForProgram(args: CommandLineArgs): string[] {
  const binFile: string = join(
    __dirname,
    "../../rollup.config.js",
    "bin/create-geofs-plugin.js"
  );
  const flags: string[] = [];
  if (args.template) flags.push(`--template ${args.template}`);

  return [nodeExecPath, binFile, testTargetDir, ...flags];
}

export * from "./argPermutations";
