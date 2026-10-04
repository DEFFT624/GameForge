import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
// Explicit discovery works on Windows and Unix without shell glob expansion.
// Curriculum compilation is opt-in and is not part of the browser test suite.
const files = (await readdir(new URL('./', import.meta.url)))
  .filter(name => name.endsWith('.test.mjs')).sort()
  .map(name => fileURLToPath(new URL(name, import.meta.url)));
if (!files.length) throw Error('No website tests found');
const result = spawnSync(process.execPath, ['--test', ...files], {stdio: 'inherit'});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
