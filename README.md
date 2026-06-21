# Sticks Lite Docs Site

This directory contains the public documentation website for Sticks Lite, an
educational programming language for monitored classroom environments.

The site is a language homepage plus four documentation sections:

- Learn: guided beginner lessons.
- Reference: formal language, CLI, built-in, error, and API behavior.
- Tools: installation, file running, embedding, runtime I/O, and versioning.
- Classroom: short teacher-facing guidance.

## Develop

```sh
npm install
npm run dev
```

Build and check:

```sh
npm run build
npm run check
```

## Source Structure

- `src/content.ts` defines the public docs pages and navigation order.
- `src/App.tsx` contains the homepage, docs shell, search, routing, table of
  contents, and code-copy behavior.
- `src/styles.css` contains the site design system and responsive layout.
- `src/version.ts` reads the package version from metadata.

Use `slite` code fences only for examples that should run successfully in the
docs example tests.

## Public Install Command

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

## Responsible Use

Use Sticks Lite in supervised learning settings. A teacher, mentor, or parent
should review lesson files and decide what students run.
