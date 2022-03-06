import { execFile } from "node:child_process";
import { yellow } from "../chalkTypes";

/**
 * Checks if git is installed and accessible by `git` in the shell.
 * This is a prerequisite to initializing simpleGit.
 */
export default function isGitInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    // using execFile allows us to give the args as a string[]
    execFile("git", ["--version"], (err) => {
      if (err) {
        console.log(yellow("`git` binary not found"));
        resolve(false);
      } else resolve(true);
    });
  });
}
