---
title: Language Reference
description: Formal reference for Sticks Lite syntax, values, runtime behavior, CLI, and API.
---

# Language Reference

This section is the compact reference for Sticks Lite. Use it when you need the
exact rule for valid syntax or runtime behavior.

## Reference Map

| Topic | Use it to answer |
| --- | --- |
| [Syntax](/reference/syntax) | What does a valid statement or block look like? |
| [Grammar](/reference/grammar) | What is the compact source grammar for statements, expressions, blocks, functions, comments, and error handlers? |
| [Values and Types](/reference/values-types) | What values exist and how are they displayed? |
| [Variables and DEFINE](/reference/variables-define) | How do assignment, constants, and protected names work? |
| [Operators](/reference/operators) | Which operators exist and what types do they accept? |
| [Conditionals](/reference/conditionals) | How do `if`, `orif`, and `otherwise` chain? |
| [Loops](/reference/loops) | How do `repeat`, `loopif`, `foreach`, `break`, and `continue` behave? |
| [Functions](/reference/functions) | How are functions declared, called, scoped, and returned from? |
| [Collections](/reference/collections) | How do lists, tuples, dictionaries, and indexing behave? |
| [Errors](/reference/errors) | What friendly errors exist and how can `attempt` catch them? |
| [Built-ins](/reference/built-ins) | Which built-in functions are available? |
| [CLI Reference](/reference/cli) | What does the `sticks` command accept? |
| [TypeScript API](/reference/typescript-api) | What does the package export for tooling and embedding? |

## Core Model

Sticks Lite reads source text, lexes it into positioned tokens, parses an AST,
pre-scans top-level function declarations, then interprets statements through a
small runtime I/O interface.

The user-facing behavior is intentionally smaller than the implementation:

- Source files use the `.slite` extension.
- Directory projects run from an exactly named `main.slite`.
- Blocks are indentation-based and opened by `:`.
- Conditions must evaluate to `True` or `False`.
- Friendly errors include line, column, and usually a hint.
