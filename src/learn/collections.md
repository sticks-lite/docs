---
title: Collections
description: Use lists, tuples, dictionaries, indexing, and collection updates.
---

# Collections

<div class="lesson-goal">
  <strong>Goal:</strong> Store more than one value and read values by index or key.
</div>

Sticks Lite has three collection values: lists, tuples, and dictionaries.

## Lists

Lists use square brackets and can be changed.

```slite
items = [1, 2]
push(items, 3)
items[0] = 9

say toText(items)
say toText(items[1])
```

Expected output:

```txt
[9, 2, 3]
2
```

List indexes start at `0`.

## Tuples

Tuples use parentheses and cannot be changed after creation.

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

## Dictionaries

Dictionaries use text keys.

```slite
student = {"name": "Maya", "scores": [8, 9]}
student["grade"] = "A"
student["scores"][0] = 10

say student["name"]
say student["grade"]
say toText(student["scores"])
```

Expected output:

```txt
Maya
A
[10, 9]
```

Dictionary keys in literals must be quoted text. Indexing a dictionary also
uses text keys, such as `student["name"]`.

## Text Indexing

Text values can be indexed to read one character.

```slite
word = "Sticks"

say word[0]
say word[5]
```

Expected output:

```txt
S
s
```

Text cannot be changed by index.

## Common Mistakes

| Mistake | What happens |
| --- | --- |
| Reading `items[3]` from a three-item list | Valid indexes are `0`, `1`, and `2`. |
| Using a text index on a list | List indexes must be whole numbers. |
| Changing a tuple item | Tuples cannot be changed after creation. |
| Reading a missing dictionary key | Sticks Lite reports `KeyError`. |
| Looping through a dictionary with `foreach` | Dictionary iteration is not supported in this release. |

## Read More

See [Lists, Tuples, and Dictionaries](/reference/collections) and [Built-ins](/reference/built-ins).
