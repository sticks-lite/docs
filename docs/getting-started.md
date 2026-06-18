# Getting Started

Sticks Lite is a small text-based programming language for teaching basic computer-science concepts in monitored educational environments. It uses `.slite` files, clear command-style syntax, and Python-inspired indentation.

The default entry file is `main.slite`. A program runs from top to bottom, and no `main` function is required.

```slite
say "Hello, world!"
```

## Files

Use the `.slite` extension for Sticks Lite programs.

```txt
main.slite
hello.slite
loops.slite
```

When a folder is run by the CLI, Sticks Lite looks for an exact lowercase
`main.slite` in that folder.

## Output

Use `say` to print one value.

```slite
say "Hello"
say toText(42)
```

`say` does not use parentheses.

## Input

Use `ask` inside an expression. It returns text.

```slite
name = ask "What is your name?"
say "Hello " + name
```

`ask` prompts must be text. Convert input with `toNumber` when you need a number.

```slite
ageText = ask "Age?"
age = toNumber(ageText)
say "Next year: " + toText(age + 1)
```

## Variables

Create variables with assignment.

```slite
score = 0
score += 10
score++
say toText(score)
```

Sticks Lite does not convert values automatically. Use `toText` when combining text and numbers.

## A First Program

```slite
name = ask "Name?"
score = 0
score += 10

if score >= 10:
    say "Nice work, " + name
otherwise:
    say "Keep practicing"
```

More examples are in the `examples/` directory and in the browser IDE at the project root.
