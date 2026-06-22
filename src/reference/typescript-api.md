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

## lex(source)

`lex` converts Sticks Lite source text into tokens. Use it for editor tooling,
syntax highlighting, diagnostics experiments, and tests that need line and
column information before parsing.

```ts
import { lex } from "sticks-lite";

const tokens = lex('score = 10\nsay toText(score)\n');

for (const token of tokens) {
  console.log(token.type, token.lexeme, token.line, token.column);
}
```

`lex` returns `Token[]`.

```ts
export interface Token {
  type: TokenType;
  lexeme: string;
  literal?: number | string;
  line: number;
  column: number;
}
```

The token stream includes indentation tokens, newline tokens, and a final `eof`
token. Comments are removed before tokenization, while line and column positions
stay tied to the original source as much as possible.

`lex` throws `SticksLiteError` for lexer-level problems such as unfinished
strings, unclosed block comments, nested block comments, unexpected characters,
or indentation problems.

```ts
import { lex, isSticksLiteError } from "sticks-lite";

try {
  lex('say "unfinished\n');
} catch (error) {
  if (isSticksLiteError(error)) {
    console.log(error.format());
  }
}
```

## parse(source)

`parse` lexes source text and returns a `Program` AST. Use it when you need to
inspect program structure without running the program.

```ts
import { parse } from "sticks-lite";

const program = parse(`
new double(value):
    return value * 2

say toText(double(4))
`);

console.log(program.kind);
console.log(program.body.map((statement) => statement.kind));
```

`parse` returns:

```ts
export interface Program {
  kind: "Program";
  body: Statement[];
}
```

Each statement and expression includes its `kind`. Source-backed nodes include
`line` and `column`. The AST is useful for classroom tooling, tests, linters,
and visualizers, but it is not required for running code.

`parse` throws `SticksLiteError` for syntax problems such as missing colons,
invalid `orif` or `otherwise` placement, bad function declarations, trailing
commas, or incomplete expressions.

## parseTokens(tokens)

`parseTokens` accepts an existing token array and returns a `Program`. Most
tools should use `parse(source)`. Use `parseTokens` when a tool already called
`lex(source)` and wants to avoid lexing again.

```ts
import { lex, parseTokens } from "sticks-lite";

const tokens = lex('say "Hello"\n');
const program = parseTokens(tokens);

console.log(program.kind);
```

## runSource(source, io)

`runSource` is the high-level execution API. It parses and interprets source
text, collects output, and returns a `RunResult`.

```ts
import { runSource } from "sticks-lite";

const result = await runSource('say "Hello"\n');

if (result.ok) {
  console.log(result.output);
} else {
  console.error(result.error);
}
```

`runSource` catches Sticks Lite lexer, parser, and runtime errors and returns
them as a failed `RunResult`. Unexpected JavaScript errors are rethrown.

When no `RuntimeIO` is provided, `ask` returns an empty string and `say` output
is still collected in `RunResult.output`.

## RuntimeIO

```ts
export interface RuntimeIO {
  readInput(prompt: string): Promise<string> | string;
  writeOutput(text: string): void;
}
```

`readInput` receives the raw prompt from `ask`. `writeOutput` receives output
from `say` without a trailing newline.

`readInput` may be synchronous or asynchronous. This keeps the interpreter
usable in browsers, servers, tests, and command-line wrappers.

```ts
import { runSource, type RuntimeIO } from "sticks-lite";

const answers = ["Maya", "12"];

const io: RuntimeIO = {
  readInput(prompt) {
    console.log(`Prompt: ${prompt}`);
    return answers.shift() ?? "";
  },
  writeOutput(text) {
    console.log(`Program output: ${text}`);
  }
};

await runSource('name = ask "Name?"\nage = ask "Age?"\nsay name + " is " + age\n', io);
```

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

`output` is populated even when `writeOutput` is provided. This is useful for
tests and browser IDEs that want both streaming output and a final result.

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

## SticksLiteError

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

Supported error names are:

```ts
type SticksLiteErrorName =
  | "SyntaxError"
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
  | "RuntimeError";
```

Use `isSticksLiteError(error)` before reading Sticks Lite-specific fields from a
caught value.

```ts
import { parse, isSticksLiteError } from "sticks-lite";

try {
  parse("if True\n    say \"missing colon\"\n");
} catch (error) {
  if (isSticksLiteError(error)) {
    console.log(error.name);
    console.log(error.line, error.column);
    console.log(error.hint);
  }
}
```

## Embedding Example

This example shows a small host function that runs source, supplies queued
input, and returns a display-ready result.

```ts
import { runSource, type RuntimeIO, type RunResult } from "sticks-lite";

export async function runLessonProgram(
  source: string,
  input: string[] = []
): Promise<RunResult & { transcript: string[] }> {
  const transcript: string[] = [];
  const answers = [...input];

  const io: RuntimeIO = {
    readInput(prompt) {
      transcript.push(`? ${prompt}`);
      return answers.shift() ?? "";
    },
    writeOutput(text) {
      transcript.push(text);
    }
  };

  const result = await runSource(source, io);
  return { ...result, transcript };
}
```

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
