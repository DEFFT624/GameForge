import {lessonGuides} from './learner-guides.js';
import {lessons as foundations, snippets, validateDraft} from './content.js';
import {extraLessons, practices, milestones, checkPractice} from './course-extension.js';
const lessons = [...foundations, ...extraLessons];
const $ = id => document.getElementById(id);
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { $('storage-status').textContent = 'Browser storage is unavailable or full. Changes last only for this visit.'; return false; }
}
function savedSet(key, allowed) { const value = read(key, []); return new Set(Array.isArray(value) ? value.filter(id => allowed.includes(id)) : []); }
const completed = savedSet('gameforge-progress', lessons.map(l => l.id));
const practiced = savedSet('gameforge-practice', lessons.map(l => l.id));
const built = savedSet('gameforge-capstone', milestones.map(m => m.id));
const savedDrafts = read('gameforge-drafts', []);
let drafts = Array.isArray(savedDrafts) ? savedDrafts.filter(d => d && !validateDraft(d.title, d.code)).slice(0, 20) : [];
const savedAnswers = read('gameforge-answers', {});
const answers = Object.create(null);
for (const lesson of lessons) {
  const saved = savedAnswers && typeof savedAnswers === 'object' && !Array.isArray(savedAnswers) ? savedAnswers[lesson.id] : null;
  answers[lesson.id] = {
    quiz: Number.isInteger(saved?.quiz) && saved.quiz >= 0 && saved.quiz < lesson.answers.length
      ? saved.quiz : completed.has(lesson.id) ? lesson.correct : null,
    practice: typeof saved?.practice === 'string' && saved.practice.length <= 40
      ? saved.practice : practiced.has(lesson.id) ? practices[lesson.id].answer : ''
  };
}
let active = 0;
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function focusLesson() { $('lesson-title').focus({preventScroll: true}); $('lesson-title').scrollIntoView({block: 'start'}); }
function isLessonComplete(id) { return completed.has(id) && practiced.has(id); }
function renderProgress() {
  const completeCount = lessons.filter(l => isLessonComplete(l.id)).length;
  $('progress-count').textContent = `${completeCount} / ${lessons.length}`;
  $('progress').max = lessons.length; $('progress').value = completeCount;
  $('practice-count').textContent = `${practiced.size} / ${lessons.length} code blanks solved`;
  $('continue').textContent = completeCount === lessons.length ? 'Review the course →' : 'Continue learning →';
  $('completion').hidden = completeCount !== lessons.length;
  $('lesson-list').replaceChildren(...lessons.map((lesson, index) => {
    const button = element('button', undefined, 'lesson-card');
    button.type = 'button'; button.setAttribute('aria-pressed', String(index === active));
    button.append(element('span', `${isLessonComplete(lesson.id) ? '✓ COMPLETE' : completed.has(lesson.id) || practiced.has(lesson.id) ? 'IN PROGRESS · 1 / 2' : String(index + 1).padStart(2, '0')} / ${lesson.minutes} MIN`, 'eyebrow'), element('strong', lesson.title), element('small', lesson.topic));
    button.addEventListener('click', () => { showLesson(index); focusLesson(); }); return button;
  }));
}
function showLesson(index) {
  active = index; const lesson = lessons[index];
  save('gameforge-active-lesson', lesson.id);
  $('lesson-meta').textContent = `LESSON ${index + 1} OF ${lessons.length} · ${lesson.topic}`;
  $('lesson-title').textContent = lesson.title; $('lesson-body').textContent = lesson.body;
  $('lesson-code').textContent = lesson.code; $('lesson-explanation').textContent = lesson.explanation;
  const guide = lessonGuides[lesson.id];
  $('lesson-goal').textContent = guide.goal; $('lesson-before').textContent = guide.before;
  $('lesson-words').replaceChildren(...guide.words.map(([word, meaning]) => {
    const row = element('div'); row.append(element('dt', word), element('dd', meaning)); return row;
  }));
  $('lesson-steps').replaceChildren(...guide.steps.map(step => element('li', step)));
  $('lesson-output').textContent = guide.output; $('lesson-mistake').textContent = guide.mistake;
  $('lesson-try').textContent = guide.tryIt; $('lesson-solution').textContent = guide.solution;
  $('solution-reveal').open = false; $('words-reveal').open = false;
  $('question').textContent = lesson.question;
  $('feedback').textContent = completed.has(lesson.id) ? 'You have completed this quiz. You can try it again anytime.' : '';
  $('answers').replaceChildren(...lesson.answers.map((answer, i) => {
    const label = element('label', undefined, 'answer'), input = element('input');
    Object.assign(input, {type: 'radio', name: 'answer', value: String(i), required: true, checked: answers[lesson.id].quiz === i});
    input.addEventListener('change', () => {
      answers[lesson.id].quiz = i; save('gameforge-answers', answers);
      $('feedback').textContent = '';
    });
    label.append(input, document.createTextNode(answer)); return label;
  }));
  const practice = practices[lesson.id];
  $('practice-prompt').textContent = practice.prompt; $('practice-code').textContent = practice.code;
  $('practice-answer').value = answers[lesson.id].practice; $('practice-feedback').textContent = practiced.has(lesson.id) ? 'You have solved this code blank.' : '';
  $('previous').disabled = index === 0; $('next').disabled = index === lessons.length - 1;
  $('copy-status').textContent = ''; renderProgress();
}
$('practice-answer').addEventListener('input', () => {
  answers[lessons[active].id].practice = $('practice-answer').value;
  save('gameforge-answers', answers); $('practice-feedback').textContent = '';
});
$('challenge').addEventListener('submit', event => {
  event.preventDefault(); const answer = new FormData(event.currentTarget).get('answer'); if (answer === null) return;
  const lesson = lessons[active];
  if (Number(answer) === lesson.correct) {
    completed.add(lesson.id); save('gameforge-progress', [...completed]);
    $('feedback').textContent = isLessonComplete(lesson.id) ? 'Correct! Both exercises passed. Lesson complete.' : 'Correct! Quiz passed (1 of 2). Solve the code blank below to complete this lesson.'; $('feedback').textContent += ' ' + lessonGuides[lesson.id].why[Number(answer)]; renderProgress();
  } else $('feedback').textContent = `Try again. ${lessonGuides[lesson.id].why[Number(answer)]} ${lesson.hint}`;
});
$('practice-form').addEventListener('submit', event => {
  event.preventDefault(); const id = lessons[active].id;
  if (checkPractice(id, $('practice-answer').value)) {
    practiced.add(id); save('gameforge-practice', [...practiced]);
    $('practice-feedback').textContent = isLessonComplete(id) ? 'Correct! Both exercises passed. Lesson complete.' : 'Correct! Code blank passed (1 of 2). Pass the quiz above to complete this lesson.'; $('practice-feedback').textContent += ' ' + lessonGuides[id].practiceWhy; renderProgress();
  } else $('practice-feedback').textContent = `Try again. ${practices[id].hint}`;
});
$('practice-hint').addEventListener('click', () => { $('practice-feedback').textContent = practices[lessons[active].id].hint; });
$('previous').addEventListener('click', () => { if (active > 0) { showLesson(active - 1); focusLesson(); } });
$('next').addEventListener('click', () => { if (active < lessons.length - 1) { showLesson(active + 1); focusLesson(); } });
$('continue').addEventListener('click', () => {
  const next = lessons.findIndex(l => !isLessonComplete(l.id)); showLesson(next < 0 ? 0 : next);
  focusLesson();
});
$('copy-code').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lessons[active].code); $('copy-status').textContent = 'Example copied.'; }
  catch { $('copy-status').textContent = 'Copy is unavailable here. Select the code text and copy it manually.'; }
});
function snippetCard(snippet, draft = false, index = 0) {
  const card = element('article', undefined, 'snippet');
  card.append(element('span', draft ? 'LOCAL DRAFT · NOT PUBLISHED' : snippet.author, 'eyebrow'), element('h3', snippet.title));
  const pre = element('pre'); pre.append(element('code', snippet.code)); card.append(pre);
  if (draft) {
    const remove = element('button', 'Delete draft', 'link-button');
    remove.addEventListener('click', () => { drafts.splice(index, 1); save('gameforge-drafts', drafts); renderDrafts(); $('draft-status').textContent = 'Local draft deleted.'; });
    card.append(remove);
  } return card;
}
function renderDrafts() { $('drafts').replaceChildren(...drafts.map((d, i) => snippetCard(d, true, i))); }
function renderSnippets() {
  const query = $('snippet-search').value.trim().toLowerCase();
  const results = snippets.filter(s => `${s.title} ${s.code}`.toLowerCase().includes(query));
  $('snippets').replaceChildren(...results.map(s => snippetCard(s)));
  $('search-status').textContent = results.length ? `${results.length} starter examples` : 'No matching examples. Try “health” or “level”.';
}
$('snippet-search').addEventListener('input', renderSnippets);
const snippetEditor = $('snippet-code');
let leaveEditor = false;
snippetEditor.addEventListener('blur', () => { leaveEditor = false; });
snippetEditor.addEventListener('keydown', event => {
  if (event.key === 'Escape') { leaveEditor = true; return; }
  if (event.key !== 'Tab') { leaveEditor = false; return; }
  if (leaveEditor || event.ctrlKey || event.metaKey || event.altKey) { leaveEditor = false; return; }
  event.preventDefault();
  const {value, selectionStart: start, selectionEnd: end} = snippetEditor;
  if (!event.shiftKey && start === end) {
    if (value.length + 4 > snippetEditor.maxLength) return;
    snippetEditor.setRangeText('    ', start, end, 'end');
    return;
  }
  const from = value.slice(0, start).lastIndexOf('\n') + 1;
  const to = end > start && value[end - 1] === '\n' ? end - 1 : end;
  const lines = value.slice(from, to).split('\n');
  let removedFirst = 0, removedTotal = 0;
  const replacement = lines.map((line, index) => {
    if (!event.shiftKey) return '    ' + line;
    const count = (line.match(/^(?:\t| {1,4})/) || [''])[0].length;
    if (index === 0) removedFirst = count;
    removedTotal += count; return line.slice(count);
  }).join('\n');
  if (value.length - (to - from) + replacement.length > snippetEditor.maxLength) return;
  snippetEditor.setRangeText(replacement, from, to, 'preserve');
  snippetEditor.setSelectionRange(
    event.shiftKey ? Math.max(from, start - removedFirst) : start + 4,
    event.shiftKey ? Math.max(from, end - removedTotal) : end + lines.length * 4
  );
});
$('snippet-form').addEventListener('submit', event => {
  event.preventDefault(); const title = $('snippet-title').value, code = $('snippet-code').value;
  const error = validateDraft(title, code);
  if (error || drafts.length >= 20) { $('draft-status').textContent = error || 'Keep at most 20 local drafts. Delete one before adding another.'; return; }
  drafts.push({title: title.trim(), code}); const persisted = save('gameforge-drafts', drafts);
  renderDrafts(); event.currentTarget.reset();
  $('draft-status').textContent = persisted ? 'Draft saved on this browser only.' : 'Draft available for this visit only; browser storage failed.';
});
function renderMilestones() {
  $('milestones').replaceChildren(...milestones.map(m => {
    const label = element('label', undefined, 'milestone'), input = element('input'); input.type = 'checkbox'; input.checked = built.has(m.id);
    input.addEventListener('change', () => {
      if (input.checked) built.add(m.id); else built.delete(m.id);
      save('gameforge-capstone', [...built]); $('capstone-progress').textContent = `${built.size} of ${milestones.length} milestones checked`;
    });
    const description = element('span'); description.append(element('strong', m.title), element('small', m.detail));
    label.append(input, description); return label;
  }));
  $('capstone-progress').textContent = `${built.size} of ${milestones.length} milestones checked`;
}
$('reset').addEventListener('click', () => {
  if (!window.confirm('Reset quiz and code-blank progress and saved answers? Your snippet drafts and project checklist will stay saved.')) return;
  completed.clear(); practiced.clear();
  for (const lesson of lessons) answers[lesson.id] = {quiz: null, practice: ''};
  save('gameforge-answers', answers); save('gameforge-progress', []); save('gameforge-practice', []); showLesson(0);
});
const firstUnfinished = lessons.findIndex(l => !isLessonComplete(l.id));
const lastActive = lessons.findIndex(l => l.id === read('gameforge-active-lesson', null));
showLesson(lastActive >= 0 ? lastActive : firstUnfinished < 0 ? 0 : firstUnfinished); renderDrafts(); renderSnippets(); renderMilestones();
