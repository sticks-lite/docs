---
title: Loops
description: repeat, loopif, foreach, break, and continue.
---

# Loops

## repeat

`repeat` runs a block a whole number of times.

```txt
repeat count times:
    statement
```

The count must be a whole number and cannot be negative.

```slite
total = 0

repeat 4 times:
    total++

say toText(total)
```

Expected output:

```txt
4
```

## loopif

`loopif` runs while its condition is `True`.

```txt
loopif condition:
    statement
```

The condition must evaluate to a boolean each time it is checked.

```slite
count = 3

loopif count > 0:
    say toText(count)
    count--
```

Expected output:

```txt
3
2
1
```

## foreach

`foreach` loops through each item in a list or tuple.

```txt
foreach item in collection:
    statement
```

```slite
names = ("Maya", "Ari")

foreach name in names:
    say name
```

Expected output:

```txt
Maya
Ari
```

Dictionary iteration is unsupported in this release. Passing a dictionary to
`foreach` reports `TypeError`.

The loop variable remains available after the loop finishes.

## break and continue

`break` exits the nearest loop. `continue` skips to the next iteration of the
nearest loop. Both must be used inside `repeat`, `loopif`, or `foreach`.

```slite
items = [1, 2, 3, 4]

foreach item in items:
    if item == 2:
        continue
    if item == 4:
        break
    say toText(item)
```

Expected output:

```txt
1
3
```
