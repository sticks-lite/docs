---
title: Tools
description: Installation, CLI use, runtime I/O, TypeScript usage, and versioning.
---

# Tools

Use this section when you are installing Sticks Lite, running files, or using
the interpreter from TypeScript.

## Tooling Map

| Page | Use it for |
| --- | --- |
| [Installation](/tools/installation) | installing the package and checking the CLI |
| [CLI](/tools/cli) | day-to-day `sticks` command usage |
| [Running Files](/tools/running-files) | file and folder execution patterns |
| [Using TypeScript](/tools/typescript) | calling `runSource`, `lex`, and `parse` from code |
| [Browser Embedding](/tools/browser) | running Sticks Lite from browser apps without Node APIs |
| [Runtime I/O](/tools/runtime-io) | connecting `ask` and `say` to your environment |
| [Versioning](/tools/versioning) | where package and docs version text comes from |

## Main Commands

Install globally:

```sh
npm install -g sticks-lite
```

Run a file:

```sh
sticks run main.slite
```

Run a directory containing `main.slite`:

```sh
sticks run .
```

Check syntax without running:

```sh
sticks check
```

Create a starter project:

```sh
sticks init my-project
```

Check the installed version:

```sh
sticks --version
```

## Programmatic Use

```ts
import { runSource } from "sticks-lite";

const result = await runSource('say "Hello"\n');

if (result.ok) {
  console.log(result.output);
}
```
