# Sticks Lite Documentation

[![Main Repo](https://img.shields.io/badge/main%20repo-sticks-lite%2Fsticks--lite-5cad4a.svg)](https://github.com/sticks-lite/sticks-lite/)
[![npm version](https://img.shields.io/npm/v/sticks-lite.svg)](https://www.npmjs.com/package/sticks-lite)
[![npm downloads](https://img.shields.io/npm/dm/sticks-lite.svg)](https://www.npmjs.com/package/sticks-lite)
[![Docs](https://img.shields.io/badge/docs-current-111111.svg)](#start)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

This repository contains the official documentation site for Sticks Lite.

Sticks Lite is an educational programming language developed by Kabir Sekhon
for monitored classroom environments. The docs explain installation, the
`sticks` CLI, language syntax, built-ins, classroom programs, public API, and
friendly errors.

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

Documentation source is organized as a small language documentation site:

- `pages/` contains site-level pages such as the homepage.
- `learn/` contains the beginner path and classroom programs.
- `docs/` contains installation, CLI, interpreter, and public API guides.
- `reference/` contains the language reference, standard library, and errors.
- `src/` contains the React site shell, navigation registry, version helpers, and styles.

Navigation metadata is defined in `src/docs.ts`.

## Editing Docs

1. Edit the page in `pages/`, `learn/`, `docs/`, or `reference/`.
2. If adding a new page, register it in `src/docs.ts`.
3. Run:

```sh
npm run check
```

4. Open the local docs site and verify the homepage cards, sidebar, page title,
   table of contents, copy-code buttons, and code examples.

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
