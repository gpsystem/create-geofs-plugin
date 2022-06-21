import { join, relative, sep } from "node:path";
import { argv0 as nodeExecPath } from "node:process";

export const packageDir: string = join(__dirname, "..", "..");

export function normalizeToForwardSlash(path: string): string {
  return path.split(sep).join("/");
}

/**
 * Gets the path relative to the directory of the create-geofs-plugin package.
 */
export function pathRelativeToPackage(path: string): string {
  return relative(packageDir, path);
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

  // TODO: document this usage or fix it
  if (args.template) flags.push(`--template=${args.template}`);
  if (args.overwrite) flags.push("--overwrite");

  return [
    nodeExecPath,
    binFile,
    relative(join(__dirname, ".."), targetDir).replace(/^[a-z]/i, "./$&"),
    ...flags,
  ];
}

export { ArgPermutation, allArgPermutations } from "./argPermutations";
export {
  createTestDirectory__RENAME_LATER,
  TestDirectoryResults,
} from "./testDirectories";
