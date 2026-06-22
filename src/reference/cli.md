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
sticks [file-or-directory]
sticks --version
sticks -v
```

If no target is provided, the CLI uses `main.slite` in the current directory.

## File Targets

The target can be a `.slite` file.

```sh
sticks main.slite
sticks lessons/hello.slite
```

Files must end in `.slite`. Extension checks are case-insensitive for direct
file paths.

## Directory Targets

The target can be a directory.

```sh
sticks .
sticks path/to/project
```

When given a directory, the CLI looks for an entry file named exactly
`main.slite`. The exact lowercase filename is required across Windows, macOS,
and Linux.

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
| program lexing, parsing, or runtime fails | formatted Sticks Lite error |
