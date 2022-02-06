import { exec } from "child_process";

export default function execPromise(
  command: string,
  workingDir: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    exec(command, { cwd: workingDir }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
