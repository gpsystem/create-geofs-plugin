# `create-geofs-plugin`

> `create-geofs-plugin` bootstraps new development environments for scripts for GeoFS, an online flight simulator.

This is the monorepo for `create-geofs-plugin`! We're using [lerna][] to manage this monorepo, but here's a directory of this repository:

| Directory           | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| ./                  | The top level, where global configurations and dependencies are stored.                                      |
| .github             | All GitHub configuration is stored here, including issue and PR templates, and github actions configuration. |
| .husky              | All the scripts [husky][] runs before commits, to ensure their quality before push.                          |
| packages            | All the supplemental packages to create-geofs-plugin are stored here.                                        |
| create-geofs-plugin | The create-geofs-plugin CLI. This is where the source for the CLI is stored.                                 |
| docs                | All the documentation for this repository. This documentation is published to GitHub pages [here][].         |

[lerna]: https://lerna.js.org/
[here]: https://gpsystem.github.io/create-geofs-plugin/
[husky]: https://typicode.github.io/husky/
