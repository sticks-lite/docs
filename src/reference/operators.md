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

## Assignment Shortcuts

Assignment is a statement, not an expression. The shortcut forms work only on
existing variable names.

```slite
score = 10
score += 2
score -= 1
score *= 3
score /= 2
score %= 5
say toText(score)
```

`+=`, `-=`, `*=`, `/=`, and `%=` use the same type rules as `+`, `-`, `*`,
`/`, and `%`. Indexed targets are not supported with shortcut assignment, so
write `items[0] = items[0] + 1` instead of `items[0] += 1`.

`++` and `--` add or subtract one from an existing number variable.

```slite
count = 0
count++
count++
count--
say toText(count)
```

Expected output:

```txt
1
```

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
