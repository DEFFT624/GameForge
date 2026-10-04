// Verify deliberate first-party mistakes and their repairs; never load user code.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {helpExamples} from '../public/help-examples.js';
const scratch = await mkdtemp(join(tmpdir(), 'gameforge-error-test-'));
const project = join(scratch, 'Sample.csproj');
function execute(args) {
  const result = spawnSync('dotnet', args, {encoding: 'utf8', timeout: 60000});
  if (result.error) throw result.error;
  return result;
}
async function compile(code) {
  await writeFile(join(scratch, 'Program.cs'), code);
  return execute(['build', project, '--nologo', '--no-incremental']);
}
function run() { return execute([join(scratch, 'bin/Debug/net10.0/Sample.dll')]); }
function output(result) { return result.stdout.trim().replaceAll('\r\n', '\n'); }
try {
  await writeFile(project, '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><Nullable>enable</Nullable><ImplicitUsings>enable</ImplicitUsings><TreatWarningsAsErrors>true</TreatWarningsAsErrors></PropertyGroup></Project>');
  for (const example of helpExamples) {
    const broken = await compile(example.broken);
    if (example.kind === 'compiler') {
      assert.notEqual(broken.status, 0, example.id);
      assert.ok((broken.stdout + broken.stderr).includes(example.diagnostic), example.id + '\n' + broken.stdout + broken.stderr);
    } else {
      assert.equal(broken.status, 0, broken.stdout + broken.stderr);
      const result = run();
      if (example.kind === 'runtime') {
        assert.notEqual(result.status, 0, example.id);
        assert.ok(result.stderr.includes(example.diagnostic), example.id);
      } else {
        assert.equal(result.status, 0, result.stderr);
        assert.equal(output(result), example.actual, example.id);
      }
    }
    const fixed = await compile(example.fixed);
    assert.equal(fixed.status, 0, fixed.stdout + fixed.stderr);
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(output(result), example.output, example.id);
    console.log(example.id + ': documented failure and repair verified');
  }
} finally {
  await rm(scratch, {recursive: true, force: true});
}
