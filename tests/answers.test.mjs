import {course} from '../public/course-plan.js';
import {lessonGuides} from '../public/learner-guides.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {lessons as foundations, snippets, validateDraft} from '../public/content.js';
import {extraLessons, practices, milestones, checkPractice} from '../public/course-extension.js';
const source = readFileSync(new URL('../public/app.js', import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '');
function load(storage = new Map(), confirm = true, hash = "", storageFailure = false) {
  const location = {hash}, windowEvents = {};
  class Element {
    children = []; events = {}; value = ''; textContent = '';
    append(...items) { this.children.push(...items); }
    replaceChildren(...items) { this.children = items; }
    setAttribute() {} focus() {} scrollIntoView() {} reset() {}
    addEventListener(name, fn) { this.events[name] = fn; }
    fire(name, extra = {}) { const event = {currentTarget: this, prevented: false, preventDefault() {this.prevented = true;}, ...extra}; this.events[name]?.(event); return event; }
    selectionStart = 0; selectionEnd = 0; maxLength = 8000;
    setSelectionRange(start, end) { this.selectionStart = start; this.selectionEnd = end; }
    setRangeText(text, start, end, mode) { this.value = this.value.slice(0, start) + text + this.value.slice(end); if (mode === 'end') this.setSelectionRange(start + text.length, start + text.length); }
  }
  const nodes = new Map();
  const get = id => { if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id); };
  vm.runInNewContext(source, {
    course, lessonGuides, foundations, snippets, validateDraft, extraLessons, practices, milestones, checkPractice,
    document: {getElementById: get, createElement: () => new Element(), createTextNode: text => ({textContent: text})},
    localStorage: {getItem: key => storage.get(key) ?? null, setItem: (key, value) => { if(storageFailure)throw Error('Storage unavailable');storage.set(key, value); }},
    window: {confirm: () => confirm, location, addEventListener: (name,fn) => { windowEvents[name]=fn; }},
    FormData: class { get() { return get('answers').children.map(l => l.children[0]).find(i => i.checked)?.value ?? null; } }
  });
  return {get, storage, sync(key) {windowEvents.storage?.({key});}, navigate(hash) { location.hash=hash; windowEvents.hashchange(); }, choose(index) {
    const radios = get('answers').children.map(l => l.children[0]);
    radios.forEach((r, i) => { r.checked = i === index; }); radios[index].fire('change');
  }, type(value) { get('practice-answer').value = value; get('practice-answer').fire('input'); },
  selected() { return get('answers').children.findIndex(l => l.children[0].checked); }};
}
test('unfinished and completed answers survive navigation and a fresh page load', () => {
  let page = load();
  page.choose(0); page.type('in'); // Unsubmitted work must survive too.
  page = load(page.storage);
  assert.equal(page.selected(), 0); assert.equal(page.get('practice-answer').value, 'in');
  page.choose(1); page.get('challenge').fire('submit'); page.type(' int '); page.get('practice-form').fire('submit');
  page.get('next').fire('click'); page.choose(2); page.type('<=');
  page = load(page.storage);
  assert.equal(page.get('lesson-title').textContent, foundations[1].title);
  assert.equal(page.selected(), 2); assert.equal(page.get('practice-answer').value, '<=');
  page.get('previous').fire('click');
  assert.equal(page.selected(), 1); assert.equal(page.get('practice-answer').value, ' int ');
  assert.equal(page.get('progress-count').textContent, '1 / 14');
  page.type(''); page = load(page.storage); assert.equal(page.get('practice-answer').value, '');
});
test('old completions restore canonical answers without losing progress', () => {
  const page = load(new Map([['gameforge-progress', '["health"]'], ['gameforge-practice', '["health"]']]));
  page.get('previous').fire('click');
  assert.equal(page.selected(), 1); assert.equal(page.get('practice-answer').value, 'int');
  assert.equal(page.get('progress-count').textContent, '1 / 14');
});
test('optional lab answers and notes survive navigation and reload without completing the main exercises',()=>{
 let page=load();
 page.get('lab-answer').value='70';page.get('lab-answer').fire('input');
 page.get('lab-note').value='Track each assignment.';page.get('lab-note').fire('input');
 page.get('lab-form').fire('submit');assert.match(page.get('lab-feedback').textContent,/Correct/);
 assert.equal(page.get('progress-count').textContent,'0 / 14');
 page.get('next').fire('click');page.get('previous').fire('click');
 assert.equal(page.get('lab-answer').value,'70');
 page=load(page.storage);assert.equal(page.get('lab-note').value,'Track each assignment.');
 assert.match(page.get('lab-feedback').textContent,/solved/);
 page.get('lab-answer').value='wrong';page.get('lab-form').fire('submit');assert.match(page.get('lab-feedback').textContent,/Try again/);
});
test('module cards resume the first unfinished lesson within their module',()=>{
 const page=load(new Map([['gameforge-progress','["call-function"]'],['gameforge-practice','["call-function"]']]));
 page.get('module-list').children[1].children[3].fire('click');
 assert.equal(page.get('lesson-title').textContent,'Send a value in, get a result back');
 assert.match(page.get('module-meta').textContent,/MODULE 2/);
});
test('module debugging notes persist independently and appear only at module endings',()=>{
 let page=load();assert.equal(page.get('module-debug').hidden,true);
 for(let i=0;i<3;i++)page.get('next').fire('click');
 assert.equal(page.get('module-debug').hidden,false);
 page.get('debug-note').value='Zero is not alive.';page.get('debug-note').fire('input');
 page.get('module-debug').open=true;page.get('debug-repair').open=true;
 page=load(page.storage);assert.equal(page.get('debug-note').value,'Zero is not alive.');
 assert.equal(page.get('module-debug').open,false);assert.equal(page.get('debug-repair').open,false);
 assert.equal(page.get('progress-count').textContent,'0 / 14');
 page.get('next').fire('click');assert.equal(page.get('module-debug').hidden,true);
 for(const raw of ['null','[]','{','{"control":42}']) assert.equal(load(new Map([['gameforge-debug-notes',raw]])).get('debug-note').value,'');
});
test('execution trace follows the current lesson and closes when changing lessons',()=>{
 const page=load();assert.equal(page.get('trace-rows').children[0].children[2].textContent,'health = 100');
 page.get('trace-reveal').open=true;page.get('next').fire('click');
 assert.equal(page.get('trace-reveal').open,false);
 assert.equal(page.get('trace-rows').children[2].children[3].textContent,'Game over');
 assert.equal(page.get('trace-caption').textContent,'Trace: Make the game react');
});
test('reset clears saved answers and progress but preserves drafts and project milestones', () => {
  let page = load(new Map([['gameforge-drafts', '[]'], ['gameforge-capstone', '["status"]']]));
  page.choose(1); page.type('int'); page.get('challenge').fire('submit'); page.get('practice-form').fire('submit');
  page.get('reset').fire('click'); page = load(page.storage);
  assert.equal(page.selected(), -1); assert.equal(page.get('practice-answer').value, '');
  assert.equal(page.get('progress-count').textContent, '0 / 14');
  assert.equal(page.storage.get('gameforge-capstone'), '["status"]');
  assert.equal(page.storage.get('gameforge-drafts'), '[]');
});
test('malformed answer records do not prevent the course loading', () => {
  for (const raw of ['null', '[]', '{', '{"health":{"quiz":99,"practice":42}}']) {
    const page = load(new Map([['gameforge-answers', raw], ['gameforge-active-lesson', '"missing"']]));
    assert.equal(page.selected(), -1); assert.equal(page.get('practice-answer').value, '');
  }
});

