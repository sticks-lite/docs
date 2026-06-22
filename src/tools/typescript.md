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

The returned `RunResult` always includes the collected output. When `ok` is
`false`, `error` contains formatted Sticks Lite error text.

```ts
const result = await runSource('say "before"\nsay missingName\n');

console.log(result.ok);     // false
console.log(result.output); // ["before"]
console.log(result.error);  // NameError at line ...
```

## Embed in a Browser IDE

Browser editors usually keep source, output, and pending input in application
state. The interpreter does not touch the DOM; the host app decides how prompts
and output are displayed.

The public language core avoids Node-specific APIs. Browser code should import
from `sticks-lite` and provide `RuntimeIO`; do not import the CLI files under
`dist/cli`.

```ts
import { runSource, type RuntimeIO } from "sticks-lite";

export async function runInBrowserEditor(source: string, answers: string[]) {
  const consoleLines: string[] = [];
  const queuedAnswers = [...answers];

  const io: RuntimeIO = {
    async readInput(prompt) {
      consoleLines.push(`? ${prompt}`);
      return queuedAnswers.shift() ?? "";
    },
    writeOutput(text) {
      consoleLines.push(text);
    }
  };

  const result = await runSource(source, io);

  if (!result.ok && result.error) {
    consoleLines.push(result.error);
  }

  return consoleLines;
}
```

## Embed in a Test

Tests can provide deterministic answers for `ask` and assert on the final
`RunResult`.

```ts
import { expect, test } from "vitest";
import { runSource } from "sticks-lite";

test("student greeting program", async () => {
  const result = await runSource('name = ask "Name?"\nsay "Hello " + name\n', {
    readInput() {
      return "Maya";
    },
    writeOutput() {
      // The final RunResult still collects output.
    }
  });

  expect(result.ok).toBe(true);
  expect(result.output).toEqual(["Hello Maya"]);
});
```

## Lex and Parse

Use `lex` or `parse` when you are building editor tooling or tests.

```ts
import { lex, parse } from "sticks-lite";

const tokens = lex('say "Hello"\n');
const program = parse('say "Hello"\n');

console.log(tokens.at(-1)?.type);
console.log(program.kind);
```

`lex` is useful for token-aware editor features. It reports line and column
positions, includes indentation tokens, and ends with an `eof` token.

```ts
import { lex } from "sticks-lite";

const identifiers = lex('score = 10\nsay toText(score)\n')
  .filter((token) => token.type === "identifier")
  .map((token) => token.lexeme);

console.log(identifiers);
```

`parse` is useful when the host needs the program structure.

```ts
import { parse } from "sticks-lite";

const program = parse(`
repeat 3 times:
    say "Again"
`);

const firstStatement = program.body[0];
console.log(firstStatement.kind);
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

`lex` and `parse` throw `SticksLiteError` directly because they do not return a
`RunResult`.

```ts
import { parse, isSticksLiteError } from "sticks-lite";

try {
  parse("otherwise:\n    say \"No if\"\n");
} catch (error) {
  if (isSticksLiteError(error)) {
    console.log(error.name);
    console.log(error.format());
  }
}
```

See [Public TypeScript API](/reference/typescript-api) for exact exports.
