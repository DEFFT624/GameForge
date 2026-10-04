import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, cp, copyFile, writeFile, readFile, readdir, rm, symlink} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

test('static builds remove stale output, ignore unapproved source, and keep security metadata', async () => {
  const scratch = await mkdtemp(join(tmpdir(), 'gameforge-build-test-'));
  try {
    const project = join(scratch, 'project');
    await mkdir(project);
    await copyFile(new URL('../build.mjs', import.meta.url), join(project, 'build.mjs'));
    await cp(fileURLToPath(new URL('../public/', import.meta.url)), join(project, 'public'), {recursive: true});
    await writeFile(join(project, 'public/unapproved.dll'), 'unapproved fixture');
    await mkdir(join(project, 'dist/old'), {recursive: true});
    await writeFile(join(project, 'dist/old/stale.js'), 'stale fixture');
    const build = () => spawnSync(process.execPath, ['build.mjs'], {cwd: project, encoding: 'utf8', timeout: 10000});
    let result = build();
    assert.equal(result.status, 0, result.stderr);
    const files = await readdir(join(project, 'dist'));
    assert.ok(!files.includes('old') && !files.includes('unapproved.dll'));
    assert.ok(files.includes('learn.html') && files.includes('rpg-reference.cs') && files.includes('_headers'));
    const html = await readFile(join(project, 'dist/learn.html'), 'utf8');
    assert.equal((html.match(/http-equiv="Content-Security-Policy"/g) || []).length, 1);
    assert.match(await readFile(join(project, 'dist/_headers'), 'utf8'), /object-src 'none'/);
    await writeFile(join(project, 'dist/stale.exe'), 'stale fixture');
    result = build(); assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(await readdir(join(project, 'dist')), files);
    assert.equal(await readFile(join(project, 'dist/learn.html'), 'utf8'), html);
  } finally { await rm(scratch, {recursive: true, force: true}); }
});

test('a build refuses a linked output directory without touching its target', async () => {
  const scratch = await mkdtemp(join(tmpdir(), 'gameforge-build-link-test-'));
  try {
    const project = join(scratch, 'project'), outside = join(scratch, 'outside');
    await mkdir(project); await mkdir(outside);
    await copyFile(new URL('../build.mjs', import.meta.url), join(project, 'build.mjs'));
    await cp(fileURLToPath(new URL('../public/', import.meta.url)), join(project, 'public'), {recursive: true});
    await writeFile(join(outside, 'keep.txt'), 'keep this fixture');
    await symlink(outside, join(project, 'dist'), process.platform === 'win32' ? 'junction' : 'dir');
    const result = spawnSync(process.execPath, ['build.mjs'], {cwd: project, encoding: 'utf8', timeout: 10000});
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /linked output directory/);
    assert.equal(await readFile(join(outside, 'keep.txt'), 'utf8'), 'keep this fixture');
    assert.deepEqual(await readdir(outside), ['keep.txt']);
  } finally { await rm(scratch, {recursive: true, force: true}); }
});

test('missing required assets fail before replacing the previous build', async () => {
  const scratch = await mkdtemp(join(tmpdir(), 'gameforge-build-missing-test-'));
  try {
    const project = join(scratch, 'project');
    await mkdir(project);
    await copyFile(new URL('../build.mjs', import.meta.url), join(project, 'build.mjs'));
    await cp(fileURLToPath(new URL('../public/', import.meta.url)), join(project, 'public'), {recursive: true});
    await rm(join(project, 'public/vt323-regular.ttf'));
    await mkdir(join(project, 'dist'));
    await writeFile(join(project, 'dist/previous.txt'), 'previous generated output');
    const result = spawnSync(process.execPath, ['build.mjs'], {cwd: project, encoding: 'utf8', timeout: 10000});
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /vt323-regular\.ttf/);
    assert.equal(await readFile(join(project, 'dist/previous.txt'), 'utf8'), 'previous generated output');
  } finally { await rm(scratch, {recursive: true, force: true}); }
});
