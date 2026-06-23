---
title: Running .slite Files
description: Run individual files and folder projects.
---

# Running .slite Files

Sticks Lite supports two common classroom layouts: one source file or a folder
project.

## One File

```txt
lesson/
  hello.slite
```

Run:

```sh
sticks run lesson/hello.slite
```

The file extension must be `.slite`.

## Folder Project

```txt
lesson/
  main.slite
```

Run:

```sh
sticks run lesson
```

When the target is a folder, `main.slite` is required. The name must be exactly
lowercase `main.slite`.

## Default Target

If no target is provided, `sticks run` uses `main.slite` in the current
directory.

```sh
sticks run
```

This is useful when each student has one project folder.

## Check Before Running

```sh
sticks check
sticks check lesson/hello.slite
```

`sticks check` uses the same file and folder target rules as `sticks run`, but
it parses the source without executing it.

## File Error Checklist

| CLI report | Fix |
| --- | --- |
| could not find the path | Check the spelling or run from the correct folder. |
| can only run `.slite` source files | Rename the source file to end in `.slite`. |
| empty folder | Add `main.slite` or pass a specific `.slite` file. |
| does not contain `main.slite` | Create `main.slite` in the folder. |
| contains `Main.slite` | Rename it exactly to `main.slite`. |
| cannot read path | Check file permissions or school device controls. |
