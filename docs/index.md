# Sticks Lite Documentation

Sticks Lite v1.0.14 is a small educational programming language for monitored
classroom environments. It is designed to teach beginning computer-science
concepts with readable syntax, friendly errors, and a compact interpreter that
can run in a browser IDE or from the `sticks` CLI.

## Who this is for

- Teachers and mentors introducing programming in a supervised classroom.
- Students learning variables, conditionals, loops, functions, collections, and errors.
- Clubs, camps, and beginner computer-science lessons that need a small `.slite`
  language and the `sticks` CLI.

Sticks Lite is intentionally small. It is not intended for production software
or unsupervised execution of untrusted source files.

## Install

```sh
npm install -g sticks-lite
sticks --version
sticks main.slite
```

npm may display `npm i sticks-lite` on the package page, but Sticks Lite users
should install globally so the `sticks` command is available directly.

## Documentation Sections

- `Getting Started` introduces `.slite` source files, output, input, and variables.
- `Installing` explains global `sticks` CLI installation.
- `Tutorial` walks through the language in teaching order.
- `Language Reference` defines the syntax and semantics.
- `Standard Library` documents built-in functions.
- `Interpreter` explains public APIs and runtime design.
- `Public API` documents tested TypeScript exports.
- `CLI` explains `sticks main.slite` and project execution.
- `Implementation Notes` explains the TypeScript architecture.
- `Examples` collects complete beginner programs.
- `Errors` documents error names and common mistakes.
- `Diagnostics` documents modern hints and CLI error messages.

Version `v1.0.14` specifically hardens comment handling and math semantics so
future releases do not accidentally change classroom programs.

## Quick Example

```slite
name = ask "Name?"
say "Hello " + name

new double(x):
    return x * 2

say toText(double(5))
```

## Project Links

- Main project: [github.com/brisqdev/sticks-lite](https://github.com/brisqdev/sticks-lite/)
- Browser IDE repository: `sticks-lite-browser-ide`
- Documentation repository: `sticks-lite-docs-site`
- Interpreter repository: `sticks-lite-language`

## Intended Use

Use Sticks Lite in supervised learning settings. A teacher, mentor, or parent should review what students run and decide whether each lesson is appropriate.

Sticks Lite is not for production apps, security sandboxing, unsupervised execution of untrusted source files, or safety-critical work.

## Version

The current language version is `v1.0.14`.
