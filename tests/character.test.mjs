import test from 'node:test';
import assert from 'node:assert/strict';
import {characterProgress, readCharacterProgress} from '../public/character-progress.js';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {course} from '../public/course-plan.js';

test('character starts at level one and needs both required exercises', () => {
  const id = course.lessons[0].id;
  assert.equal(characterProgress([], []).level, 1);
  assert.equal(characterProgress([id], []).xp, 0);
  assert.equal(characterProgress([], [id]).xp, 0);
  assert.equal(characterProgress([id], [id]).xp, 10);
});
test('duplicates and unknown IDs never award additional XP', () => {
  const id = course.lessons[0].id;
  assert.equal(characterProgress([id,id,'fake'], [id,id,'fake']).xp, 10);
  assert.equal(characterProgress({}, null).xp, 0);
});
test('module bonus is awarded exactly once when every lesson is complete', () => {
  const ids = course.modules[0].ids;
  assert.equal(characterProgress(ids, ids.slice(1)).modules.length, 0);
  const result = characterProgress([...ids,...ids], [...ids,...ids]);
  assert.equal(result.xp, ids.length * 10 + 25);
  assert.equal(result.modules.length, 1);
});
test('levels and XP bar have exact boundaries and reset follows course progress', () => {
  const ids = course.lessons.map(lesson => lesson.id);
  const full = characterProgress(ids, ids);
  assert.equal(full.xp, 640);
  assert.equal(full.level, 13);
  assert.equal(full.levelXP, 40);
  assert.equal(full.nextLevelXP, 0);
  assert.equal(full.maxXP, 640);
  assert.equal(full.isMax, true);
  assert.equal(full.modules.length, 10);
  assert.equal(characterProgress([], []).xp, 0);
  const five = characterProgress(ids.slice(0,5), ids.slice(0,5));
  assert.equal(five.levelXP, five.xp % 50);
});

test('storage corruption and denied storage cannot break the character', () => {
  assert.equal(readCharacterProgress({getItem: () => '{broken'}).xp, 0);
  assert.equal(readCharacterProgress({getItem: () => {throw Error('denied');}}).xp, 0);
});

test('character page refreshes XP, level, appearance and resume link from other-tab completion and reset', async () => {
  const source = (await readFile(new URL('../public/character.js', import.meta.url), 'utf8')).replace(/^import .*;\n/gm, '');
  const nodes = new Map(), listeners = new Map(), saved = new Map();
  const element = () => ({textContent:'', setAttribute(){}, replaceChildren(){}, append(){}});
  const context = {course, readCharacterProgress,
    localStorage: {getItem: key => saved.get(key)},
    document: {getElementById: id => {if (!nodes.has(id)) nodes.set(id, element()); return nodes.get(id);}, createElement: element},
    window: {addEventListener: (event, callback) => listeners.set(event, callback)}};
  vm.runInNewContext(source, context);
  assert.equal(nodes.get('character-xp').textContent, '0 XP earned');
  const id = course.lessons[0].id;
  saved.set('gameforge-progress', JSON.stringify([id]));
  listeners.get('storage')({key:'gameforge-progress'});
  assert.equal(nodes.get('character-xp').textContent, '0 XP earned');
  saved.set('gameforge-practice', JSON.stringify([id]));
  listeners.get('storage')({key:'gameforge-practice'});
  assert.equal(nodes.get('character-xp').textContent, '10 XP earned');
  assert.ok(nodes.get('character-continue').href.includes('lesson=strings'));
  const ids = course.lessons.map(lesson => lesson.id);
  saved.set('gameforge-progress', JSON.stringify(ids)); saved.set('gameforge-practice', JSON.stringify(ids));
  listeners.get('pageshow')();
  assert.equal(nodes.get('character-level').textContent, 'LEVEL 13');
  assert.equal(nodes.get('character-title').textContent, 'Quest champion');
  assert.equal(nodes.get('character-bar').value, 50);
  assert.equal(nodes.get('character-next').textContent, 'Course complete: maximum level reached!');
  assert.equal(nodes.get('character-continue').href, '/learn.html#capstone');
  saved.clear(); listeners.get('storage')({key:null});
  assert.equal(nodes.get('character-level').textContent, 'LEVEL 1');
  assert.equal(nodes.get('character-title').textContent, 'New adventurer');
});
