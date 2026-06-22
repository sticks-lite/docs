---
title: CLI
description: Practical command-line usage for the sticks command.
---

# CLI

The `sticks` CLI runs Sticks Lite source files.

## Run the Current Folder

When the current folder contains `main.slite`, run:

```sh
sticks .
```

If you run `sticks` without an argument, the CLI also looks for `main.slite` in
the current folder.

```sh
sticks
```

## Run a Specific File

```sh
sticks main.slite
sticks lessons/day-one.slite
```

The file must end in `.slite`.

## Run a Project Folder

```sh
sticks lessons/day-one
```

The folder must contain an entry file named exactly `main.slite`.

## Prompts

`ask` writes a prompt and waits for one line of input.

```slite
name = ask "Name?"
say "Hello " + name
```

In the CLI, a prompt like `Name?` displays with a space after it:

```txt
Name? 
```

The TypeScript runtime receives the raw prompt. The extra space is a CLI display
behavior.

## Errors and Exit Codes

Successful runs exit with code `0`. File errors and program errors exit with
code `1`. Program errors are written to stderr and include the Sticks Lite error
name, location, message, and hint when available.

See [CLI Reference](/reference/cli) for the exact failure cases.
