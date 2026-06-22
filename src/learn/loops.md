---
title: Loops
description: Repeat work with repeat, loopif, foreach, break, and continue.
---

# Loops

<div class="lesson-goal">
  <strong>Goal:</strong> Repeat code with counted loops, condition loops, and collection loops.
</div>

Loops run the same block more than once.

## Repeat a Fixed Number of Times

Use `repeat count times:` when you know how many times the block should run.

```slite
count = 0

repeat 3 times:
    count++
    say "Turn " + toText(count)
```

Expected output:

```txt
Turn 1
Turn 2
Turn 3
```

The repeat count must be a whole number and cannot be negative.

## Loop While a Condition Is True

Use `loopif` when the loop depends on a condition.

```slite
count = 3

loopif count > 0:
    say toText(count)
    count--

say "Go"
```

Expected output:

```txt
3
2
1
Go
```

## Loop Through a List or Tuple

`foreach` works with lists and tuples.

```slite
scores = [2, 3, 4]
total = 0

foreach score in scores:
    total += score

say toText(total)
```

Expected output:

```txt
9
```

Dictionary iteration is not supported in this release. Use a list or tuple for
the values you want to visit.

## Break and Continue

`break` exits the nearest loop. `continue` skips to the next turn of the loop.

```slite
numbers = [1, 2, 3, 4]

foreach number in numbers:
    if number == 2:
        continue
    if number == 4:
        break
    say toText(number)
```

Expected output:

```txt
1
3
```

## Common Mistakes

| Mistake | What happens |
| --- | --- |
| Writing `repeat 3:` | Sticks Lite expects `repeat 3 times:`. |
| Using a decimal repeat count | The count must be a whole number. |
| Using `foreach` on a dictionary | Sticks Lite reports that `foreach` supports lists and tuples only. |
| Using `break` outside a loop | Sticks Lite reports `RuntimeError`. |

## Read More

See [Loops](/reference/loops) and [Operators](/reference/operators).
