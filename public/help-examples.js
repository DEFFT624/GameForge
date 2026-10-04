export const helpExamples = [
  {
    id: 'semicolon', kind: 'compiler', title: 'CS1002 · a statement needs a semicolon', diagnostic: 'CS1002',
    broken: 'Console.WriteLine("Hello")',
    fixed: 'Console.WriteLine("Hello");', output: 'Hello',
    explanation: 'This printing statement is missing its ending semicolon. Check the reported line and the one above it when reading a syntax error; the compiler reports where it noticed a problem. Other missing-semicolon situations can produce a different syntax-error code. Do not add a semicolon after an if or loop condition just to silence an error; that can change its behavior.',
    check: 'Add only the missing semicolon, save, then run again. You should see Hello.',
    source: 'https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs1002'
  },
  {
    id: 'capitalization', kind: 'compiler', title: 'CS0117 · check the exact member name', diagnostic: 'CS0117',
    broken: 'Console.Writeline("Hello");', fixed: 'Console.WriteLine("Hello");', output: 'Hello',
    explanation: 'Console has WriteLine with a capital L. Writeline is a different spelling, so that member is not found. Compare each letter with the example. A misspelled variable name can produce a different code, such as CS0103; the first error message tells you which name to check.',
    check: 'Correct WriteLine, save, and run. The output should be Hello.',
    source: 'https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs0117'
  },
  {
    id: 'type', kind: 'compiler', title: 'CS0029 · text and a number are different types', diagnostic: 'CS0029',
    broken: 'int health = "100";\nConsole.WriteLine(health);',
    fixed: 'int health = 100;\nConsole.WriteLine(health);', output: '100',
    explanation: 'Quotes make "100" a string, but this variable is an int. This fixed value should be a number, so remove the quotes. When the value comes from a player typing, use the input lesson and TryParse instead of assuming every string is a valid number.',
    check: 'Use the unquoted whole number 100, save, and run. You should see 100.',
    source: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/cs0029'
  },
  {
    id: 'index', kind: 'runtime', title: 'ArgumentOutOfRangeException · the item is not there', diagnostic: 'ArgumentOutOfRangeException',
    broken: 'using System.Collections.Generic;\n\nList<string> inventory = new List<string> { "Sword" };\nConsole.WriteLine(inventory[1]);',
    fixed: 'using System.Collections.Generic;\n\nList<string> inventory = new List<string> { "Sword" };\nif (inventory.Count > 1)\n{\n    Console.WriteLine(inventory[1]);\n}\nelse\n{\n    Console.WriteLine("No second item");\n}', output: 'No second item',
    explanation: 'This code compiles, but the list has one item at index 0. There is no item at index 1, so reading it throws an exception while the program runs. If you need the second item, check that Count is greater than 1 first. If you meant the first item, use index 0 and make sure the list is not empty.',
    check: 'Run the guarded version: No second item should print. Add Potion as the second starting item; then Potion should print.',
    source: 'https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.item?view=net-10.0'
  },
  {
    id: 'one-extra', kind: 'logic', title: 'One extra enemy · the program runs but the rule is wrong',
    broken: 'for (int enemy = 0; enemy <= 3; enemy++)\n{\n    Console.WriteLine("Enemy spawned");\n}', actual: 'Enemy spawned\nEnemy spawned\nEnemy spawned\nEnemy spawned',
    fixed: 'for (int enemy = 0; enemy < 3; enemy++)\n{\n    Console.WriteLine("Enemy spawned");\n}', output: 'Enemy spawned\nEnemy spawned\nEnemy spawned',
    explanation: '<= 3 includes the counter value 3. Starting at zero gives four passes: 0, 1, 2, and 3. The compiler cannot know that your design wanted three enemies. Trace the values and use < 3 so only 0, 1, and 2 enter the body.',
    check: 'Count the printed lines before and after the repair. Expect four before it and three after it.',
    source: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements'
  }
];
