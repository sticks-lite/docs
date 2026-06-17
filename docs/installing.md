# Installing

This page covers installing the Sticks Lite compiler/interpreter package and
running the `sticks` command.

## Requirements

Sticks Lite v1.0.5 is distributed as a Node.js command-line package. Install a
current long-term support version of Node.js, then use npm to install the
global CLI.

```sh
node --version
npm --version
```

## Install The Global CLI

Install Sticks Lite globally:

```sh
npm install -g sticks-lite
```

Verify the command:

```sh
sticks --version
```

Run a program:

```sh
sticks main.slite
```

## Install For One Project

Sticks Lite is intended to be installed globally for classroom use. npm may
display `npm i sticks-lite`, but the recommended command is:

```sh
npm install -g sticks-lite
```

Add a script:

```json
{
  "scripts": {
    "start": "sticks main.slite"
  }
}
```

Then run:

```sh
npm start
```

## Directory Projects

When the CLI receives a directory, it looks for `main.slite` inside that
directory.

```sh
sticks ./student-project
```

Recommended layout:

```txt
student-project/
  main.slite
  notes.txt
```

## Updating

Update the global CLI with:

```sh
npm update -g sticks-lite
```

For classroom work, teachers should update intentionally and re-test lesson
material before a class uses the new version.

## Educational Use

Sticks Lite is intended for monitored educational environments. It is not
designed or represented as a production-safe language, sandbox, security
boundary, or high-risk automation tool.
