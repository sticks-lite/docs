---
title: Using Sticks Lite from TypeScript
description: Embed the Sticks Lite interpreter and parser from TypeScript.
---

# Using Sticks Lite from TypeScript

Install the package in the project that embeds Sticks Lite:

```sh
npm install sticks-lite
```

## Run Source

`runSource` is the main API for classroom tools, browser IDEs, and tests.

```ts
import { runSource, type RuntimeIO } from "sticks-lite";

const output: string[] = [];

const io: RuntimeIO = {
  readInput(prompt) {
    return prompt === "Name?" ? "Maya" : "";
  },
  writeOutput(text) {
    output.push(text);
  }
};

const result = await runSource('name = ask "Name?"\nsay "Hello " + name\n', io);

if (!result.ok) {
  console.error(result.error);
}
```

`runSource` returns output even when you also provide `writeOutput`.

## Lex and Parse

Use `lex` or `parse` when you are building editor tooling or tests.

```ts
import { lex, parse } from "sticks-lite";

const tokens = lex('say "Hello"\n');
const program = parse('say "Hello"\n');

console.log(tokens.at(-1)?.type);
console.log(program.kind);
```

## Handle Errors

`runSource` catches Sticks Lite errors and returns a failed `RunResult`.
Unexpected JavaScript errors are rethrown.

```ts
import { SticksLiteError, isSticksLiteError } from "sticks-lite";

try {
  throw new SticksLiteError("SyntaxError", "Missing colon.", 2, 8);
} catch (error) {
  if (isSticksLiteError(error)) {
    console.log(error.format());
  }
}
```

See [Public TypeScript API](/reference/typescript-api) for exact exports.
