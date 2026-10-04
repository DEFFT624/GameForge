import {mkdir, readdir, copyFile, readFile, writeFile} from 'node:fs/promises';
const root = new URL('./', import.meta.url);
const dist = new URL('dist/', root);
await mkdir(dist, {recursive: true});
for (const name of await readdir(new URL('public/', root))) {
  if (!['vt323-regular.ttf','vt323-OFL.txt','index.html','style.css','app.js','content.js','course-extension.js','radio.js','learner-guides.js','home.html','home-tabs.js','course-plan.js','beginner-test.html','beginner-test.js','rpg-reference.cs'].includes(name)) continue;
  await copyFile(new URL('public/' + name, root), new URL(name === 'index.html' ? 'learn.html' : name, dist));
}
const headers = "/*\n  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; connect-src 'none'; media-src blob:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n";
await writeFile(new URL('_headers', dist), headers);
await copyFile(new URL('home.html', dist), new URL('index.html', dist));
for (const page of ['index.html', 'home.html', 'learn.html', 'beginner-test.html']) {
const index = new URL(page, dist);
let html = await readFile(index, 'utf8');
// Meta CSP covers static hosts that ignore _headers. Framing must be enforced by the host header.
html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'self\'; style-src \'self\'; font-src \'self\'; img-src \'self\'; connect-src \'none\'; media-src blob:; base-uri \'none\'; form-action \'none\'; object-src \'none\'"><meta name="referrer" content="no-referrer">');
await writeFile(index, html);
}
console.log('Built static assets with a restrictive CSP fallback.');
