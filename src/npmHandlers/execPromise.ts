import { exec } from "node:child_process";
import { promisify } from "node:util";

const promisifiedExec = promisify(exec);

/**
 * A promisified child_process.{@link exec}.
 * @param command The command to run in the shell. Not sanitized before passed to child_process.exec.
 * @param workingDir The directory to run the command in.
 */
export default async function execPromise(
  command: string,
  workingDir: string
): Promise<void> {
  await promisifiedExec(command, { cwd: workingDir });
}
