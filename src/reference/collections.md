---
title: Lists, Tuples, and Dictionaries
description: Collection literals, indexing, mutation, and limitations.
---

# Lists, Tuples, and Dictionaries

## Lists

Lists are ordered and mutable.

```slite
items = [10, 20, 30]
items[1] = 25
say toText(items)
```

Expected output:

```txt
[10, 25, 30]
```

List indexes must be whole numbers from `0` through `length(list) - 1`.

## Tuples

Tuples are ordered and immutable.

```slite
point = (10, 20)
say toText(point[0])
say toText(length(point))
```

Expected output:

```txt
10
2
```

Empty tuples and one-item tuples are not supported. Use an empty list `[]` or a
one-item list such as `[10]`.

## Dictionaries

Dictionaries map text keys to values.

```slite
student = {"name": "Maya", "score": 9}
student["score"] = 10
student["grade"] = "A"

say student["name"]
say toText(student["score"])
say student["grade"]
```

Expected output:

```txt
Maya
10
A
```

Dictionary literal keys must be quoted text. Dictionary index keys must be text.
Assigning to a dictionary key creates or updates that key. Reading a missing key
reports `KeyError`.

If a dictionary literal repeats a key, the later entry is the value that remains.

## Nested Collections

Nested indexing is supported.

```slite
matrix = [[1, 2], [3, 4]]
matrix[1][0] = 30

student = {"scores": [8, 9]}
student["scores"][1] = 10

say toText(matrix)
say toText(student["scores"])
```

Expected output:

```txt
[[1, 2], [30, 4]]
[8, 10]
```

## Text Indexing

Text supports read-only indexing by whole-number position.

```slite
word = "Sticks"
say word[0]
```

Expected output:

```txt
S
```

## Collection Built-ins

| Built-in | Works on | Behavior |
| --- | --- | --- |
| `length(value)` | text, list, tuple, dictionary | returns character count, item count, or entry count |
| `push(list, value)` | list | appends value, returns `null` |
| `insert(list, index, value)` | list | inserts value, returns `null` |
| `remove(list, index)` | list | removes value, returns `null` |

## foreach Limitation

`foreach` supports lists and tuples only. Dictionary iteration is unsupported in
this release.
