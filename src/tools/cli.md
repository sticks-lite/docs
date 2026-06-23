---
title: CLI
description: Practical command-line usage for the sticks command.
---

# CLI

The `sticks` CLI runs Sticks Lite source files.

## Help and Version

```sh
sticks --help
sticks --version
```

`sticks --help` shows the command list. `sticks --version` prints the installed
package version.

## Create a Project

```sh
sticks init my-project
cd my-project
sticks run
```

`sticks init` creates `main.slite` and `README.md` inside the new project
folder. It does not overwrite existing files.

## Run the Current Folder

When the current folder contains `main.slite`, run:

```sh
sticks run
```

If you run `sticks run` without an argument, the CLI looks for `main.slite` in
the current folder.

```sh
sticks run
```

## Run a Specific File

```sh
sticks run main.slite
sticks run lessons/day-one.slite
```

The file must end in `.slite`.

## Run a Project Folder

```sh
sticks run lessons/day-one
```

The folder must contain an entry file named exactly `main.slite`.

## Check Without Running

```sh
sticks check
sticks check main.slite
sticks check lessons/day-one
```

`sticks check` parses a file or project and reports syntax problems without
running the program. If no target is provided, it checks `main.slite`.

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
