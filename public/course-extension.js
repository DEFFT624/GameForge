export const extraLessons = [
  {
    id: 'inventory', title: 'Pack an adventurer’s inventory', topic: 'Lists & indexing', minutes: 14,
    body: 'A List<string> is an ordered collection of text values. Add appends an item. Remove deletes the first matching item. Indexing starts at zero, so the first item is inventory[0].',
    code: 'using System.Collections.Generic;\n\nList<string> inventory = new List<string> { "Sword", "Potion" };\ninventory.Add("Key");\ninventory.Remove("Potion");\nConsole.WriteLine(inventory[1]);',
    explanation: 'After Add, the list holds Sword, Potion, Key. Removing Potion leaves Sword, Key. Index 1 now refers to Key. Count is the number of items, so the last valid index is Count - 1. Accessing an index outside the list throws an exception. An empty list has no valid item index.',
    question: 'Which item does this program print?', answers: ['Key', 'Potion', 'Sword'], correct: 0,
    hint: 'Write down the list after removing Potion, then count positions from zero.'
  },
  {
    id: 'characters', title: 'Create two distinct characters', topic: 'Classes & objects', minutes: 16,
    body: 'A class describes a kind of object. Each new Character() creates a separate instance with its own Health field. An instance method can read and change the fields of the object it belongs to.',
    code: 'Character hero = new Character();\nCharacter rival = new Character();\nhero.TakeDamage(20);\nConsole.WriteLine(rival.Health);\n\nclass Character\n{\n    public int Health = 100;\n\n    public void TakeDamage(int amount)\n    {\n        Health = Math.Max(0, Health - Math.Max(0, amount));\n    }\n}',
    explanation: 'Only hero takes damage, so hero.Health becomes 80 while rival.Health stays 100. public allows access from outside the class; void means this method returns no value. The class declaration comes after the top-level statements. If you wrote Character rival = hero instead, both variables would refer to the same object. This example assumes health starts between 0 and 100.',
    question: 'What does rival.Health print?', answers: ['80', '100', '0'], correct: 1,
    hint: 'There are two new objects. Which one receives the TakeDamage call?'
  },
  {
    id: 'input', title: 'Handle an unexpected menu choice', topic: 'Parsing & validation', minutes: 14,
    body: 'Player input starts as text. int.TryParse checks whether text represents an integer. It returns true or false and uses out to provide the parsed number. Validate the allowed range as well as the type.',
    code: 'string input = "2";\nif (int.TryParse(input, out int choice) && choice >= 1 && choice <= 3)\n{\n    Console.WriteLine("Accepted");\n}\nelse\n{\n    Console.WriteLine("Try again");\n}',
    explanation: 'The text "2" parses successfully and falls between 1 and 3, so this prints Accepted. && means both conditions must be true; it stops checking as soon as one is false. "abc" fails parsing, and "9" parses but fails the range check. A real console menu can get text from Console.ReadLine(), which can return null; TryParse handles null by returning false.',
    question: 'If input were "9", what would the program print?', answers: ['Accepted', '9', 'Try again'], correct: 2,
    hint: 'Parsing a number does not mean it is an allowed menu choice.'
  },
  {
    id: 'states', title: 'Move between game states', topic: 'Enums & switch', minutes: 16,
    body: 'An enum gives readable names to a set of values. A switch chooses a section based on the current value. A while loop repeats as long as its condition remains true.',
    code: 'GameState state = GameState.Exploring;\nwhile (state != GameState.GameOver)\n{\n    switch (state)\n    {\n        case GameState.Exploring:\n            Console.WriteLine("Enter combat");\n            state = GameState.Combat;\n            break;\n        case GameState.Combat:\n            Console.WriteLine("Victory");\n            state = GameState.GameOver;\n            break;\n        default:\n            state = GameState.GameOver;\n            break;\n    }\n}\n\nenum GameState { Exploring, Combat, GameOver }',
    explanation: 'The first loop iteration changes Exploring to Combat. break exits the switch, not the while loop. The second iteration changes Combat to GameOver. Now the while condition is false, so the loop stops. The enum declaration follows the top-level statements. A real game would wait for input and apply rules before changing state.',
    question: 'How many times does the while loop body run?', answers: ['2', '3', 'Forever'], correct: 0,
    hint: 'Trace the state at the start of each iteration: Exploring, Combat, then GameOver.'
  }
];

export const practices = {
  health: {prompt:'Fill the blank with the whole-number type.',code:'____ health = 100;',answer:'int',hint:'It is the three-letter type used in this lesson.'},
  decisions: {prompt:'Fill the blank with the operator meaning “less than or equal to”.',code:'if (health ____ 0) { Console.WriteLine("Game over"); }',answer:'<=',hint:'Write the less-than symbol followed by equals.'},
  loops: {prompt:'Choose the exclusive upper bound to spawn exactly five enemies, starting at zero.',code:'for (int enemy = 0; enemy < ____; enemy++)',answer:'5',hint:'The values should be 0, 1, 2, 3, and 4.'},
  methods: {prompt:'Fill the blank with the keyword that sends a result back.',code:'____ Math.Min(100, health + amount);',answer:'return',hint:'A method returns a value to its caller.'},
  inventory: {prompt:'Fill the blank with the index of the first item.',code:'Console.WriteLine(inventory[____]);',answer:'0',hint:'C# lists use zero-based indexing.'},
  characters: {prompt:'Fill the blank with the keyword that creates an object.',code:'Character hero = ____ Character();',answer:'new',hint:'Each new object has its own instance state.'},
  input: {prompt:'Fill the blank with the method name that safely tries to parse an integer.',code:'int.____(input, out int choice)',answer:'TryParse',hint:'C# is case-sensitive. Capitalize T and P.'},
  states: {prompt:'Fill the blank with the keyword that exits this switch section.',code:'case GameState.Combat:\n    state = GameState.GameOver;\n    ____;',answer:'break',hint:'It breaks out of the switch, not the surrounding loop.'}
};

export const milestones = [
 {id:'status',title:'1. Introduce the hero',detail:'Create a Character with a name and health. Print its starting status. Check that changing one character does not change a separate instance.'},
 {id:'fight',title:'2. Resolve a tiny fight',detail:'Give an enemy 30 health. Let the hero deal 10 damage per turn. Trace three turns and check that health never drops below zero.'},
 {id:'menu',title:'3. Let the player choose',detail:'Offer Attack, Potion, and Quit. Use TryParse and a range check. Invalid text must re-prompt without dealing damage. End-of-input should exit cleanly.'},
 {id:'potion',title:'4. Use an inventory item',detail:'Store a Potion in a List<string>. Healing must not exceed 100. Consume a potion only when one exists; show a clear message when the inventory is empty.'},
 {id:'rooms',title:'5. Connect three rooms',detail:'Use game states to move from exploration to combat and back. Give each room one encounter. Use fixed damage first so you can trace every turn.'},
 {id:'endings',title:'6. Add victory, defeat, and quit',detail:'Stop the loop on victory, zero health, or Quit. Test all three endings. Optional next step: randomized damage after the fixed version works.'}
];

export function checkPractice(lessonId, input) {
  return typeof input === 'string' && !!practices[lessonId] && input.trim() === practices[lessonId].answer;
}
