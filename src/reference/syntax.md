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

An expression can also be used as a statement. This is mainly useful for
function calls whose return value is not needed.

```slite
items = [1, 2]
push(items, 3)
say toText(items)
```

Expected output:

```txt
[1, 2, 3]
```

## Names and Keywords

Names can contain letters, numbers, and underscores, but they must not start
with a number. Names are case-sensitive, so `score`, `Score`, and `SCORE` are
three different names.

Keywords such as `if`, `foreach`, `True`, `False`, `null`, `say`, and `ask`
cannot be used as variable names.

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

`ask` is an expression. Its prompt must be text, and it returns the line of
text that the user enters.

## Commas

Function arguments, list items, tuple items, and dictionary entries are
separated with commas. Trailing commas are not supported.

```txt
items = [1, 2,]
point = (10, 20,)
```

Use:

```slite
items = [1, 2]
point = (10, 20)
```

## Common Syntax Errors

| Error | Typical cause |
| --- | --- |
| `SyntaxError` | missing colon, unfinished string, trailing comma, unexpected character, invalid `orif`, invalid `otherwise`, invalid `when` |
| `IndentationError` | mixed tabs and spaces, a dedent that does not match an earlier block |
| `FunctionError` | invalid function declaration or duplicate parameter name |
