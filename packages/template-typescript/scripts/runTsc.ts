import { chdir } from "process";
import { exec } from "child_process";
import { mainDir } from "./mainDir";

export function runTsc() {
  chdir(mainDir);

  return new Promise<void>((resolve, reject) => {
    exec("npx tsc", (err, stdout, stderr) => {
      if (err || stderr) {
        if (err) reject(err);
        if (stderr) reject(stderr);
        return;
      }
      resolve();
    });
  });
}
