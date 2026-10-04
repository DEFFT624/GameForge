import {course} from '../public/course-plan.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons} from '../public/content.js';
import {extraLessons, milestones} from '../public/course-extension.js';
test('every lesson has a valid quiz and a non-executing code-blank challenge', () => {
  const all = course.lessons;
  assert.equal(all.length, 18);
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
test('modules partition the course in teaching order and every lesson has a practice lab',()=>{
 assert.deepEqual(course.modules.flatMap(module=>module.ids),course.lessons.map(lesson=>lesson.id));
 for(const module of course.modules) assert.ok(module.goal && module.project && module.recap.length >= 3);
 for(const lesson of course.lessons){
  const lab=course.labs[lesson.id];
  assert.ok(lab.prompt && lab.code && lab.output && lab.hint && lab.why && lab.change && lab.changeWhy);
  assert.equal(course.checkLab(lesson.id,' '+lab.output.replaceAll('\n','\r\n')+' '),true);
  assert.equal(course.checkLab(lesson.id,'<script>alert(1)</script>'),false);
  assert.equal(course.checkLab(lesson.id,null),false);
 }
 assert.equal(course.checkLab('missing',''),false);
 assert.equal(course.checkLab('decisions','defeated'),false);
});
test('every lesson has a complete beginner guide and feedback for every quiz choice', () => {
 for(const lesson of course.lessons){
  const guide=lessonGuides[lesson.id];assert.ok(guide.goal && guide.before && guide.mistake && guide.tryIt && guide.solution && guide.practiceWhy);
  assert.equal(guide.why.length,lesson.answers.length);assert.ok(guide.steps.length>=3);assert.ok(guide.words.length>=4);assert.ok(guide.output);
 }
});
test('each module has a debugging challenge with distinct observed and expected behavior',()=>{
 for (const module of course.modules) {
  const bug=course.debugging[module.id];
  assert.ok(bug.title && bug.goal && bug.code && bug.fixed && bug.hint && bug.why && bug.test);
  assert.notEqual(bug.actual,bug.expected);assert.notEqual(bug.code,bug.fixed);
 }
});
test('every execution trace prints exactly the lesson output in order',()=>{
 for(const lesson of course.lessons) {
  const rows=course.traces[lesson.id];assert.ok(rows.length>=3);
  for(const [instruction,values,output] of rows)assert.ok(instruction && values && (output===null || typeof output==='string'));
  assert.equal(rows.filter(row=>row[2]!==null).map(row=>row[2]).join('\n'),course.lessonGuides[lesson.id].output,lesson.id);
 }
});
test('small lessons come before their combined applications without changing old quiz IDs',()=>{
 const ids=course.lessons.map(l=>l.id);
 for(const [before,after] of [['call-function','function-inputs'],['function-inputs','methods'],['class-fields','characters'],['while-loop','enum-state'],['enum-state','switch-choice'],['switch-choice','states']]) assert.ok(ids.indexOf(before)<ids.indexOf(after));
 for(const old of [...lessons,...extraLessons]) assert.equal(course.lessons.find(l=>l.id===old.id),old);
});
test('text, booleans, combined conditions, and list iteration precede their applications',()=>{
 const ids=course.lessons.map(lesson=>lesson.id);
 for(const [before,after] of [['health','strings'],['strings','booleans'],['booleans','decisions'],['decisions','combined-conditions'],['combined-conditions','input'],['inventory','list-loop'],['list-loop','characters']]) {
  assert.ok(ids.includes(before),before);assert.ok(ids.indexOf(before)<ids.indexOf(after));
 }
});
test('troubleshooting distinguishes compiler, runtime, and logic failures with first-party repairs',()=>{
 assert.deepEqual(new Set(course.helpExamples.map(example=>example.kind)),new Set(['compiler','runtime','logic']));
 for(const example of course.helpExamples) {
  assert.ok(example.broken && example.fixed && example.output && example.explanation && example.check);
  assert.notEqual(example.broken,example.fixed);assert.ok(example.source.startsWith('https://learn.microsoft.com/'));
  if(example.kind!=='logic')assert.ok(example.diagnostic);
 }
});
