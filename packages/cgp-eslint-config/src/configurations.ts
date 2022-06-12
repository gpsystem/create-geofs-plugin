export type EslintConfigNames = keyof typeof eslintConfigBases;

export type UnknownEslintConfigBase =
  typeof eslintConfigBases[EslintConfigNames];

/**
 * The eslint configurations. All the values should be objects.
 */
export const eslintConfigBases = {
  baseConfig: {
    root: true,
    env: { browser: true, es2021: true, node: true },
    extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
    globals: {
      PAGE_PATH: "readonly",
      geofs: "readonly",
      ui: "readonly",
      flight: "readonly",
      objects: "readonly",
      controls: "readonly",
      weather: "readonly",
      audio: "readonly",
      multiplayer: "readonly",
      instruments: "readonly",
      absMin: "readonly",
      span: "readonly",
      boundHours24: "readonly",
      fixAngle: "readonly",
      fixAngle360: "readonly",
      fixAngles360: "readonly",
      fixAngles: "readonly",
      exponentialSmoothingV3: "readonly",
      exponentialSmoothing: "readonly",
      getBuildingCollision: "readonly",
      xyz2lla: "readonly",
      xy2ll: "readonly",
      lla2xyz: "readonly",
      ll2xy: "readonly",
      clamp: "readonly",
      geoDecodeLocation: "readonly",
      lookAt: "readonly",
      getURLParameters: "readonly",
      clone: "readonly",
      PID: "readonly",
      Overlay: "readonly",
      rigidBody: "readonly",
      Object3D: "readonly",
      Indicator: "readonly",
      GlassPanel: "readonly",
    },
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      eqeqeq: ["error"],
      "import/order": [
        "error",
        { alphabetize: { order: "asc", caseInsensitive: true } },
      ],
    },
  },
  tsBase: {
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:import/typescript",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    overrides: [
      {
        files: ["**/*.js"],
        rules: { "@typescript-eslint/no-var-requires": ["off"] },
      },
    ],
    settings: {
      "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    },
  },
  reactBase: {
    extends: ["plugin:react/recommended"],
    plugins: ["react"],
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
    settings: { react: { version: "detect" } },
  },
} as const;

/**
 * The dependencies of the configurations. Indexable by the same keys that {@link eslintConfigBases} is by.
 */
export const eslintConfigBaseDependencies: Record<EslintConfigNames, string[]> =
  {
    baseConfig: [
      "eslint@v8",
      "eslint-config-prettier@v8",
      "eslint-plugin-import@v2",
    ],
    tsBase: [
      "@typescript-eslint/eslint-plugin@v5",
      "eslint-import-resolver-typescript@v2",
    ],
    reactBase: ["eslint-plugin-react@v7"],
  };
