import { green, red, yellow } from "../chalkTypes";
import isGitInstalled from "./isGitInstalled";
import { join } from "node:path";
import { rm } from "node:fs/promises";
import simpleGit from "simple-git";
import type { SimpleGit } from "simple-git";

/**
 * Initializes a git repository in the final directory.
 * Exits if git is not installed or a repo is already initialized.
 */
export default async function gitInit(destination: string): Promise<void> {
  // if git isn't installed, exit
  if (!(await isGitInstalled())) {
    console.log(
      yellow(`
\`git\` binary not found
Skipping Git initialization`)
    );
    return;
  }

  const git: SimpleGit = simpleGit(destination);

  // if there is already a repo here, exit
  if (await git.checkIsRepo()) {
    console.log(
      yellow(`
Repo already initialized
Skipping Git initialization`)
    );
    return;
  }

  try {
    // initialize a git repo and commit everything
    await git.init();
    await git.add("./*");
    await git.commit("Initial commit");
    console.log(green("Initialized a Git repository"));
  } catch (err: unknown) {
    // destroy the .git directory to allow the user to run `git init` on their own
    const gitFolder: string = join(destination, ".git");
    console.log(red(`Cleaning up git directory`));
    // not using fs-extra.removeSync to avoid the possibility of running into a nonexistent .git directory
    await rm(gitFolder, { recursive: true, force: true });
    console.log(red(`Errors while initializing Git repo: ${err}`));
  }
}
