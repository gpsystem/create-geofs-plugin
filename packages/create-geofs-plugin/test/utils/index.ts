import { rm } from "node:fs";
import { join, relative, sep } from "node:path";
import { argv0 as nodeExecPath } from "node:process";

export const testTargetDir: string = join(__dirname, "..", "target/");

export const packageDir: string = join(__dirname, "..", "..");

export function normalizeToForwardSlash(path: string): string {
  return path.split(sep).join("/");
}

/**
 * Gets the path relative to the directory of the create-geofs-plugin package.
 */
export function pathRelativeToPackage(path: string): string {
  console.log(path);
  return relative(packageDir, path);
}

/**
 * Clears {@link testTargetDir} for the next test. Also normalizes to forward slashes
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
    "..",
    "..",
    "bin/create-geofs-plugin.js"
  );
  const flags: string[] = [];

  // TODO: make the quoting unnecessary
  if (args.template) flags.push(`-t "${args.template}"`);
  if (args.overwrite) flags.push("--overwrite");

  return [
    nodeExecPath,
    binFile,
    relative(join(__dirname, ".."), testTargetDir).replace(/^[a-z]/i, "./$&"),
    ...flags,
  ];
}

export * from "./argPermutations";
