---
title: Installation
description: Install Sticks Lite globally from npm.
---

# Installation

Sticks Lite is published as the `sticks-lite` npm package. It installs the
`sticks` command.

## Requirements

- Node.js `18` or newer.
- npm.

## Install Globally

```sh
npm install -g sticks-lite
```

Check that the command is available:

```sh
sticks --version
```

The version is read from package metadata.

## Create and Run a First Project

Create a starter project:

```sh
sticks init hello-sticks
cd hello-sticks
```

Run the generated `main.slite`:

```sh
sticks run
```

The starter program asks for input and prints a result. You can edit
`main.slite`, then run it again.

Check syntax without running:

```sh
sticks check
```

## Common Install Issues

| Symptom | Check |
| --- | --- |
| `sticks` command is not found | Make sure npm global binaries are on your shell path. |
| Node version error | Install Node.js `18` or newer. |
| Permission error during global install | Use the npm setup recommended for your machine or ask your school device administrator. |
