import { execFile } from "node:child_process";
import { yellow } from "../chalkTypes";

export default function isGitInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    // execFile allows us to give the args as a string[]
    execFile("git", ["--version"], (err) => {
      if (err) {
        console.log(yellow("`git` binary not found"));
        resolve(false);
      } else resolve(true);
    });
  });
}
