import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons} from '../public/content.js';
import {extraLessons, practices, milestones, checkPractice} from '../public/course-extension.js';
test('every lesson has a valid quiz and a non-executing code-blank challenge', () => {
  const all = [...lessons, ...extraLessons];
  assert.equal(all.length, 8);
  assert.equal(new Set(all.map(l => l.id)).size, all.length);
  for (const l of all) {
    assert.ok(Number.isInteger(l.correct) && l.correct >= 0 && l.correct < l.answers.length);
    assert.ok(l.code && l.body && l.explanation && l.hint);
    assert.ok(practices[l.id]?.code.includes('____'));
    assert.equal(checkPractice(l.id, ' ' + practices[l.id].answer + ' '), true);
    assert.equal(checkPractice(l.id, 'incorrect answer'), false);
  }
});
test('practice treats hostile input as a non-matching string', () => {
  for (const value of ['int; alert(1)', '<script>alert(1)</script>', 'INT', '', null, {}, ['int']]) assert.equal(checkPractice('health', value), false);
  assert.equal(checkPractice('missing', 'int'), false);
  assert.equal(checkPractice('input', 'tryparse'), false);
});
test('capstone has unique stable saved-state keys', () => {
  assert.equal(milestones.length, 6);
  assert.equal(new Set(milestones.map(m => m.id)).size, milestones.length);
  for (const m of milestones) assert.ok(m.title && m.detail);
});
