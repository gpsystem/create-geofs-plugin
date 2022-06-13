import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { EslintConfigNames, MoreThanOneArray } from "@geps/cgp-eslint-config";
import expandTemplateJson, {
  assertTemplateJsonFormat,
  TemplateJson,
} from "../src/template";
import { testTargetDir } from "./utils";

describe("check the formatting of a template.json file", () => {
  test("returns correct false values", () => {
    class TemplateFake implements TemplateJson {
      public dependencies: string[];
      public eslintConfigTemplates: MoreThanOneArray<EslintConfigNames>;

      constructor() {
        this.dependencies = [];
        this.eslintConfigTemplates = ["baseConfig"];
      }
    }

    const falseValues: unknown[] = [
      null,
      undefined,
      "",
      3,
      [],
      {},
      { some: "value" },
      new Date(),
      // only vanilla objects should be accepted, no matter their contents
      new TemplateFake(),
      { dependencies: [] },
      { eslintConfigTemplates: [] },
      { dependencies: [], eslintConfigTemplates: ["doesn't exist"] },
    ];
    for (const value of falseValues) {
      expect(assertTemplateJsonFormat(value)).toBe(false);
    }
  });

  test("assertion returns true when passed a correct value", () => {
    const correctValue: TemplateJson = {
      dependencies: [],
      eslintConfigTemplates: ["baseConfig"],
    };

    expect(assertTemplateJsonFormat(correctValue)).toBe(true);
  });
});

describe("expand the template.json", () => {
  const testTemplateJsonLocation: string = join(testTargetDir, "template.json");

  /** @returns The function to delete the target directory. */
  function writeTestTemplate(testData: unknown): () => void {
    mkdirSync(testTargetDir, { recursive: true });
    writeFileSync(testTemplateJsonLocation, JSON.stringify(testData));

    return () => rmSync(testTargetDir, { recursive: true, force: true });
  }

  test("throws on malformed template.json", () => {
    const destructTestDir = writeTestTemplate({ some: "value" });

    expect(() =>
      expandTemplateJson(testTemplateJsonLocation)
    ).toThrowErrorMatchingSnapshot();

    destructTestDir();
  });

  test("throws for an empty eslint config template list", () => {
    const testTemplate: TemplateJson = {
      dependencies: [],
      eslintConfigTemplates: [],
    };
    const destructTestDir = writeTestTemplate(testTemplate);

    expect(() =>
      expandTemplateJson(testTemplateJsonLocation)
    ).toThrowErrorMatchingSnapshot();

    destructTestDir();
  });

  test("throws when base eslint config template isn't first", () => {
    const testTemplate: TemplateJson = {
      dependencies: [],
      eslintConfigTemplates: ["reactBase"],
    };
    const destructTestDir = writeTestTemplate(testTemplate);

    expect(() =>
      expandTemplateJson(testTemplateJsonLocation)
    ).toThrowErrorMatchingSnapshot();

    destructTestDir();
  });

  const goodValues: [name: string, template: TemplateJson][] = [
    [
      "empty-base",
      {
        dependencies: [],
        eslintConfigTemplates: ["baseConfig"],
      },
    ],
    [
      "react-vanilla",
      {
        dependencies: ["react@v18", "react-dom@v18"],
        eslintConfigTemplates: ["baseConfig", "reactBase"],
      },
    ],
    [
      "react-typescript",
      {
        dependencies: [
          "@types/react@v18",
          "@types/react-dom@v18",
          "react@v18",
          "react-dom@v18",
        ],
        eslintConfigTemplates: ["baseConfig", "tsBase", "reactBase"],
      },
    ],
    [
      "lodash-vanilla",
      {
        dependencies: ["lodash@v4"],
        eslintConfigTemplates: ["baseConfig"],
      },
    ],
    [
      "lodash-typescript",
      {
        dependencies: ["@types/lodash@v4", "lodash@v4"],
        eslintConfigTemplates: ["baseConfig", "tsBase"],
      },
    ],
  ];
  for (const [name, template] of goodValues) {
    test(`returns consistent values - ${name}`, () => {
      const destructTestDir = writeTestTemplate(template);

      expect(() => expandTemplateJson(testTemplateJsonLocation)).not.toThrow();
      expect(expandTemplateJson(testTemplateJsonLocation)).toMatchSnapshot();

      destructTestDir();
    });
  }
});
