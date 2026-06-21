# Language Reference

This reference describes Sticks Lite {{STICKS_LITE_VERSION_LABEL}}. Sticks Lite is small on purpose: every rule is meant to be teachable, predictable, and visible to a beginning programmer.

## Design Principles

- One statement per line.
- Blocks use a colon and indentation.
- Conditions must be `True` or `False`.
- Text and numbers do not convert automatically.
- Functions can be called before they are defined.
- Blocks do not create scopes, but functions do.
- Built-ins, constants, functions, and error names are protected.

## Files And Execution

Sticks Lite source files use `.slite`. The default entry source file is
`main.slite`.

Programs execute from top to bottom. Function definitions are collected before top-level statements run, so functions may be called before they appear in the file.

```slite
say toText(double(5))

new double(x):
    return x * 2
```

There is no required `main` function.

## Statements

A statement is one complete instruction on one line.

```slite
x = 5
say toText(x)
```

Multiple statements on one line are not supported.

```slite
x = 5 say toText(x)
```

Semicolons are not part of Sticks Lite.

## Comments

Single-line comments start with `#`.

```slite
# This is a comment
x = 5 # This is also a comment
```

Line comments may appear beside real code. A `#` inside quoted text is treated
as text, not as a comment.

```slite
say "# not a comment"
say "score #1" # this part is a comment
```

Block comments use `/* */`.

```slite
/*
This explains the program.
*/
say "Done"
```

Block comments may appear between tokens or beside real code. Comment markers
inside quoted text are treated as text.

```slite
x = 1 /* between tokens */ + 2
say "/* not a comment */"
```

Nested block comments are not supported.

## Blocks And Indentation

Block-starting statements end with `:` and are followed by an indented block.

```slite
if True:
    say "yes"
```

A file may use spaces or tabs for indentation, but one file may not mix both.

Block-starting statements are:

- `if`
- `orif`
- `otherwise`
- `repeat`
- `loopif`
- `foreach`
- `new`
- `attempt`
- `when`

## Identifiers

Identifiers may contain letters, digits, and underscores. They may not start with a digit.

Valid:

```slite
score = 10
player_score = 20
playerScore = 30
```

Invalid:

```slite
2score = 10
player-score = 10
```

Sticks Lite is case-sensitive. `score` and `Score` are different names.

## Keywords

These words are reserved:

```txt
DEFINE if orif otherwise repeat times loopif foreach in
break continue new return True False null and or not div
say ask attempt when error
```

Built-in function names and built-in error names are also protected.

## Values And Types

Sticks Lite has these value types:

- `number`
- `text`
- `boolean`
- `null`
- `list`
- `tuple`
- `dictionary`

Numbers include whole numbers and decimals.

```slite
age = 13
price = 4.99
```

Text may use single or double quotes.

```slite
name = "Maya"
team = 'Robotics'
```

Booleans are exactly `True` and `False`.

```slite
is_ready = True
```

The empty value is `null`.

```slite
result = null
```

## Variables

Create variables with assignment.

```slite
score = 0
name = "Maya"
```

Reassign variables with `=`.

```slite
score = score + 1
```

Compound assignment works on existing variables.

```slite
score += 10
score -= 5
score *= 2
score /= 3
score %= 4
```

Postfix increment and decrement work on existing number variables.

```slite
score++
score--
```

Prefix increment, postfix expressions, and type annotations are not supported.

## Constants

Constants use `DEFINE`.

```slite
DEFINE PI = 3.14159
DEFINE APP_NAME = "Sticks Lite"
```

Constants are global only and cannot be redefined or reassigned.

Invalid:

```slite
if True:
    DEFINE PI = 3.14
```

Invalid:

```slite
DEFINE PI = 3.14
PI = 5
```

## Operators

Arithmetic:

```txt
+ addition for numbers or text concatenation for two text values
- subtraction
* multiplication
/ decimal division
% remainder
div integer division
```

Division by zero, modulo by zero, and integer division by zero raise
`MathError`. `div` truncates toward zero.

Comparison:

```txt
== != < > <= >=
```

Ordering comparisons (`<`, `>`, `<=`, `>=`) work on numbers only. Equality and
inequality compare values by type and contents.

Boolean:

```txt
and or not
```

There is no automatic text conversion.

Invalid:

```slite
score = 10
say "Score: " + score
```

Valid:

```slite
score = 10
say "Score: " + toText(score)
```

## Precedence

