import type { EslintConfig } from "eslint-define-config";

export type EslintConfigNames = "baseConfig" | "reactBase" | "tsBase";

/**
 * The eslint configurations. All the values should be objects.
 */
export const eslintConfigBases: {
  [key in EslintConfigNames]: EslintConfig;
} = {
  baseConfig: {
    env: { browser: true, es2021: true, node: true },
    extends: ["eslint:recommended", "plugin:import/recommended"],
    globals: {
      GlassPanel: "readonly",
      Indicator: "readonly",
      Object3D: "readonly",
      Overlay: "readonly",
      PAGE_PATH: "readonly",
      PID: "readonly",
      absMin: "readonly",
      audio: "readonly",
      boundHours24: "readonly",
      clamp: "readonly",
      clone: "readonly",
      controls: "readonly",
      exponentialSmoothing: "readonly",
      exponentialSmoothingV3: "readonly",
      fixAngle: "readonly",
      fixAngle360: "readonly",
      fixAngles: "readonly",
      fixAngles360: "readonly",
      flight: "readonly",
      geoDecodeLocation: "readonly",
      geofs: "readonly",
      getBuildingCollision: "readonly",
      getURLParameters: "readonly",
      instruments: "readonly",
      ll2xy: "readonly",
      lla2xyz: "readonly",
      lookAt: "readonly",
      multiplayer: "readonly",
      objects: "readonly",
      rigidBody: "readonly",
      span: "readonly",
      ui: "readonly",
      weather: "readonly",
      xy2ll: "readonly",
      xyz2lla: "readonly",
    },
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    root: true,
    rules: {
      eqeqeq: ["error"],
      "import/order": [
        "error",
        { alphabetize: { caseInsensitive: true, order: "asc" } },
      ],
    },
  },
  reactBase: {
    extends: ["plugin:react/recommended"],
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
    plugins: ["react"],
    settings: { react: { version: "detect" } },
  },
  tsBase: {
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:import/typescript",
    ],
    overrides: [
      {
        files: ["**/*.js"],
        rules: { "@typescript-eslint/no-var-requires": ["off"] },
      },
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    settings: {
      "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    },
  },
};

/**
 * The dependencies of the configurations. Indexable by the same keys that {@link eslintConfigBases} is by.
 */
export const eslintConfigBaseDependencies: Record<EslintConfigNames, string[]> =
  {
    baseConfig: ["eslint@v8", "eslint-plugin-import@v2"],
    reactBase: ["eslint-plugin-react@v7"],
    tsBase: [
      "@typescript-eslint/eslint-plugin@v5",
      "eslint-import-resolver-typescript@v2",
    ],
  };
