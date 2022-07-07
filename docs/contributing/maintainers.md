---
name: Maintainer processes and workflow
---

# Maintainer processes and workflow

???+ important

    Make sure that the issue you're working on is assigned to you before you start work! This is only to avoid duplicate pull requests for the same task.

- Never commit directly to the main branch, always open up a PR.
  - Main branches may become protected in the future to enforce this, but it's generally a bad idea to do this anyways.
  - We want to make sure changes are reviewed before they land.
- When you do open up a PR, make sure you link some sort of an issue.
  - This is so we can discuss in that issue.
  - Discussion in the PR should be limited to the implementation itself.
  - Discussion about the relevancy of the PR and the methods of the implementation should be in the issue.
  - For example, discussion about the methods used in the implementation should be discussed in the linked issue, but issues in the implementation (e.x. performance concerns, potential bugs) should be discussed in the PR.
