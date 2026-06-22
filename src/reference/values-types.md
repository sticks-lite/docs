---
title: Values and Types
description: Sticks Lite runtime values and display behavior.
---

# Values and Types

Sticks Lite values have runtime types. There are no type annotations in source
code.

| Type | Literal or source | Display with `toText` or `say` |
| --- | --- | --- |
| number | `42`, `3.14`, `-5` | `42`, `3.14`, `-5` |
| text | `"Maya"`, `'Maya'` | text without quotes |
| boolean | `True`, `False` | `True`, `False` |
| null | `null` | `null` |
| list | `[1, 2, 3]` | `[1, 2, 3]` |
| tuple | `(1, 2)` | `(1, 2)` |
| dictionary | `{"name": "Maya"}` | `{"name": Maya}` |
| function | `new greet:` | `<function greet>` |
| built-in | `toText` | `<built-in toText>` |

## Text

Text can use double or single quotes. Escapes include `\n`, `\t`, and escaped
characters such as `\"`.

```slite
say "Hello"
say 'Sticks Lite'
say "Line\nBreak"
```

## Numbers

Numbers use JavaScript number behavior internally. Numeric literals can be
whole numbers or decimals.

```slite
say toText(2 + 3 * 4)
say toText(7 / 2)
say toText(7 div 2)
```

Expected output:

```txt
14
3.5
3
```

## Booleans

Booleans are exactly `True` and `False`. Conditions require booleans.

```slite
ready = True

if ready:
    say "Ready"
```

## null

`null` represents no value. A function without `return` returns `null`.

```slite
new noReturn:
    value = 5

say toText(noReturn())
```

Expected output:

```txt
null
```

## Equality

`==` and `!=` compare values by type. Lists, tuples, and dictionaries are
compared by their contents.

```slite
say toText([1, 2] == [1, 2])
say toText({"a": 1} == {"a": 1})
say toText(4 != "4")
```

Expected output:

```txt
True
True
True
```
