---
title: Your First Program
description: Create a .slite file, print output, and run it.
---

# Your First Program

<div class="lesson-goal">
  <strong>Goal:</strong> Create `main.slite`, print two lines, and run the program with `sticks`.
</div>

Sticks Lite source files end in `.slite`. A folder project uses an entry file
named exactly `main.slite`.

## Write the File

Create `main.slite`:

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

Run the file directly:

```sh
sticks main.slite
```

Or run the folder that contains `main.slite`:

```sh
sticks .
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
| Running from the wrong folder | Use `sticks path/to/main.slite` or move into the project folder first. |

## Read More

See [Running .slite Files](/tools/running-files), [CLI Reference](/reference/cli), and [Syntax](/reference/syntax).
