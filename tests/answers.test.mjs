import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {lessons as foundations, snippets, validateDraft} from '../public/content.js';
import {extraLessons, practices, milestones, checkPractice} from '../public/course-extension.js';
const source = readFileSync(new URL('../public/app.js', import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '');
function load(storage = new Map(), confirm = true) {
  class Element {
    children = []; events = {}; value = ''; textContent = '';
    append(...items) { this.children.push(...items); }
    replaceChildren(...items) { this.children = items; }
    setAttribute() {} focus() {} scrollIntoView() {}
    addEventListener(name, fn) { this.events[name] = fn; }
    fire(name, extra = {}) { const event = {currentTarget: this, prevented: false, preventDefault() {this.prevented = true;}, ...extra}; this.events[name]?.(event); return event; }
    selectionStart = 0; selectionEnd = 0; maxLength = 8000;
    setSelectionRange(start, end) { this.selectionStart = start; this.selectionEnd = end; }
    setRangeText(text, start, end, mode) { this.value = this.value.slice(0, start) + text + this.value.slice(end); if (mode === 'end') this.setSelectionRange(start + text.length, start + text.length); }
  }
  const nodes = new Map();
  const get = id => { if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id); };
  vm.runInNewContext(source, {
    foundations, snippets, validateDraft, extraLessons, practices, milestones, checkPractice,
    document: {getElementById: get, createElement: () => new Element(), createTextNode: text => ({textContent: text})},
    localStorage: {getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value)},
    window: {confirm: () => confirm},
    FormData: class { get() { return get('answers').children.map(l => l.children[0]).find(i => i.checked)?.value ?? null; } }
  });
  return {get, storage, choose(index) {
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
  assert.equal(page.get('progress-count').textContent, '1 / 8');
  page.type(''); page = load(page.storage); assert.equal(page.get('practice-answer').value, '');
});
test('old completions restore canonical answers without losing progress', () => {
  const page = load(new Map([['gameforge-progress', '["health"]'], ['gameforge-practice', '["health"]']]));
  page.get('previous').fire('click');
  assert.equal(page.selected(), 1); assert.equal(page.get('practice-answer').value, 'int');
  assert.equal(page.get('progress-count').textContent, '1 / 8');
});
test('reset clears saved answers and progress but preserves drafts and project milestones', () => {
  let page = load(new Map([['gameforge-drafts', '[]'], ['gameforge-capstone', '["status"]']]));
  page.choose(1); page.type('int'); page.get('challenge').fire('submit'); page.get('practice-form').fire('submit');
  page.get('reset').fire('click'); page = load(page.storage);
  assert.equal(page.selected(), -1); assert.equal(page.get('practice-answer').value, '');
  assert.equal(page.get('progress-count').textContent, '0 / 8');
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
    assert.equal(page.get('progress-count').textContent, '0 / 8');
    assert.match(page.get('lesson-list').children[0].children[0].textContent, /IN PROGRESS/);
    page.get('continue').fire('click');
    assert.equal(page.get('lesson-title').textContent, foundations[0].title);
    (quizFirst ? blank : quiz)();
    page = load(page.storage);
    assert.equal(page.get('progress-count').textContent, '1 / 8');
    assert.match(page.get('lesson-list').children[0].children[0].textContent, /COMPLETE/);
    page.get('continue').fire('click');
    assert.equal(page.get('lesson-title').textContent, foundations[1].title);
  }
});
test('all quizzes alone do not complete the course', () => {
  const ids = [...foundations, ...extraLessons].map(l => l.id);
  let page = load(new Map([['gameforge-progress', JSON.stringify(ids)]]));
  assert.equal(page.get('progress-count').textContent, '0 / 8');
  assert.equal(page.get('completion').hidden, true);
  page.storage.set('gameforge-practice', JSON.stringify(ids)); page = load(page.storage);
  assert.equal(page.get('progress-count').textContent, '8 / 8');
  assert.equal(page.get('completion').hidden, false);
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
