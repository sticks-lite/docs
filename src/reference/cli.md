---
title: CLI Reference
description: Exact behavior of the sticks command.
---

# CLI Reference

The package installs the `sticks` command.

```sh
npm install -g sticks-lite
```

## Usage

```sh
sticks run [file-or-directory]
sticks check [file-or-directory]
sticks init <project-name>
sticks --help
sticks --version
sticks -v
```

`sticks run` and `sticks check` use `main.slite` in the current directory when
no target is provided.

For compatibility, `sticks [file-or-directory]` still runs the target directly,
but `sticks run` is the preferred command.

## Help

`sticks --help`, `sticks -h`, and `sticks help` print usage information and exit
successfully.

## Run

`sticks run` executes a source file or folder project.

## File Targets

The target can be a `.slite` file.

```sh
sticks run main.slite
sticks run lessons/hello.slite
```

Files must end in `.slite`. Extension checks are case-insensitive for direct
file paths.

## Directory Targets

The target can be a directory.

```sh
sticks run .
sticks run path/to/project
```

When given a directory, the CLI looks for an entry file named exactly
`main.slite`. The exact lowercase filename is required across Windows, macOS,
and Linux.

## Check

`sticks check` parses a source file or folder project without running it.

```sh
sticks check
sticks check main.slite
sticks check path/to/project
```

When no target is provided, `sticks check` uses `main.slite` in the current
directory. A successful check prints a success message and exits with code `0`.
Syntax or file errors are written to stderr and exit with code `1`.

`sticks check` does not evaluate the program, call `ask`, or run `say`.

## Init

`sticks init <project-name>` creates a new Sticks Lite project folder.

```sh
sticks init my-project
```

The command creates:

```txt
my-project/
  main.slite
  README.md
```

`main.slite` contains a small starter program. `README.md` contains project
commands, file notes, and a classroom-use reminder. Existing `main.slite` or
`README.md` files are not overwritten.

## Version

`sticks --version` and `sticks -v` print the package version from package
metadata and exit successfully.

## Input and Output

Program output is written to stdout, one line per `say`.

For `ask`, the CLI writes the prompt to stdout and reads one line from stdin. If
the prompt is nonempty and does not already end in whitespace, the CLI adds one
space after the prompt. The TypeScript runtime receives the raw prompt; this
spacing is CLI-specific.

## Failures

The CLI exits with code `1` and writes an error to stderr when:

| Case | Message family |
| --- | --- |
| target path is missing | `FileError` |
| target is not a file or folder | `FileError` |
| direct file does not end in `.slite` | `FileError` |
| directory is empty | `FileError` |
| directory does not contain `main.slite` | `FileError` |
| directory contains `Main.slite` or another casing | `FileError` with rename hint |
| source file cannot be read | `FileError` |
| `init` would overwrite `main.slite` or `README.md` | `FileError` |
| program lexing, parsing, or runtime fails | formatted Sticks Lite error |
