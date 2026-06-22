---
title: Teaching Sequence
description: A short order for introducing Sticks Lite concepts.
---

# Teaching Sequence

This sequence keeps each new idea close to something students already saw.

## 1. Output and Files

Start with `main.slite`, `say`, comments, and `sticks .`.

```slite
say "Hello"
say "Ready"
```

## 2. Variables and Conversion

Introduce names, numbers, text, and `toText`.

```slite
score = 10
say "Score: " + toText(score)
```

## 3. Decisions

Use comparisons before introducing boolean operators.

```slite
score = 84

if score >= 70:
    say "Passing"
otherwise:
    say "Keep practicing"
```

## 4. Loops

Teach `repeat` first, then `foreach`, then `loopif`.

```slite
items = [1, 2, 3]

foreach item in items:
    say toText(item)
```

## 5. Functions

Use a function that returns a number, then one that prints text.

```slite
new double(value):
    return value * 2

say toText(double(6))
```

## 6. Collections

Compare lists, tuples, and dictionaries using the same data.

```slite
scores = [8, 9]
point = (10, 20)
student = {"name": "Maya"}

say toText(scores[0])
say toText(point[1])
say student["name"]
```

## 7. Errors

Introduce `attempt` only after students have seen normal friendly errors.

```slite
attempt:
    value = toNumber("abc")
    say toText(value)
when ValueError:
    say "Use a number."
```
