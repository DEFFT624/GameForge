using System;
using System.Collections.Generic;

// GameForge: Dungeon of Three Rooms. First-party learning source; no downloads run here.
Character hero = new Character();
List<string> inventory = new List<string> { "Potion", "Potion" };
GameState state = GameState.Exploring;
int room = 1;
int enemyHealth = 0;
string ending = "";

Console.WriteLine("Dungeon of Three Rooms");
Console.WriteLine(hero.Name + " begins with " + hero.Health + " health and two potions.");

while (state != GameState.GameOver)
{
    if (state == GameState.Exploring)
    {
        enemyHealth = 25;
        Console.WriteLine("Room " + room + ": an enemy appears!");
        state = GameState.Combat;
    }

    Console.WriteLine("Hero health: " + hero.Health + " | Enemy health: " + enemyHealth);
    Console.WriteLine("1: Attack | 2: Potion | 3: Quit");
    string? input = Console.ReadLine();

    if (input == null)
    {
        ending = "Input ended. Goodbye, adventurer.";
        state = GameState.GameOver;
        continue;
    }

    if (!int.TryParse(input, out int choice) || choice < 1 || choice > 3)
    {
        Console.WriteLine("Choose 1, 2, or 3. No turn used.");
        continue;
    }

    switch (choice)
    {
        case 1:
            enemyHealth = Math.Max(0, enemyHealth - 10);
            Console.WriteLine("Attack! Enemy health: " + enemyHealth);
            break;
        case 2:
            if (hero.Health == 100)
            {
                Console.WriteLine("Health is already full. No turn used.");
                continue;
            }
            if (!inventory.Contains("Potion"))
            {
                Console.WriteLine("No potions left. No turn used.");
                continue;
            }
            hero.Health = Math.Min(100, hero.Health + 25);
            inventory.Remove("Potion");
            Console.WriteLine("Potion used. Hero health: " + hero.Health);
            Console.WriteLine("Potions left: " + inventory.Count);
            break;
        case 3:
            ending = "You chose to quit. Goodbye, adventurer.";
            state = GameState.GameOver;
            break;
    }

    // break leaves the switch. This check prevents a counterattack after quitting.
    if (state == GameState.GameOver)
    {
        continue;
    }

    if (enemyHealth == 0)
    {
        Console.WriteLine("Room " + room + " cleared!");
        if (room == 3)
        {
            ending = "Victory! All three rooms are clear.";
            state = GameState.GameOver;
        }
        else
        {
            room = room + 1;
            state = GameState.Exploring;
        }
    }
    else
    {
        hero.TakeDamage(8);
        Console.WriteLine("Enemy attacks! Hero health: " + hero.Health);
        if (hero.Health == 0)
        {
            ending = "Defeat. Your adventure ends here.";
            state = GameState.GameOver;
        }
    }
}

Console.WriteLine(ending);

class Character
{
    public string Name = "Nova";
    public int Health = 100;

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - Math.Max(0, amount));
    }
}

enum GameState { Exploring, Combat, GameOver }
