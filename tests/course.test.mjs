import {course} from '../public/course-plan.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons} from '../public/content.js';
import {extraLessons, milestones} from '../public/course-extension.js';
test('every lesson has a valid quiz and a non-executing code-blank challenge', () => {
  const all = course.lessons;
  assert.equal(all.length, 14);
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

test('project guides point to existing lessons and cover build and verification steps', () => {
  const ids = new Set(course.lessons.map(lesson => lesson.id));
  for (const milestone of milestones) {
    assert.ok(milestone.guide.goal && milestone.guide.stuck);
    assert.ok(milestone.guide.steps.length >= 3);
    assert.ok(milestone.guide.checks.length >= 2);
    assert.ok(milestone.guide.review.every(id => ids.has(id)));
  }
  assert.ok(course.lessons.findIndex(l => l.id === 'while-loop') < course.lessons.findIndex(l => l.id === 'input'));
});
const {practices, checkPractice, lessonGuides} = course;
test('every lesson has a complete beginner guide and feedback for every quiz choice', () => {
 for(const lesson of course.lessons){
  const guide=lessonGuides[lesson.id];assert.ok(guide.goal && guide.before && guide.mistake && guide.tryIt && guide.solution && guide.practiceWhy);
  assert.equal(guide.why.length,lesson.answers.length);assert.ok(guide.steps.length>=3);assert.ok(guide.words.length>=4);assert.ok(guide.output);
 }
});
test('small lessons come before their combined applications without changing old quiz IDs',()=>{
 const ids=course.lessons.map(l=>l.id);
 for(const [before,after] of [['call-function','function-inputs'],['function-inputs','methods'],['class-fields','characters'],['while-loop','enum-state'],['enum-state','switch-choice'],['switch-choice','states']]) assert.ok(ids.indexOf(before)<ids.indexOf(after));
 for(const old of [...lessons,...extraLessons]) assert.equal(course.lessons.find(l=>l.id===old.id),old);
});
