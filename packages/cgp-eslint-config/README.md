# `@geps/cgp-eslint-config`

> `@geps/cgp-eslint-config` contains the eslint configuration templates for `create-geofs-plugin`, along with the infrastructure to properly use them.

## Usage

```ts
import {
  EslintConfigNames /* type */,
  getEslintConfig,
} from "@geps/cgp-eslint-config";

const configBaseTemplates: EslintConfigNames[] = [
  "baseConfig",
  "reactBase",
  "tsBase",
];

getEslintConfig(...configBaseTemplates);
```

The only exported function `getEslintConfig` takes the provided config template names, merges their respective configurations, and returns the merged configuration.