test('lesson completion requires both exercises, in either order, and survives reload', () => {
  for (const quizFirst of [true, false]) {
    let page = load();
    const quiz = () => { page.choose(1); page.get('challenge').fire('submit'); };
    const blank = () => { page.type('int'); page.get('practice-form').fire('submit'); };
    (quizFirst ? quiz : blank)();
    page = load(page.storage);
    assert.equal(page.get('progress-count').textContent, '0 / 14');
    assert.match(page.get('lesson-list').children[0].children[0].textContent, /IN PROGRESS/);
    page.get('continue').fire('click');
    assert.equal(page.get('lesson-title').textContent, foundations[0].title);
    (quizFirst ? blank : quiz)();
    page = load(page.storage);
    assert.equal(page.get('progress-count').textContent, '1 / 14');
    assert.match(page.get('lesson-list').children[0].children[0].textContent, /COMPLETE/);
    page.get('continue').fire('click');
    assert.equal(page.get('lesson-title').textContent, foundations[1].title);
  }
});
test('all quizzes alone do not complete the course', () => {
  const ids = course.lessons.map(l => l.id);
  let page = load(new Map([['gameforge-progress', JSON.stringify(ids)]]));
  assert.equal(page.get('progress-count').textContent, '0 / 14');
  assert.equal(page.get('completion').hidden, true);
  assert.equal(page.get('course-review-link').hidden, true);
  page.storage.set('gameforge-practice', JSON.stringify(ids)); page = load(page.storage);
  assert.equal(page.get('progress-count').textContent, '14 / 14');
  assert.equal(page.get('completion').hidden, false);
  assert.equal(page.get('course-review-link').hidden, false);
  page.get('reset').fire('click');
  assert.equal(page.get('course-review-link').hidden, true);
});
test('two open workspaces do not overwrite different lesson completions or drafts',()=>{
 const storage=new Map();const first=load(storage),second=load(storage);
 first.choose(course.lessons[0].correct);first.get('challenge').fire('submit');
 first.type(course.practices.health.answer);first.get('practice-form').fire('submit');
 first.get('next').fire('click');first.get('next').fire('click');first.type('unfinished loop draft');
 second.get('next').fire('click');second.choose(course.lessons[1].correct);second.get('challenge').fire('submit');
 second.type(course.practices.decisions.answer);second.get('practice-form').fire('submit');
 const refreshed=load(storage);assert.equal(refreshed.get('progress-count').textContent,'2 / 14');
 refreshed.get('next').fire('click');assert.equal(refreshed.get('practice-answer').value,'unfinished loop draft');
});
test('storage failure preserves session answers and progress while warning that they cannot persist',()=>{
 const page=load(new Map(),true,'',true);
 page.choose(course.lessons[0].correct);page.get('challenge').fire('submit');
 page.type(course.practices.health.answer);page.get('practice-form').fire('submit');
 assert.equal(page.get('progress-count').textContent,'1 / 14');
 page.get('next').fire('click');page.get('previous').fire('click');
 assert.equal(page.get('progress-count').textContent,'1 / 14');
 assert.equal(page.get('practice-answer').value,'int');assert.equal(page.selected(),course.lessons[0].correct);
 assert.match(page.get('storage-status').textContent,/unavailable or full/);
});
test('progress counts and feedback access follow another tab including its reset',()=>{
 const storage=new Map();const first=load(storage),second=load(storage);
 first.choose(course.lessons[0].correct);first.get('challenge').fire('submit');
 first.type(course.practices.health.answer);first.get('practice-form').fire('submit');
 second.sync('gameforge-progress');second.sync('gameforge-practice');
 assert.equal(second.get('progress-count').textContent,'1 / 14');
 first.get('reset').fire('click');second.sync('gameforge-progress');
 assert.equal(second.get('progress-count').textContent,'0 / 14');
 second.get('next').fire('click');second.get('previous').fire('click');assert.equal(second.selected(),-1);
});
test('different lessons and modules retain optional notes from two open workspaces',()=>{
 const storage=new Map();const first=load(storage),second=load(storage);
 first.get('lab-note').value='First lab note';first.get('lab-note').fire('input');
 second.get('next').fire('click');second.get('lab-note').value='Second lab note';second.get('lab-note').fire('input');
 for(let i=0;i<3;i++)first.get('next').fire('click');
 first.get('debug-note').value='Control-flow repair';first.get('debug-note').fire('input');
 for(let i=0;i<5;i++)second.get('next').fire('click');
 second.get('debug-note').value='Function repair';second.get('debug-note').fire('input');
 const labs=JSON.parse(storage.get('gameforge-labs')),notes=JSON.parse(storage.get('gameforge-debug-notes'));
 assert.equal(labs.health.note,'First lab note');assert.equal(labs.decisions.note,'Second lab note');
 assert.equal(notes.control,'Control-flow repair');assert.equal(notes.actions,'Function repair');
 first.get('previous').fire('click');first.get('previous').fire('click');
 assert.equal(first.get('lab-note').value,'Second lab note');
});
test('draft additions and deletions keep unrelated drafts from another workspace',()=>{
 const storage=new Map();const first=load(storage),second=load(storage);
 first.get('snippet-title').value='First';first.get('snippet-code').value='int health = 100;';first.get('snippet-form').fire('submit');
 second.get('snippet-title').value='Second';second.get('snippet-code').value='int coins = 2;';second.get('snippet-form').fire('submit');
 assert.equal(JSON.parse(storage.get('gameforge-drafts')).length,2);
 // The first page's delete button was rendered before the second draft existed.
 first.get('drafts').children[0].children.at(-1).fire('click');
 assert.equal(JSON.parse(storage.get('gameforge-drafts'))[0].title,'Second');
 second.sync('gameforge-drafts');assert.equal(second.get('drafts').children.length,1);
});
test('project checklist changes merge across workspaces and honor unchecking',()=>{
 const storage=new Map();const first=load(storage),second=load(storage);
 const check=(page,index,checked)=>{const input=page.get('milestones').children[index].children[0].children[0];input.checked=checked;input.fire('change');};
 check(first,0,true);check(second,1,true);
 assert.deepEqual(JSON.parse(storage.get('gameforge-capstone')),['status','fight']);
 check(first,0,false);assert.deepEqual(JSON.parse(storage.get('gameforge-capstone')),['fight']);
 second.sync('gameforge-capstone');assert.equal(second.get('milestones').children[0].children[0].children[0].checked,false);
});

