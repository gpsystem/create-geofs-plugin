# Contributing guide

Thank you for your interest in contributing to CGP! We welcome contributions of any kind.

## How to contribute

### Code

To contribute code, first [fork][] the [repository][]. Then, clone the repository into your working directory.

=== "Git"

    ```bash
    git clone https://github.com/YOUR-USERNAME-HERE/create-geofs-plugin.git
    ```

=== "GitHub CLI"

    ```bash
    gh repo clone YOUR-USERNAME-HERE/create-geofs-plugin
    ```

Once you have this codebase cloned, make the changes you wish to make (making sure to follow our [style guides][]).

Ensure that your changes are reflected in tests and documentation, if necessary.

If you are unsure where to make your changes, check out this guide to the codebase.

Paths are relative to the root of the codebase.

| Section                   | Package root                         |
| ------------------------- | ------------------------------------ |
| CLI                       | `./create-geofs-plugin`              |
| ESLint configurations     | `./packages/cgp-eslint-config`       |
| Default template          | `./packages/cgp-template-default`    |
| TypeScript template       | `./packages/cgp-template-typescript` |
| React template            | `./packages/cgp-template-react`      |
| TypeScript React template | `./packages/cgp-template-react-ts`   |

Once you are done with your changes, commit them to the repository, push them to GitHub, and [submit a pull request][].
We will review your changes, and after at least one approving review from a developer, we will merge your pull request.

### Issues

All issues should be submitted to the [repository][]. Try to keep issue names short.
Describe your issue well, and include as many details as possible.

[fork]: https://docs.github.com/en/get-started/quickstart/fork-a-repo
[repository]: https://github.com/gpsystem/create-geofs-plugin
[style guides]: ./style/index.md
[submit a pull request]: https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request#creating-a-pull-request
