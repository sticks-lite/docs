# Installing

This page covers installing the Sticks Lite interpreter package and running the
`sticks` CLI.

## Requirements

Sticks Lite v1.0.14 is distributed as a Node.js CLI package. Install a current
long-term support version of Node.js, then use npm to install the global
`sticks` CLI.

```sh
node --version
npm --version
```

## Install The Global CLI

Install Sticks Lite globally:

```sh
npm install -g sticks-lite
sticks --version
sticks main.slite
```

The final command runs a `.slite` source file named `main.slite`.

## npm Package Page

npm may display `npm i sticks-lite` on the package page. For classroom use, the
recommended installation is still global so the `sticks` command is available
directly from the terminal.

Teachers may add an npm script in a project after installing globally:

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

When the `sticks` CLI receives a directory, it looks for a `.slite` source file
named `main.slite` inside that directory. The filename must be exactly
lowercase `main.slite` so projects run the same way on Windows, macOS, and
Linux.

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

Use Sticks Lite in supervised learning settings. A teacher, mentor, or parent
should review what students run and decide whether each lesson is appropriate.

Sticks Lite is not for production apps, security sandboxing, unsupervised
execution of untrusted source files, or safety-critical work.
