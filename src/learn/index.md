---
title: Learn Sticks Lite
description: A guided beginner path through Sticks Lite.
---

# Learn Sticks Lite

<div class="lesson-goal">
  <strong>Goal:</strong> Follow a beginner path that teaches one Sticks Lite idea at a time.
</div>

Sticks Lite is designed for students who are learning the shape of programs:
values, choices, repetition, functions, collections, and errors. This section is
a path. Use the reference pages when you need exact rules.

## Learning Path

| Step | Page | What you practice |
| --- | --- | --- |
| 1 | [Your First Program](/learn/first-program) | `.slite` files, `say`, and running code |
| 2 | [Variables and Values](/learn/variables-values) | names, text, numbers, booleans, `null`, and `DEFINE` |
| 3 | [Decisions](/learn/decisions) | `if`, `orif`, `otherwise`, and boolean conditions |
| 4 | [Loops](/learn/loops) | `repeat`, `loopif`, `foreach`, `break`, and `continue` |
| 5 | [Functions](/learn/functions) | `new`, parameters, nested calls, and `return` |
| 6 | [Collections](/learn/collections) | lists, tuples, dictionaries, indexing, and updates |
| 7 | [Handling Errors](/learn/errors) | `attempt`, `when`, and friendly errors |
| 8 | [Practice Programs](/learn/practice) | short classroom programs that combine ideas |

## A Complete First Example

```slite
DEFINE MAX_SCORE = 100

score = 87

if score >= 90:
    say "Excellent"
orif score >= 70:
    say "Passing"
otherwise:
    say "Keep practicing"

say "Out of " + toText(MAX_SCORE)
```

Expected output:

```txt
Passing
Out of 100
```

## How to Read These Lessons

Each lesson starts with a goal, then shows a small runnable program. Common
mistakes are shown as descriptions or plain text instead of runnable examples.
That keeps the working examples easy to copy into a `.slite` file.

For exact rules, follow the "Read more" link at the end of each lesson.
