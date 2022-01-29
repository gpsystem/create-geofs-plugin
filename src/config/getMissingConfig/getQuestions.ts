import { blue, red } from "../../chalkTypes";
import type { DirectConfig, QuestionI, Template } from "../../types";
import type { Answers } from "inquirer";
import { basename } from "path";
import getTemplates from "../../getTemplates";
import isNil from "lodash/isNil";
import kebabCase from "lodash/kebabCase";
import validatePackageName from "validate-npm-package-name";

export const templateLiteralString = " => ";

function validateThereIsInput(input: unknown): boolean {
  const testRegex = /^.{1}/i;
  return input ? testRegex.test(String(input)) : false;
}

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
      validate: validateThereIsInput,
    },
    {
      type: "input",
      name: "author",
      message: "Author's full name:",
      when: isNil(config.author),
      validate: validateThereIsInput,
    },
    {
      type: "input",
      name: "email",
      message: "Author's email address",
      suffix: " (used for documentation purposes only):",
      when: config.gitInit && isNil(config.email),
      validate(email: unknown): boolean {
        const emailTester = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
        return email ? emailTester.test(String(email)) : false;
      },
    },
    {
      type: "input",
      name: "user",
      message: "GitHub user or org name:",
      when: config.gitInit && isNil(config.user),
      validate: validateThereIsInput,
    },
    {
      type: "input",
      name: "repo",
      default(answers: Answers): string {
        return answers.appName ?? kebabCase(basename(config.destination));
      },
      message: "Repository name:",
      when: config.gitInit && isNil(config.repo),
      validate: validateThereIsInput,
    },
    {
      type: "list",
      name: "template",
      choices: templates.map(
        ({ name, description }: Template) =>
          `${name}${templateLiteralString}${description}`
      ),
      message: "Which template would you like to use?",
      when(): boolean {
        if (config.template) {
          if (templates.find((template) => template.name === config.template)) {
            return false;
          }
          console.log(
            red(`The template ${blue(config.template)} does not exist.`)
          );
        }
        return true;
      },
      validate: validateThereIsInput,
    },
  ];

  return questions;
}
