import {mkdir, copyFile, readFile, writeFile, lstat, realpath, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve, relative} from 'node:path';
const root = new URL('./', import.meta.url);
const dist = new URL('dist/', root);
const projectPath = await realpath(fileURLToPath(root));
const sourcePath = resolve(projectPath, 'public');
const sourceInfo = await lstat(sourcePath);
if (sourceInfo.isSymbolicLink() || !sourceInfo.isDirectory() || await realpath(sourcePath) !== sourcePath) throw Error('Refusing a linked source directory');
const assets = ['vt323-regular.ttf','vt323-OFL.txt','index.html','style.css','app.js','content.js','course-extension.js','radio.js','learner-guides.js','lesson-traces.js','foundation-bridges.js','game-data-lessons.js','foundations-finish.js','help-examples.js','home.html','home-tabs.js','course-plan.js','test-guide.html','beginner-test.html','beginner-test.js','rpg-reference.cs'];
// Check all required inputs before replacing a previous generated build.
for (const name of assets) {
  if (!(await lstat(new URL('public/' + name, root))).isFile()) throw Error('Expected a regular source asset: ' + name);
}
const outputPath = resolve(projectPath, 'dist');
// Delete only this project's generated output; never follow an output junction/symlink.
if (relative(projectPath, outputPath) !== 'dist') throw Error('Output must stay inside this project');
const outputInfo = await lstat(outputPath).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
if (outputInfo?.isSymbolicLink() || outputInfo && await realpath(outputPath) !== outputPath) throw Error('Refusing a linked output directory');
if (outputInfo && !outputInfo.isDirectory()) throw Error('Output path must be a generated directory');
await rm(outputPath, {recursive: true, force: true});
await mkdir(dist, {recursive: true});
for (const name of assets) {
  const source = new URL('public/' + name, root);
  await copyFile(source, new URL(name === 'index.html' ? 'learn.html' : name, dist));
}
const headers = "/*\n  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; connect-src 'none'; media-src blob:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n";
await writeFile(new URL('_headers', dist), headers);
await copyFile(new URL('home.html', dist), new URL('index.html', dist));
for (const page of ['index.html', 'home.html', 'learn.html', 'test-guide.html', 'beginner-test.html']) {
const index = new URL(page, dist);
let html = await readFile(index, 'utf8');
// Meta CSP covers static hosts that ignore _headers. Framing must be enforced by the host header.
html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'self\'; style-src \'self\'; font-src \'self\'; img-src \'self\'; connect-src \'none\'; media-src blob:; base-uri \'none\'; form-action \'none\'; object-src \'none\'"><meta name="referrer" content="no-referrer">');
await writeFile(index, html);
}
console.log('Built static assets with a restrictive CSP fallback.');
