---
title: Testing and Release Checks
description: How the Sticks Lite package keeps tests, builds, audits, and package checks organized.
---

# Testing and Release Checks

The Sticks Lite package keeps test and release verification behind a small set
of npm scripts. Local development and CI use the same commands, which keeps the
repository easier to inspect and reduces duplicated release logic.

## Main Commands

Run the full package test suite:

```sh
npm test
```

Run tests and the TypeScript build:

```sh
npm run check
```

Run the CI contract used by GitHub Actions:

```sh
npm run ci:verify
```

Run the package release check:

```sh
npm run release:check
```

## Focused Test Commands

Use focused commands when working on one part of the interpreter:

```sh
npm run test:syntax
npm run test:builtins
npm run test:cli
npm run test:browser
```

These commands are wrappers around Vitest suites. They are not separate testing
systems.

## What The Tests Cover

The package tests cover:

- lexer and parser behavior,
- all documented syntax families,
- every registered built-in,
- the documented public TypeScript API,
- browser-safe core execution,
- CLI modes and project initialization,
- documentation examples,
- friendly errors,
- locked language semantics for collections, functions, constants, and comments.

## CI Shape

The GitHub Actions workflow installs dependencies, then calls:

```sh
npm run ci:verify
```

That command runs tests, builds the package, and audits production
dependencies. A separate package job builds and runs:

```sh
npm run package:dry-run
```

The dry run checks which files would be published to npm.

## Package Contents

The npm package is intentionally small. Published package contents are limited
to the compiled `dist` output, `README.md`, `LICENSE`, and npm metadata.

Tests, source files, CI configuration, and local release scripts stay in the
repository. They are useful for maintainers but are not part of the installed
runtime package.