Sticks Lite follows familiar math and logic precedence.

The numeric semantics are covered by stability tests for precedence, unary
minus, decimal division, integer division, remainder, comparisons, and math
built-ins.

```txt
()
indexing and function calls
not and unary -
* / % div
+ -
< > <= >=
== !=
and
or
```

Example:

```slite
say toText(2 + 3 * 4)
```

Output:

```txt
14
```

## Input And Output

`say` prints one expression.

```slite
say "Hello"
say toText(42)
```

`say` does not use parentheses.

`ask` reads input and returns text.

```slite
name = ask "Name?"
say "Hello " + name
```

Use `toNumber` when numeric input is needed.

```slite
age = toNumber(ask "Age?")
say toText(age + 1)
```

## Conditionals

```slite
if score >= 90:
    say "A"
orif score >= 80:
    say "B"
otherwise:
    say "Keep practicing"
```

Rules:

- `orif` must follow `if` or another `orif`.
- `otherwise` must follow an `if` chain.
- Only one `otherwise` is allowed.
- Conditions must evaluate to `True` or `False`.
- Parentheses around conditions are not used.

## Loops

`repeat` runs a block a fixed number of times.

```slite
repeat 5 times:
    say "hello"
```

The count must be a whole number greater than or equal to `0`.

`loopif` runs while a boolean condition is `True`.

```slite
count = 3

loopif count > 0:
    say toText(count)
    count--
```

`foreach` iterates over lists and tuples.

```slite
scores = [90, 85, 100]

foreach score in scores:
    say toText(score)
```

Dictionary iteration is not supported in {{STICKS_LITE_VERSION_LABEL}}.

Use `break` and `continue` inside loops.

```slite
repeat 10 times:
    score += 10
    if score >= 50:
        break
```

## Functions

Functions use `new`.

```slite
new double(x):
    return x * 2
```

Multiple parameters are comma-separated.

```slite
new add(a, b):
    return a + b
```

No-parameter functions omit parentheses in the definition.

```slite
new greet:
    say "Hello"
```

Calls always use parentheses.

```slite
greet()
say toText(double(5))
```

`return` may return a value or return `null`.

```slite
new stop:
    return
```

If a function finishes without `return`, it also returns `null`.

Functions are protected names. A program cannot later overwrite a function with
a variable or constant, and two functions cannot use the same name.

## Lists

Lists use square brackets and are mutable.

```slite
items = [1, 2, 3]
items[0] = 99
push(items, 4)
```

Indexes start at `0`. Invalid indexes raise `IndexError`. Nested lists can be
indexed and updated through chained indexes.

```slite
matrix = [[1, 2], [3, 4]]
matrix[1][0] = 30
say toText(matrix[1][0])
```

## Tuples

Tuples use parentheses and are immutable.

```slite
point = (10, 20)
say toText(point[0])
```

One-item tuples are not supported. `(10)` is a grouped expression, not a tuple.

Tuples may contain nested values and can be indexed, but assigning to a tuple
index raises `TypeError`.

## Dictionaries

Dictionaries use curly braces. Keys must be quoted text.

```slite
person = {"name": "Maya", "age": 13}
say person["name"]
person["age"] = 14
```

Dictionary values can be nested collections. Dictionary entries can be assigned
with text keys.

```slite
student = {"scores": [8, 9]}
student["scores"][0] = 10
student["grade"] = "A"
```

Dot access is not supported.

Invalid:

```slite
say person.name
```

Missing keys raise `KeyError`.

Dictionary iteration is not supported. Use lists or tuples with `foreach`.

## Exceptions

Use `attempt` and `when`.

```slite
attempt:
    value = toNumber("abc")
when ValueError:
    say "That is not a number"
when error:
    say "Something else went wrong"
```

`when error:` catches every Sticks Lite error and should be last.

Users cannot define, create, raise, or throw custom errors in {{STICKS_LITE_VERSION_LABEL}}.

## Scope

Global variables are created outside functions.

```slite
x = 5
```

Blocks such as `if`, `repeat`, `loopif`, `foreach`, `attempt`, and `when` do not create new variable scopes.

```slite
if True:
    x = 10

say toText(x)
```

Functions create local scopes. Local variables do not leak out.

```slite
new test:
    x = 5

test()
```

Functions can read global constants and built-ins. Assigning to a name inside a function creates or updates the local function scope unless the name is protected.

Protected names include built-in function names, built-in error names, constants,
and existing function names.
