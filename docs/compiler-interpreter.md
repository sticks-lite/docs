# Compiler And Interpreter

The Sticks Lite compiler/interpreter package contains the platform-independent
language core. It can run in Node.js, browser IDEs, tests, and future classroom
tools because the core does not read files, write files, or directly access
operating-system APIs.

## Package

Install the official package:

```sh
npm install -g sticks-lite
```

Use the command:

```sh
sticks main.slite
```

The package also exposes TypeScript APIs for tools that want to embed Sticks
Lite.

```ts
import { lex, parse, runSource } from "sticks-lite";

const tokens = lex('say "Hello"');
const program = parse('say "Hello"');
const result = await runSource('say "Hello"');
```

The public API is covered by dedicated tests. See `Public API` for the complete
export contract.

## Pipeline

Sticks Lite uses a small, visible pipeline:

1. Lex source text into tokens.
2. Parse tokens into an abstract syntax tree.
3. Pre-scan function definitions.
4. Execute top-level statements.
5. Return output, errors, and completion state.

This shape is intentionally teachable. Students can learn the difference
between text, tokens, syntax, and runtime behavior without needing a large
compiler theory background.

## Public APIs

### `lex(source: string): Token[]`

Returns tokens with source positions. The lexer handles comments, strings,
numbers, identifiers, operators, punctuation, indentation, and block boundaries.

### `parse(source: string): Program`

Returns a program AST. Parser errors include line, column, message, and a
teaching hint when possible.

### `runSource(source: string, io?: RuntimeIO): Promise<RunResult>`

Runs a complete program. The optional `io` adapter supplies input and receives
output.

```ts
await runSource(source, {
  readInput(prompt) {
    return window.prompt(prompt) ?? "";
  },
  writeOutput(text) {
    console.log(text);
  },
});
```

## RuntimeIO

```ts
type RuntimeIO = {
  readInput(prompt: string): string | Promise<string>;
  writeOutput(text: string): void;
};
```

The `ask` command uses `readInput`. The `say` command uses `writeOutput`.

## Scope Model

Variables live in the current function scope. Blocks do not create scopes.
Functions do create scopes. Constants created with `DEFINE` are global and
protected.

## Function Pre-Scan

Function definitions are collected before top-level statements execute.

```slite
say toText(double(5))

new double(value):
    return value * 2
```

This works because `double` is known before the first statement runs.

## Error Objects

Errors use `SticksLiteError`.

```ts
type SticksLiteError = {
  name: string;
  message: string;
  line: number;
  column: number;
  hint?: string;
};
```

The goal is not merely to fail. The interpreter should help a student locate
the mistake and understand the next correction to try.
