// The next module builds on the original foundations without changing their saved IDs.
export const gameDataLessons = [
  {
    id: 'interpolation', title: 'Build a readable status message', topic: 'Strings · interpolation', minutes: 8,
    body: 'A game often needs a message containing both words and changing values. An interpolated string starts with $ before its opening quote. Put a value or expression inside braces to insert its result into the text.',
    code: 'string heroName = "Nova";\nint health = 80;\nstring status = $"{heroName}: {health} HP";\nhealth = 60;\nConsole.WriteLine(status);\nConsole.WriteLine($"{heroName}: {health} HP");',
    explanation: 'The first message is created while health is 80. Changing health does not rebuild that stored string. The final WriteLine creates a fresh message using the current health, 60. $ belongs directly before the opening quote; it is not printed.',
    question: 'What does the first WriteLine print?', answers: ['Nova: 60 HP', 'Nova: 80 HP', '{heroName}: {health} HP'], correct: 1,
    hint: 'Find the value of health when status is assigned, rather than when it is printed.',
    practice: {prompt: 'Add the symbol that enables values inside the braces.', code: 'Console.WriteLine(____"Health: {health}");', answer: '$', hint: 'A single symbol goes immediately before the opening quote.'},
    guide: {
      goal: 'Insert values into a message and explain when those values are read.',
      before: 'You can join strings with + and update variables. This is a more readable way to build a status line.',
      words: [['interpolation', 'Insert the result of an expression into string text.'], ['$', 'Before the opening quote, enables interpolation.'], ['{health}', 'Read health and insert its value while creating this string.'], ['snapshot', 'A value created at one moment; it does not automatically refresh later.']],
      steps: ['Create heroName with Nova and health with 80.', 'Build status now: replace the braces with Nova and 80.', 'Change health to 60. The already-created status still contains 80.', 'Print the stored status, then build and print a fresh message containing 60.'],
      output: 'Nova: 80 HP\nNova: 60 HP',
      mistake: 'Without $, braces are just ordinary text inside the quotes. A stored string is not a live display: rebuild it when the values change.',
      tryIt: 'Move health = 60; above the status assignment. What do both lines print?',
      solution: 'Both print Nova: 60 HP. Both strings are now created after health changes.',
      why: ['60 is used by the second message, created after the change.', 'Correct: status was built when health was 80.', 'The $ tells C# to insert the values instead of printing the braces and names.'],
      practiceWhy: '$ enables interpolation, so {health} contributes the stored number to the message.'
    },
    lab: {prompt: 'Predict both lines. Watch when the message is created.', code: 'int coins = 5;\nstring message = $"Coins: {coins}";\ncoins = coins + 2;\nConsole.WriteLine(message);\nConsole.WriteLine($"Coins: {coins}");', output: 'Coins: 5\nCoins: 7', hint: 'Updating coins does not change the string already stored in message.', why: 'message contains Coins: 5. The second line creates a new string after coins becomes 7.', change: 'Replace coins + 2 with coins + 4. What changes?', changeWhy: 'The output is Coins: 5, then Coins: 9. Only the newly built message reads the updated total.'},
    trace: [['Create the starting values', 'heroName = "Nova"; health = 80', null], ['Create status', 'status = "Nova: 80 HP"', null], ['Change health', 'health = 60; status still contains 80', null], ['Print the stored string', 'status is unchanged', 'Nova: 80 HP'], ['Create and print a fresh string', 'The new message reads health = 60', 'Nova: 60 HP']]
  },
  {
    id: 'arrays', title: 'Put rooms in a fixed set of slots', topic: 'Arrays · indices & Length', minutes: 9,
    body: 'An array stores a fixed number of items of one type. string[] means an array of strings. Like a List, its first index is zero. Use Length to find how many slots the array has.',
    code: 'string[] rooms = { "Forest", "Cave", "Tower" };\nrooms[1] = "Mine";\nConsole.WriteLine(rooms[1]);\nConsole.WriteLine(rooms.Length);',
    explanation: 'The three slots have indices 0, 1, and 2. Assigning rooms[1] replaces Cave with Mine; it does not add a slot. Length remains 3. The array object keeps its length, while a List can add and remove items.',
    question: 'Which pair of output lines appears?', answers: ['Forest, then 3', 'Mine, then 4', 'Mine, then 3'], correct: 2,
    hint: 'Index 1 is the second slot. Replacing an item does not change the number of slots.',
    practice: {prompt: 'Read the number of slots in this array.', code: 'Console.WriteLine(rooms.____);', answer: 'Length', hint: 'Arrays use this property; Lists use Count. Keep the capital L.'},
    guide: {
      goal: 'Read and replace an array item without stepping outside its valid indices.',
      before: 'You have used List indices and foreach. Arrays use similar indexing but have a fixed length.',
      words: [['string[]', 'An array whose items are strings.'], ['index', 'The zero-based position of an item.'], ['Length', 'The number of array slots, not the last valid index.'], ['fixed length', 'This array object keeps the same number of slots after creation.']],
      steps: ['Create three slots: Forest at 0, Cave at 1, and Tower at 2.', 'Replace the value in slot 1 with Mine.', 'Read slot 1 and print Mine.', 'Print Length: there are still three slots.'], output: 'Mine\n3',
      mistake: 'rooms[rooms.Length] is outside the array. For a non-empty array, the last index is Length - 1. Before indexing, require index >= 0 and index < rooms.Length. Arrays do not have List.Add.',
      tryIt: 'Read rooms[2] instead of rooms[1] in the printing line. What prints?', solution: 'Tower, then 3. The assignment still changes slot 1; reading slot 2 chooses Tower.',
      why: ['Forest is at index 0, but this code reads index 1.', 'Replacing a value does not add a fourth slot.', 'Correct: slot 1 contains Mine and Length remains 3.'],
      practiceWhy: 'Length counts array slots. The valid indices are 0 through Length - 1 when the array is non-empty.'
    },
    lab: {prompt: 'Predict every line from this loop over an array.', code: 'string[] rooms = { "Gate", "Hall" };\nfor (int index = 0; index < rooms.Length; index++)\n{\n    Console.WriteLine(rooms[index]);\n}\nConsole.WriteLine(rooms.Length);', output: 'Gate\nHall\n2', hint: 'The body runs for indices 0 and 1, stopping before index 2.', why: 'The loop visits both valid slots. Length is 2, so index < 2 prevents an out-of-range read.', change: 'Replace index < rooms.Length with index < 1. What prints?', changeWhy: 'Gate, then 2. The loop visits only index 0; changing the loop condition does not shrink the array.'},
    trace: [['Create rooms', '[0] Forest; [1] Cave; [2] Tower; Length = 3', null], ['Replace slot 1', '[0] Forest; [1] Mine; [2] Tower', null], ['Read and print slot 1', 'rooms[1] = "Mine"', 'Mine'], ['Read and print Length', 'Length = 3', '3']]
  },
  {
    id: 'constructors', title: 'Give each new enemy a starting value', topic: 'Classes · constructors', minutes: 10,
    body: 'A constructor runs when an object is created. It has the same name as its class and no return type. Give it parameters when each new enemy needs its own starting name or health.',
    code: 'Enemy slime = new Enemy("Slime", 25);\nEnemy bat = new Enemy("Bat", 15);\nslime.Health = 10;\nConsole.WriteLine($"{slime.Name}: {slime.Health}");\nConsole.WriteLine($"{bat.Name}: {bat.Health}");\n\nclass Enemy\n{\n    public string Name;\n    public int Health;\n\n    public Enemy(string name, int health)\n    {\n        Name = name;\n        Health = health;\n    }\n}',
    explanation: 'Each new call creates a separate Enemy and runs its constructor. name and health are inputs for that call; Name and Health are the fields receiving them. C# distinguishes uppercase and lowercase names. This class has a two-input constructor, so these calls supply both inputs.',
    question: 'What does the bat have after slime.Health changes?', answers: ['Health 15', 'Health 10', 'Health 25'], correct: 0,
    hint: 'There are two new Enemy calls, creating two objects.',
    practice: {prompt: 'Complete the constructor name inside class Enemy.', code: 'public ____(string name, int health)', answer: 'Enemy', hint: 'A constructor has the same name and capitalization as its class.'},
    guide: {
      goal: 'Follow constructor arguments into the fields of two separate objects.',
      before: 'You know classes, fields, arguments, and interpolation. A constructor connects these ideas when an instance is created.',
      words: [['constructor', 'Special code that initializes a new instance.'], ['new Enemy(...)', 'Create an Enemy and supply its constructor arguments.'], ['Name = name', 'Store the lowercase parameter value in the uppercase field.'], ['no return type', 'A constructor has no int, string, or void before its name.']],
      steps: ['Create slime; its constructor receives Slime and 25 and stores those fields.', 'Create bat; a separate constructor call stores Bat and 15 in a separate object.', 'Change only slime.Health to 10.', 'Print each object: Slime: 10 and Bat: 15.'], output: 'Slime: 10\nBat: 15',
      mistake: 'Writing void Enemy(...) inside class Enemy is invalid C#: a constructor has the class name and no return type. An ordinary method needs a different name. This constructor stores exactly what it receives; it does not validate negative health. We use positive starting values here.',
      tryIt: 'Change the bat constructor argument from 15 to 30. Does the slime change?', solution: 'No. The lines become Slime: 10 and Bat: 30. Each constructor initializes its own new object.',
      why: ['Correct: bat is a separate object initialized with 15.', 'Only slime receives the assignment to 10.', '25 belongs to the slime starting value, not the bat.'],
      practiceWhy: 'Enemy matches the class name. Constructors initialize instances and do not declare a return type.'
    },
    lab: {prompt: 'Predict the output from one constructed enemy.', code: 'Enemy enemy = new Enemy("Goblin", 20);\nConsole.WriteLine($"{enemy.Name}: {enemy.Health}");\n\nclass Enemy\n{\n    public string Name;\n    public int Health;\n    public Enemy(string name, int health)\n    {\n        Name = name;\n        Health = health;\n    }\n}', output: 'Goblin: 20', hint: 'Follow both arguments into their corresponding fields.', why: 'The constructor stores Goblin in Name and 20 in Health before printing.', change: 'Change only the health argument from 20 to 35. What prints?', changeWhy: 'Goblin: 35. The constructor receives the new number; the name stays the same.'},
    trace: [['Create slime and run its constructor', 'slime.Name = "Slime"; slime.Health = 25', null], ['Create bat and run its constructor', 'bat.Name = "Bat"; bat.Health = 15', null], ['Change slime.Health', 'slime.Health = 10; bat.Health = 15', null], ['Print slime', 'Read the fields of slime', 'Slime: 10'], ['Print bat', 'Read the fields of bat', 'Bat: 15']]
  },
  {
    id: 'dictionary', title: 'Look up an item by its name', topic: 'Dictionaries · safe lookup', minutes: 10,
    body: 'A Dictionary connects unique keys to values. An item price table can connect a string name to an int price. TryGetValue checks whether a key exists and gives you its value if it does.',
    code: 'using System.Collections.Generic;\n\nDictionary<string, int> prices = new Dictionary<string, int>();\nprices.Add("Potion", 5);\nprices.Add("Sword", 12);\nstring item = "Potion";\nif (prices.TryGetValue(item, out int price))\n{\n    Console.WriteLine($"{item}: {price} coins");\n}\nelse\n{\n    Console.WriteLine("Item not found");\n}',
    explanation: 'string is the key type and int is the value type. Potion exists, so TryGetValue returns true and writes 5 into price. The if branch prints its price. A missing key returns false; this code prints a helpful message instead of directly indexing a missing entry.',
    question: 'What happens if item is changed to "Shield"?', answers: ['It prints Shield: 0 coins', 'It prints Item not found', 'It adds Shield to prices'], correct: 1,
    hint: 'Shield was never added. Follow the false result into else.',
    practice: {prompt: 'Use the method that checks a key and retrieves its value safely.', code: 'if (prices.____(item, out int price))', answer: 'TryGetValue', hint: 'Its name starts with Try and ends with Value. Match the capitals.'},
    guide: {
      goal: 'Retrieve a known price and handle an item name that is not present.',
      before: 'You have used collections, if/else, and out with TryParse. Here a key chooses an entry instead of a numeric position.',
      words: [['Dictionary<string, int>', 'A collection mapping string keys to whole-number values.'], ['key', 'The unique name used to find an entry, such as Potion.'], ['value', 'The data associated with a key, such as price 5.'], ['TryGetValue', 'Return whether the key exists and write its value to the out variable.']],
      steps: ['Create an empty table and add Potion with 5 and Sword with 12.', 'Set the requested item name to Potion.', 'Look up Potion: the method returns true and puts 5 in price.', 'The if branch prints Potion: 5 coins. The else branch is skipped.'], output: 'Potion: 5 coins',
      mistake: 'Adding the same key twice with Add throws an exception. Directly reading prices["Shield"] also throws when that key is absent. TryGetValue handles absence; check its bool result, because a failed int lookup writes 0 to the out variable.',
      tryIt: 'Change item to "Sword", then "Shield". What prints each time?', solution: 'Sword prints Sword: 12 coins. Shield prints Item not found because there is no matching key. The lookup does not add anything.',
      why: ['The false lookup takes the else branch rather than printing price 0.', 'Correct: the missing key makes TryGetValue return false.', 'TryGetValue reads the table; it does not insert a new entry.'],
      practiceWhy: 'TryGetValue supplies both an existence result and an out value. Only use the found price in the branch where it returns true.'
    },
    lab: {prompt: 'The table has Potion, but the request is different. Predict the output.', code: 'using System.Collections.Generic;\n\nDictionary<string, int> prices = new Dictionary<string, int>();\nprices.Add("Potion", 5);\nstring item = "Shield";\nif (prices.TryGetValue(item, out int price))\n{\n    Console.WriteLine($"{item}: {price} coins");\n}\nelse\n{\n    Console.WriteLine("Item not found");\n}', output: 'Item not found', hint: 'Compare the requested key with the key that was added.', why: 'Shield is absent. TryGetValue returns false, so else prints the missing-item message.', change: 'Change the requested item to Potion. What prints?', changeWhy: 'Potion: 5 coins. That key exists, so TryGetValue returns true and supplies its price.'},
    trace: [['Create and populate the price table', 'Potion -> 5; Sword -> 12', null], ['Choose the requested key', 'item = "Potion"', null], ['Try the lookup', 'found = true; price = 5', null], ['Run the matching branch', 'The table still has two entries', 'Potion: 5 coins']]
  }
];

