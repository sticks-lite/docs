# Command Line

The `sticks` command runs Sticks Lite files and project directories from a
terminal. It is a small Node.js wrapper around the same platform-independent
interpreter used by the browser IDE.

## Install

```sh
npm install -g sticks-lite
```

## Run A File

```sh
sticks examples/hello.slite
```

## Run A Project Directory

When given a directory, the CLI looks for an entry file named exactly
`main.slite`.

```sh
sticks path/to/sticks-project
```

The exact lowercase filename is required on every platform. This keeps
directory execution consistent on Windows, macOS, and Linux.

## Version Check

```sh
sticks --version
```

## Build

When developing the compiler/interpreter repository from source:

```sh
npm install
npm run build
```

The build runs TypeScript checking and emits the CLI and language core into
`dist/`.

## Test

```sh
npm test
```

The test suite covers the lexer, parser, interpreter, and friendly errors.

Run the executable examples after building:

```sh
npm run build
npm run test:examples
```

## Runtime Separation

The CLI may read files and use Node input/output. The language core does not. This keeps the interpreter usable from:

- the browser IDE
- the CLI
- tests
- future classroom tools

## Entry File

The conventional entry file is:

```txt
main.slite
```

The web IDE runs one `main.slite` buffer. The CLI can run either a `.slite` file or a directory containing `main.slite`.

`Main.slite`, `MAIN.SLITE`, and other differently cased names are rejected even
on case-insensitive filesystems.

## Exit Behavior

Successful programs exit with status code `0`. Programs that fail to parse or
execute print a friendly Sticks Lite error and exit with a non-zero status code.

## Path Errors

The CLI checks common file mistakes before running a program:

- missing files
- files that do not end in `.slite`
- empty directories
- directories without `main.slite`
- directories with differently cased entry files such as `Main.slite`
- unreadable files or folders

These are reported as `FileError` messages with a hint. The language core does
not use Node.js file APIs; this validation lives in the CLI wrapper.

Windows-style paths are handled in diagnostics, so a path such as
`C:\Users\student\README.md` is displayed as `README.md` in extension errors.

## Input, Output, And Newlines

The CLI appends one space after non-empty prompts that do not already end in
whitespace. Empty prompts stay empty.

Program output is written in execution order. Each `say` statement writes one
line ending with `\n`, regardless of whether the source file ends with a final
newline.

## Classroom Usage

For labs, teachers can install the command once on a shared machine:

```sh
npm install -g sticks-lite
```

Students can then run:

```sh
sticks main.slite
```

Sticks Lite is intended for monitored classroom environments. It should not be
used as a sandbox for untrusted code or as part of production systems.
