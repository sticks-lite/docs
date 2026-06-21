# Standard Library

Sticks Lite built-ins are always available. Their names are protected, so a
program cannot replace `random`, `length`, `toText`, or any other standard
function with a variable, constant, or user-defined function.

Built-ins use camelCase, return ordinary Sticks Lite values, and report
teaching-style errors with line, column, and hint text.

## Built-ins at a Glance

| Built-in | Category | What it does | Tiny example |
| --- | --- | --- | --- |
| `random(min, max)` | Math | Returns a random number between two bounds. | `random(1, 6)` |
| `length(value)` | Collections | Counts text characters or collection items. | `length([1, 2, 3])` |
| `toNumber(value)` | Conversion | Converts numeric text into a number. | `toNumber("42")` |
| `toText(value)` | Conversion | Converts any value into display text. | `toText(42)` |
| `isNumber(value)` | Type check | Returns whether a value is a number. | `isNumber(42)` |
| `isText(value)` | Type check | Returns whether a value is text. | `isText("hi")` |
| `isList(value)` | Type check | Returns whether a value is a list. | `isList([1])` |
| `isTuple(value)` | Type check | Returns whether a value is a tuple. | `isTuple((1, 2))` |
| `isDictionary(value)` | Type check | Returns whether a value is a dictionary. | `isDictionary({"name": "Maya"})` |
| `isBoolean(value)` | Type check | Returns whether a value is `True` or `False`. | `isBoolean(True)` |
| `isNull(value)` | Type check | Returns whether a value is `null`. | `isNull(null)` |
| `push(list, value)` | Lists | Adds a value to the end of a list. | `push(items, 4)` |
| `insert(list, index, value)` | Lists | Inserts a value before an index. | `insert(items, 0, 4)` |
| `remove(list, index)` | Lists | Removes the value at an index. | `remove(items, 0)` |
| `round(number)` | Math | Rounds to the nearest whole number. | `round(3.5)` |
| `floor(number)` | Math | Rounds down. | `floor(3.9)` |
| `ceiling(number)` | Math | Rounds up. | `ceiling(3.1)` |
| `absolute(number)` | Math | Returns distance from zero. | `absolute(-5)` |

## Conversion

`toText(value)` converts a Sticks Lite value into text. Use it before combining
numbers, booleans, lists, tuples, dictionaries, or `null` with other text.

```slite
score = 42
say "Score: " + toText(score)
```

`toNumber(value)` converts text into a number when the text contains a valid
number. It is commonly used with `ask`, because `ask` always returns text.

```slite
ageText = "13"
age = toNumber(ageText)
say toText(age + 1)
```

Invalid conversions raise `ValueError`.

```txt
toNumber("thirteen")
```

## Type Checks

Type-checking functions return `True` or `False`. They are useful in examples,
debugging output, and guarded classroom exercises.

```slite
say toText(isNumber(42))
```

```slite
say toText(isText("hello"))
```

```slite
say toText(isList([1, 2, 3]))
```

```slite
say toText(isTuple((1, 2)))
```

```slite
student = {"name": "Maya"}
say toText(isDictionary(student))
```

```slite
ready = True
say toText(isBoolean(ready))
```

```slite
value = null
say toText(isNull(value))
```

Type checks do not convert values. For example, `isNumber("42")` returns
`False`; use `toNumber("42")` to convert numeric text.

## Collection Functions

`length(value)` works on text, lists, tuples, and dictionaries.

```slite
say toText(length("hello"))
say toText(length([1, 2, 3]))
say toText(length((1, 2)))
say toText(length({"name": "Maya"}))
```

`push(list, value)` appends a value to the end of a list.

```slite
items = [1, 2]
push(items, 3)
say toText(items)
```

`insert(list, index, value)` inserts a value at an index. Index `0` means the
front of the list. Index `length(items)` means the end of the list.

```slite
items = [2, 3]
insert(items, 0, 1)
say toText(items)
```

`remove(list, index)` removes the item at an index.

```slite
items = [10, 20, 30]
remove(items, 1)
say toText(items)
```

List indexes must be whole numbers. List operation errors include hints. For
example, `remove(items, 20)` reports the valid index range when the list is not
empty.

## Math

`random(min, max)` returns a random number between `min` and `max`. If both
arguments are whole numbers, the result is a whole number.

```slite
roll = random(1, 6)
say toText(roll)
```

`random` requires `min <= max`.

```slite
say toText(round(3.6))
```

```slite
say toText(floor(3.9))
```

```slite
say toText(ceiling(3.1))
```

```slite
say toText(absolute(-5))
```

Math built-ins require number arguments. When a value came from `ask`, convert
it with `toNumber(...)` before passing it to math built-ins.

## Error Behavior

Built-ins use teaching-style errors:

- Wrong argument count raises `ArgumentError`.
- Wrong argument type raises `TypeError`.
- Invalid numeric text raises `ValueError`.
- Invalid list indexes raise `IndexError`.
- Division and related math failures raise `MathError`.

Example:

```slite
attempt:
    number = toNumber("abc")
when ValueError:
    say "Use digits, like 42."
```
