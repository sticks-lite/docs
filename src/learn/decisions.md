---
title: Decisions
description: Use if, orif, and otherwise to choose which block runs.
---

# Decisions with if, orif, otherwise

<div class="lesson-goal">
  <strong>Goal:</strong> Choose which block runs based on a boolean condition.
</div>

Use `if` to run a block when a condition is `True`. Add `orif` for more choices
and `otherwise` for the fallback.

```slite
score = 84

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
otherwise:
    say "Keep practicing"
```

Expected output:

```txt
B
```

## Conditions Must Be Booleans

The condition after `if`, `orif`, or `loopif` must evaluate to `True` or
`False`.

```slite
score = 10

if score > 0:
    say "Positive score"
```

Expected output:

```txt
Positive score
```

## Indented Blocks

The line that starts a block ends with `:`. The statements inside the block are
indented.

```slite
ready = True

if ready:
    say "Start"
    say "Keep going"

say "Done"
```

Expected output:

```txt
Start
Keep going
Done
```

## Common Mistakes

| Mistake | What to do |
| --- | --- |
| Missing `:` after a condition | End the block-opening line with `:`. |
| Starting with `orif` | Start the chain with `if`. |
| Putting `orif` after `otherwise` | Put every `orif` before the final `otherwise:`. |
| Using raw text or a raw number as a condition | Compare explicitly, such as `score > 0`. |

## Read More

See [Conditionals](/reference/conditionals) and [Syntax](/reference/syntax).
