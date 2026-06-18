# Public API

The `sticks-lite` package exposes a small TypeScript API for tools that need to
embed the lexer, parser, or interpreter. These exports are covered by tests in
the interpreter repository.

```ts
import {
  SticksLiteError,
  isSticksLiteError,
  lex,
  parse,
  runSource,
  type RunResult,
  type RuntimeIO,
} from "sticks-lite";
```

## `lex(source)`

`lex(source: string): Token[]` converts source file text into tokens.

The lexer handles comments, strings, numbers, identifiers, keywords, operators,
punctuation, indentation, dedentation, and block boundaries.

Tokens include:

- `type`
- `lexeme`
- `line`
- `column`
- optional `literal`

```ts
const tokens = lex('say "Hello"');
```

## `parse(source)`

`parse(source: string): Program` returns the program AST.

Parser failures throw `SticksLiteError`. Common parser hints include missing
colons, misplaced `orif`, misplaced `otherwise`, invalid parameter lists, and
unsupported trailing commas.

```ts
const program = parse("if True:\n    say \"yes\"\n");
```

## `runSource(source, io?)`

`runSource(source: string, io?: RuntimeIO): Promise<RunResult>` lexes, parses,
and runs a complete program.

```ts
const output: string[] = [];

const result = await runSource("name = ask \"Name?\"\nsay name\n", {
  readInput(prompt) {
    return "Maya";
  },
  writeOutput(text) {
    output.push(text);
  },
});
```

`runSource` does not throw `SticksLiteError` for normal language failures.
Instead, it returns a failed `RunResult` with formatted error text.

## `RuntimeIO`

`RuntimeIO` is the boundary between the platform-independent interpreter and
the host tool.

```ts
type RuntimeIO = {
  readInput(prompt: string): string | Promise<string>;
  writeOutput(text: string): void;
};
```

The `ask` expression calls `readInput`. The `say` statement calls
`writeOutput`.

`RuntimeIO` receives the prompt text exactly as the Sticks Lite program wrote
it. Prompt spacing for terminal use is handled by the CLI wrapper, not the
interpreter.

`writeOutput` is called in execution order. `RunResult.output` records the same
sequence of `say` values without adding newline characters.

## `RunResult`

Successful runs return:

```ts
{
  ok: true,
  output: string[]
}
```

Failed runs return:

```ts
{
  ok: false,
  output: string[],
  error: string
}
```

Output produced before an error remains in `output`.

## `SticksLiteError`

`SticksLiteError` is used by the lexer, parser, and interpreter for friendly
language errors.

```ts
const error = new SticksLiteError(
  "SyntaxError",
  "Missing colon.",
  2,
  8,
  "Did you forget a colon after this block?"
);
```

Fields:

- `name`
- `message`
- `line`
- `column`
- optional `hint`

Use `error.format()` to produce the classroom-friendly display string.

Use `isSticksLiteError(error)` to narrow unknown caught errors.
