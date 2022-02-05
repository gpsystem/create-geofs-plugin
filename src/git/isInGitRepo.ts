import { exec } from "child_process";

export default function isInGitRepo(destination: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    exec(
      "git rev-parse --is-inside-work-tree",
      {
        cwd: destination,
      },
      (err, stdout, stderr) => {
        if (err || stderr.startsWith("fatal:")) resolve(false);
        else {
          console.log("Found already initialized Git repository");
          resolve(true);
        }
      }
    );
  });
}
