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

## Run a First File

Create `main.slite`:

```slite
say "Hello from Sticks Lite"
```

Run it:

```sh
sticks main.slite
```

Expected output:

```txt
Hello from Sticks Lite
```

## Common Install Issues

| Symptom | Check |
| --- | --- |
| `sticks` command is not found | Make sure npm global binaries are on your shell path. |
| Node version error | Install Node.js `18` or newer. |
| Permission error during global install | Use the npm setup recommended for your machine or ask your school device administrator. |
