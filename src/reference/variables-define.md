---
title: Variables and DEFINE
description: Assignment, constants, protected names, and scope.
---

# Variables and DEFINE

## Assignment

Assign a value to a variable with `=`.

```slite
score = 10
score = score + 5
say toText(score)
```

Expected output:

```txt
15
```

Variables are created by assignment. Reading a name before it exists reports
`NameError`.

## Compound Assignment

Compound assignment works on existing variable names.

```slite
score = 10
score += 5
score *= 2
say toText(score)
```

Expected output:

```txt
30
```

Supported compound operators are `+=`, `-=`, `*=`, `/=`, and `%=`.
Compound assignment does not support indexed targets such as `items[0] += 1`.

## Increment and Decrement

`++` and `--` work on number variables.

```slite
count = 1
count++
count--
say toText(count)
```

Expected output:

```txt
1
```

## Constants

Create a top-level constant with `DEFINE`.

```slite
DEFINE MAX_SCORE = 100

score = 84
say "Out of " + toText(MAX_SCORE)
```

Expected output:

```txt
Out of 100
```

Constants cannot be changed or redefined. `DEFINE` can only appear at the top
level.

## Protected Names

Built-in names, error names, constants, and function names are protected from
accidental overwrite.

Protected built-in names include `random`, `length`, `toNumber`, `toText`,
`push`, `insert`, `remove`, `round`, `floor`, `ceiling`, and `absolute`.

Protected error names are listed in [Errors](/reference/errors).

## Scope

Variables created in `if`, `repeat`, `loopif`, `foreach`, and `attempt` blocks
remain in the surrounding scope.

```slite
if True:
    message = "available"

say message
```

Expected output:

```txt
available
```

Function variables are local to the function. Functions can read global values,
but assignments inside a function create or update local variables.
