# Grammar And Runtime Notes

This page is for implementers, advanced students, and teachers who want to understand how Sticks Lite is parsed and executed.

## Pipeline

Sticks Lite follows this pipeline:

```txt
source code
lexer
parser
AST
function pre-scan
interpreter
runtime I/O
```

The language core is platform-independent. Browser prompts, console rendering, and file reading live outside the interpreter.

## Runtime I/O

The interpreter communicates through a small interface.

```ts
interface RuntimeIO {
  readInput(prompt: string): Promise<string> | string;
  writeOutput(text: string): void;
}
```

`ask` calls `readInput`. `say` calls `writeOutput`.

## Statement Grammar

This is an implementation-oriented grammar, not a separate language standard.

```txt
program              = statement* EOF
statement            = assignment
                     | compoundAssignment
                     | incrementStatement
                     | constantDefinition
                     | sayStatement
                     | ifStatement
                     | repeatStatement
                     | loopifStatement
                     | foreachStatement
                     | functionDefinition
                     | returnStatement
                     | breakStatement
                     | continueStatement
                     | attemptStatement
                     | expressionStatement
```

Blocks are indentation-based.

```txt
block = INDENT statement+ DEDENT
```

## Expression Grammar

```txt
expression     = orExpression
orExpression   = andExpression ("or" andExpression)*
andExpression  = equalityExpression ("and" equalityExpression)*
equality       = comparison (("==" | "!=") comparison)*
comparison     = term (("<" | ">" | "<=" | ">=") term)*
term           = factor (("+" | "-") factor)*
factor         = unary (("*" | "/" | "%" | "div") unary)*
unary          = ("not" | "-") unary | call
call           = primary ("(" arguments? ")" | "[" expression "]")*
primary        = NUMBER | STRING | True | False | null | IDENTIFIER
               | askExpression | list | tuple | dictionary | grouped
```

## Function Pre-scan

Before top-level execution, the interpreter collects function definitions and checks protected names. This allows call-before-definition.

```slite
say toText(square(4))

new square(x):
    return x * x
```

Only top-level function definitions are collected for v1.0.11.

## Protected Names

These cannot be assigned to:

- Built-in function names.
- Built-in error names.
- Existing function names.
- Existing constant names.

Protected names help beginner programs fail loudly instead of silently changing core behavior.

## Error Format

Friendly errors use this shape:

```txt
ErrorName at line X, column Y: Explanation.
Hint: Suggested fix.
```

Hints are included when a likely beginner fix is clear.
