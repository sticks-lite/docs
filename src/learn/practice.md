---
title: Practice Programs
description: Small classroom programs that combine Sticks Lite concepts.
---

# Classroom Practice Programs

<div class="lesson-goal">
  <strong>Goal:</strong> Practice by changing small runnable programs.
</div>

These programs are short on purpose. Change one thing at a time, run the file,
and compare the output.

## Score Summary

```slite
scores = [8, 10, 7]
total = 0

foreach score in scores:
    total += score

average = total / length(scores)
say "Average: " + toText(round(average))
```

Expected output:

```txt
Average: 8
```

Try changing the scores or adding another score to the list.

## Guess Check

```slite
DEFINE SECRET = 5

guessText = ask "Guess a number:"
guess = toNumber(guessText)

if guess == SECRET:
    say "Correct"
orif guess < SECRET:
    say "Too low"
otherwise:
    say "Too high"
```

With the default test input `5`, expected output is:

```txt
Correct
```

Try changing `SECRET`, then run the program and enter a different number.

## Student Dictionary

```slite
student = {"name": "Maya", "scores": [9, 8]}
push(student["scores"], 10)

say student["name"]
say toText(student["scores"])
say "Scores recorded: " + toText(length(student["scores"]))
```

Expected output:

```txt
Maya
[9, 8, 10]
Scores recorded: 3
```

Try adding another dictionary key such as `"class"` or `"teacher"`.

## Safe Conversion

```slite
textValue = "not a number"

attempt:
    numberValue = toNumber(textValue)
    say toText(numberValue)
when ValueError:
    say "Use numeric text, such as 42."
```

Expected output:

```txt
Use numeric text, such as 42.
```

Try changing `textValue` to `"42"` and run the program again.
