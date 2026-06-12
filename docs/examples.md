# Examples

These examples are beginner-friendly programs for classroom use.

## Hello World

```slite
say "Hello, world!"
```

## Name Greeter

```slite
name = ask "What is your name?"
say "Hello " + name
```

## Simple Calculator

```slite
first = toNumber(ask "First number?")
second = toNumber(ask "Second number?")

say "Sum: " + toText(first + second)
say "Difference: " + toText(first - second)
say "Product: " + toText(first * second)
say "Quotient: " + toText(first / second)
```

## Grade Checker

```slite
score = 87

if score >= 90:
    say "A"
orif score >= 80:
    say "B"
orif score >= 70:
    say "C"
otherwise:
    say "Keep practicing"
```

## Number Guessing Helper

```slite
secret = random(1, 10)
guess = toNumber(ask "Guess a number from 1 to 10?")

if guess == secret:
    say "Correct"
orif guess < secret:
    say "Too low"
otherwise:
    say "Too high"
```

## List Average

```slite
scores = [90, 85, 100]
total = 0

foreach score in scores:
    total += score

average = total / length(scores)
say "Average: " + toText(average)
```

## Dictionary Profile

```slite
profile = {"name": "Maya", "age": 13}
profile["city"] = "Ridgewood"

say profile["name"] + " is " + toText(profile["age"])
say toText(profile)
```

## Function Example

```slite
say toText(square(6))

new square(x):
    return x * x
```

## Error Handling

```slite
attempt:
    age = toNumber(ask "Age?")
    say "Next year: " + toText(age + 1)
when ValueError:
    say "Please enter a number."
when error:
    say "Something unexpected happened."
```