test('snippet editor indents selections, unindents, respects limits and lets Tab leave after Escape', () => {
  const editor = load().get('snippet-code');
  editor.value = 'if (true) {\nConsole.WriteLine(1);\n}';
  editor.setSelectionRange(12, 12);
  assert.equal(editor.fire('keydown', {key: 'Tab'}).prevented, true);
  assert.match(editor.value, /\n    Console/); assert.equal(editor.selectionStart, 16);
  editor.fire('keydown', {key: 'Tab', shiftKey: true}); assert.match(editor.value, /\nConsole/);
  editor.value = 'one\ntwo\nthree'; editor.setSelectionRange(0, 8);
  editor.fire('keydown', {key: 'Tab'}); assert.equal(editor.value, '    one\n    two\nthree');
  editor.fire('keydown', {key: 'Tab', shiftKey: true}); assert.equal(editor.value, 'one\ntwo\nthree');
  editor.value = 'x'.repeat(7998); editor.setSelectionRange(0, 0);
  editor.fire('keydown', {key: 'Tab'}); assert.equal(editor.value.length, 7998);
  editor.fire('keydown', {key: 'Escape'});
  assert.equal(editor.fire('keydown', {key: 'Tab'}).prevented, false);
  assert.equal(editor.fire('keydown', {key: 'Tab', ctrlKey: true}).prevented, false);
});
test('quiz feedback explains the selected mistake and the successful answer', () => {
 const page=load();page.choose(0);page.get('challenge').fire('submit');assert.match(page.get('feedback').textContent,/starting value/);
 page.choose(1);page.get('challenge').fire('submit');assert.match(page.get('feedback').textContent,/100 - 25/);
 page.type('int');page.get('practice-form').fire('submit');assert.match(page.get('practice-feedback').textContent,/whole-number/);
 assert.ok(page.get('lesson-steps').children.length>=3);assert.equal(page.get('lesson-output').textContent,'75');
});
test('existing eight completions survive expansion but new lessons remain unfinished',()=>{
 const oldIds=[...foundations,...extraLessons].map(l=>l.id);
 const page=load(new Map([['gameforge-progress',JSON.stringify(oldIds)],['gameforge-practice',JSON.stringify(oldIds)]]));
 assert.equal(page.get('progress-count').textContent,'8 / 14');assert.equal(page.get('completion').hidden,true);
 page.get('continue').fire('click');assert.equal(page.get('lesson-title').textContent,'Repeat until a condition changes');
});


