---
title: Browser Embedding
description: Run Sticks Lite in browser-like environments with RuntimeIO.
---

# Browser Embedding

Sticks Lite's language core is designed to run in browser-like environments.
The lexer, parser, interpreter, values, built-ins, and friendly errors do not
read files, open network connections, or use terminal APIs.

Node-specific behavior lives in the CLI wrapper. Browser apps should import the
public API from `sticks-lite` and provide `RuntimeIO`.

## What Is Browser-Safe

These public APIs are suitable for browser bundlers:

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

Do not import CLI modules from `dist/cli`. The CLI uses Node file-system,
path, process, stream, and readline APIs.

## Minimal Browser Example

This example runs source text, supplies queued answers for `ask`, and collects
output for display in a web page.

```ts
import { runSource, type RuntimeIO } from "sticks-lite";

export async function runInBrowser(source: string, answers: string[] = []) {
  const output: string[] = [];
  const pendingAnswers = [...answers];

  const io: RuntimeIO = {
    async readInput(prompt) {
      output.push(`? ${prompt}`);
      return pendingAnswers.shift() ?? "";
    },
    writeOutput(text) {
      output.push(text);
    }
  };

  const result = await runSource(source, io);

  if (!result.ok && result.error) {
    output.push(result.error);
  }

  return output;
}
```

Use it with a source string:

```ts
const lines = await runInBrowser(
  'name = ask "Name?"\nsay "Hello " + name\n',
  ["Maya"]
);

console.log(lines);
```

Expected output:

```txt
? Name?
Hello Maya
```

## Prompt Handling

`readInput(prompt)` receives the prompt exactly as the Sticks Lite program wrote
it. Browser UIs can show a modal, an input row, or a custom prompt component.

```ts
const io: RuntimeIO = {
  async readInput(prompt) {
    return window.prompt(prompt) ?? "";
  },
  writeOutput(text) {
    console.log(text);
  }
};
```

The CLI adds a display space after prompts when needed. Browser integrations do
not need to copy that behavior unless it fits their UI.

## Output Handling

`writeOutput(text)` receives each `say` value without a trailing newline.
`runSource` also returns the collected output in `RunResult.output`, even when
`writeOutput` is provided.

```ts
const result = await runSource('say "one"\nsay "two"\n', {
  readInput() {
    return "";
  },
  writeOutput(text) {
    appendConsoleLine(text);
  }
});

console.log(result.output);
```

## Error Handling

`runSource` catches Sticks Lite errors and returns a failed `RunResult`.
Display `result.error` in the same console or error panel as program output.

```ts
const result = await runSource('say missing\n');

if (!result.ok) {
  showError(result.error ?? "Unknown error");
}
```

`lex` and `parse` throw `SticksLiteError` directly. Use
`isSticksLiteError(error)` when building editor diagnostics.

```ts
import { parse, isSticksLiteError } from "sticks-lite";

try {
  parse("if True\n    say \"Missing colon\"\n");
} catch (error) {
  if (isSticksLiteError(error)) {
    showDiagnostic(error.line, error.column, error.message, error.hint);
  }
}
```

## Boundary

Sticks Lite is not a security sandbox. Browser hosts should still decide which
programs are appropriate to run, limit classroom workflows as needed, and avoid
executing untrusted source outside supervised learning contexts.
