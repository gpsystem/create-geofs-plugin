import { exec } from "node:child_process";

// TODO: should we replace this with util.promisify(exec)?
/**
 * A promisified child_process.{@link exec}.
 * @param command The command to run in the shell. Not sanitized before passed to child_process.exec.
 * @param workingDir The directory to run the command in.
 */
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
