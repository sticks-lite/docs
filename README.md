# Sticks Lite Documentation

This directory contains the official Sticks Lite documentation site.

Sticks Lite is an educational programming language for monitored classroom
environments. The site is organized as a language homepage plus Learn,
Reference, Tools, and Classroom documentation.

## Develop

Install dependencies:

```sh
npm install
```

Start the local site:

```sh
npm run dev
```

Build:

```sh
npm run build
```

Run the docs check:

```sh
npm run check
```

## Documentation Structure

- `pages/` contains site-level content used by the homepage and search.
- `learn/` contains guided beginner lessons and classroom practice programs.
- `reference/` contains formal language, CLI, built-in, error, and API reference pages.
- `tools/` contains installation, CLI, embedding, runtime I/O, and versioning guides.
- `classroom/` contains short teacher-facing guidance.
- `src/` contains the React shell, navigation registry, version helper, and styles.

Navigation metadata is defined in `src/docs.ts`.

## Sticks Lite Installation

The public package install command is:

```sh
npm install -g sticks-lite
```

Run a source file:

```sh
sticks main.slite
```

Run a folder containing `main.slite`:

```sh
sticks .
```

## Editing Docs

1. Edit or add a page in the matching section folder.
2. Register new pages in `src/docs.ts`.
3. Use `slite` fences only for examples that should run successfully.
4. Run `npm run build`.
5. Open the local site and check the homepage, sidebar, code copy buttons, and mobile layout.

## Responsible Use

Use Sticks Lite in supervised learning settings. A teacher, mentor, or parent
should review lesson files and decide whether each lesson is appropriate.

## License

MIT License. See `LICENSE`.

