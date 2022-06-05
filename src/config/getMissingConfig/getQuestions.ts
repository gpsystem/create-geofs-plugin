import { blue, red } from "@colors/colors/safe";
import type { DirectConfig, QuestionI, Template } from "../../types";
import { isNil, kebabCase } from "lodash";
import type { Answers } from "inquirer";
import { basename } from "node:path";
import getTemplates from "../../getTemplates";
import validatePackageName from "validate-npm-package-name";

/** The string that separates the template names from their descriptions. */
export const templateLiteralString = " => ";

/** Asserts that the inputted string is non-empty. */
const validateNonEmptyString = (input: string) => Boolean(input);

/** Gets and returns the questions to be passed to inquirer. */
export default function getQuestions(config: DirectConfig): QuestionI[] {
  const templates = getTemplates();

  const questions: QuestionI[] = [
    {
      type: "input",
      name: "appName",
      default(answers: Answers): string {
        return answers.repo || kebabCase(basename(config.destination));
      },
      message: "App name:",
      when: isNil(config.appName),
      validate(appName: unknown): true | string {
        const result = validatePackageName(String(appName));
        if (result.errors && result.errors.length > 0) {
          return result.errors.join(",");
        }

        return true;
      },
    },
    {
      type: "input",
      name: "description",
      default(): string {
        return "A GeoFS plugin";
      },
      message: "Description of app:",
      when: isNil(config.description),
      validate: validateNonEmptyString,
    },
    {
      type: "input",
      name: "author",
      message: "Author's full name:",
      when: isNil(config.author),
      validate: validateNonEmptyString,
    },
    {
      type: "input",
      name: "email",
      message: "Author's email address",
      suffix: " (used for documentation purposes only):",
      when: config.gitInit && isNil(config.email),
      validate(email: string): boolean {
        const emailTester =
          // regex taken from https://stackoverflow.com/a/46181
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailTester.test(String(email));
      },
    },
    {
      type: "input",
      name: "user",
      message: "GitHub user or org name:",
      when: config.gitInit && isNil(config.user),
      validate: validateNonEmptyString,
    },
    {
      type: "input",
      name: "repo",
      default(answers: Answers): string {
        return answers.appName ?? kebabCase(basename(config.destination));
      },
      message: "Repository name:",
      when: config.gitInit && isNil(config.repo),
      validate: validateNonEmptyString,
    },
    {
      type: "list",
      name: "template",
      choices: templates.map(
        ({ name, description }: Template) =>
          `${name}${templateLiteralString}${description}`
      ),
      message: "Which template would you like to use?",
      // validate the specified template if one is specified
      when(): boolean {
        if (config.template) {
          if (templates.find((template) => template.name === config.template)) {
            return false;
          }
          console.log(
            red(
              `The specified template ${blue(config.template)} does not exist.`
            )
          );
        }
        return true;
      },
      // remove the description from the chosen option before passing it on
      filter(template: string): string {
        return template.substring(0, template.indexOf(templateLiteralString));
      },
      validate: validateNonEmptyString,
    },
  ];

  return questions;
}
