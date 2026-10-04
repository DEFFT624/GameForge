// Rows describe first-party examples; they are teaching text, not an interpreter.
// Columns: instruction, values after this step, newly printed line (null = none).
export const lessonTraces = {
  health: [
    ['Create health', 'health = 100', null],
    ['Subtract 25, then store the result', 'health = 75', null],
    ['Print health', 'health = 75', '75']
  ],
  decisions: [
    ['Create health', 'health = 0', null],
    ['Check health <= 0', '0 <= 0 is true', null],
    ['Run the if branch; skip else', 'health = 0', 'Game over']
  ],
  loops: [
    ['Initialize enemy; check enemy < 3', 'enemy = 0; condition true', null],
    ['Run the body, then increment enemy', 'enemy = 1', 'Enemy spawned'],
    ['Check 1 < 3; run the body; increment', 'enemy = 2', 'Enemy spawned'],
    ['Check 2 < 3; run the body; increment', 'enemy = 3', 'Enemy spawned'],
    ['Check 3 < 3; stop', 'enemy = 3 at the final condition check', null]
  ],
  'while-loop': [
    ['Create turns', 'turns = 2', null],
    ['Check 2 > 0; print, then subtract 1', 'turns = 1 after the body', '2'],
    ['Check 1 > 0; print, then subtract 1', 'turns = 0 after the body', '1'],
    ['Check 0 > 0; stop', 'turns = 0', null]
  ],
  'call-function': [
    ['Define Cheer', 'The action exists; it has not run', null],
    ['Call Cheer the first time', 'The print instruction runs once', 'Ready!'],
    ['Call Cheer the second time', 'The same print instruction runs again', 'Ready!']
  ],
  'function-inputs': [
    ['Define AddBonus', 'The function has not been called', null],
    ['Call AddBonus(10)', 'coins = 10 inside this call', null],
    ['Return coins + 5', 'The returned result is 15', null],
    ['Store the result in reward', 'reward = 15', null],
    ['Print reward', 'reward = 15', '15']
  ],
  methods: [
    ['Call Heal(90, 25)', 'health = 90; amount = 25 inside the call', null],
    ['Calculate health + amount', 'The sum is 115', null],
    ['Return Math.Min(100, 115)', 'The returned result is 100', null],
    ['Print the returned result', 'No outside health variable was changed', '100']
  ],
  inventory: [
    ['Create the list', '[0] Sword; [1] Potion', null],
    ['Add Key', '[0] Sword; [1] Potion; [2] Key', null],
    ['Remove Potion', '[0] Sword; [1] Key', null],
    ['Read index 1 and print it', 'Count = 2; index 1 is Key', 'Key']
  ],
  'class-fields': [
    ['Create a Character for hero', 'hero.Health = 100', null],
    ['Assign 80 to hero.Health', 'hero.Health = 80', null],
    ['Print the field', 'hero.Health = 80', '80']
  ],
  characters: [
    ['Create hero', 'hero.Health = 100', null],
    ['Create a separate rival', 'hero.Health = 100; rival.Health = 100', null],
    ['Call hero.TakeDamage(20)', 'amount = 20 in the hero method call', null],
    ['Store the clamped subtraction in hero.Health', 'hero.Health = 80; rival.Health = 100', null],
    ['Print rival.Health', 'rival still has its own field', '100']
  ],
  input: [
    ['Create the input text', 'input = "2"', null],
    ['Try to parse it', 'TryParse returns true; choice = 2', null],
    ['Check the lower bound', '2 >= 1 is true', null],
    ['Check the upper bound', '2 <= 3 is true', null],
    ['All three conditions passed; run if', 'choice = 2', 'Accepted']
  ],
  'enum-state': [
    ['Create state', 'state = Exploring', null],
    ['Assign Combat', 'state = Combat', null],
    ['Print the current named value', 'state = Combat', 'Combat']
  ],
  'switch-choice': [
    ['Create state', 'state = Combat', null],
    ['Match the Combat case', 'Only the matching case runs', 'Attack'],
    ['break leaves the switch', 'state is still Combat; the program ends', null]
  ],
  states: [
    ['Create state', 'state = Exploring', null],
    ['First while check: Exploring != GameOver', 'Condition true; enter the loop', null],
    ['Run Exploring case; change state; break', 'state = Combat; leave the switch only', 'Enter combat'],
    ['Second while check: Combat != GameOver', 'Condition true; enter the loop again', null],
    ['Run Combat case; change state; break', 'state = GameOver; leave the switch only', 'Victory'],
    ['Third while check: GameOver != GameOver', 'Condition false; stop the loop', null]
  ]
};
