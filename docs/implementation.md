# Implementation Notes

This page describes the TypeScript implementation for contributors and advanced readers.

## Public API

The package exports:

```ts
lex(source: string): Token[]
parse(source: string): Program
runSource(source: string, io?: RuntimeIO): Promise<RunResult>
```

`runSource` is the easiest integration point for tools.

## Source Layout

```txt
src/
  lexer/
  parser/
  runtime/
  cli/
  web/
```

The web app and CLI are wrappers. The interpreter lives in `src/runtime`.

## Lexer

The lexer produces tokens for:

- identifiers and keywords
- numbers and strings
- operators
- brackets and punctuation
- newlines
- indentation and dedentation

It also rejects mixed indentation and nested block comments.

## Parser

The parser builds an AST from tokens. Assignments, calls, indexing, blocks, function definitions, loops, conditionals, and exception handlers are represented as typed nodes.

Parser errors use the same friendly error class as runtime errors.

## Interpreter

The interpreter:

- scans top-level function definitions
- creates a global environment
- protects constants and built-ins
- runs top-level statements in order
- creates local environments for function calls
- uses control-flow signals for `return`, `break`, and `continue`
- routes input/output through `RuntimeIO`

## Values

Runtime values are tagged TypeScript objects:

```txt
number
text
boolean
null
list
tuple
dictionary
function
builtin
```

Lists and dictionaries are mutable. Tuples are immutable.

## Testing Strategy

Tests are split by layer:

- lexer tokenization and indentation
- parser AST shape and syntax rejection
- interpreter behavior
- beginner-facing error cases

The test suite should grow whenever the language surface grows.
