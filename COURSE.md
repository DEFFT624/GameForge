# C# foundations — initial test curriculum

The initial test build contains 10 modules and 39 lessons. It teaches console C# foundations, not every language feature or Unity. Each lesson has a required quiz and code blank, plus optional practice. Earlier 22 lesson IDs, answers, and ordering stay unchanged. The full teaching review unlocks after all 39 required pairs.

| Module | Lessons | Focus |
|---|---|---|
| 1. Values, choices, and repetition | 1–7 | Work with numbers, text, and true-or-false values; choose a branch and explain why a loop stops. |
| 2. Reusable actions | 8–10 | Call an action, pass an input, and use its returned result. |
| 3. Inventory, characters, and input | 11–15 | Work with a list, distinguish objects, and validate a menu choice. |
| 4. Connect the game loop | 16–18 | Name game states, choose an action, and trace a complete loop. |
| 5. Expand your game data toolbox | 19–22 | Build status text, store fixed room data, initialize enemies, and look up item prices. |
| 6. Organize code and handle failures | 23–25 | Separate definitions, reject invalid inputs, and handle a specific failure. |
| 7. Protect data and express game rules | 26–28 | Use private storage, controlled updates, and independently testable calculations. |
| 8. Choose relationships between objects | 29–32 | Choose is-a, can-do, and has-a relationships without unnecessary class hierarchies. |
| 9. Save data and test the rules | 33–36 | Separate JSON conversion, validation, file storage, and rule checks. |
| 10. Build, test, and polish your console RPG | 37–39 | Finish one playable path, enforce turn order, and test every ending before adding features. |

## Learning sequence

### 1. Values, choices, and repetition

- Give your player a heartbeat (8 minute guide) — health
- Give your hero a text greeting (7 minute guide) — strings
- Store a yes-or-no answer (7 minute guide) — booleans
- Make the game react (10 minute guide) — decisions
- Require two things to open a door (8 minute guide) — combined-conditions
- Spawn a wave of enemies (12 minute guide) — loops
- Repeat until a condition changes (7 minute guide) — while-loop

### 2. Reusable actions

- Call a named action (6 minute guide) — call-function
- Send a value in, get a result back (8 minute guide) — function-inputs
- Create a reusable ability (12 minute guide) — methods

### 3. Inventory, characters, and input

- Pack an adventurer’s inventory (14 minute guide) — inventory
- Read every item in the inventory (8 minute guide) — list-loop
- Give an object its own data (8 minute guide) — class-fields
- Create two distinct characters (16 minute guide) — characters
- Handle an unexpected menu choice (14 minute guide) — input

### 4. Connect the game loop

- Name the states of a game (6 minute guide) — enum-state
- Choose one action with switch (8 minute guide) — switch-choice
- Move between game states (16 minute guide) — states

### 5. Expand your game data toolbox

- Build a readable status message (8 minute guide) — interpolation
- Put rooms in a fixed set of slots (9 minute guide) — arrays
- Give each new enemy a starting value (10 minute guide) — constructors
- Look up an item by its name (10 minute guide) — dictionary

### 6. Organize code and handle failures

- Give your code a home (9 minute guide) — namespaces
- Reject a bad input early (9 minute guide) — guard-clauses
- Recover from a specific failure (10 minute guide) — exceptions

### 7. Protect data and express game rules

- Read a value without opening every write (9 minute guide) — properties
- Keep a counter behind a small interface (9 minute guide) — encapsulation
- Use a rule without creating an object (9 minute guide) — static-rules

### 8. Choose relationships between objects

- Reuse a base type deliberately (10 minute guide) — inheritance
- Let an enemy vary one behavior (10 minute guide) — virtual-methods
- Describe what different types can do (10 minute guide) — interfaces
- Give a character a separate backpack (10 minute guide) — composition

### 9. Save data and test the rules

- Turn simple game data into save text (10 minute guide) — json-save
- Validate data before accepting a save (12 minute guide) — json-load
- Write and read a small local save (12 minute guide) — save-file
- Test ordinary inputs and boundaries (11 minute guide) — rule-tests

### 10. Build, test, and polish your console RPG

- Write rules before adding features (10 minute guide) — project-plan
- Finish an action before allowing a reply (11 minute guide) — project-turn
- Prove the endings before polishing (14 minute guide) — project-playtest

## Initial test and later sharing

Open /test-guide.html for the initial test and friend-call plan. Take breaks between modules and record the first unclear instruction with its lesson link. Early observations do not require completing the course. The full teaching review remains gated by completion. After the initial test, review the findings and prepare a hosted preview for your friend; localhost only reaches the computer running the server.

The six-milestone RPG reference remains compatible with the original public-field lessons. Private properties, constructors, and saving are optional adaptations: update affected call sites and test a separate copy. Interfaces and inheritance are tools, not requirements to complicate the small game. LINQ, advanced generics, asynchronous programming, and engine workflows remain outside this initial foundations scope.

## Technical references

- [Properties](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)
- [Inheritance](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance)
- [Interfaces](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces)
- [Exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/exception-handling)
- [JSON serialization](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/how-to) and [deserialization](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/deserialization)
- [File.WriteAllText](https://learn.microsoft.com/en-us/dotnet/api/system.io.file.writealltext)
