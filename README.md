# Sticks Lite Documentation

[![Main Repo](https://img.shields.io/badge/main%20repo-sticks-lite%2Fsticks--lite-5cad4a.svg)](https://github.com/sticks-lite/sticks-lite/)
[![npm version](https://img.shields.io/npm/v/sticks-lite.svg)](https://www.npmjs.com/package/sticks-lite)
[![npm downloads](https://img.shields.io/npm/dm/sticks-lite.svg)](https://www.npmjs.com/package/sticks-lite)
[![Docs](https://img.shields.io/badge/docs-current-111111.svg)](#start)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

This repository contains the official documentation site for Sticks Lite

Sticks Lite is an educational programming language developed by Kabir Sekhon for monitored classroom environments. The docs explain installation, the `sticks` CLI, the interpreter, language syntax, built-ins, examples, implementation notes, and friendly errors.

## Who this is for

- Teachers and mentors introducing programming in a supervised classroom.
- Students learning variables, conditionals, loops, functions, collections, and errors.
- Clubs, camps, and beginner computer-science lessons that need a small `.slite`
  language and the `sticks` CLI.

Sticks Lite is intentionally small. It is not intended for production software
or unsupervised execution of untrusted source files.

## Start

Install dependencies:

```sh
npm install
```

Start the docs site:

```sh
npm run dev
```

Vite will print a local URL, usually:

```txt
http://localhost:5173/
```

## Build

Build the production site:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

Run the full docs check:

```sh
npm run check
```

## Sticks Lite Installation

The Sticks Lite interpreter package is distributed through npm:

```sh
npm install -g sticks-lite
sticks --version
sticks main.slite
```

npm may display `npm i sticks-lite` on the package page, but Sticks Lite users should install globally so the `sticks` command is available directly.

## Documentation Structure

Markdown source lives in `docs/`.

- `index.md` introduces Sticks Lite.
- `getting-started.md` teaches the first program flow.
- `installing.md` documents `sticks` CLI installation.
- `tutorial.md` walks through beginner concepts.
- `language-reference.md` defines syntax and behavior.
- `standard-library.md` documents built-ins.
- `compiler-interpreter.md` explains the interpreter, public APIs, and runtime design.
- `cli.md` covers `sticks` CLI usage.
- `grammar.md` gives implementation-oriented grammar notes.
- `errors.md` documents friendly errors.
- `examples.md` collects sample programs.
- `implementation.md` explains the TypeScript architecture.

The React docs shell lives in `src/` and imports Markdown with Vite raw imports. Navigation metadata is defined in `src/docs.ts`.

## Editing Docs

1. Edit the Markdown page in `docs/`.
2. If adding a new page, register it in `src/docs.ts`.
3. Run:

```sh
npm run check
```

4. Open the local docs site and verify the sidebar, page title, table of contents, and code examples.

## Related Repositories

- Main interpreter: [sticks-lite](https://github.com/sticks-lite/sticks-lite/)
- npm package: [sticks-lite](https://www.npmjs.com/package/sticks-lite)
- Browser IDE: `sandbox`
- VS Code extension: `sticks-lite-vscode`

## Responsible Use

Use Sticks Lite in supervised learning settings. A teacher, mentor, or parent should review what students run and decide whether each lesson is appropriate.

Sticks Lite is not for production apps, security sandboxing, unsupervised execution of untrusted source files, or safety-critical work.

## License

MIT License. See [LICENSE](LICENSE).
