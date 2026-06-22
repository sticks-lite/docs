---
title: Runtime I/O
description: Connect ask and say to custom input and output.
---

# Runtime I/O

The interpreter is platform-independent. It communicates through `RuntimeIO`.

```ts
export interface RuntimeIO {
  readInput(prompt: string): Promise<string> | string;
  writeOutput(text: string): void;
}
```

## Output

`say` calls `writeOutput(text)` with display text and no trailing newline.

```slite
say "one"
say "two"
```

With `runSource`, the returned `RunResult.output` is:

```txt
one
two
```

## Input

`ask` evaluates its prompt, requires text, and calls `readInput(prompt)`.

```slite
answer = ask "Value?"
say "Got " + answer
```

`readInput` can return a string or a promise for a string. If no `RuntimeIO` is
provided, `runSource` uses an empty string for input and still collects output.

## CLI Difference

The CLI adds a display space after nonempty prompts that do not already end in
whitespace. Programmatic `RuntimeIO` receives the exact prompt value from the
program.

The CLI reads one line for each `ask`. In tests or redirected input, provide one
line per prompt in the same order the program reaches them.

## Output Before Errors

If a Sticks Lite error happens after output, `runSource` returns the output that
already happened.

```ts
const result = await runSource('say "before"\nsay missing\n');

console.log(result.ok);
console.log(result.output);
console.log(result.error);
```
