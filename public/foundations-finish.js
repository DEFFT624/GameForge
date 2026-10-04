// First-party C# foundations. Existing lesson IDs remain unchanged.
export const finishingLessons = [
  {
    "id": "namespaces",
    "title": "Give your code a home",
    "topic": "Organization · namespaces and files",
    "minutes": 9,
    "body": "A namespace groups related types under a name. A using directive lets this file use those type names without repeating the namespace. It does not copy code or install a package.",
    "code": "using Adventure;\n\nHero hero = new Hero();\nConsole.WriteLine(hero.Name);\n\nnamespace Adventure\n{\n    class Hero\n    {\n        public string Name = \"Nova\";\n    }\n}",
    "output": "Nova",
    "explanation": "Hero belongs to Adventure. using Adventure lets the top-level instructions say Hero rather than Adventure.Hero. In your own console project, move the entire namespace block into Hero.cs while keeping the using directive and instructions in Program.cs. Files in that project compile together. Keep top-level statements in just Program.cs; do not paste a second copy of the class.",
    "question": "What does using Adventure do here?",
    "answers": [
      "Allows the short type name Hero",
      "Creates a Hero instance",
      "Installs a game engine"
    ],
    "correct": 0,
    "hint": "Compare the using line with new Hero(). Only new creates the object.",
    "practice": {
      "prompt": "Group Hero inside a named space.",
      "code": "____ Adventure\n{\n    class Hero { }\n}",
      "answer": "namespace",
      "hint": "The keyword names a group of types."
    },
    "guide": {
      "goal": "Find a type through a namespace and move its definition to a separate project file.",
      "before": "You know classes, fields, and new. Now keep definitions organized as examples grow.",
      "words": [
        [
          "namespace",
          "A named group containing types."
        ],
        [
          "using",
          "Makes names from a namespace available in this file."
        ],
        [
          "type",
          "A kind of value or object, such as Hero."
        ],
        [
          "project",
          "Files and build settings compiled together."
        ]
      ],
      "steps": [
        "Resolve Hero through using Adventure",
        "Create one Hero; its Name field starts as Nova",
        "Read the field and print it"
      ],
      "output": "Nova",
      "mistake": "using is not a download instruction. Changing a filename does not change a namespace. A class definition still needs its enclosing namespace when moved.",
      "tryIt": "Remove using Adventure and write Adventure.Hero in both places in the declaration. What prints?",
      "solution": "Nova. The full name identifies the same type; the program still creates and reads one Hero.",
      "why": [
        "Correct: the directive makes Hero available by its short name.",
        "new Hero() creates the instance, not using.",
        "Packages are a separate project setup step."
      ],
      "practiceWhy": "namespace Adventure groups the Hero definition under Adventure."
    },
    "trace": [
      [
        "Resolve Hero through using Adventure",
        "Hero means Adventure.Hero",
        null
      ],
      [
        "Create one Hero; its Name field starts as Nova",
        "hero.Name = \"Nova\"",
        null
      ],
      [
        "Read the field and print it",
        "hero.Name is unchanged",
        "Nova"
      ]
    ],
    "lab": {
      "prompt": "Predict the greeting after changing the field initializer.",
      "code": "using Adventure;\n\nHero hero = new Hero();\nConsole.WriteLine(hero.Name);\n\nnamespace Adventure\n{\n    class Hero\n    {\n        public string Name = \"Mira\";\n    }\n}",
      "output": "Mira",
      "hint": "using does not affect the value stored in Name.",
      "why": "The new Hero starts with Name Mira, so reading that field prints Mira.",
      "change": "Change the initializer to \"Echo\". What prints?",
      "changeWhy": "Echo. The object reads the changed initializer.",
      "changeCode": "using Adventure;\n\nHero hero = new Hero();\nConsole.WriteLine(hero.Name);\n\nnamespace Adventure\n{\n    class Hero\n    {\n        public string Name = \"Echo\";\n    }\n}",
      "changeOutput": "Echo"
    }
  },
  {
    "id": "guard-clauses",
    "title": "Reject a bad input early",
    "topic": "Organization · guard clauses and scope",
    "minutes": 9,
    "body": "A guard clause returns early when an input would break a rule. It keeps the normal path easy to read. A parameter belongs to its function call; a returned value only updates the caller’s variable if the caller stores it.",
    "code": "int ApplyDamage(int health, int damage)\n{\n    if (damage < 0)\n    {\n        return health;\n    }\n    return Math.Max(0, health - damage);\n}\n\nint remaining = ApplyDamage(20, -5);\nConsole.WriteLine(remaining);",
    "output": "20",
    "explanation": "A negative damage amount would heal the target by subtraction. The guard returns the unchanged health instead. return ends this function call, not the whole program. Math.Max selects the larger number to prevent negative health. The parameters health and damage are local names, unavailable outside this function.",
    "question": "Why does the result stay at 20?",
    "answers": [
      "Math.Max always returns 20",
      "The guard returns before the subtraction",
      "Negative damage subtracts five"
    ],
    "correct": 1,
    "hint": "Test damage < 0 first.",
    "practice": {
      "prompt": "Leave the function with unchanged health.",
      "code": "if (damage < 0) { ____ health; }",
      "answer": "return",
      "hint": "The keyword sends a result back and ends this call."
    },
    "guide": {
      "goal": "Trace an early return and identify names that belong to a function.",
      "before": "Review functions with return values and if conditions.",
      "words": [
        [
          "guard clause",
          "An early check that rejects an unwanted input."
        ],
        [
          "scope",
          "The region where a name can be used."
        ],
        [
          "parameter",
          "A local input name for this call."
        ],
        [
          "Math.Max",
          "Returns the larger of two values."
        ]
      ],
      "steps": [
        "Call ApplyDamage with 20 health and -5 damage",
        "The guard is true; return 20 without reaching Math.Max",
        "Print the returned value stored by the caller"
      ],
      "output": "20",
      "mistake": "A guard is a design choice: explain which input is invalid. Calling ApplyDamage without storing its return value will not update a separate health variable.",
      "tryIt": "Pass damage 30 instead. What prints?",
      "solution": "0. The guard is false, so Math.Max(0, 20 - 30) prevents health below zero.",
      "why": [
        "Math.Max is skipped by the early return.",
        "Correct: -5 fails the allowed damage rule.",
        "Subtracting a negative would add health, but the guard prevents it."
      ],
      "practiceWhy": "return health sends the original value back immediately."
    },
    "trace": [
      [
        "Call ApplyDamage with 20 health and -5 damage",
        "health = 20; damage = -5",
        null
      ],
      [
        "The guard is true; return 20 without reaching Math.Max",
        "remaining = 20",
        null
      ],
      [
        "Print the returned value stored by the caller",
        "remaining stays 20",
        "20"
      ]
    ],
    "lab": {
      "prompt": "Predict the result for a valid damage amount.",
      "code": "int ApplyDamage(int health, int damage)\n{\n    if (damage < 0)\n    {\n        return health;\n    }\n    return Math.Max(0, health - damage);\n}\n\nint remaining = ApplyDamage(20, 7);\nConsole.WriteLine(remaining);",
      "output": "13",
      "hint": "The guard is false; calculate 20 - 7.",
      "why": "Valid damage follows the normal path, giving Math.Max(0, 13), which is 13.",
      "change": "Try damage 30. Can health become negative?",
      "changeWhy": "It prints 0. Math.Max clamps the result at zero.",
      "changeCode": "int ApplyDamage(int health, int damage)\n{\n    if (damage < 0)\n    {\n        return health;\n    }\n    return Math.Max(0, health - damage);\n}\n\nint remaining = ApplyDamage(20, 30);\nConsole.WriteLine(remaining);",
      "changeOutput": "0"
    }
  },
  {
    "id": "exceptions",
    "title": "Recover from a specific failure",
    "topic": "Errors · try, catch, and finally",
    "minutes": 10,
    "body": "An exception interrupts the current path when an operation cannot complete. try surrounds an operation that may fail; a matching catch handles a specific failure. finally runs when leaving this try statement, including the ordinary success and handled-failure paths.",
    "code": "try\n{\n    int choice = int.Parse(\"oops\");\n    Console.WriteLine(choice);\n}\ncatch (FormatException)\n{\n    Console.WriteLine(\"Enter a number\");\n}\nfinally\n{\n    Console.WriteLine(\"Attempt finished\");\n}",
    "output": "Enter a number\nAttempt finished",
    "explanation": "int.Parse cannot convert oops, so it throws FormatException. The remaining line in try is skipped and the matching catch prints guidance. finally prints the closing message. Prefer TryParse for routine menu mistakes; exceptions are useful for failures such as unreadable files. finally is not a promise that cleanup will run if the process is forcibly terminated or an exception is never caught.",
    "question": "Which lines print for \"oops\"?",
    "answers": [
      "Only Enter a number",
      "oops, then Attempt finished",
      "Enter a number, then Attempt finished"
    ],
    "correct": 2,
    "hint": "After the matching catch, follow finally.",
    "practice": {
      "prompt": "Handle the text-format exception.",
      "code": "____ (FormatException)\n{\n    Console.WriteLine(\"Enter a number\");\n}",
      "answer": "catch",
      "hint": "This block handles a matching exception."
    },
    "guide": {
      "goal": "Follow success and failure paths without hiding unrelated exceptions.",
      "before": "You used TryParse for expected invalid input. This example deliberately uses Parse to demonstrate an exception.",
      "words": [
        [
          "exception",
          "A failure that interrupts the normal path."
        ],
        [
          "try",
          "Surrounds code whose exceptions may be handled here."
        ],
        [
          "catch",
          "Handles an exception of the matching type."
        ],
        [
          "finally",
          "Cleanup code when leaving this try statement."
        ]
      ],
      "steps": [
        "Parse oops; conversion throws before choice is assigned",
        "Handle the matching exception and print guidance",
        "Leave through finally and print the closing message"
      ],
      "output": "Enter a number\nAttempt finished",
      "mistake": "Do not wrap every instruction in catch (Exception) and silently continue. Catch failures you can handle, and keep useful error information. A variable declared inside try is not in scope in catch.",
      "tryIt": "Replace \"oops\" with \"2\". Which lines print?",
      "solution": "2, then Attempt finished. The conversion succeeds; catch is skipped, but finally still runs.",
      "why": [
        "finally also runs on this handled-failure path.",
        "The failed conversion does not print its input.",
        "Correct: catch prints guidance and finally prints the closing message."
      ],
      "practiceWhy": "catch (FormatException) selects this specific conversion failure."
    },
    "trace": [
      [
        "Parse oops; conversion throws before choice is assigned",
        "FormatException; WriteLine(choice) is skipped",
        null
      ],
      [
        "Handle the matching exception and print guidance",
        "Inside catch",
        "Enter a number"
      ],
      [
        "Leave through finally and print the closing message",
        "Attempt has ended",
        "Attempt finished"
      ]
    ],
    "lab": {
      "prompt": "Predict the successful path and the closing line.",
      "code": "try\n{\n    int choice = int.Parse(\"3\");\n    Console.WriteLine(choice);\n}\ncatch (FormatException)\n{\n    Console.WriteLine(\"Enter a number\");\n}\nfinally\n{\n    Console.WriteLine(\"Attempt finished\");\n}",
      "output": "3\nAttempt finished",
      "hint": "When parsing succeeds, catch does not run.",
      "why": "The try prints 3, followed by the finally message.",
      "change": "Replace \"3\" with \"bad\". Which block responds?",
      "changeWhy": "FormatException triggers catch. The output is Enter a number, then Attempt finished.",
      "changeCode": "try\n{\n    int choice = int.Parse(\"bad\");\n    Console.WriteLine(choice);\n}\ncatch (FormatException)\n{\n    Console.WriteLine(\"Enter a number\");\n}\nfinally\n{\n    Console.WriteLine(\"Attempt finished\");\n}",
      "changeOutput": "Enter a number\nAttempt finished"
    }
  },
  {
    "id": "properties",
    "title": "Read a value without opening every write",
    "topic": "Objects · properties and private setters",
    "minutes": 9,
    "body": "A property provides controlled access to a value. get allows reading; set allows assignment. An auto-property has storage supplied by the compiler. private set limits writes to code inside this class.",
    "code": "Hero hero = new Hero();\nhero.TakeDamage(25);\nConsole.WriteLine(hero.Health);\n\nclass Hero\n{\n    public int Health { get; private set; } = 100;\n    public void TakeDamage(int amount)\n    {\n        if (amount < 0) return;\n        Health = Math.Max(0, Health - amount);\n    }\n    public void Heal(int amount)\n    {\n        if (amount <= 0) return;\n        Health = Health + Math.Min(amount, 100 - Health);\n    }\n}",
    "output": "75",
    "explanation": "Other code can read hero.Health, but cannot assign hero.Health = -50 because the setter is private. TakeDamage belongs to Hero, so it can change Health while enforcing a rule. public void declares an accessible method with no returned result. Unlike the earlier local functions, this method is called on an object. Heal is the other controlled update: it rejects nonpositive amounts and adds no more than the space below 100. If you adapt the RPG, replace its direct potion assignment with hero.Heal(25); private set means all external health assignments must be replaced. The Heal definition does not run until you call it.",
    "question": "Which operation is allowed outside Hero?",
    "answers": [
      "Console.WriteLine(hero.Health);",
      "Removing the private setter at runtime",
      "hero.Health = -50;"
    ],
    "correct": 0,
    "hint": "public get permits reads; private set restricts assignment.",
    "practice": {
      "prompt": "Allow reads while keeping writes inside Hero.",
      "code": "public int Health { get; ____ set; } = 100;",
      "answer": "private",
      "hint": "The access modifier limits this setter to the containing class."
    },
    "guide": {
      "goal": "Explain why a caller reads Health but changes it through a method.",
      "before": "You know class fields, instance methods, guard clauses, and Math.Max.",
      "words": [
        [
          "property",
          "A member with accessors for a value."
        ],
        [
          "get",
          "Allows reading a property."
        ],
        [
          "set",
          "Allows assigning a property."
        ],
        [
          "private",
          "Access restricted to the containing type."
        ]
      ],
      "steps": [
        "Create Hero with Health initialized to 100",
        "TakeDamage accepts 25 and stores Math.Max(0, 100 - 25)",
        "Read through the public getter and print"
      ],
      "output": "75",
      "mistake": "A private setter is a code boundary, not encryption or anti-cheat protection. The class must still enforce its own rules.",
      "tryIt": "Call TakeDamage(150). What prints?",
      "solution": "0. The method clamps 100 - 150 at zero.",
      "why": [
        "Correct: the getter is public.",
        "Access modifiers are declared in source code, not removed by a normal call.",
        "The setter is private, so an external assignment does not compile."
      ],
      "practiceWhy": "private set permits assignment inside Hero while exposing its getter."
    },
    "trace": [
      [
        "Create Hero with Health initialized to 100",
        "hero.Health = 100",
        null
      ],
      [
        "TakeDamage accepts 25 and stores Math.Max(0, 100 - 25)",
        "hero.Health = 75",
        null
      ],
      [
        "Read through the public getter and print",
        "Health remains 75",
        "75"
      ]
    ],
    "lab": {
      "prompt": "Predict health after a larger valid hit.",
      "code": "Hero hero = new Hero();\nhero.TakeDamage(40);\nConsole.WriteLine(hero.Health);\n\nclass Hero\n{\n    public int Health { get; private set; } = 100;\n    public void TakeDamage(int amount)\n    {\n        if (amount < 0) return;\n        Health = Math.Max(0, Health - amount);\n    }\n    public void Heal(int amount)\n    {\n        if (amount <= 0) return;\n        Health = Health + Math.Min(amount, 100 - Health);\n    }\n}",
      "output": "60",
      "hint": "Start at 100 and subtract 40.",
      "why": "The method accepts 40, stores 60, and the getter returns 60.",
      "change": "Try negative damage. Does it heal?",
      "changeWhy": "It prints 100. The guard returns without changing Health.",
      "changeCode": "Hero hero = new Hero();\nhero.TakeDamage(-10);\nConsole.WriteLine(hero.Health);\n\nclass Hero\n{\n    public int Health { get; private set; } = 100;\n    public void TakeDamage(int amount)\n    {\n        if (amount < 0) return;\n        Health = Math.Max(0, Health - amount);\n    }\n    public void Heal(int amount)\n    {\n        if (amount <= 0) return;\n        Health = Health + Math.Min(amount, 100 - Health);\n    }\n}",
      "changeOutput": "100"
    }
  },
  {
    "id": "encapsulation",
    "title": "Keep a counter behind a small interface",
    "topic": "Objects · private fields and encapsulation",
    "minutes": 9,
    "body": "Encapsulation means keeping data and the rules for changing it together. A private field stores internal data; public methods expose only the operations callers need. That makes a class easier to use without depending on its storage details.",
    "code": "Wallet wallet = new Wallet();\nwallet.AddCoins(5);\nwallet.AddCoins(-3);\nConsole.WriteLine(wallet.GetCoins());\n\nclass Wallet\n{\n    private int coins = 0;\n    public void AddCoins(int amount)\n    {\n        if (amount <= 0) return;\n        coins = coins + amount;\n    }\n    public int GetCoins()\n    {\n        return coins;\n    }\n}",
    "output": "5",
    "explanation": "Only Wallet accesses the field coins directly. AddCoins rejects zero or negative rewards, and GetCoins returns the current total. Each Wallet instance has its own field. This example focuses on access, not large balances: int addition can overflow, so a real economy also needs a maximum or checked arithmetic.",
    "question": "What is the final coin total?",
    "answers": [
      "2",
      "5",
      "8"
    ],
    "correct": 1,
    "hint": "The negative reward returns early.",
    "practice": {
      "prompt": "Restrict the backing field to Wallet.",
      "code": "____ int coins = 0;",
      "answer": "private",
      "hint": "Outside callers should use the public methods."
    },
    "guide": {
      "goal": "Trace accepted and rejected updates to private data.",
      "before": "Review properties and private access. This uses an explicit field instead of an auto-property.",
      "words": [
        [
          "encapsulation",
          "Keep data and its update rules in one type."
        ],
        [
          "private field",
          "Internal storage accessible only within this type."
        ],
        [
          "public method",
          "An operation external code may call."
        ],
        [
          "instance field",
          "Storage belonging to one object."
        ]
      ],
      "steps": [
        "Create a wallet starting at zero",
        "AddCoins(5) accepts a positive reward",
        "AddCoins(-3) rejects the amount; GetCoins reads the unchanged total"
      ],
      "output": "5",
      "mistake": "Do not assume that private data is automatically valid. All methods that update it must honor the same rules. In this example coins is a private field; a backing field usually refers to storage behind a property.",
      "tryIt": "Change the second call to AddCoins(3). What prints?",
      "solution": "8. Both positive rewards are accepted: 5 + 3.",
      "why": [
        "-3 is rejected rather than subtracted.",
        "Correct: only the first reward is accepted.",
        "8 would require a positive second reward."
      ],
      "practiceWhy": "private prevents external code from directly assigning wallet.coins."
    },
    "trace": [
      [
        "Create a wallet starting at zero",
        "coins = 0",
        null
      ],
      [
        "AddCoins(5) accepts a positive reward",
        "coins = 5",
        null
      ],
      [
        "AddCoins(-3) rejects the amount; GetCoins reads the unchanged total",
        "coins = 5",
        "5"
      ]
    ],
    "lab": {
      "prompt": "Predict two accepted rewards.",
      "code": "Wallet wallet = new Wallet();\nwallet.AddCoins(5);\nwallet.AddCoins(2);\nConsole.WriteLine(wallet.GetCoins());\n\nclass Wallet\n{\n    private int coins = 0;\n    public void AddCoins(int amount)\n    {\n        if (amount <= 0) return;\n        coins = coins + amount;\n    }\n    public int GetCoins()\n    {\n        return coins;\n    }\n}",
      "output": "7",
      "hint": "Both calls pass the positive-amount guard.",
      "why": "Five coins plus two coins gives seven.",
      "change": "Replace the second reward with zero. What changes?",
      "changeWhy": "It prints 5. Zero is rejected by amount <= 0.",
      "changeCode": "Wallet wallet = new Wallet();\nwallet.AddCoins(5);\nwallet.AddCoins(0);\nConsole.WriteLine(wallet.GetCoins());\n\nclass Wallet\n{\n    private int coins = 0;\n    public void AddCoins(int amount)\n    {\n        if (amount <= 0) return;\n        coins = coins + amount;\n    }\n    public int GetCoins()\n    {\n        return coins;\n    }\n}",
      "changeOutput": "5"
    }
  },
  {
    "id": "static-rules",
    "title": "Use a rule without creating an object",
    "topic": "Objects · static helpers and boundaries",
    "minutes": 9,
    "body": "A static method belongs to a type rather than to one instance. Use one for a calculation that needs only its arguments. This keeps a combat rule separate from input and printing so you can test it directly.",
    "code": "Console.WriteLine(CombatRules.Damage(12, 5));\nConsole.WriteLine(CombatRules.Damage(12, -5));\n\nstatic class CombatRules\n{\n    public static int Damage(int health, int amount)\n    {\n        if (amount < 0) return health;\n        return Math.Max(0, health - amount);\n    }\n}",
    "output": "7\n12",
    "explanation": "Call CombatRules.Damage using the type name. A static class cannot be instantiated. This helper has no mutable fields: the same arguments produce the same result and do not change an object. Static does not automatically mean pure; a static method could still use global state or files. Keep this rule free of those effects.",
    "question": "Why is no new CombatRules() needed?",
    "answers": [
      "Damage never runs",
      "All classes are created automatically",
      "Damage belongs to the type"
    ],
    "correct": 2,
    "hint": "Look for static on the method and class.",
    "practice": {
      "prompt": "Declare a method called through its type.",
      "code": "public ____ int Damage(int health, int amount)",
      "answer": "static",
      "hint": "This modifier means the member belongs to the type."
    },
    "guide": {
      "goal": "Call a stateless rule and distinguish its returned result from an object update.",
      "before": "You know guard clauses, Math.Max, methods, and access modifiers.",
      "words": [
        [
          "static",
          "A member belongs to the type, not an instance."
        ],
        [
          "stateless",
          "No stored mutable data between these calls."
        ],
        [
          "side effect",
          "A change beyond the returned result, such as writing a file."
        ],
        [
          "boundary case",
          "An input at an edge of the allowed range."
        ]
      ],
      "steps": [
        "Call Damage(12, 5); return 7 and print it",
        "Call Damage(12, -5); the guard returns 12",
        "Print the second result; neither call updates a stored hero"
      ],
      "output": "7\n12",
      "mistake": "A return value must still be stored to change a caller’s health variable. static is not a reason to put all game state in global fields.",
      "tryIt": "Use Damage(12, 20) in the first call. What prints?",
      "solution": "0, then 12. The first result is clamped; the second independent call rejects its negative amount.",
      "why": [
        "Each call executes normally.",
        "A static class cannot be instantiated.",
        "Correct: the method is a type member."
      ],
      "practiceWhy": "static allows CombatRules.Damage(...) without an object."
    },
    "trace": [
      [
        "Call Damage(12, 5); return 7 and print it",
        "health input 12; result 7",
        "7"
      ],
      [
        "Call Damage(12, -5); the guard returns 12",
        "health input 12; result 12",
        null
      ],
      [
        "Print the second result; neither call updates a stored hero",
        "No shared health state",
        "12"
      ]
    ],
    "lab": {
      "prompt": "Predict exact-zero damage and the rejected negative hit.",
      "code": "Console.WriteLine(CombatRules.Damage(12, 12));\nConsole.WriteLine(CombatRules.Damage(12, -5));\n\nstatic class CombatRules\n{\n    public static int Damage(int health, int amount)\n    {\n        if (amount < 0) return health;\n        return Math.Max(0, health - amount);\n    }\n}",
      "output": "0\n12",
      "hint": "Subtracting exactly 12 leaves zero.",
      "why": "The first call returns 0. The second guard returns 12.",
      "change": "Use zero damage in the first call. Does health change?",
      "changeWhy": "Both lines print 12. Zero damage is allowed but subtracts nothing.",
      "changeCode": "Console.WriteLine(CombatRules.Damage(12, 0));\nConsole.WriteLine(CombatRules.Damage(12, -5));\n\nstatic class CombatRules\n{\n    public static int Damage(int health, int amount)\n    {\n        if (amount < 0) return health;\n        return Math.Max(0, health - amount);\n    }\n}",
      "changeOutput": "12\n12"
    }
  },
  {
    "id": "inheritance",
    "title": "Reuse a base type deliberately",
    "topic": "Object design · inheritance",
    "minutes": 10,
    "body": "Inheritance lets a derived class reuse members of a base class. Read Goblin : Enemy as Goblin is an Enemy. Use this relationship for types that should behave like the base type, rather than merely sharing a few lines of code.",
    "code": "Goblin goblin = new Goblin();\ngoblin.TakeDamage(5);\nConsole.WriteLine(goblin.Health);\n\nclass Enemy\n{\n    public int Health { get; private set; } = 20;\n    public void TakeDamage(int amount)\n    {\n        if (amount < 0) return;\n        Health = Math.Max(0, Health - amount);\n    }\n}\nclass Goblin : Enemy\n{\n}",
    "output": "15",
    "explanation": "Goblin inherits the public Health getter and TakeDamage method. The inherited method belongs to Enemy and may use Enemy’s private setter. Code written inside Goblin cannot assign that private setter directly. The empty Goblin class adds no behavior yet; it only demonstrates the relationship. A C# class has at most one direct base class.",
    "question": "Where does goblin.TakeDamage come from?",
    "answers": [
      "The Enemy base class",
      "An automatic Unity component",
      "The filename"
    ],
    "correct": 0,
    "hint": "Read the colon in class Goblin : Enemy.",
    "practice": {
      "prompt": "Declare Goblin as an Enemy.",
      "code": "class Goblin ____ Enemy { }",
      "answer": ":",
      "hint": "One punctuation mark introduces the base type."
    },
    "guide": {
      "goal": "Trace a public inherited method without assuming private members become public.",
      "before": "You know private setters and guarded instance methods.",
      "words": [
        [
          "base class",
          "The type being inherited from."
        ],
        [
          "derived class",
          "The type that inherits from a base."
        ],
        [
          ": Enemy",
          "Declares Enemy as this class’s base type."
        ],
        [
          "is-a relationship",
          "A derived object can be used as its base type."
        ]
      ],
      "steps": [
        "Create Goblin with the inherited health initializer",
        "Call inherited TakeDamage(5), which stores 15",
        "Read the inherited getter and print it"
      ],
      "output": "15",
      "mistake": "Inheritance does not expose private storage to derived code. Do not create deep family trees just to avoid copying code; composition is another option coming shortly.",
      "tryIt": "Use new Enemy() and Enemy as the variable type. What prints?",
      "solution": "15. The behavior already lives on Enemy; Goblin has not added a variation.",
      "why": [
        "Correct: Enemy defines the method.",
        "This is a console C# program with no Unity dependency.",
        "A filename does not supply inherited behavior."
      ],
      "practiceWhy": "The colon declares the base type in a class definition."
    },
    "trace": [
      [
        "Create Goblin with the inherited health initializer",
        "goblin.Health = 20",
        null
      ],
      [
        "Call inherited TakeDamage(5), which stores 15",
        "goblin.Health = 15",
        null
      ],
      [
        "Read the inherited getter and print it",
        "Health remains 15",
        "15"
      ]
    ],
    "lab": {
      "prompt": "Predict inherited damage larger than the starting health.",
      "code": "Goblin goblin = new Goblin();\ngoblin.TakeDamage(25);\nConsole.WriteLine(goblin.Health);\n\nclass Enemy\n{\n    public int Health { get; private set; } = 20;\n    public void TakeDamage(int amount)\n    {\n        if (amount < 0) return;\n        Health = Math.Max(0, Health - amount);\n    }\n}\nclass Goblin : Enemy\n{\n}",
      "output": "0",
      "hint": "The base method still clamps health.",
      "why": "Enemy’s rule clamps 20 - 25 to zero, even on a Goblin.",
      "change": "Try a negative hit on the Goblin.",
      "changeWhy": "20. The inherited guard rejects the negative amount.",
      "changeCode": "Goblin goblin = new Goblin();\ngoblin.TakeDamage(-2);\nConsole.WriteLine(goblin.Health);\n\nclass Enemy\n{\n    public int Health { get; private set; } = 20;\n    public void TakeDamage(int amount)\n    {\n        if (amount < 0) return;\n        Health = Math.Max(0, Health - amount);\n    }\n}\nclass Goblin : Enemy\n{\n}",
      "changeOutput": "20"
    }
  },
  {
    "id": "virtual-methods",
    "title": "Let an enemy vary one behavior",
    "topic": "Object design · virtual and override",
    "minutes": 10,
    "body": "A virtual method lets a derived type provide a different implementation. override supplies that replacement. Calling through a base-type variable still uses the override on the actual object.",
    "code": "Enemy enemy = new Goblin();\nConsole.WriteLine(enemy.GetDamage());\n\nclass Enemy\n{\n    public virtual int GetDamage()\n    {\n        return 3;\n    }\n}\nclass Goblin : Enemy\n{\n    public override int GetDamage()\n    {\n        return 7;\n    }\n}",
    "output": "7",
    "explanation": "The variable is declared Enemy but refers to a Goblin. Virtual dispatch selects Goblin.GetDamage, which returns 7. Only a virtual, abstract, or already-overridden base member can be overridden. The new keyword on a member can hide it instead, which is a different behavior and is not needed here.",
    "question": "Which damage value prints?",
    "answers": [
      "3",
      "7",
      "Both 3 and 7"
    ],
    "correct": 1,
    "hint": "Follow the actual object created by new Goblin().",
    "practice": {
      "prompt": "Replace the base virtual implementation.",
      "code": "public ____ int GetDamage() { return 7; }",
      "answer": "override",
      "hint": "Use the keyword for the derived implementation."
    },
    "guide": {
      "goal": "Distinguish a variable’s declared type from the actual object used in a virtual call.",
      "before": "Complete inheritance first. Review method return values.",
      "words": [
        [
          "virtual",
          "Allows a base method to be overridden."
        ],
        [
          "override",
          "Provides a derived implementation."
        ],
        [
          "declared type",
          "The type written in a variable declaration."
        ],
        [
          "polymorphism",
          "One shared method call with behavior that varies by the actual object."
        ]
      ],
      "steps": [
        "Create a Goblin and store its reference in an Enemy variable",
        "Call GetDamage; dispatch to Goblin override",
        "Print the returned damage"
      ],
      "output": "7",
      "mistake": "The base implementation does not run automatically before an override. Call base.GetDamage() explicitly inside the override if that is your intended rule.",
      "tryIt": "Create new Enemy() instead. What prints?",
      "solution": "3. The actual object is now Enemy, so its own virtual implementation runs.",
      "why": [
        "3 belongs to the base implementation, which is replaced here.",
        "Correct: the Goblin override returns 7.",
        "The call selects one implementation; it does not print both values."
      ],
      "practiceWhy": "override matches the inherited virtual method’s signature."
    },
    "trace": [
      [
        "Create a Goblin and store its reference in an Enemy variable",
        "Declared type Enemy; actual object Goblin",
        null
      ],
      [
        "Call GetDamage; dispatch to Goblin override",
        "Returned damage = 7",
        null
      ],
      [
        "Print the returned damage",
        "Object remains Goblin",
        "7"
      ]
    ],
    "lab": {
      "prompt": "Predict the result after changing the Goblin override.",
      "code": "Enemy enemy = new Goblin();\nConsole.WriteLine(enemy.GetDamage());\n\nclass Enemy\n{\n    public virtual int GetDamage()\n    {\n        return 3;\n    }\n}\nclass Goblin : Enemy\n{\n    public override int GetDamage()\n    {\n        return 9;\n    }\n}",
      "output": "9",
      "hint": "The variable still references a Goblin.",
      "why": "Virtual dispatch reaches the new overridden result, 9.",
      "change": "Create Enemy instead while keeping the changed override.",
      "changeWhy": "3. No Goblin object exists for this call, so the Goblin override is irrelevant.",
      "changeCode": "Enemy enemy = new Enemy();\nConsole.WriteLine(enemy.GetDamage());\n\nclass Enemy\n{\n    public virtual int GetDamage()\n    {\n        return 3;\n    }\n}\nclass Goblin : Enemy\n{\n    public override int GetDamage()\n    {\n        return 9;\n    }\n}",
      "changeOutput": "3"
    }
  },
  {
    "id": "interfaces",
    "title": "Describe what different types can do",
    "topic": "Object design · interfaces",
    "minutes": 10,
    "body": "An interface defines a contract. Types can implement that contract without inheriting the same base class. Start with one required method so calling code depends on an ability rather than a specific type.",
    "code": "IUsable item = new Potion();\nConsole.WriteLine(item.Use());\n\ninterface IUsable\n{\n    string Use();\n}\nclass Potion : IUsable\n{\n    public string Use()\n    {\n        return \"Healed\";\n    }\n}",
    "output": "Healed",
    "explanation": "IUsable requires a Use method returning string. Potion supplies a public matching method. The interface variable can call Use, but cannot assume Potion-only members exist. You cannot create new IUsable() because this interface does not provide a concrete object implementation. A class can implement several interfaces.",
    "question": "What must Potion provide for this contract?",
    "answers": [
      "An Enemy base class",
      "A method named Heal",
      "A public Use method returning string"
    ],
    "correct": 2,
    "hint": "Read the method signature inside IUsable.",
    "practice": {
      "prompt": "Define the ability contract.",
      "code": "____ IUsable { string Use(); }",
      "answer": "interface",
      "hint": "The keyword defines a contract implemented by types."
    },
    "guide": {
      "goal": "Call a required method through a shared ability type.",
      "before": "Review method signatures, public access, and declared versus actual types.",
      "words": [
        [
          "interface",
          "A contract listing members a type must provide here."
        ],
        [
          "implement",
          "Provide the required members."
        ],
        [
          "signature",
          "The name, parameters, and relevant type information of a member."
        ],
        [
          "IUsable",
          "Our chosen interface name; I is a naming convention."
        ]
      ],
      "steps": [
        "Create Potion and hold it through IUsable",
        "Call its required Use implementation",
        "Print the returned text"
      ],
      "output": "Healed",
      "mistake": "Matching the method name alone is insufficient: parameters and return type must match. An interface does not guarantee sensible behavior; implementations still need tests.",
      "tryIt": "Change the returned text to \"Restored\". Does the contract change?",
      "solution": "No. The method still returns string. The program now prints Restored.",
      "why": [
        "Potion implements an interface; no Enemy base class is required.",
        "Heal does not match the declared Use member.",
        "Correct: the public method matches the required signature."
      ],
      "practiceWhy": "interface declares the shared contract."
    },
    "trace": [
      [
        "Create Potion and hold it through IUsable",
        "Actual object Potion",
        null
      ],
      [
        "Call its required Use implementation",
        "Returned text = \"Healed\"",
        null
      ],
      [
        "Print the returned text",
        "The interface call has finished",
        "Healed"
      ]
    ],
    "lab": {
      "prompt": "Predict text from the implementation without changing the interface.",
      "code": "IUsable item = new Potion();\nConsole.WriteLine(item.Use());\n\ninterface IUsable\n{\n    string Use();\n}\nclass Potion : IUsable\n{\n    public string Use()\n    {\n        return \"Shielded\";\n    }\n}",
      "output": "Shielded",
      "hint": "The interface specifies a string result, not its exact text.",
      "why": "Potion.Use returns Shielded, so the caller prints that result.",
      "change": "Return \"Ready\" instead. Is this still a string-returning implementation?",
      "changeWhy": "Yes. The output becomes Ready without changing the signature.",
      "changeCode": "IUsable item = new Potion();\nConsole.WriteLine(item.Use());\n\ninterface IUsable\n{\n    string Use();\n}\nclass Potion : IUsable\n{\n    public string Use()\n    {\n        return \"Ready\";\n    }\n}",
      "changeOutput": "Ready"
    }
  },
  {
    "id": "composition",
    "title": "Give a character a separate backpack",
    "topic": "Object design · composition",
    "minutes": 10,
    "body": "Composition builds an object out of other objects. A hero has a Backpack rather than being a Backpack. Keeping inventory behavior in its own class lets other types reuse it without inheriting inventory as their identity.",
    "code": "Hero hero = new Hero();\nhero.Bag.Add(\"Potion\");\nConsole.WriteLine(hero.Bag.Count);\n\nclass Backpack\n{\n    private List<string> items = new List<string>();\n    public int Count { get { return items.Count; } }\n    public void Add(string item) { items.Add(item); }\n}\nclass Hero\n{\n    public Backpack Bag { get; } = new Backpack();\n}",
    "output": "1",
    "explanation": "Hero owns a reference to a Backpack created for this instance. The get-only Bag property stops callers replacing that reference; it does not make the Backpack immutable. hero.Bag.Add changes the backpack’s internal list. Count uses an explicit getter that calculates from the list each time; no setter is needed.",
    "question": "What does the get-only Bag property prevent?",
    "answers": [
      "Replacing hero.Bag with another backpack",
      "Reading the item count",
      "Adding an item to the backpack"
    ],
    "correct": 0,
    "hint": "The property controls the reference assignment, not every operation on its object.",
    "practice": {
      "prompt": "Expose Bag for reading without an external setter.",
      "code": "public Backpack Bag { ____; } = new Backpack();",
      "answer": "get",
      "hint": "Use the read accessor."
    },
    "guide": {
      "goal": "Explain has-a ownership and why read-only references can point to mutable objects.",
      "before": "You know lists, private fields, getters, constructors, and object references.",
      "words": [
        [
          "composition",
          "Build a type using separate objects as members."
        ],
        [
          "has-a",
          "An object owns or uses another object."
        ],
        [
          "get-only",
          "No ordinary setter is exposed for this property."
        ],
        [
          "mutable",
          "Its data can still change through permitted operations."
        ]
      ],
      "steps": [
        "Create Hero and its fresh Backpack with an empty list",
        "Call Bag.Add to add one Potion",
        "Read Count through its getter and print"
      ],
      "output": "1",
      "mistake": "get-only does not freeze a referenced object. If two heroes deliberately share one Backpack reference, updates to that backpack are shared too.",
      "tryIt": "Add a second Potion before printing. What is Count?",
      "solution": "2. A List allows duplicate strings; both additions create entries.",
      "why": [
        "Correct: there is no external setter for Bag.",
        "Reading Bag.Count is allowed by the public getters.",
        "Add is a method on the referenced Backpack, so it is allowed."
      ],
      "practiceWhy": "get exposes the property for reading while omitting a setter."
    },
    "trace": [
      [
        "Create Hero and its fresh Backpack with an empty list",
        "Bag.Count = 0",
        null
      ],
      [
        "Call Bag.Add to add one Potion",
        "Bag.Count = 1",
        null
      ],
      [
        "Read Count through its getter and print",
        "List still contains one item",
        "1"
      ]
    ],
    "lab": {
      "prompt": "Predict the size of a backpack with two entries.",
      "code": "Hero hero = new Hero();\nhero.Bag.Add(\"Potion\");\nhero.Bag.Add(\"Key\");\nConsole.WriteLine(hero.Bag.Count);\n\nclass Backpack\n{\n    private List<string> items = new List<string>();\n    public int Count { get { return items.Count; } }\n    public void Add(string item) { items.Add(item); }\n}\nclass Hero\n{\n    public Backpack Bag { get; } = new Backpack();\n}",
      "output": "2",
      "hint": "Count tracks entries, not distinct item types.",
      "why": "Potion and Key are two entries in the same Backpack.",
      "change": "Add a second Potion rather than a Key. Does Count change?",
      "changeWhy": "It still prints 2. Duplicate entries are allowed.",
      "changeCode": "Hero hero = new Hero();\nhero.Bag.Add(\"Potion\");\nhero.Bag.Add(\"Potion\");\nConsole.WriteLine(hero.Bag.Count);\n\nclass Backpack\n{\n    private List<string> items = new List<string>();\n    public int Count { get { return items.Count; } }\n    public void Add(string item) { items.Add(item); }\n}\nclass Hero\n{\n    public Backpack Bag { get; } = new Backpack();\n}",
      "changeOutput": "2"
    }
  },
  {
    "id": "json-save",
    "title": "Turn simple game data into save text",
    "topic": "Saving · JSON serialization",
    "minutes": 10,
    "body": "JSON is a text format for structured data. Serialization converts an object’s data into that text. Start with a small save-data class containing public properties, separate from the objects that run your game.",
    "code": "using System.Text.Json;\n\nSaveData save = new SaveData();\nsave.Coins = 12;\nstring json = JsonSerializer.Serialize(save);\nConsole.WriteLine(json);\n\nclass SaveData\n{\n    public int Coins { get; set; }\n}",
    "output": "{\"Coins\":12}",
    "explanation": "using System.Text.Json makes the built-in serializer available. Its default behavior includes public properties such as Coins. The simple output contains a property name and number inside braces. Serializing creates a string in memory; it does not write a file. Keep save data focused on values, not methods, interface objects, or references to an entire running game.",
    "question": "Where is the JSON stored after Serialize here?",
    "answers": [
      "In a file automatically",
      "In the json string variable",
      "In a public online database"
    ],
    "correct": 1,
    "hint": "Look at the assignment on the Serialize line.",
    "practice": {
      "prompt": "Convert save data to JSON text.",
      "code": "string json = JsonSerializer.____(save);",
      "answer": "Serialize",
      "hint": "This method converts an object to text; keep the capital S."
    },
    "guide": {
      "goal": "Serialize public save properties without confusing text creation with persistence.",
      "before": "You know properties, using directives, and strings.",
      "words": [
        [
          "JSON",
          "Text containing structured values such as objects and numbers."
        ],
        [
          "serialize",
          "Convert data into a representation such as JSON text."
        ],
        [
          "save-data class",
          "A small type holding values to persist."
        ],
        [
          "System.Text.Json",
          "The built-in .NET JSON library used here."
        ]
      ],
      "steps": [
        "Create SaveData and assign Coins",
        "Serialize its public property into text",
        "Print the JSON string; no file is written"
      ],
      "output": "{\"Coins\":12}",
      "mistake": "Public fields from earlier lessons are not included by default like these public properties. Saving a string in memory does not survive closing the program. Serializing the Character from the RPG reference produces {} with these defaults because it uses public fields. Prefer a separate SaveData class with public properties rather than serializing the whole running game.",
      "tryIt": "Set Coins to 0 before serialization. What text prints?",
      "solution": "{\"Coins\":0}. Zero is a number, not a missing property.",
      "why": [
        "No file-writing operation appears in this program.",
        "Correct: Serialize returns JSON as a string.",
        "The program has no network or database operation."
      ],
      "practiceWhy": "Serialize converts the public property data into JSON text."
    },
    "trace": [
      [
        "Create SaveData and assign Coins",
        "save.Coins = 12",
        null
      ],
      [
        "Serialize its public property into text",
        "json = {\"Coins\":12}",
        null
      ],
      [
        "Print the JSON string; no file is written",
        "Save object still has 12 coins",
        "{\"Coins\":12}"
      ]
    ],
    "lab": {
      "prompt": "Predict the exact compact JSON, including capitals and punctuation.",
      "code": "using System.Text.Json;\n\nSaveData save = new SaveData();\nsave.Coins = 3;\nstring json = JsonSerializer.Serialize(save);\nConsole.WriteLine(json);\n\nclass SaveData\n{\n    public int Coins { get; set; }\n}",
      "output": "{\"Coins\":3}",
      "hint": "Keep the property name Coins and replace only the number.",
      "why": "The public Coins property now has value 3.",
      "change": "Serialize a zero coin balance.",
      "changeWhy": "The output is {\"Coins\":0}; zero is still included.",
      "changeCode": "using System.Text.Json;\n\nSaveData save = new SaveData();\nsave.Coins = 0;\nstring json = JsonSerializer.Serialize(save);\nConsole.WriteLine(json);\n\nclass SaveData\n{\n    public int Coins { get; set; }\n}",
      "changeOutput": "{\"Coins\":0}"
    }
  },
  {
    "id": "json-load",
    "title": "Validate data before accepting a save",
    "topic": "Saving · deserialization and null",
    "minutes": 12,
    "body": "Deserialization turns JSON text back into data. Successful parsing does not prove the data obeys your game’s rules. Check for null and invalid values before applying the result; malformed JSON needs a specific exception handler.",
    "code": "using System.Text.Json;\n\nstring json = \"{\\\"Coins\\\":-5}\";\ntry\n{\n    SaveData? save = JsonSerializer.Deserialize<SaveData>(json);\n    if (save is null || save.Coins < 0 || save.Coins > 1000)\n    {\n        Console.WriteLine(\"Invalid save\");\n    }\n    else\n    {\n        Console.WriteLine(save.Coins);\n    }\n}\ncatch (JsonException)\n{\n    Console.WriteLine(\"Unreadable save\");\n}\n\nclass SaveData\n{\n    public int Coins { get; set; }\n}",
    "output": "Invalid save",
    "explanation": "<SaveData> tells Deserialize which type to create; angle brackets supply a type argument. SaveData? explicitly allows the result to be null, as with JSON null. is null checks for no object. || short-circuits: if save is null, later property checks are skipped. This demo accepts 0 through 1000 coins. A missing Coins property defaults to 0 here; production save formats also need version and required-data checks. Escaped quotes, written as \", let a C# string contain JSON quotes. Property names are case-sensitive with these default options: {} and {\"coins\":5} both leave Coins at 0, so this minimal range check accepts them. For a real save, validate required data and a format version too; do not infer that every accepted result represents a complete save.",
    "question": "Why is this well-formed JSON rejected?",
    "answers": [
      "Deserialize cannot create classes",
      "JSON cannot contain numbers",
      "The coin balance violates the game rule"
    ],
    "correct": 2,
    "hint": "Parsing and validating are separate steps.",
    "practice": {
      "prompt": "Check whether deserialization returned no object.",
      "code": "if (save is ____)",
      "answer": "null",
      "hint": "The keyword represents no object reference."
    },
    "guide": {
      "goal": "Distinguish malformed text, a null result, and data that violates a rule.",
      "before": "Review JSON serialization, exception handling, properties, and || conditions.",
      "words": [
        [
          "deserialize",
          "Convert representation text into typed data."
        ],
        [
          "SaveData?",
          "A reference that may hold a SaveData object or null."
        ],
        [
          "null",
          "No object reference."
        ],
        [
          "short-circuit",
          "Skip a later condition when the result is already known."
        ],
        [
          "type argument",
          "<SaveData> selects the requested result type."
        ]
      ],
      "steps": [
        "Deserialize valid JSON into an object",
        "Check null and allowed range; -5 is outside 0..1000",
        "Print the rejection; no JsonException was thrown"
      ],
      "output": "Invalid save",
      "mistake": "Never trust a save just because it parses. Do not use save! to silence a nullable warning instead of checking the result. A readable save can still contain values outside your rules.",
      "tryIt": "Replace the JSON text with the literal \"null\". What prints?",
      "solution": "Invalid save. Deserialize returns null; the first condition is true and protects the property reads.",
      "why": [
        "The serializer creates this simple class successfully.",
        "JSON can contain numbers, including negative numbers.",
        "Correct: the game rejects negative coins after parsing."
      ],
      "practiceWhy": "is null checks for a missing object before accessing its properties."
    },
    "trace": [
      [
        "Deserialize valid JSON into an object",
        "save.Coins = -5",
        null
      ],
      [
        "Check null and allowed range; -5 is outside 0..1000",
        "Invalid balance; do not apply it",
        null
      ],
      [
        "Print the rejection; no JsonException was thrown",
        "Game data is unchanged",
        "Invalid save"
      ]
    ],
    "lab": {
      "prompt": "Predict the accepted-save path.",
      "code": "using System.Text.Json;\n\nstring json = \"{\\\"Coins\\\":7}\";\ntry\n{\n    SaveData? save = JsonSerializer.Deserialize<SaveData>(json);\n    if (save is null || save.Coins < 0 || save.Coins > 1000)\n    {\n        Console.WriteLine(\"Invalid save\");\n    }\n    else\n    {\n        Console.WriteLine(save.Coins);\n    }\n}\ncatch (JsonException)\n{\n    Console.WriteLine(\"Unreadable save\");\n}\n\nclass SaveData\n{\n    public int Coins { get; set; }\n}",
      "output": "7",
      "hint": "Seven is within the allowed range.",
      "why": "The object is non-null and Coins is between 0 and 1000, so the else branch prints 7.",
      "change": "Use JSON null instead of an object. Which message appears?",
      "changeWhy": "Invalid save. The null check runs before reading Coins.",
      "changeCode": "using System.Text.Json;\n\nstring json = \"null\";\ntry\n{\n    SaveData? save = JsonSerializer.Deserialize<SaveData>(json);\n    if (save is null || save.Coins < 0 || save.Coins > 1000)\n    {\n        Console.WriteLine(\"Invalid save\");\n    }\n    else\n    {\n        Console.WriteLine(save.Coins);\n    }\n}\ncatch (JsonException)\n{\n    Console.WriteLine(\"Unreadable save\");\n}\n\nclass SaveData\n{\n    public int Coins { get; set; }\n}",
      "changeOutput": "Invalid save"
    }
  },
  {
    "id": "save-file",
    "title": "Write and read a small local save",
    "topic": "Saving · files and cleanup",
    "minutes": 12,
    "body": "A string in memory disappears when the program ends. Writing text to a file lets another run read it. Learn the operations using a uniquely named temporary demo file, which this example deletes afterward so it does not touch an existing save.",
    "code": "using System.IO;\n\nstring path = Path.Combine(Path.GetTempPath(),\n    \"gameforge-demo-\" + Guid.NewGuid() + \".txt\");\ntry\n{\n    File.WriteAllText(path, \"Coins: 12\");\n    string text = File.ReadAllText(path);\n    Console.WriteLine(text);\n}\ncatch (IOException)\n{\n    Console.WriteLine(\"Save unavailable\");\n}\ncatch (UnauthorizedAccessException)\n{\n    Console.WriteLine(\"Save unavailable\");\n}\nfinally\n{\n    if (File.Exists(path))\n    {\n        File.Delete(path);\n    }\n}",
    "output": "Coins: 12",
    "explanation": "Path.Combine joins a directory and filename using the operating system’s path rules. Guid.NewGuid supplies a fresh identifier, making this our own temporary file. WriteAllText creates or replaces file contents, and ReadAllText returns them. finally removes only this demo file. In a real save feature use a fixed app-owned path, keep the file, and handle IOExceptions or UnauthorizedAccessException with a useful message. Do not overwrite a file the user did not choose to replace. The two catches report common read/write failures before leaving through finally. The successful path shown below is unchanged. Cleanup itself can also fail; a finished app should report that rather than promise deletion. Relative paths resolve from the current working directory, which may be your project folder. For an optional real save, choose an app folder with Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), \"GameForgeRpg\"), call Directory.CreateDirectory(folder), then use Path.Combine(folder, \"save.json\"). These calls belong inside error handling. Never construct a save path from typed input, and confirm replacement of an existing named save.",
    "question": "Why does this example use a fresh filename?",
    "answers": [
      "To protect existing files from replacement",
      "To upload the save publicly",
      "Because ReadAllText cannot read fixed paths"
    ],
    "correct": 0,
    "hint": "WriteAllText replaces contents at its target path.",
    "practice": {
      "prompt": "Read the file’s text into a string.",
      "code": "string text = File.____(path);",
      "answer": "ReadAllText",
      "hint": "The method reads the whole text file."
    },
    "guide": {
      "goal": "Explain persistence and distinguish temporary demo cleanup from a real save policy.",
      "before": "You know try/finally, strings, namespaces, and JSON text.",
      "words": [
        [
          "path",
          "The location of a file or directory."
        ],
        [
          "Path.Combine",
          "Joins path components for the current operating system."
        ],
        [
          "WriteAllText",
          "Creates or replaces a text file’s contents."
        ],
        [
          "ReadAllText",
          "Reads the complete text of a file."
        ],
        [
          "Guid",
          "A type used here to create a fresh identifier."
        ]
      ],
      "steps": [
        "Choose a fresh temporary path and write Coins: 12",
        "Read that same path and print its text",
        "Leave the try statement and delete only the demo file"
      ],
      "output": "Coins: 12",
      "mistake": "WriteAllText can overwrite a file. This example deletes its temporary file on purpose; a real saved game must keep its app-owned save file. This website does not perform file operations or execute C#. The application-data folder is for an optional real save; this demo only uses its own temporary path. Keep real saves and backups instead of applying this demo cleanup to them.",
      "tryIt": "Change the text being written to \"Coins: 4\". What gets read?",
      "solution": "Coins: 4. The reader returns the text written to the same path.",
      "why": [
        "Correct: the generated demo path avoids replacing an existing named save.",
        "No upload or network operation appears.",
        "ReadAllText can read a known fixed path too."
      ],
      "practiceWhy": "ReadAllText returns the saved text rather than writing new contents."
    },
    "trace": [
      [
        "Choose a fresh temporary path and write Coins: 12",
        "Demo file contains \"Coins: 12\"",
        null
      ],
      [
        "Read that same path and print its text",
        "text = \"Coins: 12\"",
        "Coins: 12"
      ],
      [
        "Leave the try statement and delete only the demo file",
        "Demo file removed",
        null
      ]
    ],
    "lab": {
      "prompt": "Predict text written and read from our temporary demo file.",
      "code": "using System.IO;\n\nstring path = Path.Combine(Path.GetTempPath(),\n    \"gameforge-demo-\" + Guid.NewGuid() + \".txt\");\ntry\n{\n    File.WriteAllText(path, \"Coins: 4\");\n    string text = File.ReadAllText(path);\n    Console.WriteLine(text);\n}\ncatch (IOException)\n{\n    Console.WriteLine(\"Save unavailable\");\n}\ncatch (UnauthorizedAccessException)\n{\n    Console.WriteLine(\"Save unavailable\");\n}\nfinally\n{\n    if (File.Exists(path))\n    {\n        File.Delete(path);\n    }\n}",
      "output": "Coins: 4",
      "hint": "Both operations use the same generated path.",
      "why": "The written contents are Coins: 4; reading them does not alter them.",
      "change": "Store \"Coins: 0\" instead. Does zero prevent writing?",
      "changeWhy": "No. The file contains plain text, and the output is Coins: 0.",
      "changeCode": "using System.IO;\n\nstring path = Path.Combine(Path.GetTempPath(),\n    \"gameforge-demo-\" + Guid.NewGuid() + \".txt\");\ntry\n{\n    File.WriteAllText(path, \"Coins: 0\");\n    string text = File.ReadAllText(path);\n    Console.WriteLine(text);\n}\ncatch (IOException)\n{\n    Console.WriteLine(\"Save unavailable\");\n}\ncatch (UnauthorizedAccessException)\n{\n    Console.WriteLine(\"Save unavailable\");\n}\nfinally\n{\n    if (File.Exists(path))\n    {\n        File.Delete(path);\n    }\n}",
      "changeOutput": "Coins: 0"
    }
  },
  {
    "id": "rule-tests",
    "title": "Test ordinary inputs and boundaries",
    "topic": "Testing · expected and actual results",
    "minutes": 11,
    "body": "A test compares expected behavior with actual behavior. Start with a few deterministic checks for a pure rule: ordinary damage, exact defeat, and rejected input. Test names explain which rule failed.",
    "code": "int Damage(int health, int amount)\n{\n    if (amount < 0) return health;\n    return Math.Max(0, health - amount);\n}\nvoid Expect(string name, int expected, int actual)\n{\n    if (expected == actual) Console.WriteLine(name + \": PASS\");\n    else Console.WriteLine(name + \": FAIL\");\n}\nExpect(\"normal\", 13, Damage(20, 7));\nExpect(\"zero\", 0, Damage(20, 20));\nExpect(\"invalid\", 20, Damage(20, -3));",
    "output": "normal: PASS\nzero: PASS\ninvalid: PASS",
    "explanation": "Expected values are chosen from the written rule, not copied from whatever the program prints. Damage returns a value without requiring input or changing global state. Expect is a tiny console comparison helper, not a full test framework: FAIL is visible but does not automatically fail a build. Later a test framework supplies assertions and machine-readable failures. Passing three examples does not prove every possible input works.",
    "question": "Which case checks the exact defeat boundary?",
    "answers": [
      "normal: Damage(20, 7)",
      "zero: Damage(20, 20)",
      "invalid: Damage(20, -3)"
    ],
    "correct": 1,
    "hint": "A boundary case reaches the edge of an allowed range.",
    "practice": {
      "prompt": "Compare expected and actual without assigning either.",
      "code": "if (expected ____ actual)",
      "answer": "==",
      "hint": "Use the equality comparison operator."
    },
    "guide": {
      "goal": "Choose meaningful cases and diagnose a failed comparison before changing the expected value.",
      "before": "Review stateless damage rules and == versus =.",
      "words": [
        [
          "expected",
          "The result required by a written rule."
        ],
        [
          "actual",
          "The result the implementation produced."
        ],
        [
          "test case",
          "A specific input and expected behavior."
        ],
        [
          "regression",
          "A change that breaks behavior that previously worked."
        ]
      ],
      "steps": [
        "Normal case compares 13 with Damage(20, 7)",
        "Exact defeat compares 0 with Damage(20, 20)",
        "Rejected input compares 20 with Damage(20, -3)"
      ],
      "output": "normal: PASS\nzero: PASS\ninvalid: PASS",
      "mistake": "Do not change an expected result merely to make PASS appear. Check the written rule, then determine whether the implementation or the test is wrong. Add an overkill case too. Overkill means damage larger than remaining health: Damage(20, 30) should return 0.",
      "tryIt": "Change the expected normal result from 13 to 12. What happens?",
      "solution": "normal: FAIL, followed by two PASS lines. The damage rule still returns 13; this changed test expectation is incorrect.",
      "why": [
        "Seven damage is an ordinary case, not exact defeat.",
        "Correct: damage equals all remaining health.",
        "This checks rejected negative input rather than exact defeat."
      ],
      "practiceWhy": "== compares values; = would assign a value instead."
    },
    "trace": [
      [
        "Normal case compares 13 with Damage(20, 7)",
        "expected = 13; actual = 13",
        "normal: PASS"
      ],
      [
        "Exact defeat compares 0 with Damage(20, 20)",
        "expected = 0; actual = 0",
        "zero: PASS"
      ],
      [
        "Rejected input compares 20 with Damage(20, -3)",
        "expected = 20; actual = 20",
        "invalid: PASS"
      ]
    ],
    "lab": {
      "prompt": "One expected value is deliberately wrong. Predict all three result lines.",
      "code": "int Damage(int health, int amount)\n{\n    if (amount < 0) return health;\n    return Math.Max(0, health - amount);\n}\nvoid Expect(string name, int expected, int actual)\n{\n    if (expected == actual) Console.WriteLine(name + \": PASS\");\n    else Console.WriteLine(name + \": FAIL\");\n}\nExpect(\"normal\", 13, Damage(20, 7));\nExpect(\"zero\", 1, Damage(20, 20));\nExpect(\"invalid\", 20, Damage(20, -3));",
      "output": "normal: PASS\nzero: FAIL\ninvalid: PASS",
      "hint": "The exact defeat calculation still returns 0.",
      "why": "The test expects 1 for zero health, so only that comparison fails.",
      "change": "Restore the correct defeat expectation.",
      "changeWhy": "All three checks print PASS. Zero is the rule’s correct result.",
      "changeCode": "int Damage(int health, int amount)\n{\n    if (amount < 0) return health;\n    return Math.Max(0, health - amount);\n}\nvoid Expect(string name, int expected, int actual)\n{\n    if (expected == actual) Console.WriteLine(name + \": PASS\");\n    else Console.WriteLine(name + \": FAIL\");\n}\nExpect(\"normal\", 13, Damage(20, 7));\nExpect(\"zero\", 0, Damage(20, 20));\nExpect(\"invalid\", 20, Damage(20, -3));",
      "changeOutput": "normal: PASS\nzero: PASS\ninvalid: PASS"
    }
  },
  {
    "id": "project-plan",
    "title": "Write rules before adding features",
    "topic": "Final project · plan and responsibilities",
    "minutes": 10,
    "body": "Build a small game from written rules rather than adding everything at once. Start with one playable path: read a choice, validate it, apply one action, check the ending, and show the new state. Keep input handling separate from your damage calculation.",
    "code": "int Damage(int health, int amount)\n{\n    if (amount < 0) return health;\n    return Math.Max(0, health - amount);\n}\n\nstring input = \"9\";\nint enemyHealth = 20;\nif (int.TryParse(input, out int choice) && choice == 1)\n{\n    enemyHealth = Damage(enemyHealth, 10);\n    Console.WriteLine(\"Attack\");\n}\nelse\n{\n    Console.WriteLine(\"Choose 1 to attack\");\n}\nConsole.WriteLine(enemyHealth);",
    "output": "Choose 1 to attack\n20",
    "explanation": "This deliberately tiny prototype accepts only 1 for attack; all other inputs leave health unchanged. TryParse succeeds for 9, but the allowed-choice check fails. The Damage function has no console input, so it can be checked independently. For the full RPG, use the Build a tiny RPG guide: get one milestone working before adding the next. List victory, defeat, quit, and end-of-input behavior before you build.",
    "question": "Does input \"9\" damage the enemy?",
    "answers": [
      "Yes, by nine points",
      "Yes, because it is a number",
      "No, because it is not an allowed action"
    ],
    "correct": 2,
    "hint": "Parsing succeeds, but the next condition still matters.",
    "practice": {
      "prompt": "Compare the choice with the allowed attack action.",
      "code": "if (int.TryParse(input, out int choice) && choice ____ 1)",
      "answer": "==",
      "hint": "Compare values rather than assign."
    },
    "guide": {
      "goal": "Translate one rule into a small playable step without consuming invalid actions.",
      "before": "Review menu validation, short-circuit AND, and damage rules. The earlier RPG checklist provides the larger project.",
      "words": [
        [
          "prototype",
          "A small version used to test an idea."
        ],
        [
          "responsibility",
          "One job assigned to a function or type."
        ],
        [
          "acceptance rule",
          "Observable behavior that tells you a feature works."
        ],
        [
          "vertical slice",
          "One small path that works from input through output."
        ]
      ],
      "steps": [
        "Start with input 9 and an enemy at 20",
        "Parse 9; reject it because choice is not 1",
        "Print health after the rejected action"
      ],
      "output": "Choose 1 to attack\n20",
      "mistake": "Do not add saving, more enemy types, and art before one basic turn works. A parsed number still needs an allowed-action check.",
      "tryIt": "Use \"1\" as input. Which lines print?",
      "solution": "Attack, then 10. The action is allowed, so damage runs once.",
      "why": [
        "The action uses a fixed damage rule, not the number typed.",
        "A number can still be outside the allowed choices.",
        "Correct: the allowed-action check fails."
      ],
      "practiceWhy": "== checks whether choice is exactly the allowed action."
    },
    "trace": [
      [
        "Start with input 9 and an enemy at 20",
        "input = \"9\"; enemyHealth = 20",
        null
      ],
      [
        "Parse 9; reject it because choice is not 1",
        "Health stays 20",
        "Choose 1 to attack"
      ],
      [
        "Print health after the rejected action",
        "enemyHealth = 20",
        "20"
      ]
    ],
    "lab": {
      "prompt": "Predict the smallest successful attack path.",
      "code": "int Damage(int health, int amount)\n{\n    if (amount < 0) return health;\n    return Math.Max(0, health - amount);\n}\n\nstring input = \"1\";\nint enemyHealth = 20;\nif (int.TryParse(input, out int choice) && choice == 1)\n{\n    enemyHealth = Damage(enemyHealth, 10);\n    Console.WriteLine(\"Attack\");\n}\nelse\n{\n    Console.WriteLine(\"Choose 1 to attack\");\n}\nConsole.WriteLine(enemyHealth);",
      "output": "Attack\n10",
      "hint": "The parsed choice matches 1, so the health assignment runs.",
      "why": "One accepted attack subtracts 10 from 20.",
      "change": "Use nonnumeric text. Does Damage still run?",
      "changeWhy": "No. TryParse fails, the AND short-circuits, and output is Choose 1 to attack, then 20.",
      "changeCode": "int Damage(int health, int amount)\n{\n    if (amount < 0) return health;\n    return Math.Max(0, health - amount);\n}\n\nstring input = \"oops\";\nint enemyHealth = 20;\nif (int.TryParse(input, out int choice) && choice == 1)\n{\n    enemyHealth = Damage(enemyHealth, 10);\n    Console.WriteLine(\"Attack\");\n}\nelse\n{\n    Console.WriteLine(\"Choose 1 to attack\");\n}\nConsole.WriteLine(enemyHealth);",
      "changeOutput": "Choose 1 to attack\n20"
    }
  },
  {
    "id": "project-turn",
    "title": "Finish an action before allowing a reply",
    "topic": "Final project · turn order",
    "minutes": 11,
    "body": "Turn order is part of a game’s rules. After the hero attacks, check whether the enemy is defeated before allowing retaliation. A defeated enemy should not attack just because the next instruction says to.",
    "code": "int heroHealth = 20;\nint enemyHealth = 5;\nenemyHealth = Math.Max(0, enemyHealth - 10);\nConsole.WriteLine(\"Enemy: \" + enemyHealth);\nif (enemyHealth == 0)\n{\n    Console.WriteLine(\"Victory\");\n}\nelse\n{\n    heroHealth = Math.Max(0, heroHealth - 4);\n    Console.WriteLine(\"Hero: \" + heroHealth);\n}",
    "output": "Enemy: 0\nVictory",
    "explanation": "The action reduces enemy health from 5 to zero. The victory branch handles the ending and skips retaliation. If the enemy survives, the else branch damages the hero. In the full game also check for hero defeat immediately after that retaliation. These assignments are visible so you can trace one turn before placing it in a loop.",
    "question": "Does the enemy retaliate in this turn?",
    "answers": [
      "No, because the enemy was defeated",
      "Yes, because health started positive",
      "Yes, because every turn needs two attacks"
    ],
    "correct": 0,
    "hint": "Choose the branch after applying hero damage.",
    "practice": {
      "prompt": "Compare the clamped enemy health with exactly zero using the equality operator.",
      "code": "if (enemyHealth ____ 0)",
      "answer": "==",
      "hint": "Use the equality comparison operator, not a range check."
    },
    "guide": {
      "goal": "Trace one complete turn and stop actions after a terminal outcome.",
      "before": "Review clamped health, if/else, and the written rules from project planning.",
      "words": [
        [
          "retaliation",
          "The enemy’s response after surviving an attack."
        ],
        [
          "turn order",
          "The sequence of actions and checks in a turn."
        ],
        [
          "terminal outcome",
          "An ending such as victory or defeat."
        ],
        [
          "state transition",
          "A change from active play to another game state."
        ]
      ],
      "steps": [
        "Start with the hero at 20 and the enemy at 5",
        "Apply hero attack; clamp enemy health at zero and print",
        "The enemy is defeated; print victory and skip else"
      ],
      "output": "Enemy: 0\nVictory",
      "mistake": "Do not damage the hero before checking enemy defeat unless simultaneous damage is your explicitly chosen game rule. Be consistent with the rule you teach and test.",
      "tryIt": "Start the enemy at 15. Does retaliation happen?",
      "solution": "Yes. Enemy health becomes 5, then hero health becomes 16. The output is Enemy: 5, then Hero: 16.",
      "why": [
        "Correct: the victory branch skips retaliation.",
        "Use the updated health, not its earlier value.",
        "Turn structure does not require a defeated enemy to act."
      ],
      "practiceWhy": "== compares the health after the action with the defeat boundary."
    },
    "trace": [
      [
        "Start with the hero at 20 and the enemy at 5",
        "heroHealth = 20; enemyHealth = 5",
        null
      ],
      [
        "Apply hero attack; clamp enemy health at zero and print",
        "enemyHealth = 0",
        "Enemy: 0"
      ],
      [
        "The enemy is defeated; print victory and skip else",
        "heroHealth remains 20",
        "Victory"
      ]
    ],
    "lab": {
      "prompt": "Predict a turn where the enemy survives.",
      "code": "int heroHealth = 20;\nint enemyHealth = 15;\nenemyHealth = Math.Max(0, enemyHealth - 10);\nConsole.WriteLine(\"Enemy: \" + enemyHealth);\nif (enemyHealth == 0)\n{\n    Console.WriteLine(\"Victory\");\n}\nelse\n{\n    heroHealth = Math.Max(0, heroHealth - 4);\n    Console.WriteLine(\"Hero: \" + heroHealth);\n}",
      "output": "Enemy: 5\nHero: 16",
      "hint": "Apply 10 enemy damage, then 4 hero damage.",
      "why": "Enemy health becomes 5, so the else branch retaliates and stores hero health 16.",
      "change": "Use exactly 10 starting enemy health. Is there retaliation?",
      "changeWhy": "No. Output is Enemy: 0, then Victory. Exact defeat follows the same ending rule.",
      "changeCode": "int heroHealth = 20;\nint enemyHealth = 10;\nenemyHealth = Math.Max(0, enemyHealth - 10);\nConsole.WriteLine(\"Enemy: \" + enemyHealth);\nif (enemyHealth == 0)\n{\n    Console.WriteLine(\"Victory\");\n}\nelse\n{\n    heroHealth = Math.Max(0, heroHealth - 4);\n    Console.WriteLine(\"Hero: \" + heroHealth);\n}",
      "changeOutput": "Enemy: 0\nVictory"
    }
  },
  {
    "id": "project-playtest",
    "title": "Prove the endings before polishing",
    "topic": "Final project · integration and playtesting",
    "minutes": 14,
    "body": "Now repeat a complete turn and check its endings. Automated checks can verify rules, while a human playtest reveals confusing instructions and choices. Polish after the smallest game reliably reaches victory, defeat, and quit.",
    "code": "int heroHealth = 20;\nint enemyHealth = 15;\nGameState state = GameState.Combat;\nwhile (state == GameState.Combat)\n{\n    enemyHealth = Math.Max(0, enemyHealth - 10);\n    if (enemyHealth == 0)\n    {\n        state = GameState.Victory;\n    }\n    else\n    {\n        heroHealth = Math.Max(0, heroHealth - 4);\n        if (heroHealth == 0) state = GameState.Defeat;\n    }\n}\nConsole.WriteLine(state);\nConsole.WriteLine(heroHealth);\n\nenum GameState { Combat, Victory, Defeat }",
    "output": "Victory\n16",
    "explanation": "Turn one leaves the enemy at 5 and the hero at 16. Turn two defeats the enemy and skips retaliation. Victory makes the while condition false, so the ending prints once. This deterministic simulation intentionally omits player input to isolate turn rules. The complete console RPG reference in Build a tiny RPG adds menus, rooms, potions, quit, and end-of-input. Do not add inheritance or save systems just to use every lesson; optional extensions should serve a clear rule. This simulation uses explicit Victory and Defeat states; the RPG reference instead uses GameOver plus an ending-reason variable. Both represent a stopped game. Follow one consistent design; do not paste two GameState declarations into the same project.",
    "question": "Why does hero health finish at 16 rather than 12?",
    "answers": [
      "The hero heals on victory",
      "The enemy cannot retaliate after defeat",
      "The loop runs only once"
    ],
    "correct": 1,
    "hint": "Trace both turns and check the enemy before each reply.",
    "practice": {
      "prompt": "Exit combat after defeating the enemy.",
      "code": "state = GameState.____;",
      "answer": "Victory",
      "hint": "Use the named winning state from the enum."
    },
    "guide": {
      "goal": "Trace the full loop, then use a repeatable playtest checklist for the real project.",
      "before": "Complete project planning and turn order. Review while loops and enum states.",
      "words": [
        [
          "integration",
          "Several pieces working together as one feature."
        ],
        [
          "playtest",
          "Observe someone playing to find problems and unclear choices."
        ],
        [
          "regression check",
          "Repeat a known case after making a change."
        ],
        [
          "polish",
          "Improve presentation after core behavior works."
        ]
      ],
      "steps": [
        "Start in Combat with hero 20 and enemy 15",
        "First turn: enemy falls to 5 and retaliates; second turn: enemy reaches 0 and cannot retaliate",
        "The while condition is false; print the final state",
        "Print the remaining hero health"
      ],
      "output": "Victory\n16",
      "mistake": "A working victory path is not a complete test. Check defeat, quit, invalid input, end-of-input, empty inventory, potion limits, and starting a fresh run in the actual RPG. Record expected behavior before each run.",
      "tryIt": "Start the hero at 4. Which ending happens first?",
      "solution": "Defeat, then 0. The enemy survives the first hit and its 4 damage defeats the hero; the loop stops before a second hero attack.",
      "why": [
        "No instruction heals the hero.",
        "Correct: the second hit ends combat before another reply.",
        "Two hero attacks happen, but only one enemy reply."
      ],
      "practiceWhy": "Victory changes state so the next while condition is false."
    },
    "trace": [
      [
        "Start in Combat with hero 20 and enemy 15",
        "state = Combat; heroHealth = 20; enemyHealth = 15",
        null
      ],
      [
        "First turn: enemy falls to 5 and retaliates; second turn: enemy reaches 0 and cannot retaliate",
        "state = Victory; heroHealth = 16; enemyHealth = 0",
        null
      ],
      [
        "The while condition is false; print the final state",
        "state remains Victory",
        "Victory"
      ],
      [
        "Print the remaining hero health",
        "heroHealth remains 16",
        "16"
      ]
    ],
    "lab": {
      "prompt": "Predict an extra-turn fight using the same rules.",
      "code": "int heroHealth = 20;\nint enemyHealth = 25;\nGameState state = GameState.Combat;\nwhile (state == GameState.Combat)\n{\n    enemyHealth = Math.Max(0, enemyHealth - 10);\n    if (enemyHealth == 0)\n    {\n        state = GameState.Victory;\n    }\n    else\n    {\n        heroHealth = Math.Max(0, heroHealth - 4);\n        if (heroHealth == 0) state = GameState.Defeat;\n    }\n}\nConsole.WriteLine(state);\nConsole.WriteLine(heroHealth);\n\nenum GameState { Combat, Victory, Defeat }",
      "output": "Victory\n12",
      "hint": "Enemy health goes 25, 15, 5, 0; count only surviving-enemy replies.",
      "why": "The enemy retaliates twice, taking the hero from 20 to 16 to 12. The third hero hit wins.",
      "change": "Keep enemy health 25 and start hero health at 4.",
      "changeWhy": "The first reply defeats the hero. Output is Defeat, then 0.",
      "changeCode": "int heroHealth = 4;\nint enemyHealth = 25;\nGameState state = GameState.Combat;\nwhile (state == GameState.Combat)\n{\n    enemyHealth = Math.Max(0, enemyHealth - 10);\n    if (enemyHealth == 0)\n    {\n        state = GameState.Victory;\n    }\n    else\n    {\n        heroHealth = Math.Max(0, heroHealth - 4);\n        if (heroHealth == 0) state = GameState.Defeat;\n    }\n}\nConsole.WriteLine(state);\nConsole.WriteLine(heroHealth);\n\nenum GameState { Combat, Victory, Defeat }",
      "changeOutput": "Defeat\n0"
    }
  }
];
export const finishingModules = [
  {
    "id": "organization",
    "title": "Organize code and handle failures",
    "ids": [
      "namespaces",
      "guard-clauses",
      "exceptions"
    ],
    "goal": "Separate definitions, reject invalid inputs, and handle a specific failure.",
    "project": "Move Character into its own .cs file in the same project. Keep menu validation separate from combat rules.",
    "recap": [
      "using resolves names; it does not install packages.",
      "A parameter is local to its call; return sends a result back.",
      "Prefer TryParse for ordinary menu mistakes. Catch only failures you can handle."
    ]
  },
  {
    "id": "object-rules",
    "title": "Protect data and express game rules",
    "ids": [
      "properties",
      "encapsulation",
      "static-rules"
    ],
    "goal": "Use private storage, controlled updates, and independently testable calculations.",
    "project": "If you adapt the RPG Character to use private set, update every external health assignment. Use TakeDamage for hits and the guarded Heal method from the properties lesson for potions: call hero.Heal(25) instead of assigning hero.Health directly. Keep healing capped at 100 and reject nonpositive amounts. Try this in a separate copy before changing your working game.",
    "recap": [
      "A getter and setter can have different access levels.",
      "Private storage still needs validation inside the class.",
      "Static methods belong to a type; stateless rules are easier to test."
    ]
  },
  {
    "id": "design",
    "title": "Choose relationships between objects",
    "ids": [
      "inheritance",
      "virtual-methods",
      "interfaces",
      "composition"
    ],
    "goal": "Choose is-a, can-do, and has-a relationships without unnecessary class hierarchies.",
    "project": "Give a hero a Backpack. Use an interface only if multiple item types need the same ability. Try one enemy override in a separate experiment.",
    "recap": [
      "Inheritance represents is-a; a class has one direct base class.",
      "A virtual call selects the override on the actual object.",
      "An interface expresses a contract; composition expresses has-a.",
      "A get-only object reference does not make the referenced object immutable."
    ]
  },
  {
    "id": "save-test",
    "title": "Save data and test the rules",
    "ids": [
      "json-save",
      "json-load",
      "save-file",
      "rule-tests"
    ],
    "goal": "Separate JSON conversion, validation, file storage, and rule checks.",
    "project": "Experiment with an app-owned save-data class in a separate console project. Validate null and out-of-range data before applying it. Keep a table of combat boundary tests.",
    "recap": [
      "Serialize creates text; writing a file is a separate operation.",
      "Deserialize can return null or throw JsonException; readable data still needs validation.",
      "WriteAllText can replace contents. Choose a path you own and keep real saves instead of deleting them.",
      "Expected test results come from the rule. A few PASS messages are evidence, not proof of all inputs."
    ]
  },
  {
    "id": "finish-project",
    "title": "Build, test, and polish your console RPG",
    "ids": [
      "project-plan",
      "project-turn",
      "project-playtest"
    ],
    "goal": "Finish one playable path, enforce turn order, and test every ending before adding features.",
    "project": "Use Build a tiny RPG to complete the six milestones. Run the reference only in your own console project. Test victory, defeat, quit, end-of-input, invalid input, potions, and separate characters. Ask someone to play without explaining the controls for them.",
    "recap": [
      "Write allowed actions and endings before adding features.",
      "Invalid choices must not consume a turn in this RPG.",
      "Check enemy defeat before retaliation; check hero defeat afterward.",
      "After a terminal state, the loop stops and the ending prints once.",
      "Optional saving and richer enemy types can wait until the playable path is reliable."
    ]
  }
];
export const finishingDebug = {
  "organization": {
    "title": "Negative damage heals the target",
    "goal": "Reject negative damage and keep health at 20.",
    "code": "int Damage(int health, int damage)\n{\n    return Math.Max(0, health - damage);\n}\nConsole.WriteLine(Damage(20, -5));",
    "actual": "25",
    "expected": "20",
    "hint": "Check damage before calculating health.",
    "fixed": "int Damage(int health, int damage)\n{\n    if (damage < 0) return health;\n    return Math.Max(0, health - damage);\n}\nConsole.WriteLine(Damage(20, -5));",
    "why": "The early return rejects a negative amount instead of subtracting it.",
    "test": "Try -5, 0, 7, and 30. Expect 20, 20, 13, and 0."
  },
  "object-rules": {
    "title": "A negative hit increases health",
    "goal": "Keep hero health at 100 when damage is negative.",
    "code": "Hero hero = new Hero();\nhero.Hit(-10);\nConsole.WriteLine(hero.Health);\nclass Hero\n{\n    public int Health { get; private set; } = 100;\n    public void Hit(int amount) { Health = Math.Max(0, Health - amount); }\n}",
    "actual": "110",
    "expected": "100",
    "hint": "A private setter does not prevent a bad update inside Hit.",
    "fixed": "Hero hero = new Hero();\nhero.Hit(-10);\nConsole.WriteLine(hero.Health);\nclass Hero\n{\n    public int Health { get; private set; } = 100;\n    public void Hit(int amount) { if (amount < 0) return; Health = Math.Max(0, Health - amount); }\n}",
    "why": "Add a guard inside the method, where this update occurs.",
    "test": "Try hits of -10, 0, 25, and 150 on fresh heroes. Expect 100, 100, 75, and 0."
  },
  "design": {
    "title": "The wrong object type is created",
    "goal": "Use the Goblin override and print 7.",
    "code": "Enemy enemy = new Enemy();\nConsole.WriteLine(enemy.Damage());\nclass Enemy { public virtual int Damage() { return 3; } }\nclass Goblin : Enemy { public override int Damage() { return 7; } }",
    "actual": "3",
    "expected": "7",
    "hint": "The variable type permits Goblin, but inspect new.",
    "fixed": "Enemy enemy = new Goblin();\nConsole.WriteLine(enemy.Damage());\nclass Enemy { public virtual int Damage() { return 3; } }\nclass Goblin : Enemy { public override int Damage() { return 7; } }",
    "why": "Virtual dispatch uses the actual object. Create the intended derived type.",
    "test": "Create Enemy and Goblin separately through Enemy variables. Expect 3 and 7."
  },
  "save-test": {
    "title": "A parsed save bypasses validation",
    "goal": "Reject a negative balance instead of applying it.",
    "code": "using System.Text.Json;\nSaveData? save = JsonSerializer.Deserialize<SaveData>(\"{\\\"Coins\\\":-5}\");\nif (save is null) Console.WriteLine(\"Rejected\");\nelse Console.WriteLine(save.Coins);\nclass SaveData { public int Coins { get; set; } }",
    "actual": "-5",
    "expected": "Rejected",
    "hint": "A non-null object can still hold invalid values.",
    "fixed": "using System.Text.Json;\nSaveData? save = JsonSerializer.Deserialize<SaveData>(\"{\\\"Coins\\\":-5}\");\nif (save is null || save.Coins < 0 || save.Coins > 1000) Console.WriteLine(\"Rejected\");\nelse Console.WriteLine(save.Coins);\nclass SaveData { public int Coins { get; set; } }",
    "why": "Validate the allowed range before using the value. The null check protects later property reads.",
    "test": "Try JSON null, balances -5, 0, 1000, and 1001. Reject null, -5, and 1001. Malformed text additionally needs a JsonException handler."
  },
  "finish-project": {
    "title": "A defeated enemy still retaliates",
    "goal": "Keep hero health at 20 after the winning attack.",
    "code": "int heroHealth = 20;\nint enemyHealth = 5;\nenemyHealth = Math.Max(0, enemyHealth - 10);\nheroHealth = Math.Max(0, heroHealth - 4);\nConsole.WriteLine(heroHealth);",
    "actual": "16",
    "expected": "20",
    "hint": "Check enemy health between the two damage assignments.",
    "fixed": "int heroHealth = 20;\nint enemyHealth = 5;\nenemyHealth = Math.Max(0, enemyHealth - 10);\nif (enemyHealth > 0) heroHealth = Math.Max(0, heroHealth - 4);\nConsole.WriteLine(heroHealth);",
    "why": "Only a surviving enemy may retaliate under this game’s rule.",
    "test": "Start enemy health at 5, 10, and 15. Expect hero health 20, 20, and 16."
  }
};
