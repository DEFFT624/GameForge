// Run separately with npm run test:rpg. Requires the .NET 10 SDK.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, readFile, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
const source = await readFile(new URL('../public/rpg-reference.cs', import.meta.url), 'utf8');
const project = fileURLToPath(new URL('../examples/tiny-rpg/GameForgeRpg.csproj', import.meta.url));
function command(args, options = {}) {
  const result = spawnSync('dotnet', args, {encoding: 'utf8', timeout: 60000, ...options});
  assert.equal(result.status, 0, result.error?.message || result.stdout + result.stderr);
  return result.stdout.replaceAll('\r\n', '\n');
}
command(['build', project, '--nologo']);
const assembly = fileURLToPath(new URL('../examples/tiny-rpg/bin/Debug/net10.0/GameForgeRpg.dll', import.meta.url));
const play = input => command([assembly], {input});
const victory = play('1\n'.repeat(9));
assert.equal((victory.match(/cleared!/g) || []).length, 3);
assert.equal((victory.match(/Victory!/g) || []).length, 1);
assert.match(victory, /Hero health: 52/);
assert.doesNotMatch(victory, /Room 4|Defeat|health: -/);
const invalid = play('abc\n\n0\n9\n3\n1\n');
assert.equal((invalid.match(/Choose 1, 2, or 3/g) || []).length, 4);
assert.doesNotMatch(invalid, /Enemy attacks|Attack!|Victory|Defeat/);
assert.match(invalid, /You chose to quit/);
assert.match(play(''), /Input ended\. Goodbye/);
assert.doesNotMatch(play(''), /Enemy attacks|Victory|Defeat/);
const potions = play('2\n1\n2\n1\n2\n2\n3\n');
assert.match(potions, /Health is already full\. No turn used/);
assert.equal((potions.match(/Potion used\. Hero health: 100/g) || []).length, 2);
assert.match(potions, /Potions left: 1/);
assert.match(potions, /Potions left: 0/);
assert.match(potions, /No potions left\. No turn used/);
assert.equal((potions.match(/Enemy attacks/g) || []).length, 4);
assert.doesNotMatch(potions, /Hero health: 10[1-9]/);
// Documented defeat experiment: start at 10 health. All other source is unchanged.
const scratch = await mkdtemp(join(tmpdir(), 'gameforge-rpg-test-'));
try {
  await writeFile(join(scratch, 'Program.cs'), source.replace('public int Health = 100;', 'public int Health = 10;'));
  await writeFile(join(scratch, 'Defeat.csproj'), '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><Nullable>enable</Nullable><ImplicitUsings>disable</ImplicitUsings><TreatWarningsAsErrors>true</TreatWarningsAsErrors></PropertyGroup></Project>');
  command(['build', join(scratch, 'Defeat.csproj'), '--nologo']);
  const defeat = command([join(scratch, 'bin/Debug/net10.0/Defeat.dll')], {input: '1\n1\n1\n'});
  assert.match(defeat, /Hero health: 2/);
  assert.match(defeat, /Hero health: 0/);
  assert.equal((defeat.match(/Defeat\./g) || []).length, 1);
  assert.equal((defeat.match(/Attack!/g) || []).length, 2);
  assert.doesNotMatch(defeat, /Victory|Room 2|health: -/);
} finally {
  await rm(scratch, {recursive: true, force: true});
}
console.log('RPG verified: victory, defeat experiment, quit, EOF, invalid input, potion limits, room transitions.');
