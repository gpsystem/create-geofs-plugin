---
name: Installation
---

# Getting started

To start scaffolding plugins, first install create-geofs-plugin globally.

```bash
npm install -g create-geofs-plugin
```

Then, choose how you want to run your plugin.

| Template   | Description                                                                               |
| ---------- | ----------------------------------------------------------------------------------------- |
| default    | A vanilla JavaScript template. Good for very simple plugins, but doesn't scale very well. |
| react      | A React template. Good for simple plugins with a UI, but isn't very safe without typing.  |
| typescript | A TypeScript template. Recommended for most plugins because of its type safety.           |
| react-ts   | A template with both TypeScript and React. Recommended for plugins with a UI.             |

### Create a new plugin

After installing create-geofs-plugin, it can be run from the command line by one of two methods.

<!-- reviewers, is there a way to get better syntax highlighting with the shell commands -->

=== "Method 1"

    ```bash
    npm init geofs-plugin <destination>
    ```

=== "Method 2"

    ```bash
    npx create-geofs-plugin <destination>
    ```

`<destination>` refers to the filesystem path where the plugin should be created.
It should be a relative path from the current working directory.

### Using the plugin's ecosystem

After a plugin is bootstrapped, the plugin has all dependencies automatically installed.

The plugin can be built by running the following command:

```bash
npm run build
```

ESLint can also be run on the plugin with the following command:

```bash
npm run lint
```

### Running the built plugin

After the plugin is built, the built plugin can be found at `dist/index.js`.

To run the plugin, copy and paste the code found in `dist/index.js` into a console and run it.
