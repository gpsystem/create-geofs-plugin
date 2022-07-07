---
name: Documentation style guide
---

# Documentation style guide

??? tldr "TL;DR"

    Documents must start with a level-one heading. Use US spelling. Affix links instead of inlining them. Use language-aware code fences. Examples don't have to be complete. When documenting API's, use the outlined format and remember to include examples and denote methods with parenthesis.

- [Use US spelling][].
- [Use serial commas][].
- Avoid first-person pronouns (_I_, _we_).
  - Exception: _we recommend foo_ is preferable to _foo is recommended_.
- Use gender-neutral pronouns and gender-neutral plural nouns.
  - OK: _they_, _their_, _them_, _folks_, _people_, _developers_
  - NOT OK: _his_, _hers_, _him_, _her_, _guys_, _dudes_
- When combining wrapping elements (parentheses and quotes), place terminal
  punctuation:
  - Inside the wrapping element if the wrapping element contains a complete
    clause.
  - Outside of the wrapping element if the wrapping element contains only a
    fragment of a clause.
- Documents must start with a level-one heading.
- Prefer affixing links (`[a link][]`) to inlining links
  (`[a link](http://example.com)`).
- When documenting APIs, every function should have a usage example or
  link to an example that uses the function.
- For code blocks:

  - Use [language][]-aware fences. (<code>\`\`\`js</code>)

  - For the [info string][], use one of the following.

    | Meaning       | Info string  |
    | ------------- | ------------ |
    | Bash          | `bash`       |
    | C             | `c`          |
    | C++           | `cpp`        |
    | CoffeeScript  | `coffee`     |
    | Diff          | `diff`       |
    | HTTP          | `http`       |
    | JavaScript    | `js`         |
    | JSON          | `json`       |
    | Markdown      | `markdown`   |
    | Plaintext     | `text`       |
    | Powershell    | `powershell` |
    | R             | `r`          |
    | Shell Session | `console`    |

  - Code need not be complete. Treat code blocks as an illustration or aid to
    your point, not as complete running programs.

- When using underscores, asterisks, and backticks, please use
  backslash-escaping: `\_`, `\*`, and `` \`  ``.
- Constructors should use PascalCase.
- Instances should use camelCase.
- Denote methods with parentheses: `socket.end()` instead of `socket.end`.
- Function arguments or object properties should use the following format:

  - `` - `name` <[type][]|[type2][]> Description. **Default:** `value`. ``
  - The description and default are both optional.
  - The `type` should be affixed links to an internal type or a [JavaScript type][].
    - When using `unknown` as a type, use [TypeScript's docs on unknown][].
  - E.g.

    ```markdown
    - `byteOffset` <[number][]> Index of first byte to expose. **Default:** `0`.

    <!-- later on... -->

    [number]: https://developer.mozilla.org/en-US/docs/Glossary/Number
    ```

- Function returns should use the following format:

  - <code> - Returns: <[type][]|[type2][]> Optional description.</code>
  - E.g.

    ```markdown
    - Returns: <[SerializedMessage][]> The message, serialized and ready to be passed to chrome.

    <!-- later on... -->

    [serializedmessage]: ./message.md#serializedmessage
    ```

- Use official styling for capitalization in products and projects.
  - OK: JavaScript, Google's V8
  - NOT OK: Javascript, Google's v8
- [Be direct][].

[be direct]: https://docs.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences
[javascript type]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Data_structures_and_types
[use us spelling]: https://docs.microsoft.com/en-us/style-guide/word-choice/use-us-spelling-avoid-non-english-words
[use serial commas]: https://docs.microsoft.com/en-us/style-guide/punctuation/commas
[info string]: https://github.github.com/gfm/#info-string
[language]: https://github.com/highlightjs/highlight.js/blob/HEAD/SUPPORTED_LANGUAGES.md
[typescript's docs on unknown]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
