# Diagnostics

Sticks Lite diagnostics are part of the teaching experience. Errors should
identify the problem, point to a line and column, and often suggest the next
small correction.

## Error Format

```txt
NameError at line 2, column 12: `score` does not exist yet.
Hint: Create it first with `score = ...`, or check the spelling and capitalization.
```

Hints are optional, but Sticks Lite v1.0.11 includes hints for many beginner
mistakes in the lexer, parser, CLI wrapper, and interpreter.

## CLI Diagnostics

The `sticks` command validates the path before running code.

Wrong extension:

```txt
FileError: Sticks Lite can only run `.slite` files. Received `README.md`.
Hint: Rename the file to end in `.slite`, such as `main.slite`.
```

Missing file:

```txt
FileError: Could not find `/path/to/main.slite`.
Hint: Check the path, or run `sticks` from a folder that contains `main.slite`.
```

Empty folder:

```txt
FileError: `/path/to/project` is an empty folder.
Hint: Add `main.slite` to the folder, or run `sticks path/to/file.slite`.
```

Folder without `main.slite`:

```txt
FileError: `/path/to/project` does not contain `main.slite`.
Hint: Create `main.slite` in that folder, or pass a specific `.slite` file.
```

Differently cased entry file:

```txt
FileError: `/path/to/project` contains `Main.slite`, but the entry file must be named `main.slite`.
Hint: Rename the file exactly to `main.slite` so the project runs the same way on Windows, macOS, and Linux.
```

Windows-style wrong extension:

```txt
FileError: Sticks Lite can only run `.slite` files. Received `README.md`.
Hint: Rename the file to end in `.slite`, such as `main.slite`.
```

Unreadable path:

```txt
FileError: Cannot read `/path/to/main.slite` (EACCES).
Hint: Check the file permissions and try again from a readable folder.
```

## Parser Diagnostics

Missing colon:

```slite
if score > 5
    say "missing"
```

Typical hint:

```txt
Hint: Put `:` at the end of the block-opening line, then indent the next line.
```

Misplaced `orif`:

```slite
orif score > 5:
    say "bad"
```

Typical hint:

```txt
Hint: Start with `if`, then put each `orif` directly after that block.
```

Misplaced `otherwise`:

```slite
otherwise:
    say "bad"
```

Typical hint:

```txt
Hint: Use `otherwise:` only as the final block in an `if` chain.
```

Unfinished strings:

```slite
say "hello
```

Typical hint:

```txt
Hint: Add the matching quote before the end of the line.
```

## Runtime Diagnostics

Undefined names suggest creating the variable or checking spelling.

Wrong function argument counts show the expected function call shape.

Invalid indexes explain that indexes must be whole numbers and show the valid
range when possible.

Bad dictionary keys explain that dictionary indexes must be quoted text.

Bad collection operations explain which value types work. In v1.0.11,
`foreach` supports lists and tuples only; dictionary iteration is unsupported.

Bad type conversions explain which conversion is expected. For example,
`toNumber(True)` reports that `toNumber` converts text, not boolean values.

## Runtime I/O

The interpreter passes `ask` prompts to `RuntimeIO.readInput` exactly as written
in source. The CLI adds terminal-friendly prompt spacing separately.

Output order is deterministic: each `say` statement writes before the next
statement runs. In the CLI, each output line ends with `\n`; in `RunResult`,
output values are stored without newline characters.

## Handling Errors In Programs

Programs can catch Sticks Lite language errors with `attempt` and `when`.

```slite
attempt:
    value = toNumber("abc")
when ValueError:
    say "Please type digits."
when error:
    say "Something else happened."
```

Use specific handlers first and `when error:` last.
