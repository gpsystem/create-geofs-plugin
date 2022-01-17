import type { Answers, Question } from "inquirer";

/**
 * The configuration that is guaranteed to exist after the initial input parsing.
 */
export interface DirectConfig {
  /** The folder to output the plugin to. */
  destination: string;
  /** Whether or not to create a git repository. */
  gitInit: boolean;
  /** Whether or not to overwrite existing files. */
  overwrite: boolean;
  /** The name of the plugin. */
  appName?: string;
  /** The name of the author. (not a username) */
  author?: string;
  /** Description of the app. */
  description?: string;
  /** Author's email address. */
  email?: string;
  /** Repository name. */
  // this must be defined even if gitInit is off.
  repo?: string;
  /** The template to use for the plugin. */
  template?: string;
  /** GitHub username or organization. (repo owner) */
  user?: string;
}

export interface InitialConfig extends DirectConfig {
  showTemplates: unknown;
}

/**
 * All configuration after sanitization and acquiring unspecified configuration.
 */
export type Config = Required<DirectConfig>;

export interface QuestionI extends Question {
  default?(answers: Answers): string | boolean;
  choices?: string[];
}

export interface Template {
  name: string;
  description: string;
}

export type OnlyOptionalConfigOptions = Omit<
  DirectConfig,
  "destination" | "gitInit" | "overwrite"
>;
