---
title: Conditionals
description: Formal behavior of if, orif, otherwise, and boolean conditions.
---

# Conditionals

## Forms

```txt
if condition:
    statement

if condition:
    statement
orif condition:
    statement
otherwise:
    statement
```

`orif` and `otherwise` must immediately follow the previous block in the same
conditional chain.

## Runtime Behavior

Sticks Lite evaluates branches from top to bottom. The first condition that is
`True` runs its block. If no condition is `True`, the `otherwise` block runs
when present.

```slite
score = 76

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
orif score >= 70:
    say "C"
otherwise:
    say "Try again"
```

Expected output:

```txt
C
```

## Conditions

Conditions must evaluate to a boolean.

```slite
score = 4

if score > 0:
    say "positive"
```

Expected output:

```txt
positive
```

Raw numbers, text, lists, tuples, dictionaries, functions, built-ins, and
`null` are not valid conditions.

## Invalid Chains

These forms are invalid:

```txt
orif ready:
    say "bad"

otherwise:
    say "bad"

if ready:
    say "first"
otherwise:
    say "fallback"
orif extra:
    say "too late"
```
