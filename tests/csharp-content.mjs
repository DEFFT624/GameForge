// Only first-party curriculum samples are compiled. No user code is loaded.
// Run with npm run test:csharp using the .NET 10 SDK.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {course} from '../public/course-plan.js';
// Small changes suggested by the optional labs, checked as real console programs.
const labChanges = [
  ['interpolation', 'coins + 2', 'coins + 4', 'Coins: 5\nCoins: 9'],
  ['arrays', 'index < rooms.Length', 'index < 1', 'Gate\n2'],
  ['constructors', 'new Enemy("Goblin", 20)', 'new Enemy("Goblin", 35)', 'Goblin: 35'],
  ['dictionary', 'string item = "Shield";', 'string item = "Potion";', 'Potion: 5 coins'],
  ['health', 'health - 40', 'health - 100', '10'],
  ['health', 'health - 40', 'health - 120', '-10'],
  ['strings', '" found"', '"found"', 'Coinfound'],
  ['booleans', 'health = 0', 'health = 1', 'True'],
  ['decisions', 'health = 0', 'health = 1', 'Continue'],
  ['decisions', 'health = 0', 'health = -1', 'Defeated'],
  ['combined-conditions', 'hasKey = false', 'hasKey = true', 'Open'],
  ['loops', 'room <= 3', 'room < 3', '1\n2'],
  ['while-loop', 'charges = 2', 'charges = 0', 'Empty'],
  ['call-function', 'turn < 2', 'turn < 0', ''],
  ['function-inputs', 'int reward = AddBonus(3);\nConsole.WriteLine(reward);', 'AddBonus(3);', ''],
  ['methods', 'Heal(95, 20)', 'Heal(95, -20)', '75'],
  ['inventory', 'inventory.Remove("Potion");', 'inventory.Remove("Potion");\ninventory.Remove("Coin");', null, 'ArgumentOutOfRangeException'],
  ['list-loop', 'new List<string> { "Sword", "Potion", "Key" }', 'new List<string>()', ''],
  ['class-fields', 'hero.Health = 60;\n', '', '100'],
  ['characters', 'Character echo = hero;', 'Character echo = new Character();', '100'],
  ['input', '"0"', '"abc"', 'Try again'],
  ['input', '"0"', '"3"', 'Accepted'],
  ['input', '"0"', '"4"', 'Try again'],
  ['enum-state', 'state = GameState.Victory;\n', '', 'Exploring'],
  ['switch-choice', 'choice = 2', 'choice = 9', 'Quit\nDone'],
  ['states', 'GameState state = GameState.GameOver;', 'GameState state = GameState.Exploring;', 'Playing\nFinished']
].map(([id, before, after, output, exception], index) => {
  const code = course.labs[id].code;
  assert.equal(code.split(before).length, 2, 'Experiment must change exactly one part: ' + id);
  return {id: 'experiment-' + id + '-' + index, code: code.replace(before, after), output, exception};
});
const reviewedCases = [
  ['properties', 'hero.TakeDamage(25);', 'hero.TakeDamage(25);\nhero.Heal(10);', '85'],
  ['properties', 'hero.TakeDamage(25);', 'hero.TakeDamage(25);\nhero.Heal(int.MaxValue);', '100'],
  ['properties', 'hero.TakeDamage(25);', 'hero.TakeDamage(25);\nhero.Heal(-10);', '75'],
  ['save-file', 'File.ReadAllText(path)', 'File.ReadAllText(path + ".missing")', 'Save unavailable'],
  ['json-load', 'string json = "{\\"Coins\\":-5}";', 'string json = "null";', 'Invalid save'],
  ['json-load', 'string json = "{\\"Coins\\":-5}";', 'string json = "broken";', 'Unreadable save'],
  ['json-load', 'string json = "{\\"Coins\\":-5}";', 'string json = "{\\"coins\\":5}";', '0']
].map(([id,before,after,output],index)=>{
  const code=course.lessons.find(lesson=>lesson.id===id).code;
  assert.equal(code.split(before).length,2,'Review check changes exactly one part: '+id);
  return {id:'review-'+id+'-'+index,code:code.replace(before,after),output};
});
const allCases = [
  ...course.lessons.map(lesson => ({id: 'lesson-' + lesson.id, code: lesson.code, output: course.lessonGuides[lesson.id].output})),
  ...Object.entries(course.labs).map(([id, lab]) => ({id: 'lab-' + id, code: lab.code, output: lab.output})),
  ...Object.entries(course.debugging).flatMap(([id, bug]) => [
    {id: 'bug-' + id, code: bug.code, output: bug.actual},
    {id: 'repair-' + id, code: bug.fixed, output: bug.expected}
  ]),
  ...labChanges, ...reviewedCases,
  ...Object.entries(course.labs).filter(([,lab])=>lab.changeCode).map(([id,lab])=>({id:'experiment-'+id,code:lab.changeCode,output:lab.changeOutput}))
];
// Focused reruns only select known first-party samples; CI still runs all by default.
const selection = process.argv.find(arg=>arg.startsWith('--lessons='))?.slice(10).split(',');
if (selection) assert.ok(selection.every(id=>course.lessons.some(lesson=>lesson.id===id)),'Unknown lesson selection');
const cases = selection ? allCases.filter(sample=>selection.some(id=>['lesson-','lab-','experiment-','review-'].some(prefix=>sample.id===prefix+id || sample.id.startsWith(prefix+id+'-')))) : allCases;
assert.ok(cases.length,'No sample selected');
const scratch = await mkdtemp(join(tmpdir(), 'gameforge-csharp-test-'));
function run(args) {
  const result = spawnSync('dotnet', args, {encoding: 'utf8', timeout: 60000});
  assert.equal(result.status, 0, result.error?.message || result.stdout + result.stderr);
  return result.stdout.trim().replaceAll('\r\n', '\n');
}
try {
  const project = join(scratch, 'Sample.csproj');
  await writeFile(project, '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><Nullable>enable</Nullable><ImplicitUsings>enable</ImplicitUsings><TreatWarningsAsErrors>true</TreatWarningsAsErrors></PropertyGroup></Project>');
  for (const sample of cases) {
    await writeFile(join(scratch, 'Program.cs'), sample.code);
    run(['build', project, '--nologo', '--no-incremental']);
    if (sample.exception) {
      const result = spawnSync('dotnet', [join(scratch, 'bin/Debug/net10.0/Sample.dll')], {encoding: 'utf8', timeout: 60000});
      assert.notEqual(result.status, 0, sample.id);
      assert.ok(result.stderr?.includes(sample.exception), sample.id + ': ' + result.stderr);
    } else assert.equal(run([join(scratch, 'bin/Debug/net10.0/Sample.dll')]), sample.output, sample.id);
    console.log(sample.id + ': compiled and ' + (sample.exception ? 'documented exception' : 'output') + ' verified');
  }
} finally {
  await rm(scratch, {recursive: true, force: true});
}
console.log(cases.length + ' first-party C# samples passed.');
