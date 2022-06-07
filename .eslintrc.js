module.exports = {
  root: true,
  env: { es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/ban-ts-comment": ["warn"],
    "import/order": [
      "error",
      { alphabetize: { order: "asc", caseInsensitive: true } },
    ],
    eqeqeq: ["error"],
  },
  overrides: [
    {
      files: ["**/*.js"],
      rules: { "@typescript-eslint/no-var-requires": ["off"] },
    },
    {
      files: ["**/test/**"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
  ],
  settings: {
    react: {
      version: "18",
    },
    jest: {
      version: 28,
    },
  },
};
