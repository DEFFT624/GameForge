import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createServer} from '../server.mjs';
import {lessons,validateDraft} from '../public/content.js';
test('drafts reject text-direction controls in both fields but preserve Unicode',()=>{
 for(const point of [0x061c,0x200e,0x200f,0x202a,0x202b,0x202c,0x202d,0x202e,0x2066,0x2067,0x2068,0x2069]){
  const control=String.fromCodePoint(point);
  assert.ok(validateDraft('Title'+control,'int hp = 10;'));
  assert.ok(validateDraft('Title','// comment'+control+'hidden'));
 }
 assert.equal(validateDraft('صحة اللاعب 🎮','// שלום\nint health = 100;\t'),null);
 assert.equal(validateDraft('A'.repeat(80),'x'.repeat(8000)),null);
 assert.equal(validateDraft('🎮'.repeat(40),'code'),null);
 assert.ok(validateDraft('🎮'.repeat(41),'code'));
 assert.equal(validateDraft('<b>Literal title</b>','<img src=x onerror=alert(1)>'),null);
});
test('draft limits reject malformed and oversized input',()=>{assert.ok(validateDraft('', 'code'));assert.ok(validateDraft('title','x'.repeat(8001)));assert.ok(validateDraft('x'.repeat(81),'code'));assert.ok(validateDraft('title','a\0b'));assert.ok(validateDraft({},[]));assert.equal(validateDraft('Health','int health = 100;'),null);});
test('all lessons have stable unique IDs and valid challenge answers',()=>{assert.equal(new Set(lessons.map(l=>l.id)).size,4);for(const lesson of lessons){assert.ok(lesson.answers[lesson.correct]);assert.ok(lesson.code);assert.ok(lesson.hint);}});
test('text rendering never uses HTML injection or code execution sinks',async()=>{const source=await readFile(new URL('../public/app.js',import.meta.url),'utf8');assert.doesNotMatch(source,/innerHTML|outerHTML|insertAdjacentHTML|eval\s*\(|new Function|document\.write/);assert.match(source,/textContent/);});
test('server blocks uploads, private files, traversal and sets defensive headers',async()=>{const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;try{const page=await fetch(base);assert.equal(page.status,200);assert.match(page.headers.get('content-security-policy'),/object-src 'none'/);assert.match(page.headers.get('content-security-policy'),/connect-src 'none'/);assert.equal(page.headers.get('x-content-type-options'),'nosniff');for(const path of ['/.env','/package.json','/server.mjs','/upload','/%2e%2e%2fserver.mjs'])assert.equal((await fetch(base+path)).status,404);for(const method of ['POST','PUT','PATCH','DELETE'])assert.equal((await fetch(base+'/upload',{method,body:'untrusted bytes'})).status,405);for(const path of ['/app.js','/content.js','/style.css'])assert.equal((await fetch(base+path)).status,200);}finally{await new Promise(resolve=>server.close(resolve));}});
