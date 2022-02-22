# Contributing to Muon

Thank you for your interest in contributing to Muon.

## Code of conduct

We have a [Code of Conduct](/CODE_OF_CONDUCT.md), please follow it in all interactions with project maintainers and fellow users.

## Raising issues

If you have found an issue, then thank you for taking the time to bring it to our attention. Before submitting an issue please make sure that there is not already a similar issue already raised. It is best to check for both open and closed issues.

If there is not a similar issue already raised, then please do follow the bug template and give as much detail as possible and an ability to replicate the issue.

## Pull Requests (PR)

For a PR to be merged, it needs to have at least one approval and for all status checks passing (except for a potential false negative scenario). To allow for PR's to be merged more efficiently, make sure to give a brief description of the changes that have been made and to link to any additional details. A PR should stay within the scope of the issue it is trying to resolve. Going outside of that scope can mean added delays of merging.

PR's need to:

- Be based off the `main` branch.
- Be smaller than 20 files changed (except for upgrades).
- Be linked to an open issue.
- Follow linting
- Have tests

### Branch naming

Branches should follow the naming convention of `epic/name-of-epic`, `feature/name-of-feature` or `hotfix/name-of-fix`.

For most work it will be a `feature` branch to the `main` branch. An `epic` branch should only be used when work needs to be broken down into understanable chunks. `Hotfixes` are there to deliver an urgent fix.

## Commit messages

To create more meaningful commit messages that help humans and machines alike.

### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

### Types

- `build`: (changes and features for the build scripts or external dependencies)
- `chore`: (updating grunt tasks etc; no production code change)
- `ci`: (changes to the continuous intergration scripts or configuration)
- `docs`: (changes to the documentation)
- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `perf`: (code change that improves performance)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `revert`: (reverts a previous commit)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `test`:  (adding missing tests, refactoring tests; no production code change)

https://www.conventionalcommits.org/en/v1.0.0/

## Set up

```
git clone https://github.com/centrica-engineering/muon.git
cd muon
npm i
```

As this is using npm workspaces, dependencies need to be installed at the root of the repository instead of in each package.

## Tests

To run tests

```
npm t
```
