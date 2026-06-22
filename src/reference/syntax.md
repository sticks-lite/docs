---
title: Syntax
description: Source files, comments, statements, indentation, and block syntax.
---

# Syntax

## Source Files

Sticks Lite source files use the `.slite` extension. The CLI can run a single
`.slite` file or a directory containing `main.slite`.

```slite
say "Hello"
```

## Statements

Sticks Lite uses one statement per line.

```slite
score = 10
say toText(score)
```

Two statements on one line are not valid.

```txt
say "one" say "two"
```

## Comments

Line comments start with `#`.

```slite
score = 1 # this comment is ignored
say toText(score)
```

Block comments start with `/*` and end with `*/`.

```slite
/*
This note is ignored by the interpreter.
*/
say "Ready"
```

Block comments can appear beside code:

```slite
x = 1 /* between tokens */ + 2
say toText(x)
```

Nested block comments are not supported. Comment markers inside quoted text are
treated as text, not comments.

## Blocks

Block-opening statements end with `:`. The block body starts on the next line
and must be indented.

```slite
if True:
    say "Inside"

say "Outside"
```

The same file must not mix tabs and spaces for indentation. Four spaces per
block is recommended.

Block starters are:

| Starter | Form |
| --- | --- |
| `if` | `if condition:` |
| `orif` | `orif condition:` |
| `otherwise` | `otherwise:` |
| `repeat` | `repeat count times:` |
| `loopif` | `loopif condition:` |
| `foreach` | `foreach item in collection:` |
| `new` | `new name:` or `new name(param, param):` |
| `attempt` | `attempt:` |
| `when` | `when ValueError:` or `when error:` |

## Grouping and Calls

Parentheses group expressions and call functions.

```slite
value = (2 + 3) * 4
say toText(value)
```

Function calls use parentheses:

```slite
say toText(length([1, 2, 3]))
```

`say` and `ask` do not use parentheses.

```slite
name = ask "Name?"
say "Hello " + name
```

## Common Syntax Errors

| Error | Typical cause |
| --- | --- |
| `SyntaxError` | missing colon, unfinished string, unexpected character, invalid `orif`, invalid `otherwise`, invalid `when` |
| `IndentationError` | mixed tabs and spaces, a dedent that does not match an earlier block |
| `FunctionError` | invalid function declaration or duplicate parameter name |