export const gameDataModule = {
  id: 'toolbox', title: 'Expand your game data toolbox', ids: gameDataLessons.map(lesson => lesson.id),
  goal: 'Build status text, store fixed room data, initialize enemies, and look up item prices.',
  project: 'Extend your RPG one piece at a time: add a status line, named rooms, different enemy starting values, then a price table. You can revisit the simpler RPG first.',
  recap: ['Interpolated strings read values when each message is built.', 'Arrays have a fixed Length; a valid index is below Length.', 'A constructor initializes each new instance with its arguments.', 'Dictionary keys identify entries; handle a missing key before using its value.']
};

export const gameDataDebug = {
  title: 'The status message remembers old health', goal: 'After damage, print Health: 60.',
  code: 'int health = 80;\nstring status = $"Health: {health}";\nhealth = health - 20;\nConsole.WriteLine(status);', actual: 'Health: 80', expected: 'Health: 60',
  hint: 'When is the string built? Does changing health update an existing string?',
  fixed: 'int health = 80;\nhealth = health - 20;\nstring status = $"Health: {health}";\nConsole.WriteLine(status);',
  why: 'Build status after applying damage. The string captures the value used at its creation; it does not watch health for later changes.',
  test: 'Try damage 0 and 30. Build the message after damage each time: expect Health: 80 and Health: 50.'
};
