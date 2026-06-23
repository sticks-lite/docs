---
title: Your First Program
description: Create a Sticks Lite project, read main.slite, and run it.
---

# Your First Program

<div class="lesson-goal">
  <strong>Goal:</strong> Create a starter project, read `main.slite`, and run the program with `sticks`.
</div>

Sticks Lite source files end in `.slite`. A folder project uses an entry file
named exactly `main.slite`.

## Create the Project

Use `sticks init` to create a project folder:

```sh
sticks init hello-sticks
cd hello-sticks
```

The command creates:

```txt
hello-sticks/
  main.slite
  README.md
```

## Read main.slite

Open the generated `main.slite`. It starts with a small program you can change.
For a first tiny program, replace it with:

```slite
say "Hello, Sticks Lite"
say "This program is running."
```

Expected output:

```txt
Hello, Sticks Lite
This program is running.
```

`say` prints the value after it. It does not use parentheses.

## Run It

Run the project:

```sh
sticks run
```

You can also run the entry file directly:

```sh
sticks run main.slite
```

## Add a Comment

Comments are notes for readers. Sticks Lite ignores them when the program runs.

```slite
# This line is a comment.
say "Comments help explain code."

/*
This is a block comment.
It can cover more than one line.
*/
say "The program keeps going."
```

Expected output:

```txt
Comments help explain code.
The program keeps going.
```

## Common Mistakes

| Mistake | What to do |
| --- | --- |
| Naming the file `main.txt` | Rename it to end in `.slite`. |
| Naming the folder entry `Main.slite` | Rename it exactly to `main.slite`. |
| Writing `say("Hello")` | Write `say "Hello"`. |
| Running from the wrong folder | Move into the project folder or run `sticks run path/to/project`. |

## Read More

See [Running .slite Files](/tools/running-files), [CLI Reference](/reference/cli), and [Syntax](/reference/syntax).
