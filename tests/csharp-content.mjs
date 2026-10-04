// Only first-party curriculum samples are compiled. No user code is loaded.
// Run with npm run test:csharp using the .NET 10 SDK.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {course} from '../public/course-plan.js';
const scratch = await mkdtemp(join(tmpdir(), 'gameforge-csharp-test-'));
const cases = [
  ...course.lessons.map(lesson => ({id: 'lesson-' + lesson.id, code: lesson.code, output: course.lessonGuides[lesson.id].output})),
  ...Object.entries(course.labs).map(([id, lab]) => ({id: 'lab-' + id, code: lab.code, output: lab.output})),
  ...Object.entries(course.debugging).flatMap(([id, bug]) => [
    {id: 'bug-' + id, code: bug.code, output: bug.actual},
    {id: 'repair-' + id, code: bug.fixed, output: bug.expected}
  ])
];
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
    assert.equal(run([join(scratch, 'bin/Debug/net10.0/Sample.dll')]), sample.output, sample.id);
    console.log(sample.id + ': compiled and output verified');
  }
} finally {
  await rm(scratch, {recursive: true, force: true});
}
console.log(cases.length + ' first-party C# samples passed.');
