// Small prerequisite lessons for concepts used by the later game examples.
export const bridges = [
  {
    id: 'strings', title: 'Give your hero a text greeting', topic: 'Strings & joining text', minutes: 7,
    body: 'A string stores text. Double quotes mark literal text; an unquoted variable name reads the text stored in that variable. The + operator can join strings.',
    code: 'string heroName = "Nova";\nstring greeting = "Welcome, " + heroName;\nConsole.WriteLine(greeting);',
    explanation: 'The greeting joins Welcome, followed by a space, with the value Nova. Quotes belong to the code and do not print. Joining strings is called concatenation. The space inside "Welcome, " matters: without it the words would touch.',
    question: 'What does this program print?', answers: ['Welcome, heroName', 'Welcome, Nova', 'Nova'], correct: 1,
    hint: 'heroName is outside the quotes, so read its stored value.',
    practice: {prompt: 'Choose the type that stores a hero name as text.', code: '____ heroName = "Nova";', answer: 'string', hint: 'Use the lowercase type name for text.'},
    guide: {
      goal: 'Tell literal text apart from a variable and join two text values.',
      before: 'You stored a whole number in health. Now store a name using a different type.',
      words: [['string', 'A type for text.'], ['literal', 'A value written directly in the code, such as "Nova".'], ['double quotes', 'Mark where literal string text starts and ends.'], ['concatenation', 'Joining strings into one text value with +.']],
      steps: ['Store the text Nova in heroName.', 'Read heroName and join it to the literal text Welcome, and its trailing space.', 'Store Welcome, Nova in greeting.', 'Read greeting and print it without code quotation marks.'],
      output: 'Welcome, Nova', mistake: '"heroName" is literal text, not the variable. With strings, "2" + "3" gives "23"; adding the numbers 2 + 3 gives 5.',
      tryIt: 'Change heroName to "Mira". What changes in the output?', solution: 'Welcome, Mira. The greeting reads the name value when that assignment runs.',
      why: ['This would happen if heroName were inside quotes in the greeting.', 'Correct: the variable contributes Nova to the greeting.', 'Nova is only the name; greeting also contains Welcome, and a space.'],
      practiceWhy: 'string stores text. int would store a whole number, not this quoted name.'
    },
    lab: {prompt: 'Follow the text through its second assignment.', code: 'string message = "Coin";\nmessage = message + " found";\nConsole.WriteLine(message);', output: 'Coin found', hint: 'The second string starts with a space.', why: 'The new message joins Coin with a space and found, then replaces the old value.', change: 'Remove the space before found. What prints?', changeWhy: 'Coinfound. Joining strings does not insert spaces automatically.'},
    trace: [['Create heroName', 'heroName = "Nova"', null], ['Join the text and store greeting', 'greeting = "Welcome, Nova"', null], ['Print greeting', 'The two text values are joined', 'Welcome, Nova']]
  },
  {
    id: 'booleans', title: 'Store a yes-or-no answer', topic: 'Booleans & comparisons', minutes: 7,
    body: 'A bool holds either true or false. A comparison asks a yes-or-no question, such as whether health is greater than zero. Store its answer when you need it.',
    code: 'int health = 20;\nbool alive = health > 0;\nConsole.WriteLine(alive);',
    explanation: '20 > 0 is true, so alive stores true. WriteLine formats a bool as True or False with a capital first letter. In C# code the keywords true and false are lowercase and have no quotes.',
    question: 'What does this program print?', answers: ['True', '20', 'False'], correct: 0,
    hint: 'The final line prints the comparison result stored in alive, not health.',
    practice: {prompt: 'Choose the type for a true-or-false flag.', code: '____ hasKey = true;', answer: 'bool', hint: 'Use the lowercase C# type name for a yes-or-no value.'},
    guide: {
      goal: 'Read a comparison and store its true-or-false result.',
      before: 'You know whole numbers and text. A bool is a third type, useful for flags and conditions.',
      words: [['bool', 'A type with two possible values: true or false.'], ['comparison', 'Ask a question about values and get a bool result.'], ['>', 'Greater than. Equality does not pass this comparison.'], ['flag', 'A true-or-false value describing a condition, such as hasKey.']],
      steps: ['Store the whole number 20 in health.', 'Compare 20 with zero. It is greater, so the result is true.', 'Store that result in alive.', 'Print alive. WriteLine displays True.'],
      output: 'True', mistake: 'A stored comparison is a snapshot. Changing health later does not automatically recalculate alive; assign alive = health > 0 again when you need a fresh result.',
      tryIt: 'Change the starting health to 0. What prints?', solution: 'False. Zero is not greater than zero.',
      why: ['Correct: 20 is greater than zero, so alive stores true.', '20 is health, but the final line prints alive.', 'False would print if health were zero or below it.'],
      practiceWhy: 'bool stores a true-or-false value. true is a keyword, not quoted text.'
    },
    lab: {prompt: 'Check a boundary: does zero count as alive?', code: 'int health = 0;\nbool alive = health > 0;\nConsole.WriteLine(alive);', output: 'False', hint: 'Greater than does not include equality.', why: '0 > 0 is false. The console formats that bool as False.', change: 'Use health = 1 in the first line. What prints?', changeWhy: 'True, because 1 is greater than zero.'},
    trace: [['Create health', 'health = 20', null], ['Compare health > 0 and store it', 'alive = true', null], ['Print alive', 'health is still 20; alive is true', 'True']]
  },
  {
    id: 'combined-conditions', title: 'Require two things to open a door', topic: 'Combining conditions', minutes: 8,
    body: 'Sometimes a game needs more than one check. && means AND: both sides must be true. Here the hero must have a key and have health above zero.',
    code: 'bool hasKey = true;\nint health = 0;\nif (hasKey && health > 0)\n{\n    Console.WriteLine("Door open");\n}\nelse\n{\n    Console.WriteLine("Cannot enter");\n}',
    explanation: 'hasKey is true, but health > 0 is false. Both checks are required, so the whole condition is false and else runs. && stops checking as soon as its left side is false. || means OR and needs at least one true side; ! reverses one true-or-false result.',
    question: 'Which message appears?', answers: ['Door open', 'Cannot enter', 'Both messages'], correct: 1,
    hint: 'Having a key passes one check. Does zero health pass the other?',
    practice: {prompt: 'Require both a key and positive health.', code: 'if (hasKey ____ health > 0)', answer: '&&', hint: 'Use the two-symbol operator meaning AND.'},
    guide: {
      goal: 'Evaluate each side of an AND condition before choosing a branch.',
      before: 'You can store a bool and choose an if/else branch. Now combine two checks.',
      words: [['&&', 'AND: both sides must be true.'], ['||', 'OR: at least one side must be true.'], ['!', 'NOT: reverse a bool result, such as !hasKey.'], ['short-circuit', 'Stop checking when the result is already known. AND skips its right side if the left side is false.']],
      steps: ['hasKey stores true and health stores 0.', 'The left side of && is true, so check the right side too.', 'health > 0 is false.', 'true AND false is false, so skip Door open and print Cannot enter.'],
      output: 'Cannot enter', mistake: 'Using || would allow entry with just a key or just positive health. Choose the operator that matches the rule; = stores a value while == compares equality.',
      tryIt: 'Keep the key and change health to 10. What prints?', solution: 'Door open. Both sides of the AND condition are now true.',
      why: ['The hero has a key, but zero health fails the second requirement.', 'Correct: both checks are required, and one is false.', 'An if/else runs one branch, not both.'],
      practiceWhy: '&& requires both conditions. || would require only one of them.'
    },
    lab: {prompt: 'Positive health passes. Does the whole condition pass?', code: 'bool hasKey = false;\nint health = 5;\nif (hasKey && health > 0)\n{\n    Console.WriteLine("Open");\n}\nelse\n{\n    Console.WriteLine("Wait");\n}', output: 'Wait', hint: 'Look at hasKey first.', why: 'hasKey is false, so AND is false without evaluating the right side. The else branch prints Wait.', change: 'Change only hasKey to true. What prints?', changeWhy: 'Open. The key and positive-health checks both pass.'},
    trace: [['Create the starting values', 'hasKey = true; health = 0', null], ['Evaluate both required checks', 'true && false gives false', null], ['Choose else; skip if', 'The door rule did not pass', 'Cannot enter']]
  },
  {
    id: 'list-loop', title: 'Read every item in the inventory', topic: 'foreach & list items', minutes: 8,
    body: 'A foreach loop visits each item in a collection in order. You name a temporary variable for the current item and use it inside the loop body. No numeric index is needed.',
    code: 'using System.Collections.Generic;\n\nList<string> inventory = new List<string> { "Sword", "Potion" };\nforeach (string item in inventory)\n{\n    Console.WriteLine(item);\n}',
    explanation: 'On the first pass, item holds Sword. On the second, it holds Potion. After the last item, the loop stops. An empty list runs the body zero times. item is available inside the loop body, not after it.',
    question: 'Which output appears, in order?', answers: ['Sword only', 'Sword, then Potion on a new line', 'Potion, then Sword on a new line'], correct: 1,
    hint: 'The list has two starting items. foreach visits them in their stored order.',
    practice: {prompt: 'Use the loop that visits each item directly.', code: '____ (string item in inventory)', answer: 'foreach', hint: 'It starts with for and ends with each, as one lowercase word.'},
    guide: {
      goal: 'Follow the current item through each pass of a list loop.',
      before: 'You can add, remove, and index list items. Now read every item without managing an index.',
      words: [['foreach', 'Repeat a body once for each item in a collection.'], ['item', 'A name chosen for the current value; any valid variable name could be used.'], ['in', 'Separate the current-item declaration from the collection being visited.'], ['scope', 'The region where a variable name can be used. item is scoped to this loop body.']],
      steps: ['Create inventory with Sword followed by Potion.', 'The first pass assigns Sword to item and prints it.', 'The second pass assigns Potion to item and prints it.', 'There are no more items, so the loop stops.'],
      output: 'Sword\nPotion', mistake: 'Do not Add or Remove items from this List while this foreach is visiting it; changing the collection can throw an exception. In the RPG, remove a potion outside a foreach loop.',
      tryIt: 'Add Key to the starting list. What extra line appears?', solution: 'Key prints after Potion because it is the third item in the starting list.',
      why: ['The loop visits all items, so it does not stop after Sword.', 'Correct: foreach reads Sword and then Potion in their list order.', 'The list stores Sword before Potion; foreach does not reverse it.'],
      practiceWhy: 'foreach visits each item. A for loop would need its own start, condition, and update.'
    },
    lab: {prompt: 'An item was removed before iteration. Predict each printed line.', code: 'using System.Collections.Generic;\n\nList<string> inventory = new List<string> { "Sword", "Potion", "Key" };\ninventory.Remove("Potion");\nforeach (string item in inventory)\n{\n    Console.WriteLine(item);\n}', output: 'Sword\nKey', hint: 'Write the remaining list before tracing the loop.', why: 'Remove happens before iteration. The remaining items are Sword and Key, so those print in order.', change: 'Replace the starting items with an empty list: new List<string>(). What prints?', changeWhy: 'Nothing. The collection has no items, so foreach never enters its body.'},
    trace: [['Create inventory', '[0] Sword; [1] Potion', null], ['First foreach pass', 'item = "Sword"', 'Sword'], ['Second foreach pass', 'item = "Potion"', 'Potion'], ['No more items; stop', 'inventory still contains both items', null]]
  }
];
