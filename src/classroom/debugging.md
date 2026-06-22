---
title: Debugging With Students
description: Help beginners use friendly errors and small checks.
---

# Debugging With Students

Debugging is part of learning the language. Sticks Lite errors are designed to
name the problem, show a location, and offer a hint.

## Read the Error in Order

Ask students to find:

1. The error name.
2. The line and column.
3. The message.
4. The hint.

Then go to that line before changing anything else.

## Use say as a Checkpoint

Add small output lines to check values.

```slite
scoreText = "42"
say "Before conversion: " + scoreText

score = toNumber(scoreText)
say "After conversion: " + toText(score)
```

Expected output:

```txt
Before conversion: 42
After conversion: 42
```

## Common Student Fixes

| Error | First question |
| --- | --- |
| `SyntaxError` | Is a colon, quote, bracket, or one-statement-per-line rule missing? |
| `IndentationError` | Does this line line up with the block it belongs to? |
| `NameError` | Was the variable created earlier, with the same capitalization? |
| `TypeError` | Does this operation accept this kind of value? |
| `ValueError` | Is the value allowed, such as a whole repeat count? |
| `IndexError` | Is the index within range, starting at `0`? |
| `KeyError` | Does the dictionary contain that exact text key? |
| `ArgumentError` | Does the call pass the expected number of arguments? |

## Keep the Change Small

When a program has more than one error, fix the first reported error and run the
program again. The next error may change after the first one is fixed.
