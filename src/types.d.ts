import type { Question } from "inquirer";

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
  repo?: string;
  /** The template to use for the plugin. */
  template?: string;
  /** GitHub username or organization. (repo owner) */
  user?: string;
}

/**
 * The configuration that exists immediately after commander parses arguments.
 */
export interface InitialConfig extends Omit<DirectConfig, "destination"> {
  showTemplates?: boolean;
}

/**
 * All configuration after sanitization and acquiring unspecified configuration.
 */
export type Config = Required<DirectConfig> & {
  year: string;
};

/**
 * A question to be passed to inquirer.
 */
export interface QuestionI extends Question {
  choices?: string[];
}

/**
 * Information about a template.
 */
export interface Template {
  name: string;
  description: string;
}

/**
 * The configuration options that may not exist after initial input parsing.
 */
export type OnlyOptionalConfigOptions = Omit<
  DirectConfig,
  "destination" | "gitInit" | "overwrite"
>;
