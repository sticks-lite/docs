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

When given a directory, the CLI looks for `main.slite`.

```sh
sticks path/to/sticks-project
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

## Exit Behavior

Successful programs exit with status code `0`. Programs that fail to parse or
execute print a friendly Sticks Lite error and exit with a non-zero status code.

## Path Errors

The CLI checks common file mistakes before running a program:

- missing files
- files that do not end in `.slite`
- empty directories
- directories without `main.slite`
- unreadable files or folders

These are reported as `FileError` messages with a hint. The language core does
not use Node.js file APIs; this validation lives in the CLI wrapper.

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
