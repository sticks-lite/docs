# Errors

Sticks Lite errors are meant to be clear, direct, and useful for students. They explain what happened, where it happened, and often include a hint.

```txt
NameError at line 3, column 5: `score` does not exist yet.
Hint: Create it first with `score = ...`, or check the spelling and capitalization.
```

See `Diagnostics` for CLI path errors and the newer hint behavior added after
v1.0.1.

## Error Names

Sticks Lite uses these built-in error names:

- `SyntaxError`
- `IndentationError`
- `NameError`
- `TypeError`
- `ValueError`
- `MathError`
- `ConstantError`
- `IndexError`
- `KeyError`
- `FunctionError`
- `ArgumentError`
- `RuntimeError`

## Common Mistakes

Running the wrong file:

```sh
sticks README.md
```

Sticks Lite only runs `.slite` files. Use `sticks main.slite`, or pass a folder
that contains `main.slite`.

Missing colon:

```slite
if score > 5
    say "missing colon"
```

Fixed:

```slite
if score > 5:
    say "has a colon"
```

Putting `orif` or `otherwise` in the wrong place:

```slite
otherwise:
    say "done"
```

Fixed:

```slite
if score >= 90:
    say "A"
orif score >= 80:
    say "B"
otherwise:
    say "keep practicing"
```

Leaving text unfinished:

```slite
say "hello
```

Fixed:

```slite
say "hello"
```

Using a variable before creating it:

```slite
say toText(score)
```

Fixed:

```slite
score = 0
say toText(score)
```

Mixing text and numbers without converting:

```slite
score = 10
say "Score: " + score
```

Fixed:

```slite
score = 10
say "Score: " + toText(score)
```

Using a non-boolean condition:

```slite
score = 10
if score:
    say "bad"
```

Fixed:

```slite
score = 10
if score > 0:
    say "good"
```

Changing a constant:

```slite
DEFINE PI = 3.14
PI = 5
```

Fixed:

```slite
DEFINE PI = 3.14
radius = 5
area = PI * radius * radius
```

Mutating a tuple:

```slite
point = (10, 20)
point[0] = 99
```

Fixed:

```slite
point = [10, 20]
point[0] = 99
```

Using the wrong index:

```slite
items = [10, 20]
say toText(items["first"])
```

Fixed:

```slite
items = [10, 20]
say toText(items[0])
```

Passing the wrong number of function arguments:

```slite
new greet(name):
    say "Hello " + name

greet()
```

Fixed:

```slite
new greet(name):
    say "Hello " + name

greet("Maya")
```

## Catching Errors

Programs can handle errors with `attempt` and `when`.

```slite
attempt:
    value = toNumber("abc")
when ValueError:
    say "Please enter a number."
when error:
    say "Something else happened."
```

Use specific handlers first and `when error:` last.
