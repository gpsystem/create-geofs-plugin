import { exec } from "node:child_process";
import { yellow } from "../chalkTypes";

export default function isGitInstalled(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    exec("git --version", (err) => {
      if (err) {
        console.log(yellow("`git` binary not found"));
        return false;
      } else resolve(true);
    });
  });
}
