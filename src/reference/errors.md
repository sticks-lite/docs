---
title: Errors
description: Friendly errors, error names, attempt, and when.
---

# Errors

Sticks Lite errors include a name, line, column, message, and usually a hint.

Formatted errors look like this:

```txt
NameError at line 1, column 5: `score` does not exist yet.
Hint: Create it first with `score = ...`, or check the spelling and capitalization.
```

## Error Names

These names can be used in `when` handlers:

| Error | Common cause |
| --- | --- |
| `SyntaxError` | missing colon, unfinished string, unexpected character, invalid statement structure |
| `IndentationError` | mixed tabs and spaces, bad block indentation |
| `NameError` | undefined name or protected-name overwrite |
| `TypeError` | value has the wrong type for an operation |
| `ValueError` | value has the right type but an invalid value |
| `MathError` | division, integer division, or modulo by zero |
| `ConstantError` | changing or redefining a constant, or invalid `DEFINE` placement |
| `IndexError` | invalid list, tuple, or text index |
| `KeyError` | missing dictionary key |
| `FunctionError` | invalid function declaration, duplicate function, non-function call |
| `ArgumentError` | wrong number of arguments |
| `RuntimeError` | `return`, `break`, or `continue` in an invalid place |

Error names are protected names and cannot be used for variables, constants, or
functions.

## attempt and when

Use `attempt` to run a block that might produce a Sticks Lite error. Use `when`
to handle specific errors.

```slite
attempt:
    value = toNumber("abc")
    say toText(value)
when ValueError:
    say "Not a number"
when error:
    say "Other error"
```

Expected output:

```txt
Not a number
```

`when error:` catches any Sticks Lite error not caught by an earlier handler.
It should appear last.

## Handler Rules

- `attempt` must have at least one `when` handler.
- `when` must directly follow an `attempt` block or another `when` block.
- Specific handlers cannot appear after `when error:`.
- Only one `when error:` handler is allowed.
- If no handler matches, the error continues and the program fails.
