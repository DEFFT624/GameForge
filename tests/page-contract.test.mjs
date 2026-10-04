import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createServer} from '../server.mjs';

test('workspace controls used by the app exist exactly once in the real HTML', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  const source = await readFile(new URL('../public/app.js', import.meta.url), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML IDs');
  for (const match of source.matchAll(/\$\('([^']+)'\)/g)) {
    assert.ok(ids.includes(match[1]), 'Missing control: ' + match[1]);
  }
});

test('local page assets and navigation targets are served and fragments exist', async () => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const page of ['/home.html', '/learn.html', '/beginner-test.html', '/test-guide.html']) {
      const html = await (await fetch(base + page)).text();
      for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
        const href = match[1];
        if (!href.startsWith('/') && !href.startsWith('#')) continue;
        const target = new URL(href, base + page);
        const response = await fetch(target);
        assert.equal(response.status, 200, page + ' -> ' + href);
        if (target.hash) {
          const targetHtml = await response.text();
          assert.ok(targetHtml.includes(`id="${target.hash.slice(1)}"`), 'Missing fragment: ' + href);
        }
      }
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
