import { join, relative, sep } from "node:path";
import { cwd, argv0 as nodeExecPath } from "node:process";

export function normalizeToForwardSlash(path: string): string {
  return path.split(sep).join("/");
}

export interface CommandLineArgs {
  template?: "typescript" | "react" | "react-ts";
  overwrite?: boolean;
}

export function createArgsForProgram(
  args: CommandLineArgs,
  targetDir: string
): string[] {
  const binFile: string = join(
    __dirname,
    "..",
    "..",
    "bin",
    "create-geofs-plugin.js"
  );
  const flags: string[] = [];

  if (args.template) flags.push(`--template`, args.template);
  if (args.overwrite) flags.push("--overwrite");

  return [
    nodeExecPath,
    binFile,
    relative(cwd(), targetDir).replace(/^[a-z]/i, "./$&"),
    ...flags,
  ];
}

export { ArgPermutation, allArgPermutations } from "./argPermutations";
export { createDirectoryForTest } from "./testDirectories";
