# Vkrun Community Contribution Guide

- [Question or Problem?](#question)
- [Found a Bug?](#found-bug)
- [Feature Requests](#feature)
- [Submitting an Issue](#submit-issue)
- [Development Setup](#development)
- [Submitting a Pull Request (PR)](#submit-pr)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)

The purpose of this document is to create a contribution process that:

* Encourages new contributions.
* Encourages contributors to stay involved.
* Avoids unnecessary processes and bureaucracy whenever possible.
* Creates a transparent decision-making process that makes it clear
  how contributors can be involved in decision-making.

If you would like to chat about the question in real-time, you can reach out via [discord][discord].

<h2 id="question">Contributing to Vkrun</h2>

**Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests.** You've got much better chances of getting your question answered on [Stack Overflow][stackoverflow] where the questions should be tagged with tag `vkrunjs`.

Stack Overflow and Discord are the much better place to ask questions since:

- questions and answers stay available for public viewing so your question / answer might help someone else
- Voting system assures that the best answers are prominently visible.

<h2 id="found-bug">Found a Bug?</h2>

If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [VkrunJS Repository](https://github.com/vkrunjs/vkrun). Even better, you can [submit a Pull Request](#submit-pr) with a fix.

<h2 id="feature">Missing a Feature?</h2>

You can _request_ a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project. For your issue name, please prefix your proposal with `[discussion]`, for example "[discussion]: your feature idea".
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

<h2 id="submit-issue">Submitting an Issue</h2>

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a minimal reproduction scenario using a repository or [Gist](https://gist.github.com/). Having a live, reproducible scenario gives us wealth of important information without going back & forth to you with additional questions like:

- version of VkrunJs used
- 3rd-party libraries and their versions
- and most importantly - a use-case that fails

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

[New Issue][new_issue]

<h2 id="development">Development Setup</h2>

You will need [Node.js](https://nodejs.org) version 18.18.0

After cloning the repo, run:

```shell
$ npm install
```

or

```shell
$ yarn install
```

### Common scripts

```shell
# run the full unit tests suite
npm run test
yarn test

# run the full end to end tests
npm run test:e2e
yarn test:e2e

# run the all tests suite
npm run test:all
yarn test:all

# run linter
npm run eslint
yarn eslint

# build all packages and put them near to their source .ts files
npm run build
yarn build
```

<h2 id="submit-pr">Submitting a Pull Request (PR)</h2>

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub Pull Requests][gh_prs] for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
1. Fork this repository.
1. Make your changes in a new git branch:

   ```shell
   git checkout -b my-branch main
   ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules).
1. Run the full Vkrun test suite (see [common scripts](#common-scripts)),
   and ensure that all tests pass.
1. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

   ```shell
   git push origin my-branch
   ```

1. In GitHub, send a pull request to `vkrunjs:main`.

- If we suggest changes then:

  - Make the required updates.
  - Re-run the Vkrun test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase main -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-branch
  ```

- Check out the main branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-branch
  ```

- Update your main with the latest upstream version:

  ```shell
  git pull --ff upstream main
  ```

<h2 id="rules">Coding Rules</h2>

To ensure consistency and readability, code should follow the guidelines of the **JavaScript Standard Style Guide**. Here are some important rules to follow:

- All code should follow the rules established in the [Google JavaScript Style Guide][js-style-guide].
- Ensure that all code changes adhere to the guidelines of the style guide.
- Pay special attention to formatting, spacing, and other style conventions.
- Whenever possible, use linting and formatting tools to ensure automatic compliance with the guidelines.

Following these rules will help maintain clean, consistent, and easily understandable code for all project contributors.

[js-style-guide]: https://google.github.io/styleguide/javascriptguide.xml

<h2 id="commit">Commit Message Guidelines</h2>

When submitting commit messages, follow the format of **Conventional Commits** to ensure consistency and
clarity in commit messages. Here's a quick guide on how to format your commit messages:

- **build**: Changes that affect the build system or external dependencies.
  Example: `build: update webpack configuration`
- **chore**: Updates to tasks, scripts, etc., with no changes to production code.
  Example: `chore: update dependencies`
- **ci**: Changes to continuous integration configurations and scripts.
  Example: `ci: configure Travis CI`
- **docs**: Changes only in documentation.
  Example: `docs: update README`
- **feat**: New features or significant additions.
  Example: `feat: implement authentication feature`
- **fix**: Bug fixes.
  Example: `fix: fix null pointer exception`
- **perf**: Changes that improve performance.
  Example: `perf: optimize database query`
- **refactor**: Code refactoring that does not add new features or fix bugs.
  Example: `refactor: simplify authentication logic`
- **style**: Changes that do not affect the meaning of the code (formatting, whitespace, etc.).
  Example: `style: format code according to style guide`
- **test**: Addition or correction of tests.
  Example: `test: add unit tests for login endpoint`

Make sure to follow this format when sending commit messages, otherwise the commit will be rejected.

[discord]: https://discord.gg/m94r7ySn
[new_issue]: https://github.com/vkrunjs/vkrun/issues/new
[gh_prs]: https://github.com/vkrunjs/vkrun/pulls
