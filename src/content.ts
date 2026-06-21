export type SectionId = "learn" | "reference" | "tools" | "classroom";

export interface DocPage {
  id: string;
  section: SectionId;
  title: string;
  label?: string;
  description: string;
  body: string;
}

export interface DocSection {
  id: SectionId;
  title: string;
  description: string;
}

export const sections: DocSection[] = [
  {
    id: "learn",
    title: "Learn",
    description: "A guided path for first programs, values, decisions, loops, functions, collections, and recoverable errors."
  },
  {
    id: "reference",
    title: "Reference",
    description: "Precise language, CLI, built-in, and TypeScript API behavior."
  },
  {
    id: "tools",
    title: "Tools",
    description: "Installation, file running, package usage, runtime I/O, and versioning."
  },
  {
    id: "classroom",
    title: "Classroom",
    description: "Practical notes for supervised teaching environments."
  }
];

export const pages: DocPage[] = [
  {
    id: "learn",
    section: "learn",
    title: "Learn Sticks Lite",
    label: "Overview",
    description: "The recommended beginner path through the language.",
    body: String.raw`
# Learn Sticks Lite

Sticks Lite is a small programming language for monitored classrooms. Students write \`.slite\` files and run them with the \`sticks\` command.

This section teaches one idea at a time. Use the reference when you need the exact rule.

## Path

| Step | Page | What it introduces |
| --- | --- | --- |
| 1 | Your First Program | Files, \`say\`, and running code |
| 2 | Variables and Values | Names, text, numbers, booleans, \`null\`, and \`DEFINE\` |
| 3 | Decisions | \`if\`, \`orif\`, \`otherwise\`, and boolean conditions |
| 4 | Loops | \`repeat\`, \`loopif\`, \`foreach\`, \`break\`, and \`continue\` |
| 5 | Functions | \`new\`, parameters, nested calls, and \`return\` |
| 6 | Collections | Lists, tuples, dictionaries, indexing, and updates |
| 7 | Errors | \`attempt\` and \`when\` |
| 8 | Practice | Small classroom programs |

## A complete first example

\`\`\`slite
DEFINE PASSING_SCORE = 70

score = 84

if score >= PASSING_SCORE:
    say "Passing"
otherwise:
    say "Keep practicing"
\`\`\`

Expected output:

\`\`\`text
Passing
\`\`\`

## Where to go next

Start with [Your First Program](#learn-first-program), then keep the reference open for exact syntax.
`
  },
  {
    id: "learn-first-program",
    section: "learn",
    title: "Your First Program",
    description: "Create a .slite file, print output, and run it.",
    body: String.raw`
# Your First Program

Sticks Lite source files use the \`.slite\` extension. A folder project uses an entry file named exactly \`main.slite\`.

## Write the file

Create \`main.slite\`:

\`\`\`slite
say "Hello, Sticks Lite"
say "This program is running."
\`\`\`

Expected output:

\`\`\`text
Hello, Sticks Lite
This program is running.
\`\`\`

## Run it

\`\`\`sh
sticks main.slite
\`\`\`

You can also run a folder that contains \`main.slite\`:

\`\`\`sh
sticks .
\`\`\`

## Beginner mistakes

| Mistake | What to do |
| --- | --- |
| \`main.txt\` | Rename the file to \`main.slite\`. |
| \`Main.slite\` in a folder project | Rename it exactly to \`main.slite\`. |
| Running from the wrong folder | Use \`sticks path/to/main.slite\` or move into the project folder first. |

## Read more

See [Running .slite Files](#tools-running-files) and the [CLI Reference](#reference-cli).
`
  },
  {
    id: "learn-variables-values",
    section: "learn",
    title: "Variables and Values",
    description: "Store text, numbers, booleans, null, and constants.",
    body: String.raw`
# Variables and Values

Variables give names to values. Assign with \`=\`.

\`\`\`slite
name = "Maya"
score = 91
ready = True
missing = null

say name
say "Score: " + toText(score)
say toText(ready)
say toText(missing)
\`\`\`

Expected output:

\`\`\`text
Maya
Score: 91
True
null
\`\`\`

## Constants with DEFINE

\`DEFINE\` creates a top-level constant. Constants are useful for lesson settings or values that should not change.

\`\`\`slite
DEFINE MAX_SCORE = 100

score = 87
say "Out of " + toText(MAX_SCORE)
say toText(score)
\`\`\`

\`DEFINE\` belongs at the top level. It cannot be placed inside an \`if\`, loop, function, or \`attempt\` block.

## Beginner mistakes

| Mistake | Result |
| --- | --- |
| Changing a \`DEFINE\` constant | \`ConstantError\` |
| Assigning to \`random\` or \`toText\` | Built-in names are protected. |
| Adding text and a number directly | Convert the number with \`toText(...)\`. |

## Read more

See [Values and Types](#reference-values-types), [Variables and DEFINE](#reference-variables-define), and [Operators](#reference-operators).
`
  },
  {
    id: "learn-decisions",
    section: "learn",
    title: "Decisions with if, orif, otherwise",
    description: "Choose which block runs with boolean conditions.",
    body: String.raw`
# Decisions with if, orif, otherwise

Use \`if\` to run a block when a condition is \`True\`. Add \`orif\` for more choices and \`otherwise\` for the fallback.

\`\`\`slite
score = 84

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
otherwise:
    say "Keep practicing"
\`\`\`

Expected output:

\`\`\`text
B
\`\`\`

## Conditions must be booleans

The condition after \`if\`, \`orif\`, or \`loopif\` must evaluate to \`True\` or \`False\`.

\`\`\`slite
score = 10

if score > 0:
    say "Positive score"
\`\`\`

## Beginner mistakes

| Mistake | What to do |
| --- | --- |
| Missing \`:\` after a condition | End the block-opening line with \`:\`. |
| Starting with \`orif\` | Start the chain with \`if\`. |
| Putting \`orif\` after \`otherwise\` | Put every \`orif\` before the final \`otherwise:\`. |
| Using raw text or a raw number as a condition | Compare explicitly, such as \`score > 0\`. |

## Read more

See [Conditionals](#reference-conditionals).
`
  },
  {
    id: "learn-loops",
    section: "learn",
    title: "Loops",
    description: "Repeat work with repeat, loopif, foreach, break, and continue.",
    body: String.raw`
# Loops

Loops repeat work.

## repeat

\`\`\`slite
repeat 3 times:
    say "Practice"
\`\`\`

Expected output:

\`\`\`text
Practice
Practice
Practice
\`\`\`

The repeat count must be a whole number and cannot be negative.

## loopif

\`\`\`slite
count = 3

loopif count > 0:
    say toText(count)
    count = count - 1
\`\`\`

Expected output:

\`\`\`text
3
2
1
\`\`\`

## foreach

\`\`\`slite
scores = [80, 90, 100]

foreach score in scores:
    say toText(score)
\`\`\`

\`foreach\` supports lists and tuples only. Dictionary iteration is unsupported in v1.

## break and continue

\`\`\`slite
items = [1, 2, 3]

foreach item in items:
    if item == 2:
        continue
    say toText(item)
\`\`\`

## Beginner mistakes

| Mistake | Result |
| --- | --- |
| \`repeat 2.5 times:\` | Repeat counts must be whole numbers. |
| \`repeat -1 times:\` | Repeat counts cannot be negative. |
| \`foreach key in {"a": 1}:\` | Dictionaries cannot be used with \`foreach\` in v1. |
| \`break\` outside a loop | \`RuntimeError\` |

## Read more

See [Loops](#reference-loops).
`
  },
  {
    id: "learn-functions",
    section: "learn",
    title: "Functions",
    description: "Define reusable behavior with new, parameters, nested calls, and returns.",
    body: String.raw`
# Functions

Function definitions use \`new\`. Parameters go in parentheses when the function accepts inputs.

\`\`\`slite
new double(value):
    return value * 2

say toText(double(6))
\`\`\`

Expected output:

\`\`\`text
12
\`\`\`

Sticks Lite collects function definitions before top-level statements run, so a function can be called before its definition appears.

\`\`\`slite
say greet("Maya")

new greet(name):
    return "Hello, " + name
\`\`\`

## No-parameter functions

No-parameter definitions omit parentheses. Calls still use parentheses.

\`\`\`slite
new banner:
    return "Ready"

say banner()
\`\`\`

## Nested calls

\`\`\`slite
new add(a, b):
    return a + b

new triple(value):
    return value * 3

say toText(triple(add(2, 4)))
\`\`\`

## Beginner mistakes

| Mistake | Result |
| --- | --- |
| Calling a function with the wrong number of arguments | \`ArgumentError\` |
| Defining the same function twice | \`FunctionError\` |
| Naming a function \`toText\` | Built-in names are protected. |
| Using \`return\` outside a function | \`RuntimeError\` |

## Read more

See [Functions](#reference-functions).
`
  },
  {
    id: "learn-collections",
    section: "learn",
    title: "Collections",
    description: "Use lists, tuples, dictionaries, indexing, and collection updates.",
    body: String.raw`
# Collections

Collections hold multiple values.

## Lists

Lists use square brackets and can be changed.

\`\`\`slite
scores = [80, 90]
push(scores, 95)
scores[0] = 82

say toText(scores[0])
say toText(length(scores))
\`\`\`

## Tuples

Tuples use parentheses and cannot be changed after creation. Tuples need at least two items.

\`\`\`slite
point = (10, 20)

say toText(point[0])
say toText(point[1])
\`\`\`

## Dictionaries

Dictionaries use text keys.

\`\`\`slite
student = {"name": "Maya", "score": 91}
student["score"] = 94

say student["name"]
say toText(student["score"])
\`\`\`

## Beginner mistakes

| Mistake | Result |
| --- | --- |
| \`point[0] = 5\` on a tuple | Tuples cannot be changed. |
| \`student[0]\` | Dictionary keys must be text. |
| Reading a missing dictionary key | \`KeyError\` |
| Using \`push\`, \`insert\`, or \`remove\` on a tuple | \`TypeError\` |

## Read more

See [Lists, Tuples, and Dictionaries](#reference-collections).
`
  },
  {
    id: "learn-errors",
    section: "learn",
    title: "Handling Errors with attempt and when",
    description: "Recover from expected language errors in beginner programs.",
    body: String.raw`
# Handling Errors with attempt and when

Use \`attempt\` with one or more \`when\` handlers when a program can recover from an expected Sticks Lite error.

\`\`\`slite
attempt:
    age = toNumber("abc")
    say toText(age)
when ValueError:
    say "Please enter a number."
\`\`\`

Expected output:

\`\`\`text
Please enter a number.
\`\`\`

## Catch-all handlers

\`when error\` catches any Sticks Lite language error. Put it last.

\`\`\`slite
attempt:
    value = toNumber("abc")
    say toText(value)
when ValueError:
    say "That was not numeric text."
when error:
    say "Something went wrong."
\`\`\`

## Beginner mistakes

| Mistake | What to do |
| --- | --- |
| \`attempt:\` without \`when\` | Add at least one handler. |
| \`when\` without \`attempt\` | Write the \`attempt:\` block first. |
| Unknown handler name | Use a built-in error name such as \`ValueError\`. |
| Specific \`when\` after \`when error\` | Put \`when error\` last. |

## Read more

See [Errors](#reference-errors).
`
  },
  {
    id: "learn-classroom-practice",
    section: "learn",
    title: "Classroom Practice Programs",
    description: "Short programs teachers can adapt for class exercises.",
    body: String.raw`
# Classroom Practice Programs

These programs are intentionally small. They are good checkpoints after each concept.

## Calculator

\`\`\`slite
first = toNumber(ask "First number?")
second = toNumber(ask "Second number?")

say "Sum: " + toText(first + second)
\`\`\`

## Grade message

\`\`\`slite
score = 86

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
orif score >= 70:
    say "C"
otherwise:
    say "Keep practicing"
\`\`\`

## Average a list

\`\`\`slite
scores = [80, 90, 100]
total = 0

foreach score in scores:
    total = total + score

average = total / length(scores)
say toText(average)
\`\`\`

## Input recovery

\`\`\`slite
attempt:
    age = toNumber(ask "Age?")
    say "Age: " + toText(age)
when ValueError:
    say "Use digits for the age."
when error:
    say "Try again with your teacher."
\`\`\`
`
  },
  {
    id: "reference",
    section: "reference",
    title: "Language Reference",
    label: "Overview",
    description: "Exact syntax and behavior for Sticks Lite.",
    body: String.raw`
# Language Reference

Use this section when you need exact behavior. Tutorial explanations live in Learn.

## Contents

| Page | Covers |
| --- | --- |
| Syntax | Comments, indentation, statements, and reserved words |
| Values and Types | Text, numbers, booleans, \`null\`, collections, functions, and built-ins |
| Variables and DEFINE | Assignment, constants, protected names, and scope |
| Operators | Math, comparison, equality, boolean operators, and precedence |
| Conditionals | \`if\`, \`orif\`, \`otherwise\`, and boolean-only conditions |
| Loops | \`repeat\`, \`loopif\`, \`foreach\`, \`break\`, and \`continue\` |
| Functions | \`new\`, parameters, calls, nested calls, returns, and argument checks |
| Collections | Lists, tuples, dictionaries, indexing, and mutable updates |
| Errors | Error names, formatting, and \`attempt\` handling |
| Built-ins | Standard library functions and protected names |
| CLI Reference | \`sticks\` command behavior |
| Public TypeScript API | \`lex\`, \`parse\`, \`runSource\`, \`RuntimeIO\`, \`RunResult\`, and \`SticksLiteError\` |
`
  },
  {
    id: "reference-syntax",
    section: "reference",
    title: "Syntax",
    description: "Source files, comments, indentation blocks, and statements.",
    body: String.raw`
# Syntax

Sticks Lite programs are plain text files with the \`.slite\` extension.

## Statements and blocks

Write one statement per line. A block-opening line ends with \`:\`, and the block is indented.

\`\`\`slite
DEFINE MAX_SCORE = 100

score = 84

if score >= 80:
    say "Passing"
    say "Nice work"
\`\`\`

Sticks Lite reports friendly syntax errors for missing colons, bad indentation, unfinished strings, invalid \`orif\`, and \`otherwise\` without \`if\`.

## Comments

\`\`\`slite
# A line comment
say "before"

/*
This is a block comment.
It can cover multiple lines.
*/
say "after"
\`\`\`

## Keywords

\`\`\`text
DEFINE if orif otherwise repeat times loopif foreach in
new return break continue True False null
and or not div mod say ask attempt when error
\`\`\`

## Statement forms

| Form | Example |
| --- | --- |
| Assignment | \`score = 10\` |
| Constant | \`DEFINE MAX_SCORE = 100\` |
| Output | \`say "Hello"\` |
| Input | \`name = ask "Name?"\` |
| Conditional | \`if score > 0:\` |
| Counted loop | \`repeat 3 times:\` |
| Conditional loop | \`loopif count > 0:\` |
| Collection loop | \`foreach item in items:\` |
| Function | \`new double(value):\` |
| Error handling | \`attempt:\` and \`when ValueError:\` |
`
  },
  {
    id: "reference-values-types",
    section: "reference",
    title: "Values and Types",
    description: "The runtime values Sticks Lite supports.",
    body: String.raw`
# Values and Types

| Type | Example | Notes |
| --- | --- | --- |
| text | \`"hello"\` | Quoted string value. |
| number | \`42\`, \`3.14\` | Used for math and numeric comparison. |
| boolean | \`True\`, \`False\` | Required for conditions. |
| null | \`null\` | Represents no value. |
| list | \`[1, 2, 3]\` | Mutable, indexed from \`0\`. |
| tuple | \`(10, 20)\` | Immutable, at least two items. |
| dictionary | \`{"name": "Maya"}\` | Mutable, keyed by text. |
| function | \`new double(x):\` | User-defined callable value. |
| built-in | \`toText\` | Protected callable value. |

\`\`\`slite
values = ["text", 42, True, null]

foreach value in values:
    say toText(value)
\`\`\`

## Conditions

\`if\`, \`orif\`, and \`loopif\` require booleans. Sticks Lite does not treat numbers, text, lists, tuples, dictionaries, or \`null\` as truthy or falsey.
`
  },
  {
    id: "reference-variables-define",
    section: "reference",
    title: "Variables and DEFINE",
    description: "Assignment, constants, protected names, and scope.",
    body: String.raw`
# Variables and DEFINE

Variables are created by assignment.

\`\`\`slite
score = 10
score = score + 5
say toText(score)
\`\`\`

## DEFINE constants

\`DEFINE\` creates a constant at the top level.

\`\`\`slite
DEFINE MAX_SCORE = 100

score = 88
say toText(MAX_SCORE - score)
\`\`\`

Constants cannot be reassigned or redefined. \`DEFINE\` cannot be used inside blocks.

## Protected names

These names cannot be overwritten:

| Protected name kind | Examples |
| --- | --- |
| Built-ins | \`toText\`, \`random\`, \`length\` |
| Error names | \`ValueError\`, \`TypeError\` |
| Existing functions | Names defined with \`new\` |
| Constants | Names created with \`DEFINE\` |

## Scope

\`if\`, \`repeat\`, \`loopif\`, \`foreach\`, and \`attempt\` do not create a new variable scope. Function calls have their own parameter scope.
`
  },
  {
    id: "reference-operators",
    section: "reference",
    title: "Operators",
    description: "Math, comparison, equality, boolean operators, and precedence.",
    body: String.raw`
# Operators

## Arithmetic

| Operator | Meaning |
| --- | --- |
| \`+\` | Number addition or text concatenation when both sides are text |
| \`-\` | Subtraction |
| \`*\` | Multiplication |
| \`/\` | Division |
| \`div\` | Integer division |
| \`mod\`, \`%\` | Remainder |
| unary \`-\` | Numeric negation |

\`\`\`slite
say toText(8 + 2)
say toText(8 div 3)
say toText(8 % 3)
\`\`\`

Use \`toText(...)\` when building text from numbers or booleans.

## Comparison and equality

| Operator | Meaning |
| --- | --- |
| \`==\`, \`!=\` | Equality and inequality |
| \`<\`, \`<=\`, \`>\`, \`>=\` | Numeric comparison |

## Boolean operators

Use \`and\`, \`or\`, and \`not\` with boolean values.

\`\`\`slite
score = 84
present = True

if score >= 70 and present:
    say "Ready"
\`\`\`

## Common operator errors

Division, modulo, and integer division by zero report \`MathError\`. Numeric operators report \`TypeError\` when used with the wrong value type.
`
  },
  {
    id: "reference-conditionals",
    section: "reference",
    title: "Conditionals",
    description: "Rules for if, orif, otherwise, and boolean-only conditions.",
    body: String.raw`
# Conditionals

\`\`\`slite
score = 84

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
otherwise:
    say "Keep practicing"
\`\`\`

\`orif\` blocks are optional. \`otherwise:\` is optional and must be last.

## Boolean-only rule

The condition in \`if\`, \`orif\`, and \`loopif\` must evaluate to \`True\` or \`False\`.

\`\`\`slite
name = "Maya"

if name == "Maya":
    say "Found"
\`\`\`

Raw numbers, text, lists, tuples, dictionaries, and \`null\` are not treated as conditions.

## Syntax errors

| Error shape | Error name |
| --- | --- |
| Missing colon | \`SyntaxError\` |
| \`orif\` without preceding \`if\` | \`SyntaxError\` |
| \`otherwise\` without preceding \`if\` | \`SyntaxError\` |
| \`orif\` after \`otherwise\` | \`SyntaxError\` |
`
  },
  {
    id: "reference-loops",
    section: "reference",
    title: "Loops",
    description: "repeat, loopif, foreach, break, and continue.",
    body: String.raw`
# Loops

## repeat

\`\`\`slite
repeat 3 times:
    say "again"
\`\`\`

\`repeat\` evaluates the count once. The count must be a non-negative whole number.

## loopif

\`\`\`slite
count = 2

loopif count > 0:
    say toText(count)
    count = count - 1
\`\`\`

\`loopif\` re-checks the condition before each iteration. The condition must be boolean.

## foreach

\`\`\`slite
letters = ("a", "b")

foreach letter in letters:
    say letter
\`\`\`

\`foreach\` supports lists and tuples only. Dictionary iteration is unsupported in v1.

## break and continue

\`\`\`slite
items = [1, 2, 3]

foreach item in items:
    if item == 2:
        break
    say toText(item)
\`\`\`

\`break\` and \`continue\` are valid only inside \`repeat\`, \`loopif\`, or \`foreach\`.
`
  },
  {
    id: "reference-functions",
    section: "reference",
    title: "Functions",
    description: "Definition, calls, nested calls, returns, protected names, and argument checks.",
    body: String.raw`
# Functions

Define functions with \`new\`.

\`\`\`slite
new add(a, b):
    return a + b

say toText(add(2, 3))
\`\`\`

## No-parameter functions

\`\`\`slite
new ready:
    return "ready"

say ready()
\`\`\`

No-parameter definitions omit parentheses. Calls always use parentheses.

## Calls

Nested calls are supported.

\`\`\`slite
new add(a, b):
    return a + b

new square(value):
    return value * value

say toText(square(add(2, 3)))
\`\`\`

Calling a user function with the wrong number of arguments reports an \`ArgumentError\`.

## Returns

\`return\` exits the current function. A function that finishes without \`return\` returns \`null\`.

## Protected names

Function names cannot use protected built-in names, protected error names, constant names, or another function's name.
`
  },
  {
    id: "reference-collections",
    section: "reference",
    title: "Lists, Tuples, and Dictionaries",
    description: "Collection literals, indexing, assignment, and unsupported operations.",
    body: String.raw`
# Lists, Tuples, and Dictionaries

## Literals

\`\`\`slite
items = [1, 2, 3]
point = (10, 20)
person = {"name": "Maya", "score": 91}

say toText(items[0])
say toText(point[1])
say person["name"]
\`\`\`

Empty tuples, one-item tuples, and trailing tuple commas are not supported. Use a list when you need an empty collection.

## Indexing

| Collection | Index type | Result |
| --- | --- | --- |
| text | whole number | character |
| list | whole number | item |
| tuple | whole number | item |
| dictionary | text | value for key |

Indexes for text, lists, and tuples start at \`0\`.

## Mutable assignment

\`\`\`slite
items = [1, 2, 3]
items[1] = 20

person = {"name": "Maya"}
person["name"] = "Kai"

say toText(items[1])
say person["name"]
\`\`\`

Lists and dictionaries can be changed. Tuples and text cannot be changed.

## Unsupported operations

| Operation | Error |
| --- | --- |
| Assigning into a tuple | \`TypeError\` |
| Assigning into text | \`TypeError\` |
| Dictionary key missing | \`KeyError\` |
| Dictionary iteration with \`foreach\` | \`TypeError\` |
| \`push\`, \`insert\`, or \`remove\` on a tuple | \`TypeError\` |
`
  },
  {
    id: "reference-errors",
    section: "reference",
    title: "Errors",
    description: "Error names, formatted messages, hints, and attempt handling.",
    body: String.raw`
# Errors

Sticks Lite reports friendly \`SticksLiteError\` messages with an error name, line, column, message, and optional hint.

\`runSource(...)\` returns formatted language errors in \`RunResult.error\`. \`lex(...)\` and \`parse(...)\` throw \`SticksLiteError\`.

## Error names

| Error name | Common cause |
| --- | --- |
| \`SyntaxError\` | Missing colon, invalid \`orif\`, unfinished string, bad statement shape. |
| \`NameError\` | Undefined variable or protected name misuse. |
| \`TypeError\` | Operation used with the wrong value type. |
| \`ValueError\` | Value is the right type but not valid, such as \`toNumber("abc")\`. |
| \`MathError\` | Division, modulo, or integer division by zero. |
| \`ConstantError\` | \`DEFINE\` misuse or constant overwrite. |
| \`IndexError\` | Invalid list, tuple, or text index. |
| \`KeyError\` | Missing dictionary key. |
| \`FunctionError\` | Invalid function definition or calling a non-function. |
| \`ArgumentError\` | Wrong argument count. |
| \`RuntimeError\` | Runtime-only rule violation, such as \`return\` outside a function. |

## attempt and when

\`\`\`slite
attempt:
    number = toNumber("abc")
    say toText(number)
when ValueError:
    say "Could not convert the value."
when error:
    say "Another Sticks Lite error happened."
\`\`\`

\`when error\` catches any Sticks Lite error and should be last.

## Beginner errors to recognize

| Problem | Error | Fix |
| --- | --- | --- |
| Missing \`:\` after \`if\`, \`repeat\`, \`new\`, or \`attempt\` | \`SyntaxError\` | Put \`:\` at the end of the block-opening line. |
| Bad indentation | \`SyntaxError\` | Align the block consistently. |
| Unfinished string | \`SyntaxError\` | Add the closing quote. |
| Standalone \`orif\` | \`SyntaxError\` | Start with \`if\`, then add \`orif\`. |
| \`otherwise\` without \`if\` | \`SyntaxError\` | Use \`otherwise:\` only at the end of an \`if\` chain. |
| Undefined variable | \`NameError\` | Assign a value before reading it. |
| Wrong argument count | \`ArgumentError\` | Pass exactly the parameters the function expects. |
| Invalid indexing | \`IndexError\`, \`KeyError\`, or \`TypeError\` | Check index type, range, or dictionary key spelling. |
| Bad collection operation | \`TypeError\` | Use list operations on lists. |
| Bad type conversion | \`ValueError\` or \`TypeError\` | Pass numeric text to \`toNumber(...)\`. |
| Constant overwrite | \`ConstantError\` | Use a variable or a different constant name. |
| Built-in overwrite | \`NameError\` or \`ConstantError\` | Choose a non-protected name. |
`
  },
  {
    id: "reference-standard-library",
    section: "reference",
    title: "Standard Library / Built-ins",
    description: "Built-in functions, categories, examples, and argument rules.",
    body: String.raw`
# Standard Library / Built-ins

Built-in names are protected. They cannot be overwritten by variables, constants, or function names.

## Built-ins

| Built-in | Category | Purpose |
| --- | --- | --- |
| \`random(min, max)\` | Math | Pick a random number in a range. |
| \`length(value)\` | Size | Get text, list, tuple, or dictionary length. |
| \`toNumber(value)\` | Conversion | Convert numeric text to a number. |
| \`toText(value)\` | Conversion | Convert any value to text. |
| \`isNumber(value)\` | Type check | Check for a number. |
| \`isText(value)\` | Type check | Check for text. |
| \`isList(value)\` | Type check | Check for a list. |
| \`isTuple(value)\` | Type check | Check for a tuple. |
| \`isDictionary(value)\` | Type check | Check for a dictionary. |
| \`isBoolean(value)\` | Type check | Check for a boolean. |
| \`isNull(value)\` | Type check | Check for \`null\`. |
| \`push(list, value)\` | Lists | Add to the end of a list. |
| \`insert(list, index, value)\` | Lists | Insert before an index. |
| \`remove(list, index)\` | Lists | Remove at an index. |
| \`round(value)\` | Math | Round to the nearest whole number. |
| \`floor(value)\` | Math | Round down. |
| \`ceiling(value)\` | Math | Round up. |
| \`absolute(value)\` | Math | Absolute value. |

## Runnable example

\`\`\`slite
items = [1, 2]
push(items, 3)
insert(items, 0, 0)
remove(items, 2)

say toText(length(items))
say toText(toNumber("42"))
say toText(toText(False))
say toText(isNumber(3))
say toText(isText("hi"))
say toText(isList(items))
say toText(isTuple((1, 2)))
say toText(isDictionary({"name": "Maya"}))
say toText(isBoolean(True))
say toText(isNull(null))
say toText(round(2.6))
say toText(floor(2.9))
say toText(ceiling(2.1))
say toText(absolute(-4))
say toText(random(4, 4))
\`\`\`

\`push\`, \`insert\`, and \`remove\` work on lists only. Every built-in checks its argument count and reports \`ArgumentError\` for too few or too many arguments.

\`random(min, max)\` returns a whole number when both arguments are whole numbers. It reports \`ValueError\` when \`min\` is greater than \`max\`.
`
  },
  {
    id: "reference-cli",
    section: "reference",
    title: "CLI Reference",
    description: "Command forms, entry resolution, and CLI error behavior.",
    body: String.raw`
# CLI Reference

The \`sticks\` CLI runs one \`.slite\` file or a folder that contains \`main.slite\`.

\`\`\`sh
sticks main.slite
sticks .
sticks path/to/project
\`\`\`

With no argument, \`sticks\` runs \`main.slite\` from the current directory.

## Arguments

| Argument | Behavior |
| --- | --- |
| \`.slite\` file | Runs that file. |
| folder | Looks for an exactly named \`main.slite\`. |
| no argument | Same as \`sticks main.slite\`. |
| \`--version\`, \`-v\` | Prints the installed package version. |

Folder entry files must be named exactly \`main.slite\` so projects behave consistently across operating systems.

## CLI errors

| Problem | Error | What to check |
| --- | --- | --- |
| Missing file | \`FileError\` | Check the path or run from a folder with \`main.slite\`. |
| Wrong extension | \`FileError\` | Use a \`.slite\` source file. |
| Empty directory | \`FileError\` | Add \`main.slite\` or pass a specific \`.slite\` file. |
| Directory missing \`main.slite\` | \`FileError\` | Create \`main.slite\` in that folder. |
| Differently cased entry file | \`FileError\` | Rename it exactly to \`main.slite\`. |
| Unreadable path | \`FileError\` | Check file permissions and path spelling. |

The CLI writes language errors to stderr and exits with code \`1\` when an error occurs.
`
  },
  {
    id: "reference-typescript-api",
    section: "reference",
    title: "Public TypeScript API",
    description: "Use lex, parse, runSource, RuntimeIO, RunResult, and SticksLiteError.",
    body: String.raw`
# Public TypeScript API

Import from \`sticks-lite\`.

\`\`\`ts
import {
  lex,
  parse,
  runSource,
  SticksLiteError,
  isSticksLiteError,
  type Token,
  type Program,
  type RuntimeIO,
  type RunResult
} from "sticks-lite";
\`\`\`

## \`lex(source: string): Token[]\`

Tokenizes source text. Lexer errors throw \`SticksLiteError\`.

## \`parse(source: string): Program\`

Parses source text into an AST program. Parser errors throw \`SticksLiteError\`.

## \`runSource(source: string, io?: RuntimeIO): Promise<RunResult>\`

Runs source text.

\`\`\`ts
import { runSource, type RuntimeIO } from "sticks-lite";

const output: string[] = [];

const io: RuntimeIO = {
  readInput(prompt) {
    output.push("prompt:" + prompt);
    return "5";
  },
  writeOutput(text) {
    output.push(text);
  }
};

const result = await runSource('say "Hello"', io);
\`\`\`

Language errors are returned in a failed \`RunResult\` instead of thrown.

## \`RuntimeIO\`

\`\`\`ts
type RuntimeIO = {
  readInput(prompt: string): string | Promise<string>;
  writeOutput(text: string): void | Promise<void>;
};
\`\`\`

## \`RunResult\`

\`\`\`ts
type RunResult =
  | { ok: true; output: string[] }
  | { ok: false; error: string; output: string[] };
\`\`\`

\`output\` contains every value written by \`say\`, even when the caller also provides \`writeOutput\`.

## \`SticksLiteError\`

\`SticksLiteError\` includes the language error name, message, line, column, and optional hint. Use \`isSticksLiteError(error)\` when catching unknown errors from \`lex\` or \`parse\`.
`
  },
  {
    id: "tools-installation",
    section: "tools",
    title: "Installation",
    description: "Install and check the Sticks Lite CLI.",
    body: String.raw`
# Installation

Install the main package globally from npm:

\`\`\`sh
npm install -g sticks-lite
\`\`\`

Check the installed command:

\`\`\`sh
sticks --version
\`\`\`

Run a source file:

\`\`\`sh
sticks main.slite
\`\`\`

Run a folder containing \`main.slite\`:

\`\`\`sh
sticks .
\`\`\`

Use Node.js 18 or newer.
`
  },
  {
    id: "tools-cli",
    section: "tools",
    title: "CLI",
    description: "Everyday command-line usage.",
    body: String.raw`
# CLI

Most classroom projects use one of these commands:

\`\`\`sh
sticks main.slite
sticks .
\`\`\`

With no argument, \`sticks\` looks for \`main.slite\` in the current directory.

\`\`\`sh
sticks
\`\`\`

Use \`sticks --version\` or \`sticks -v\` to print the installed package version.

See the [CLI Reference](#reference-cli) for error behavior.
`
  },
  {
    id: "tools-running-files",
    section: "tools",
    title: "Running .slite Files",
    description: "Run single files and folder projects.",
    body: String.raw`
# Running .slite Files

A Sticks Lite project can be a single file or a folder with \`main.slite\`.

## Single file

\`\`\`sh
sticks lessons/hello.slite
\`\`\`

## Folder project

\`\`\`text
student-project/
  main.slite
  notes.txt
\`\`\`

\`\`\`sh
sticks student-project
\`\`\`

The entry file must be named exactly \`main.slite\`.

## Common file problems

| Problem | Fix |
| --- | --- |
| Folder is empty | Add \`main.slite\`. |
| Folder has \`lesson.slite\` but no \`main.slite\` | Rename or add \`main.slite\`. |
| Folder has \`Main.slite\` | Rename it exactly to \`main.slite\`. |
| File ends in \`.txt\` | Save it as \`.slite\`. |
`
  },
  {
    id: "tools-typescript",
    section: "tools",
    title: "Using Sticks Lite from TypeScript",
    description: "Embed the interpreter in tools, tests, and classroom apps.",
    body: String.raw`
# Using Sticks Lite from TypeScript

Use the public API when building editor tools, tests, browser classrooms, or lesson runners.

\`\`\`ts
import { runSource, type RuntimeIO } from "sticks-lite";

const events: string[] = [];

const io: RuntimeIO = {
  readInput(prompt) {
    events.push("prompt:" + prompt);
    return "5";
  },
  writeOutput(text) {
    events.push("output:" + text);
  }
};

const result = await runSource('say "Ready"', io);
\`\`\`

\`result.ok\` is \`true\` when the program finishes. If a Sticks Lite language error occurs, \`result.ok\` is \`false\` and \`result.error\` contains the formatted message.

\`lex\` and \`parse\` throw \`SticksLiteError\` for invalid source.
`
  },
  {
    id: "tools-runtime-io",
    section: "tools",
    title: "Runtime I/O",
    description: "Connect Sticks Lite programs to host input and output.",
    body: String.raw`
# Runtime I/O

\`RuntimeIO\` connects the interpreter to the host environment.

\`\`\`ts
type RuntimeIO = {
  readInput(prompt: string): string | Promise<string>;
  writeOutput(text: string): void | Promise<void>;
};
\`\`\`

\`ask\` calls \`readInput(prompt)\`. \`say\` calls \`writeOutput(text)\` and also records the text in \`RunResult.output\`.

The CLI is responsible for reading \`.slite\` files, resolving \`main.slite\`, and connecting terminal input/output to \`RuntimeIO\`.
`
  },
  {
    id: "tools-versioning",
    section: "tools",
    title: "Versioning",
    description: "How docs and package versions stay aligned.",
    body: String.raw`
# Versioning

These docs read the current Sticks Lite version from package metadata. The current documented package version is \`{{VERSION}}\`.

Sticks Lite v1 keeps these user-facing rules stable:

| Area | Rule |
| --- | --- |
| Files | Programs use \`.slite\` source files. |
| CLI | \`sticks\` runs files or folders containing \`main.slite\`. |
| Conditions | \`if\`, \`orif\`, and \`loopif\` require booleans. |
| foreach | Lists and tuples only; dictionaries are unsupported in v1. |
| API | Public exports include \`lex\`, \`parse\`, \`runSource\`, \`RuntimeIO\`, \`RunResult\`, and \`SticksLiteError\`. |
`
  },
  {
    id: "classroom-use",
    section: "classroom",
    title: "Classroom Use",
    description: "Practical setup for monitored lessons.",
    body: String.raw`
# Classroom Use

Sticks Lite is intended for monitored educational environments. A teacher, mentor, or parent should review lesson goals and decide what students run.

Good classroom uses include:

| Use | Why it fits |
| --- | --- |
| first programming lessons | Small syntax surface and direct output |
| clubs and camps | Easy \`.slite\` files and one CLI command |
| debugging practice | Friendly errors with line, column, and hints |
| short projects | Variables, decisions, loops, functions, and collections |

## Setup checklist

1. Install the package with \`npm install -g sticks-lite\`.
2. Give each student a folder with \`main.slite\`.
3. Run projects with \`sticks .\`.
4. Keep examples small enough to discuss as a class.
`
  },
  {
    id: "classroom-responsible-use",
    section: "classroom",
    title: "Responsible Use",
    description: "A short, classroom-friendly safety note.",
    body: String.raw`
# Responsible Use

Sticks Lite is for supervised learning. Use it where a teacher, mentor, or parent can guide the activity and review what students run.

Sticks Lite is not a security sandbox. The language core has no direct file-system or network APIs, but the CLI still reads source files and uses the terminal for input and output.

Keep lessons appropriate for the group, review shared programs before running them, and use normal classroom device controls when students work on school machines.
`
  },
  {
    id: "classroom-teaching-sequence",
    section: "classroom",
    title: "Teaching Sequence",
    description: "A compact order for introducing the language.",
    body: String.raw`
# Teaching Sequence

## 1. Output and files

Start with \`say\`, \`.slite\` files, and \`sticks main.slite\`.

## 2. Values and variables

Introduce text, numbers, booleans, \`null\`, assignment, and \`DEFINE\`.

## 3. Decisions

Teach \`if\`, then \`orif\`, then \`otherwise\`.

\`\`\`slite
score = 75

if score >= 70:
    say "Passing"
otherwise:
    say "Practice again"
\`\`\`

## 4. Loops

Teach \`repeat\`, then \`loopif\`, then \`foreach\`.

\`\`\`slite
repeat 3 times:
    say "Try"
\`\`\`

## 5. Functions and collections

Introduce functions after students are comfortable tracing values. Introduce lists before dictionaries.

## 6. Recoverable errors

Add \`attempt\` and \`when\` after students know conversion and input.
`
  },
  {
    id: "classroom-debugging",
    section: "classroom",
    title: "Debugging with Students",
    description: "Use friendly errors as a teaching tool.",
    body: String.raw`
# Debugging with Students

Sticks Lite errors include a name, line, column, and often a hint. Read the error with students before changing code.

## A useful routine

1. Ask what the program was expected to do.
2. Read the error name.
3. Go to the line and column.
4. Compare the line with the nearest correct example.
5. Make one small change and run again.

## Common discussion prompts

| Error | Ask |
| --- | --- |
| \`SyntaxError\` | Is a colon, quote, or indentation level missing? |
| \`NameError\` | Where is this name first assigned? |
| \`TypeError\` | What type is this value right now? |
| \`ArgumentError\` | How many parameters does the function define? |
| \`IndexError\` | What indexes are valid for this collection? |
`
  }
];

export const pageById = new Map(pages.map((page) => [page.id, page]));

export function sectionPages(sectionId: SectionId): DocPage[] {
  return pages.filter((page) => page.section === sectionId);
}

export const defaultPageId = "learn";
