---
title: Handling Errors
description: Use attempt and when to recover from expected beginner errors.
---

# Handling Errors with attempt and when

<div class="lesson-goal">
  <strong>Goal:</strong> Catch an expected Sticks Lite error and keep the program running.
</div>

Most beginner programs can let Sticks Lite show the friendly error and stop.
Use `attempt` and `when` when a lesson expects a possible error, such as text
that cannot be converted to a number.

```slite
attempt:
    value = toNumber("abc")
    say toText(value)
when ValueError:
    say "Please enter a number."
when error:
    say "Something else happened."
```

Expected output:

```txt
Please enter a number.
```

## Catch a Specific Error First

Put specific handlers before `when error:`.

```slite
attempt:
    divisor = 0
    say toText(10 / divisor)
when MathError:
    say "Cannot divide by zero."
when error:
    say "Could not finish."
```

Expected output:

```txt
Cannot divide by zero.
```

## What when error Does

`when error:` catches any Sticks Lite error that did not match an earlier
handler. It should be the final handler.

## Common Mistakes

| Mistake | What to do |
| --- | --- |
| Writing `when` without `attempt` | Start with `attempt:` and put `when` directly after its block. |
| Writing `attempt:` without a handler | Add at least one `when` block. |
| Putting a specific handler after `when error:` | Put `when error:` last. |
| Using a made-up error name | Use a Sticks Lite error name such as `ValueError` or `TypeError`. |

## Read More

See [Errors](/reference/errors) and [Built-ins](/reference/built-ins).
