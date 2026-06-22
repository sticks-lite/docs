---
title: Grammar
description: Compact grammar specification for Sticks Lite source files, statements, expressions, blocks, functions, comments, and error handlers.
---

# Grammar

This page defines the Sticks Lite source grammar in a compact form. It is for
tool authors, documentation reviewers, and students who want the exact shape of
valid programs.

The notation is descriptive rather than a parser generator file:

- `*` means zero or more.
- `+` means one or more.
- `?` means optional.
- quoted text such as `"if"` means a literal keyword or symbol.
- names like `expression` refer to another grammar rule.

## Source File

```txt
program          ::= blank-line* top-level-statement*
top-level-stmt   ::= statement
blank-line       ::= newline
```

A source file is a sequence of statements separated by newlines. The CLI runs a
single `.slite` source file or a directory containing an entry file named
exactly `main.slite`.

Only one statement is allowed per physical line.

## Comments

```txt
line-comment     ::= "#" text-until-newline
block-comment    ::= "/*" text-until-close "*/"
```

Line comments begin with `#` and continue to the end of the line. Block
comments begin with `/*` and end with `*/`.

Comments are ignored before tokenization. Comment markers inside quoted text are
treated as text. Nested block comments are not supported.

## Statements

```txt
statement        ::= assignment
                   | compound-assignment
                   | increment
                   | constant
                   | say
                   | if-chain
                   | repeat
                   | loopif
                   | foreach
                   | function
                   | return
                   | break
                   | continue
                   | attempt
                   | expression-statement
```

### Simple Statements

```txt
assignment       ::= assign-target "=" expression
assign-target    ::= identifier | index-expression

compound-assign  ::= identifier ("+=" | "-=" | "*=" | "/=" | "%=") expression
increment        ::= identifier ("++" | "--")

constant         ::= "DEFINE" identifier "=" expression
say              ::= "say" expression
return           ::= "return" expression?
break            ::= "break"
continue         ::= "continue"
expr-statement   ::= expression
```

`DEFINE` is allowed only at the top level. `return` is allowed only inside a
function. `break` and `continue` are allowed only inside `repeat`, `loopif`, or
`foreach`.

`say` and `ask` do not use parentheses.

## Block Rules

```txt
block-opener     ::= statement-ending-with-colon
block            ::= ":" newline indent statement+ dedent
```

Blocks are indentation-based. A block opener ends with `:`, then the block body
starts on the next line and must be indented.

```txt
if True:
    say "Inside"

say "Outside"
```

The same source file must not mix tabs and spaces for indentation. Four spaces
per block is recommended. Empty blocks are not allowed.

## Conditionals

```txt
if-chain         ::= if-branch orif-branch* otherwise-branch?
if-branch        ::= "if" expression block
orif-branch      ::= "orif" expression block
otherwise-branch ::= "otherwise" block
```

`orif` and `otherwise` must directly follow the previous branch in the same
chain. `otherwise` must be the final branch.

Conditions must evaluate to `True` or `False`. Raw numbers, text, lists,
tuples, dictionaries, functions, built-ins, and `null` are not accepted as
conditions.

## Loops

```txt
repeat           ::= "repeat" expression "times" block
loopif           ::= "loopif" expression block
foreach          ::= "foreach" identifier "in" expression block
```

`repeat` requires a non-negative whole number. `loopif` requires a boolean
condition. `foreach` iterates over lists and tuples only; dictionary iteration
is unsupported in this release.

## Function Rules

```txt
function         ::= "new" identifier parameter-list? block
parameter-list   ::= "(" identifier ("," identifier)* ")"
call             ::= expression "(" arguments? ")"
arguments        ::= expression ("," expression)*
```

No-parameter function declarations omit parentheses:

```txt
new greet:
    say "Hello"
```

Parameterized functions use parentheses:

```txt
new add(left, right):
    return left + right
```

Top-level function declarations are collected before top-level statements run,
so a function can be called before its declaration appears in the file.

Function names and parameter names must be valid identifiers. Parameter names
must be unique within the function. Function names cannot overwrite built-ins,
error names, constants, or existing functions.

A function call must pass exactly the number of arguments declared by the
function. A function that reaches the end without `return` returns `null`.

## Error Handling

```txt
attempt          ::= "attempt" block when-handler+
when-handler     ::= "when" error-selector block
error-selector   ::= error-name | "error"
error-name       ::= "SyntaxError"
                   | "IndentationError"
                   | "NameError"
                   | "TypeError"
                   | "ValueError"
                   | "MathError"
                   | "ConstantError"
                   | "IndexError"
                   | "KeyError"
                   | "FunctionError"
                   | "ArgumentError"
                   | "RuntimeError"
```

`attempt` must have at least one `when` handler. Each `when` handler must
directly follow the `attempt` block or the previous `when` block.

Specific error handlers must appear before `when error:`. Only one
`when error:` catch-all handler is allowed.

## Expressions

```txt
expression       ::= or
or               ::= and ("or" and)*
and              ::= equality ("and" equality)*
equality         ::= comparison (("==" | "!=") comparison)*
comparison       ::= term (("<" | "<=" | ">" | ">=") term)*
term             ::= factor (("+" | "-") factor)*
factor           ::= unary (("*" | "/" | "%" | "div") unary)*
unary            ::= ("not" | "-") unary | call
call             ::= primary (call-suffix | index-suffix)*
call-suffix      ::= "(" arguments? ")"
index-suffix     ::= "[" expression "]"
primary          ::= literal
                   | identifier
                   | ask-expression
                   | list
                   | tuple-or-group
                   | dictionary
```

## Expression Precedence

From highest to lowest:

| Level | Operators or forms |
| --- | --- |
| calls and indexing | `name(...)`, `value[index]` |
| unary | `not`, unary `-` |
| multiplication | `*`, `/`, `%`, `div` |
| addition | `+`, `-` |
| comparison | `<`, `<=`, `>`, `>=` |
| equality | `==`, `!=` |
| boolean and | `and` |
| boolean or | `or` |

Assignment forms are statements, not expressions.

## Primary Expressions

```txt
literal          ::= number | string | "True" | "False" | "null"
ask-expression   ::= "ask" expression
list             ::= "[" arguments? "]"
tuple-or-group   ::= "(" expression ")" | "(" expression "," expression ("," expression)* ")"
dictionary       ::= "{" dictionary-entries? "}"
dictionary-entry ::= string ":" expression
dictionary-entries ::= dictionary-entry ("," dictionary-entry)*
```

Text may use single or double quotes. Supported escapes include `\n`, `\t`, and
escaped characters such as `\"`.

Empty lists and dictionaries are supported. Empty tuples and one-item tuples are
not supported. Use `[]` for an empty collection and `[value]` for a one-item
collection.

Dictionary literal keys must be quoted text. Trailing commas are not supported
in argument lists, list literals, tuple literals, or dictionary literals.

## Names

```txt
identifier       ::= letter-or-underscore (letter | digit | underscore)*
```

Names are case-sensitive. Keywords cannot be used as variable names. Built-in
names, error names, constants, and function names are protected from accidental
overwrite.

