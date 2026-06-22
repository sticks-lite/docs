---
title: Public TypeScript API
description: Public exports from the sticks-lite package.
---

# Public TypeScript API

Import public APIs from `sticks-lite`.

```ts
import {
  lex,
  parse,
  runSource,
  SticksLiteError,
  isSticksLiteError,
  type RuntimeIO,
  type RunResult
} from "sticks-lite";
```

## Main Functions

| Export | Signature | Purpose |
| --- | --- | --- |
| `lex` | `lex(source: string): Token[]` | Convert source text into positioned tokens. |
| `parse` | `parse(source: string): Program` | Lex and parse source into a program AST. |
| `parseTokens` | `parseTokens(tokens: Token[]): Program` | Parse existing tokens into a program AST. |
| `runSource` | `runSource(source: string, io?: RuntimeIO): Promise<RunResult>` | Parse and run source text. |

## RuntimeIO

```ts
export interface RuntimeIO {
  readInput(prompt: string): Promise<string> | string;
  writeOutput(text: string): void;
}
```

`readInput` receives the raw prompt from `ask`. `writeOutput` receives output
from `say` without a trailing newline.

## RunResult

```ts
export interface RunResult {
  ok: boolean;
  output: string[];
  error?: string;
}
```

On success, `ok` is `true` and `output` contains the values written by `say`.
On a Sticks Lite error, `ok` is `false`, `output` contains output written before
the error, and `error` contains formatted error text.

```ts
import { runSource, type RuntimeIO } from "sticks-lite";

const events: string[] = [];

const io: RuntimeIO = {
  readInput(prompt) {
    events.push(`prompt:${prompt}`);
    return "Maya";
  },
  writeOutput(text) {
    events.push(`output:${text}`);
  }
};

const result = await runSource('name = ask "Name?"\nsay "Hello " + name\n', io);

if (result.ok) {
  console.log(result.output);
}
```

## Errors

```ts
const error = new SticksLiteError(
  "SyntaxError",
  "Missing colon.",
  2,
  8,
  "Did you forget a colon after this block?"
);

console.log(error.format());
console.log(isSticksLiteError(error));
```

`SticksLiteError` extends `Error` and exposes:

| Property | Type |
| --- | --- |
| `name` | `SticksLiteErrorName` |
| `line` | `number` |
| `column` | `number` |
| `hint` | `string | undefined` |
| `format()` | `string` |

## Exported Types and Classes

The package also exports:

| Export | Kind |
| --- | --- |
| `Token`, `TokenType` | lexer types |
| `Program`, `Statement`, `Expression` | AST types |
| `Interpreter` | runtime class used by `runSource` |
| `SticksLiteErrorName` | union of supported error names |
| `SticksValue` | runtime value union |

These exports are public, but most classroom tools only need `runSource`,
`RuntimeIO`, and `RunResult`.
