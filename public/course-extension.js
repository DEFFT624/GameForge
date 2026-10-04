export const extraLessons = [
  {
    id: 'inventory', title: 'Pack an adventurer’s inventory', topic: 'Lists & indexing', minutes: 14,
    body: 'A List<string> is an ordered collection of text values. Add appends an item. Remove deletes the first matching item. Indexing starts at zero, so the first item is inventory[0].',
    code: 'using System.Collections.Generic;\n\nList<string> inventory = new List<string> { "Sword", "Potion" };\ninventory.Add("Key");\ninventory.Remove("Potion");\nConsole.WriteLine(inventory[1]);',
    explanation: 'The braces after new List<string> list the starting items. After Add, the list holds Sword, Potion, Key. Removing Potion leaves Sword, Key. Index 1 now refers to Key. Count is the number of items, so the last valid index is Count - 1. Accessing an index outside the list throws an exception. An empty list has no valid item index. Contains("Potion") checks for an item without removing it; Remove returns true if it removed an item. The using line imports the list namespace and is optional when your console template enables implicit imports.',
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
    explanation: 'The text "2" parses successfully and falls between 1 and 3, so this prints Accepted. All the conditions joined by && must be true; it stops checking as soon as one is false. "abc" fails parsing, and "9" parses but fails the range check. A real console menu can get text from Console.ReadLine(), which can return null; TryParse handles null by returning false. In a real menu loop, first read string? line = Console.ReadLine(); then use if (line == null) { break; } before parsing line. The ? means the string may be missing. Here break exits the menu loop, so end-of-input cannot cause endless retries.',
    question: 'If input were "9", what would the program print?', answers: ['Accepted', '9', 'Try again'], correct: 2,
    hint: 'Parsing a number does not mean it is an allowed menu choice.'
  },
  {
    id: 'states', title: 'Move between game states', topic: 'Game states · loop', minutes: 16,
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
  states: {prompt:'Fill the blank with the keyword that ends this switch section and continues after the switch.',code:'case GameState.Combat:\n    state = GameState.GameOver;\n    ____;',answer:'break',hint:'It breaks out of the switch, not the surrounding loop.'}
};

const buildGuides = {
  "status": {
    "goal": "Create your hero before adding enemies or menus.",
    "review": [
      "health",
      "class-fields",
      "characters"
    ],
    "steps": [
      "In the GameForgeRpg project from Step 0, keep top-level statements at the top of Program.cs and your Character class below them.",
      "Give Character a public string Name field starting at \"Nova\" and a public int Health field starting at 100. Create a hero with new Character().",
      "Print hero.Name and hero.Health with two separate Console.WriteLine calls. Create a second character, change only hero.Health, and print both health values."
    ],
    "checks": [
      "The first two lines are Nova and 100.",
      "After setting hero.Health to 80, the second character still has 100 health."
    ],
    "stuck": "Use two new Character() expressions. Assigning rival = hero gives both variables the same object; it does not make a copy."
  },
  "fight": {
    "goal": "Finish one predictable fight before adding player choices.",
    "review": [
      "decisions",
      "loops",
      "characters",
      "while-loop"
    ],
    "steps": [
      "Create enemy with new Character() and set enemy.Health to 25. Add the TakeDamage method from the characters lesson to Character so damage cannot make health negative. Start the hero at 100 health.",
      "Use while (enemy.Health > 0 && hero.Health > 0). Each turn, call enemy.TakeDamage(10) and print enemy.Health.",
      "If the enemy is still alive, call hero.TakeDamage(8). The next loop condition stops combat when either health reaches zero. Do not let a defeated enemy attack."
    ],
    "checks": [
      "With hero health 100, enemy health prints 15, 5, 0 and hero health ends at 84. There is no fourth hero attack.",
      "For a separate defeat test, start hero health at 10. The first exchange leaves hero health 2; the second leaves enemy health 5 and hero health 0, and combat stops. Restore hero health to 100 afterward."
    ],
    "stuck": "Trace the condition before the turn, the damage, and the new condition. Check enemy health again before its attack, because the hero may just have defeated it."
  },
  "menu": {
    "goal": "Read one player choice safely, then connect it to combat.",
    "review": [
      "input",
      "while-loop",
      "switch-choice"
    ],
    "steps": [
      "Create bool running = true before a while (running) loop. Print a menu with 1 for Attack, 2 for Potion, and 3 for Quit inside it.",
      "Use string? line = Console.ReadLine(); to read text. Before the switch, check if (line == null) and break out of the loop. null means input has ended; an empty line is still text.",
      "Use int.TryParse and check that the choice is between 1 and 3. For invalid input, print a helpful message and continue; continue skips the rest of this loop turn.",
      "Use switch to choose the action. For Quit, set a bool running variable to false. A break inside a switch leaves the switch, so the loop must also check running.",
      "Only Attack and a successful Potion use a turn. Run the enemy counterattack only after those actions, while the game is still running and both characters are alive. Quit, invalid input, and failed potion use must not trigger damage."
    ],
    "checks": [
      "abc, an empty line, 0, and 9 show an error and re-prompt without changing health or inventory.",
      "1 selects Attack, 2 selects Potion, and 3 ends the game.",
      "If Console.ReadLine returns null, the program exits instead of repeating forever."
    ],
    "stuck": "Get the menu working with messages such as \"Attack selected\" first. Add damage only after validation succeeds. Do not use int.Parse for this beginner menu."
  },
  "potion": {
    "goal": "Make healing depend on an item the hero actually owns.",
    "review": [
      "inventory",
      "methods",
      "decisions"
    ],
    "steps": [
      "Create a List<string> containing \"Potion\". If your project does not use implicit imports, add using System.Collections.Generic; at the top of Program.cs.",
      "When the player chooses Potion, first check whether hero.Health is already 100. If it is, print \"Already at full health\" and leave the inventory unchanged.",
      "Otherwise, call inventory.Remove(\"Potion\") inside an if condition. Remove returns true only when it finds and removes an item; do not remove a second time.",
      "On success, set hero.Health = Math.Min(100, hero.Health + 25). On failure, print \"No potions left\" and keep health unchanged."
    ],
    "checks": [
      "At 60 health with a potion, health becomes 85 and the potion disappears.",
      "At 90 health with a potion, health becomes 100.",
      "At 100 health, a potion is not consumed. With no potion, health does not change."
    ],
    "stuck": "Each test starts with its own stated health and inventory. The 100-health check must happen before Remove, because Remove changes the list. Test these health values before the enemy counterattack. In combat, a successful potion uses a turn and can then be followed by 8 enemy damage."
  },
  "rooms": {
    "goal": "Reuse your working combat in a three-room adventure.",
    "review": [
      "characters",
      "enum-state",
      "switch-choice",
      "states"
    ],
    "steps": [
      "Add roomNumber = 1 and states Exploring, Combat, and GameOver. Keep the enum declaration below the top-level statements. Initialize Character enemy = new Character(); before the game loop so Combat can access it on later turns.",
      "In Exploring, announce the room, assign enemy = new Character(); and enemy.Health = 25; then change the state to Combat. Only create an enemy when entering a new room.",
      "In Combat, use the validated menu. Replace the earlier running flag with a loop that checks state != GameState.GameOver. For both Quit and null input, set state to GameOver and skip all attacks; break inside a switch alone will not stop the loop.",
      "After an enemy is defeated, increase roomNumber once. Return to Exploring if another room remains; after room 3, go to GameOver instead of creating room 4. Hero health and inventory carry between rooms."
    ],
    "checks": [
      "The game enters rooms 1, 2, and 3 exactly once each.",
      "A second attack uses the enemy’s remaining health, not a fresh 25.",
      "Hero damage and potion use persist when entering the next room."
    ],
    "stuck": "Changing state does not instantly execute another switch case. The next loop iteration handles the new state. Keep setup in Exploring and turn-by-turn actions in Combat."
  },
  "endings": {
    "goal": "Make each ending explicit and test the complete adventure.",
    "review": [
      "decisions",
      "while-loop",
      "states"
    ],
    "steps": [
      "Print a victory message only after the third enemy is defeated and the hero is still alive.",
      "If hero health reaches zero, print a defeat message and stop. A Quit choice should print a farewell and stop without a victory message.",
      "Check game-over conditions before starting another room or enemy turn. Use a clearly named variable or state to remember why the game ended.",
      "Run the test cases below from fresh starting values. Keep damage fixed until all cases work; randomized damage is an optional later topic."
    ],
    "checks": [
      "Victory: defeat three enemies and see one victory message, with no room 4.",
      "Defeat: temporarily start with low hero health, lose a fight, and see no further attacks.",
      "Quit: choose 3 in the first room and confirm there is no damage or victory message.",
      "End-of-input: end input during Combat and confirm the game exits without more prompts, attacks, or a victory message.",
      "Invalid input and unavailable potions never crash the game. Restore normal starting values after testing."
    ],
    "stuck": "Write down the ending you expect before each test. If a message prints twice, look for both a message inside the loop and another after it."
  }
};

export const milestones = [
 {id:'status',title:'1. Introduce the hero',detail:'Create a Character with a name and health. Print its name and health on separate lines with Console.WriteLine. Check that changing one character does not change a separate instance.'},
 {id:'fight',title:'2. Resolve a tiny fight',detail:'Give an enemy 25 health. Let the hero deal 10 damage per turn. Trace three turns, add an 8-damage enemy counterattack only while the enemy is alive, and check that health never drops below zero.'},
 {id:'menu',title:'3. Let the player choose',detail:'Offer Attack, Potion, and Quit. Use TryParse and a range check. Invalid text must re-prompt without dealing damage. End-of-input should exit cleanly.'},
 {id:'potion',title:'4. Use an inventory item',detail:'Store a Potion in a List<string>. Healing must not exceed 100. Consume a potion only when one exists; show a clear message when the inventory is empty.'},
 {id:'rooms',title:'5. Connect three rooms',detail:'Use game states to move from exploration to combat and back. Give each room one encounter. Use fixed damage first so you can trace every turn.'},
 {id:'endings',title:'6. Add victory, defeat, and quit',detail:'Stop the loop on victory, zero health, or Quit. Test all three endings. Optional next step: randomized damage after the fixed version works (uses Random, not covered yet).'}
].map(milestone => ({...milestone, guide: buildGuides[milestone.id]}));

export function checkPractice(lessonId, input) {
  return typeof input === 'string' && !!practices[lessonId] && input.trim() === practices[lessonId].answer;
}
