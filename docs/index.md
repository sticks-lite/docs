# Sticks Lite Documentation

Sticks Lite v1.0 is a small educational programming language for monitored
classroom environments. It is designed to teach beginning computer-science
concepts with readable syntax, friendly errors, and a compact interpreter that
can run in a browser IDE or from the command line.

## Install

```sh
npm install -g @brisqdev/sticks-lite
sticks main.slite
```

Use `npx sticks main.slite` when Sticks Lite is installed locally in a project.

## Documentation Sections

- `Getting Started` introduces files, output, input, and variables.
- `Installing` explains global and project-local CLI installation.
- `Tutorial` walks through the language in teaching order.
- `Language Reference` defines the syntax and semantics.
- `Standard Library` documents built-in functions.
- `Compiler And Interpreter` explains public APIs and runtime design.
- `Command Line` explains `sticks main.slite` and project execution.
- `Distribution` explains npm publishing and release checks.
- `Implementation Notes` explains the TypeScript architecture.
- `Examples` collects complete beginner programs.
- `Errors` documents error names and common mistakes.

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
- Compiler/interpreter repository: `sticks-lite-language`

## Intended Use

Sticks Lite is designed for supervised learning. It is not a production language, package ecosystem, sandbox, security boundary, or systems programming tool.

## Version

The current language version is `v1.0`.
