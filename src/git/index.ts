import { green, red, yellow } from "../chalkTypes";
import isGitInstalled from "./isGitInstalled";
import { join } from "node:path";
import { removeSync } from "fs-extra";
import simpleGit from "simple-git";

export default async function gitInit(destination: string): Promise<void> {
  // if git isn't installed, exit
  if (!(await isGitInstalled())) {
    console.log(yellow("Skipping Git initialization"));
    return;
  }

  const git = simpleGit(destination);

  // if there is already a git repo here, exit
  if (await git.checkIsRepo()) {
    console.log(yellow("Skipping Git initialization"));
    return;
  }

  let initializedGit = false;
  try {
    await git.init();
    initializedGit = true;
    await git.add("./*");
    git.commit("Initial commit");
    console.log(green("Initialized a Git repository"));
  } catch (err: unknown) {
    if (initializedGit) {
      const gitFolder = join(destination, ".git");
      console.log(red(`Cleaning up ${gitFolder} folder`));
      removeSync(gitFolder);
    }
    console.log(red(`Errors while initializing Git repo: ${err}`));
  }
}
