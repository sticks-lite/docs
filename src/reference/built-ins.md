---
title: Built-ins
description: Standard built-in functions and their accepted argument types.
---

# Built-ins

Built-in names are protected. They cannot be overwritten by variables,
constants, or functions.

## Summary

| Built-in | Purpose | Returns |
| --- | --- | --- |
| `random(min, max)` | Return a random number from `min` through `max`. Whole-number bounds produce a whole number. | number |
| `length(value)` | Count characters in text, items in a list or tuple, or entries in a dictionary. | number |
| `toNumber(value)` | Convert numeric text into a number. | number |
| `toText(value)` | Convert any Sticks Lite value into display text. | text |
| `isNumber(value)` | Check whether a value is a number. | boolean |
| `isText(value)` | Check whether a value is text. | boolean |
| `isList(value)` | Check whether a value is a list. | boolean |
| `isTuple(value)` | Check whether a value is a tuple. | boolean |
| `isDictionary(value)` | Check whether a value is a dictionary. | boolean |
| `isBoolean(value)` | Check whether a value is a boolean. | boolean |
| `isNull(value)` | Check whether a value is `null`. | boolean |
| `push(list, value)` | Add a value to the end of a list. | null |
| `insert(list, index, value)` | Insert a value into a list at an index. | null |
| `remove(list, index)` | Remove the item at an index from a list. | null |
| `round(value)` | Round a number to the nearest whole number. | number |
| `floor(value)` | Round a number down. | number |
| `ceiling(value)` | Round a number up. | number |
| `absolute(value)` | Return the absolute value of a number. | number |

## random(min, max)

Accepts two numbers. If both are whole numbers, returns a whole number from
`min` through `max`, inclusive. If either bound is decimal, returns a decimal in
the range. `min` must be less than or equal to `max`.

```slite
say toText(random(4, 4))
```

Expected output:

```txt
4
```

## length(value)

Accepts text, list, tuple, or dictionary. Returns a number.

```slite
say toText(length("hello"))
say toText(length([1, 2, 3]))
say toText(length((1, 2)))
say toText(length({"name": "Maya"}))
```

Expected output:

```txt
5
3
2
1
```

## toNumber(value)

Accepts a number or text. Numbers return unchanged. Text must contain a valid
number after trimming whitespace. Invalid text reports `ValueError`; other
types report `TypeError`.

```slite
say toText(toNumber("42"))
say toText(toNumber("3.14"))
```

Expected output:

```txt
42
3.14
```

## toText(value)

Accepts any value and returns text.

```slite
say toText(True)
say toText([1, 2])
say toText(null)
```

Expected output:

```txt
True
[1, 2]
null
```

## Type Checks

Each type-check built-in accepts one value and returns `True` or `False`.

```slite
say toText(isNumber(42))
say toText(isText("Maya"))
say toText(isList([1]))
say toText(isTuple((1, 2)))
say toText(isDictionary({"name": "Maya"}))
say toText(isBoolean(False))
say toText(isNull(null))
```

Expected output:

```txt
True
True
True
True
True
True
True
```

## push(list, value)

Accepts a list and any value. Mutates the list and returns `null`.

```slite
items = [1, 2]
push(items, 3)
say toText(items)
```

Expected output:

```txt
[1, 2, 3]
```

## insert(list, index, value)

Accepts a list, a whole-number index, and any value. The index can be from `0`
through `length(list)`.

```slite
items = [1, 3]
insert(items, 1, 2)
say toText(items)
```

Expected output:

```txt
[1, 2, 3]
```

## remove(list, index)

Accepts a list and a whole-number index from `0` through `length(list) - 1`.
Mutates the list and returns `null`.

```slite
items = [1, 2, 3]
remove(items, 1)
say toText(items)
```

Expected output:

```txt
[1, 3]
```

## Math Built-ins

Each math built-in accepts one number and returns a number.

```slite
say toText(round(3.5))
say toText(floor(-1.2))
say toText(ceiling(-1.8))
say toText(absolute(-12))
```

Expected output:

```txt
4
-2
-1
12
```

## Common Mistakes

| Mistake | Error |
| --- | --- |
| Calling a built-in with the wrong number of arguments | `ArgumentError` |
| Passing text to `round`, `floor`, `ceiling`, or `absolute` | `TypeError` |
| Passing a tuple to `push`, `insert`, or `remove` | `TypeError` |
| Passing a decimal index to `insert` or `remove` | `ValueError` |
| Passing an out-of-range index to `insert` or `remove` | `IndexError` |
