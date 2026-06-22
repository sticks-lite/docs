---
title: Variables and Values
description: Store text, numbers, booleans, null, and constants.
---

# Variables and Values

<div class="lesson-goal">
  <strong>Goal:</strong> Use variables and constants to name values in a program.
</div>

A variable gives a value a name. Assign with `=`.

```slite
name = "Maya"
score = 91
ready = True
missing = null

say name
say "Score: " + toText(score)
say toText(ready)
say toText(missing)
```

Expected output:

```txt
Maya
Score: 91
True
null
```

## Values You Can Store

| Value | Example |
| --- | --- |
| text | `"Maya"` or `'Maya'` |
| number | `42`, `3.14`, `-5` |
| boolean | `True`, `False` |
| empty value | `null` |
| list | `[1, 2, 3]` |
| tuple | `(10, 20)` |
| dictionary | `{"name": "Maya"}` |

## Constants with DEFINE

`DEFINE` creates a top-level constant. Constants are useful for lesson settings
or values that should not change.

```slite
DEFINE MAX_SCORE = 100

score = 87
say "Out of " + toText(MAX_SCORE)
say toText(score)
```

Expected output:

```txt
Out of 100
87
```

`DEFINE` belongs at the top level. Do not put it inside an `if`, loop,
function, or `attempt` block.

## Common Mistakes

| Mistake | What happens |
| --- | --- |
| Changing a `DEFINE` constant | Sticks Lite reports `ConstantError`. |
| Assigning to `random`, `toText`, or an error name | Protected names cannot be overwritten. |
| Adding text and a number directly | Convert the number with `toText(...)`. |

## Read More

See [Values and Types](/reference/values-types), [Variables and DEFINE](/reference/variables-define), and [Operators](/reference/operators).
