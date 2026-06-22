---
title: Functions
description: Function declarations, parameters, calls, returns, and scope.
---

# Functions

## Declarations

Declare functions with `new`.

```txt
new name:
    statement

new name(param, param):
    statement
```

No-parameter function definitions omit parentheses.

```slite
new greet:
    say "Hello"

greet()
```

Expected output:

```txt
Hello
```

Parameter names must be unique within the function.

## Calls

Function calls use parentheses. A call must pass exactly the number of arguments
declared by the function.

```slite
new add(left, right):
    return left + right

say toText(add(2, 3))
```

Expected output:

```txt
5
```

Top-level function declarations are collected before top-level statements run,
so calls before definitions are valid.

```slite
say toText(double(5))

new double(value):
    return value * 2
```

Expected output:

```txt
10
```

Only top-level function declarations are pre-scanned. Function declarations are
not run as normal statements, and a duplicate function name reports
`FunctionError` before the rest of the program runs.

## Returns

`return value` exits the function and returns `value`.

```slite
new choose(flag):
    if flag:
        return "yes"
    return "no"

say choose(True)
```

Expected output:

```txt
yes
```

`return` without a value returns `null`. A function that reaches the end without
`return` also returns `null`.

## Scope

Function calls run with a local scope whose parent is the global scope.

- Parameters are local variables.
- Variables assigned inside a function are local.
- Functions can read global variables.
- `return`, `break`, and `continue` keep their usual restrictions.

## Protected Function Names

A function name cannot use a built-in name, error name, existing function name,
or constant name.
