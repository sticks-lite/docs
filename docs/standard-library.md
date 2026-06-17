# Standard Library

Sticks Lite built-ins are always available. Their names are protected and cannot be overwritten.

All built-ins use camelCase.

## Conversion

`toText(value)` converts a Sticks Lite value into text.

```slite
say toText(42)
say toText(True)
say toText(null)
say toText([1, 2, 3])
```

`toNumber(value)` converts text to a number when possible.

```slite
age = toNumber("13")
```

Invalid conversions raise `ValueError`.

```slite
age = toNumber("thirteen")
```

## Type Checks

Type-checking functions return `True` or `False`.

```txt
isNumber(value)
isText(value)
isList(value)
isTuple(value)
isDictionary(value)
isBoolean(value)
isNull(value)
```

Example:

```slite
value = ask "Number?"

attempt:
    number = toNumber(value)
    say toText(isNumber(number))
when ValueError:
    say "That was text, not a number."
```

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

`insert(list, index, value)` inserts a value at an index.

```slite
items = [1, 2, 4]
insert(items, 2, 3)
say toText(items)
```

`remove(list, index)` removes the item at an index.

```slite
items = [10, 20, 30]
remove(items, 1)
say toText(items)
```

Collection indexes must be whole numbers.

List operation errors include hints. For example, `remove(items, 20)` reports
the valid index range when the list is not empty.

## Math

`random(min, max)` returns a random number between `min` and `max`. If both arguments are whole numbers, the result is a whole number.

```slite
roll = random(1, 6)
say toText(roll)
```

`round(number)` rounds to the nearest whole number.

`floor(number)` rounds down.

`ceiling(number)` rounds up.

`absolute(number)` returns the distance from zero.

```slite
say toText(round(3.6))
say toText(floor(3.9))
say toText(ceiling(3.1))
say toText(absolute(-5))
```

## Error Behavior

Built-ins use teaching-style errors:

- Wrong argument count raises `ArgumentError`.
- Wrong argument type raises `TypeError`.
- Invalid values raise `ValueError`, `IndexError`, or `MathError`.
- Many errors include hints that name the expected value shape.

Example:

```slite
attempt:
    number = toNumber("abc")
when ValueError:
    say "Use digits, like 42."
```
