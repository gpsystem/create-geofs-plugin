---
name: Code style guide
---

# Code style guide

??? tldr "TL;DR"

    Use comments to explain code that's hard to understand. Use JSDoc comments to explain functions' purposes, their parameters, and their return types (except if they don't return anything). Always annotate: variables, function parameters, and function return types, with the strictest type, unless annotating them violate [@typescript-eslint/no-inferrable-types][].

- Prioritize readability and maintainability.
  - We want this project to be as easy to maintain as possible.
  - You can always come back and write faster code later!
  - If something isn't outlined in these style guides, pick the most maintainable option.
  - If you really need to make a change against these guidelines, reviewers will tell you so!
- Use comments where necessary.
  - Don't write unnecessary comments, like this:
    ```js
    // This is a function
    function func() {
    ```
  - Write comments where a line's intention cannot be clearly understood, like this:
    ```js
    // Briefly summarize what the logic checks
    if (/* complex logic */) {
    ```
  - Write [JSDoc][] comments at the top of functions, like this:
    ```ts
    /**
     * Does something.
     * @param param1 A parameter.
     */
    function func(param1: string): void {
    ```
    - Don't add `@returns` comments to functions that don't return values.
    - Don't annotate the types of values that already have their types explicitly declared (or implicitly inferred)
- Always annotate variables, parameters, and return types with the strictest type possible for its use case.

  ```{ .ts .annotate }
  // Don't do this!

  const str: string = ""; // (1)
  const str1 = someFunction(); // (2)
  function func(param) { // (3)
    return;
  }

  // Do this!

  const str = ""; // (4)
  const str1: string = someFunction(); // (5)
  function func(param: unknown): void { // (6)
    return;
  }
  ```

  1. This annotation is unneeded. You can clearly see what the type will always be, and the compiler can clearly infer a equal or better type!
  2. This needs annotations! It's not obvious what the type of str1 will be without looking through typings for someFunction(). It's also possible that a change to the return type of someFunction() will break the code that relies on str1 without warning!
  3. The parameters and return type are untyped! You should always use the strictest type possible. The compiler will infer `any` for these types, which is generally regarded as a bad practice. If you want to accept anything for a parameter, explicitly mark the parameter as accepting `unknown`.
  4. The value of str is obviously inferrable by the compiler. It also violates [@typescript-eslint/no-inferrable-types][].
  5. `someFunction` is strongly typed for easier reading, and also for better guards against missing changes that could pop up as hard-to-trace errors.
  6. This function is strongly typed to accept anything as a parameter.

  - See [@typescript-eslint/no-inferrable-types][] for more information about restrictions on type annotations.

[jsdoc]: https://jsdoc.app/
[@typescript-eslint/no-inferrable-types]: https://typescript-eslint.io/rules/no-inferrable-types
