import { rm } from "node:fs";
import { join } from "node:path";

export const testTargetDir: string = join(__dirname, "..", "target/");

export const allArgPermutations: [
  permutationName: string,
  args: CommandLineArgs
][] = [
  ["vanilla", {}],
  ["ts", { template: "typescript" }],
  ["react", { template: "react" }],
  ["react-ts", { template: "react-ts" }],
];

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
}

export function createArgsForProgram(args: CommandLineArgs): string[] {
  const nodeExecPath = process.argv0;
  const binFile: string = join(
    __dirname,
    "../../rollup.config.js",
    "bin/create-geofs-plugin.js"
  );
  const flags: string[] = [];
  if (args.template) flags.push(`--template ${args.template}`);

  return [nodeExecPath, binFile, testTargetDir, ...flags];
}
