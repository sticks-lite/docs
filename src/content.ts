export const builtinReferenceMarkdown = String.raw`
| Built-in | Purpose | Returns |
| --- | --- | --- |
| \`random(min, max)\` | Return a random number from \`min\` through \`max\`. Whole-number bounds produce a whole number. | number |
| \`length(value)\` | Count characters in text, items in a list or tuple, or entries in a dictionary. | number |
| \`toNumber(value)\` | Convert numeric text into a number. | number |
| \`toText(value)\` | Convert any Sticks Lite value into display text. | text |
| \`isNumber(value)\` | Check whether a value is a number. | boolean |
| \`isText(value)\` | Check whether a value is text. | boolean |
| \`isList(value)\` | Check whether a value is a list. | boolean |
| \`isTuple(value)\` | Check whether a value is a tuple. | boolean |
| \`isDictionary(value)\` | Check whether a value is a dictionary. | boolean |
| \`isBoolean(value)\` | Check whether a value is a boolean. | boolean |
| \`isNull(value)\` | Check whether a value is \`null\`. | boolean |
| \`push(list, value)\` | Add a value to the end of a list. | null |
| \`insert(list, index, value)\` | Insert a value into a list at an index. | null |
| \`remove(list, index)\` | Remove the item at an index from a list. | null |
| \`round(value)\` | Round a number to the nearest whole number. | number |
| \`floor(value)\` | Round a number down. | number |
| \`ceiling(value)\` | Round a number up. | number |
| \`absolute(value)\` | Return the absolute value of a number. | number |

\`\`\`slite
items = [1, 2]
push(items, 3)
insert(items, 1, 9)
remove(items, 0)

say toText(random(4, 4))
say toText(length(items))
say toText(toNumber("42"))
say toText(toText(42))
say toText(isNumber(42))
say toText(isText("Maya"))
say toText(isList(items))
say toText(isTuple((1, 2)))
say toText(isDictionary({"name": "Maya"}))
say toText(isBoolean(True))
say toText(isNull(null))
say toText(round(3.5))
say toText(floor(3.9))
say toText(ceiling(3.1))
say toText(absolute(-5))
\`\`\`
`;
