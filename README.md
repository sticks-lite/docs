# Sticks Lite Docs

This repo contains the public documentation website for Sticks Lite, an
educational programming language for monitored classroom environments.

The docs are built with VitePress. The site is markdown-first, fast to build,
and organized around separate beginner, reference, tooling, and classroom
sections.

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

## Structure

- `src/index.md` is the language homepage.
- `src/learn/` contains the guided beginner path.
- `src/reference/` contains formal language and API reference pages.
- `src/tools/` contains installation, CLI, package, and runtime usage pages.
- `src/tools/testing-release.md` describes the centralized test and release
  checks used by the package repo.
- `src/classroom/` contains short teacher-facing guidance.
- `src/version.ts` reads the package version from metadata.
- `src/content.ts` keeps the built-in reference data visible to existing docs
  example checks.

Use `slite` code fences only for examples that should run successfully.
