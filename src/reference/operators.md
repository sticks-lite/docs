---
title: Operators
description: Arithmetic, comparison, boolean, assignment, and precedence rules.
---

# Operators

## Precedence

From highest to lowest:

| Level | Operators |
| --- | --- |
| calls and indexing | `name(...)`, `value[index]` |
| unary | `not`, unary `-` |
| multiplication | `*`, `/`, `%`, `div` |
| addition | `+`, `-` |
| comparison | `<`, `<=`, `>`, `>=` |
| equality | `==`, `!=` |
| boolean and | `and` |
| boolean or | `or` |
| assignment statement | `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `++`, `--` |

Use parentheses to group expressions.

```slite
say toText(2 + 3 * 4)
say toText((2 + 3) * 4)
```

Expected output:

```txt
14
20
```

## Arithmetic

| Operator | Accepted types | Result |
| --- | --- | --- |
| `+` | number and number | number sum |
| `+` | text and text | text concatenation |
| `-` | number and number | number difference |
| `*` | number and number | number product |
| `/` | number and number | number quotient |
| `%` | number and number | remainder |
| `div` | number and number | integer division truncated toward zero |

Division, modulo, and `div` by zero report `MathError`.

```slite
say toText(7 / 2)
say toText(7 div 2)
say toText(-7 div 2)
say toText(7 % 3)
```

Expected output:

```txt
3.5
3
-3
1
```

## Comparison

Ordering comparisons work on numbers only.

```slite
say toText(2 < 3)
say toText(3 <= 3)
say toText(4 > 3)
say toText(4 >= 5)
```

Expected output:

```txt
True
True
True
False
```

## Boolean Operators

`and`, `or`, and `not` require boolean values.

```slite
ready = True
passed = False

say toText(ready and not passed)
say toText(ready or passed)
```

Expected output:

```txt
True
True
```

`and` and `or` short-circuit: the right side is evaluated only when needed.

## Text Conversion

`+` does not mix text and numbers. Convert numbers with `toText`.

```slite
score = 10
say "Score: " + toText(score)
```

Expected output:

```txt
Score: 10
```