test('snippet search uses singular wording and reset keeps the current section art',()=>{
 const page=load();page.get('snippet-search').value='level';page.get('snippet-search').fire('input');
 assert.equal(page.get('search-status').textContent,'1 starter example');
 page.navigate('#community');const art=page.get('section-art').textContent;
 page.get('reset').fire('click');assert.equal(page.get('section-art').textContent,art);
});

test('project guide links navigate to prerequisites without changing milestone completion',()=>{
 const page=load(new Map([['gameforge-capstone','["status"]']]));
 const card=page.get('milestones').children[0];const review=card.children[1].children[2];
 review.children[1].fire('click');
 assert.equal(page.get('lesson-title').textContent,course.lessons[0].title);
 assert.equal(page.storage.get('gameforge-capstone'),'["status"]');
});

test('workspace routes reveal one activity and Continue opens the saved course',()=>{
  const page=load();assert.equal(page.get('dashboard').hidden,false);assert.equal(page.get('lessons').hidden,true);
  page.get('continue').fire('click');assert.equal(page.get('lessons').hidden,false);assert.equal(page.get('dashboard').hidden,true);
  page.type('draft');page.navigate('#community');assert.equal(page.get('community').hidden,false);assert.equal(page.get('lessons').hidden,true);
  page.navigate('#lessons');assert.equal(page.get('practice-answer').value,'draft');assert.equal(page.get('community').hidden,true);
  page.navigate('#not-a-view');assert.equal(page.get('dashboard').hidden,false);
});
test('deep links open the requested activity on reload',()=>{
  const page=load(new Map(),true,'#lessons');assert.equal(page.get('lessons').hidden,false);assert.equal(page.get('dashboard').hidden,true);
  page.navigate('#start-here');assert.equal(page.get('start-here').hidden,false);assert.equal(page.get('lessons').hidden,true);
});
