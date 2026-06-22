---
title: Functions
description: Define reusable code with new, parameters, nested calls, and return.
---

# Functions

<div class="lesson-goal">
  <strong>Goal:</strong> Define a function, call it, pass values in, and return a value.
</div>

Functions name a small piece of reusable code. Define a function with `new`.

```slite
new greet(name):
    say "Hello " + name

greet("Maya")
```

Expected output:

```txt
Hello Maya
```

## Return a Value

Use `return` when a function should give a value back to the caller.

```slite
new double(value):
    return value * 2

say toText(double(5))
```

Expected output:

```txt
10
```

## Nested Calls

Function calls can be used inside other function calls.

```slite
new double(value):
    return value * 2

new add(left, right):
    return left + right

say toText(add(double(2), double(3)))
```

Expected output:

```txt
10
```

## Calling Before the Definition

Top-level function definitions are collected before the program runs, so this is
valid:

```slite
say toText(double(6))

new double(value):
    return value * 2
```

Expected output:

```txt
12
```

## Scope

Variables created inside a function are local to that function. Variables
created in `if` and loop blocks stay available after the block.

```slite
if True:
    message = "block value"

new makeLocal:
    localMessage = "function value"
    return localMessage

say message
say makeLocal()
```

Expected output:

```txt
block value
function value
```

## Common Mistakes

| Mistake | What happens |
| --- | --- |
| Calling with the wrong number of arguments | Sticks Lite reports `ArgumentError`. |
| Reusing a parameter name in the same function | Sticks Lite reports `FunctionError`. |
| Defining a function named `toText` or `NameError` | Built-in and error names are protected. |
| Using `return` outside a function | Sticks Lite reports `RuntimeError`. |

## Read More

See [Functions](/reference/functions) and [Public TypeScript API](/reference/typescript-api).
