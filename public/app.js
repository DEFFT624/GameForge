import {course} from './course-plan.js';
import {lessons as foundations, snippets, validateDraft} from './content.js';
import {milestones} from './course-extension.js';
const {lessons, practices, lessonGuides, checkPractice, modules, labs, checkLab, debugging} = course;
const $ = id => document.getElementById(id);
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { $('storage-status').textContent = 'Browser storage is unavailable or full. Changes last only for this visit.'; return false; }
}
function savedSet(key, allowed) { const value = read(key, []); return new Set(Array.isArray(value) ? value.filter(id => allowed.includes(id)) : []); }
const completed = savedSet('gameforge-progress', lessons.map(l => l.id));
const practiced = savedSet('gameforge-practice', lessons.map(l => l.id));
const savedLabs = read('gameforge-labs', {});
const labWork = Object.create(null);
const savedDebugNotes = read('gameforge-debug-notes', {});
const debugNotes = Object.create(null);
for (const module of modules) {
  const value = savedDebugNotes && typeof savedDebugNotes === 'object' ? savedDebugNotes[module.id] : null;
  debugNotes[module.id] = typeof value === 'string' ? value.slice(0, 2000) : '';
}
for (const lesson of lessons) {
  const record = savedLabs && typeof savedLabs === 'object' && !Array.isArray(savedLabs) ? savedLabs[lesson.id] : null;
  labWork[lesson.id] = {
    answer: typeof record?.answer === 'string' ? record.answer.slice(0, 1000) : '',
    note: typeof record?.note === 'string' ? record.note.slice(0, 2000) : '',
    solved: record?.solved === true
  };
}
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
// Decorative scenes are text only and never participate in the lesson controls.
const forestScene = '    /\\      /\\\n   /__\\ O  /__\\\n    || /|\\  ||\n       / \\\n ~~~~~~~~~~~~~~~';
const sectionScenes = {
  'start-here': String.raw`       O
      /|_
     / |
      / \
    _/   \_
  . . . . . .`,
  lessons: String.raw`   _______ _______
  /       V       \
 |  ====  |  ====  |
 |  ====  |  ====  |
 |  ====  |  ====  |
 |________|________|
  \_______^_______/`,
  capstone: String.raw`    .------------.
    |            |
    |____________|
          |  |
          |  |
          |  |
          |  |
          |__|`,
  community: String.raw`   ___         ___
  /   \       /   \
 (     )     (     )
  \___/\     /\___/
        \   /
         \ /
          X
         / \
        /   \
       /     \ `
};
const lessonScenes = {
  health: '  __  __\n /  \\/  \\\n \\      /\n  \\____/\n HP [|||||] 100',
  decisions: '    [ HP > 0 ? ]\n       /    \\\n    YES      NO\n     |        |\n  [PLAY]   [REST]',
  loops: '    /\\     /\\     /\\\n   (oo)   (oo)   (oo)\n   /||\\   /||\\   /||\\\n    /\\     /\\     /\\\n   WAVE 1 -> 2 -> 3',
  'call-function': '     \\ O /\n       |\n      / \\\n   [ Cheer() ]\n     READY!',
  'function-inputs': '   .--------.\n10 -> BONUS +5 -> 15\n   \'--------\'\n       ($)',
  methods: '     /|\n    / |   *\n   /__|  /\n     || /\n   [ CAST() ]',
  inventory: '    .--------.\n   /________/|\n   | [] []  ||\n   | POTION ||\n   |________|/\n     [0] [1]',
  'class-fields': '  +-------------+\n  | CHARACTER   |\n  | Name: Nova  |\n  | Health: 100 |\n  +-------------+',
  characters: '     O       O\n    /|\\     /|\\\n    / \\     / \\\n   NOVA     ECHO\n  HP 100   HP 80',
  input: '   +------------+\n   | 1. ATTACK  |\n   | 2. POTION  |\n   | 3. QUIT    |\n   +------------+\n     > _',
  'while-loop': '    .----------.\n    | HP > 0 ? |\n    \'----+-----\'\n   ^     |\n   |  [ TURN ]\n   +-----+',
  'enum-state': '   [EXPLORE]\n       |\n    [BATTLE]\n       |\n   [VICTORY]',
  'switch-choice': '     [ CHOICE ]\n      /  |  \\\n     1   2   3\n    /    |    \\\n SWORD  HEAL  EXIT',
  states: '  /\\        /\\\n /__\\  ->  /__\\\n |[]|      |[]|\n [ROOM] -> [FIGHT]\n    \\       /\n     [VICTORY]'
};
function renderScenery(sectionId) {
  const art = sectionScenes[sectionId] || forestScene;
  $('section-art').textContent = art;
  const background = sectionId === 'lessons' ? lessonScenes[lessons[active].id] || art : art;
  $('lesson-scenery').replaceChildren(...Array.from({length: 12}, () => element('pre', background)));
}
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function focusLesson() { activateView('lessons'); if (window.location && window.location.hash !== '#lessons') window.location.hash = 'lessons'; $('course-outline').open = false; $('lesson-title').focus({preventScroll: true}); $('lesson-title').scrollIntoView({block: 'start', behavior: 'instant'}); }
function isLessonComplete(id) { return completed.has(id) && practiced.has(id); }
function answerEffect(formId, correct) {
  const form = $(formId);
  form.className = '';
  void form.offsetWidth; // Restart feedback even when the same answer is checked again.
  form.className = correct ? 'answer-correct' : 'answer-incorrect';
}
function renderProgress() {
  const completeCount = lessons.filter(l => isLessonComplete(l.id)).length;
  $('progress-count').textContent = `${completeCount} / ${lessons.length}`;
  $('progress').max = lessons.length; $('progress').value = completeCount;
  $('practice-count').textContent = `${practiced.size} / ${lessons.length} code blanks solved`;
  $('continue').textContent = completeCount === lessons.length ? 'Review the course →' : 'Continue learning →';
  $('completion').hidden = completeCount !== lessons.length;
  $('course-review-link').hidden = completeCount !== lessons.length;
  $('course-review-status').textContent = completeCount === lessons.length
    ? 'Your full C# foundations review is ready. Share what helped and what needs a clearer explanation.'
    : `Complete both exercises in all 14 lessons to unlock the course review (${completeCount} / 14 complete).`;
  $('navigation-status').textContent = `Lesson ${active + 1} / ${lessons.length} · ${isLessonComplete(lessons[active].id) ? 'Complete' : 'Keep going'}`;
  $('outline-summary').textContent = `Choose a lesson · ${active + 1} of ${lessons.length}`;
  $('lesson-list').replaceChildren(...lessons.map((lesson, index) => {
    const button = element('button', undefined, 'lesson-card');
    button.type = 'button'; button.setAttribute('aria-pressed', String(index === active));
    button.append(element('span', `${isLessonComplete(lesson.id) ? '✓ COMPLETE' : completed.has(lesson.id) || practiced.has(lesson.id) ? 'IN PROGRESS · 1 / 2' : String(index + 1).padStart(2, '0')} / ${lesson.minutes} MIN`, 'eyebrow'), element('strong', lesson.title), element('small', lesson.topic));
    button.addEventListener('click', () => { showLesson(index); focusLesson(); }); return button;
  }));
  $('module-list').replaceChildren(...modules.map((module, index) => {
    const count = module.ids.filter(isLessonComplete).length;
    const card = element('article', undefined, 'module-card');
    const button = element('button', `Open module ${index + 1} →`, 'secondary');
    button.type = 'button';
    button.addEventListener('click', () => {
      const id = module.ids.find(id => !isLessonComplete(id)) || module.ids[0];
      showLesson(lessons.findIndex(lesson => lesson.id === id)); focusLesson();
    });
    card.append(element('p', `MODULE ${index + 1} · ${count} / ${module.ids.length} COMPLETE`, 'eyebrow'), element('h3', module.title), element('p', module.goal), button);
    return card;
  }));
}
function showLesson(index) {
  $('challenge').className = ''; $('practice-form').className = '';
  active = index; const lesson = lessons[index];
  renderScenery(window.location?.hash.slice(1) || 'dashboard');
  save('gameforge-active-lesson', lesson.id);
  $('lesson-meta').textContent = `LESSON ${index + 1} OF ${lessons.length} · ${lesson.topic}`;
  const moduleIndex = modules.findIndex(module => module.ids.includes(lesson.id));
  const module = modules[moduleIndex];
  $('module-meta').textContent = `MODULE ${moduleIndex + 1} / ${modules.length} · ${module.title}`;
  $('module-recap').hidden = module.ids.at(-1) !== lesson.id;
  $('module-recap').open = false;
  $('module-recap-list').replaceChildren(...module.recap.map(text => element('li', text)));
  $('module-project').textContent = module.project;
  const debug = debugging[module.id];
  $('module-debug').hidden = module.ids.at(-1) !== lesson.id;
  $('module-debug').open = false; $('debug-repair').open = false; $('debug-hint').open = false;
  $('debug-title').textContent = debug.title;
  $('debug-goal').textContent = debug.goal;
  $('debug-code').textContent = debug.code;
  $('debug-actual').textContent = debug.actual;
  $('debug-expected').textContent = debug.expected;
  $('debug-hint-text').textContent = debug.hint;
  $('debug-fixed').textContent = debug.fixed;
  $('debug-why').textContent = debug.why;
  $('debug-test').textContent = debug.test;
  $('debug-note').value = debugNotes[module.id];
  $('debug-save-status').textContent = '';
  $('lab-prompt').textContent = labs[lesson.id].prompt;
  $('lab-code').textContent = labs[lesson.id].code;
  $('lab-answer').value = labWork[lesson.id].answer;
  $('lab-note').value = labWork[lesson.id].note;
  $('lab-feedback').textContent = labWork[lesson.id].solved ? 'You have solved this optional lab. You can try it again.' : '';
  $('lab-output').textContent = labs[lesson.id].output;
  $('lab-explanation').textContent = labs[lesson.id].why;
  $('lab-change').textContent = labs[lesson.id].change;
  $('lab-change-why').textContent = labs[lesson.id].changeWhy;
  $('lab-reveal').open = false; $('lab-change-reveal').open = false; $('practice-lab').open = false;
  $('lab-save-status').textContent = '';
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
      $('challenge').className = '';
    });
    label.append(input, document.createTextNode(answer)); return label;
  }));
  const practice = practices[lesson.id];
  $('practice-prompt').textContent = practice.prompt; $('practice-code').textContent = practice.code;
  $('practice-answer').value = answers[lesson.id].practice; $('practice-feedback').textContent = practiced.has(lesson.id) ? 'You have solved this code blank.' : '';
  $('previous').disabled = index === 0; $('next').disabled = index === lessons.length - 1;
  $('next').hidden = index === lessons.length - 1; $('next-project').hidden = index !== lessons.length - 1;
  $('next').textContent = index < lessons.length - 1 ? `Next: ${lessons[index + 1].title} →` : 'Next lesson →';
  $('copy-status').textContent = ''; renderProgress();
}
$('practice-answer').addEventListener('input', () => {
  answers[lessons[active].id].practice = $('practice-answer').value;
  save('gameforge-answers', answers); $('practice-feedback').textContent = '';
  $('practice-form').className = '';
});
$('challenge').addEventListener('submit', event => {
  event.preventDefault(); const answer = new FormData(event.currentTarget).get('answer'); if (answer === null) return;
  const lesson = lessons[active];
  answerEffect('challenge', Number(answer) === lesson.correct);
  if (Number(answer) === lesson.correct) {
    completed.add(lesson.id); save('gameforge-progress', [...completed]);
    $('feedback').textContent = isLessonComplete(lesson.id) ? 'Correct! Both exercises passed. Lesson complete.' : 'Correct! Quiz passed (1 of 2). Solve the code blank below to complete this lesson.'; $('feedback').textContent += ' ' + lessonGuides[lesson.id].why[Number(answer)]; renderProgress();
  } else $('feedback').textContent = `Try again. ${lessonGuides[lesson.id].why[Number(answer)]} ${lesson.hint}`;
});
$('practice-form').addEventListener('submit', event => {
  event.preventDefault(); const id = lessons[active].id;
  answerEffect('practice-form', checkPractice(id, $('practice-answer').value));
  if (checkPractice(id, $('practice-answer').value)) {
    practiced.add(id); save('gameforge-practice', [...practiced]);
    $('practice-feedback').textContent = isLessonComplete(id) ? 'Correct! Both exercises passed. Lesson complete.' : 'Correct! Code blank passed (1 of 2). Pass the quiz above to complete this lesson.'; $('practice-feedback').textContent += ' ' + lessonGuides[id].practiceWhy; renderProgress();
  } else $('practice-feedback').textContent = `Try again. ${practices[id].hint}`;
});
$('practice-hint').addEventListener('click', () => { $('practice-feedback').textContent = practices[lessons[active].id].hint; });
$('lab-form').addEventListener('submit', event => {
  event.preventDefault(); const id = lessons[active].id;
  labWork[id].answer = $('lab-answer').value.slice(0, 1000);
  const correct = checkLab(id, $('lab-answer').value);
  if (correct) labWork[id].solved = true;
  save('gameforge-labs', labWork);
  $('lab-feedback').textContent = correct ? `Correct! ${labs[id].why}` : `Try again. ${labs[id].hint} Use one line for each printed line, without quotes.`;
});
$('debug-note').addEventListener('input', () => {
  const module = modules.find(module => module.ids.includes(lessons[active].id));
  debugNotes[module.id] = $('debug-note').value.slice(0, 2000);
  const saved = save('gameforge-debug-notes', debugNotes);
  $('debug-save-status').textContent = saved ? 'Debugging note saved in this browser.' : 'This note lasts only for this visit.';
});
$('lab-hint').addEventListener('click', () => { $('lab-feedback').textContent = labs[lessons[active].id].hint; });
for (const [field, property] of [['lab-answer', 'answer'], ['lab-note', 'note']]) {
  $(field).addEventListener('input', () => {
    labWork[lessons[active].id][property] = $(field).value.slice(0, property === 'answer' ? 1000 : 2000);
    const saved = save('gameforge-labs', labWork);
    $('lab-save-status').textContent = saved ? 'Lab draft and notes saved in this browser.' : 'Storage unavailable. Copy your notes before leaving.';
    if (property === 'answer') $('lab-feedback').textContent = '';
  });
}
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
    const remove = element('button', 'Delete draft', 'link-button'); remove.type = 'button';
    remove.addEventListener('click', () => { drafts.splice(index, 1); save('gameforge-drafts', drafts); renderDrafts(); $('draft-status').textContent = 'Local draft deleted.'; });
    card.append(remove);
  } return card;
}
function renderDrafts() { $('drafts').replaceChildren(...drafts.map((d, i) => snippetCard(d, true, i))); }
function renderSnippets() {
  const query = $('snippet-search').value.trim().toLowerCase();
  const results = snippets.filter(s => `${s.title} ${s.code}`.toLowerCase().includes(query));
  $('snippets').replaceChildren(...results.map(s => snippetCard(s)));
  $('search-status').textContent = results.length ? `${results.length} starter ${results.length === 1 ? 'example' : 'examples'}` : 'No matching examples. Try “health” or “level”.';
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
    label.className = input.checked ? 'milestone is-complete' : 'milestone';
    input.addEventListener('change', () => {
      label.className = 'milestone';
      void label.offsetWidth;
      if (input.checked) label.className = 'milestone is-complete just-completed';
      if (input.checked) built.add(m.id); else built.delete(m.id);
      save('gameforge-capstone', [...built]); $('capstone-progress').textContent = `${built.size} of ${milestones.length} milestones checked`;
    });
    const description = element('span'); description.append(element('strong', m.title), element('small', m.detail));
    label.append(input, description);
    const card = element('article', undefined, 'build-step');
    const guide = element('details', undefined, 'build-guide');
    guide.append(element('summary', 'Build guide: ' + m.title.slice(3)), element('p', m.guide.goal));
    const review = element('div', undefined, 'build-review');
    review.append(element('p', 'Review these lessons if you get stuck:'));
    for (const lessonId of m.guide.review) {
      const index = lessons.findIndex(lesson => lesson.id === lessonId);
      const button = element('button', lessons[index].title, 'secondary'); button.type = 'button';
      button.addEventListener('click', () => { showLesson(index); focusLesson(); }); review.append(button);
    }
    const steps = element('ol'); steps.append(...m.guide.steps.map(text => element('li', text)));
    const checks = element('ul'); checks.append(...m.guide.checks.map(text => element('li', text)));
    guide.append(review, element('h3', 'Build it in small steps'), steps, element('h3', 'Test before checking this off'), checks, element('p', m.guide.stuck, 'build-tip'));
    card.append(label, guide); return card;
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

function activateView(id) {
  const names = {dashboard:'Overview',lessons:'C# lessons','start-here':'First steps',capstone:'Build a tiny RPG',community:'Community snippets'};
  const current = Object.hasOwn(names,id) ? id : 'dashboard';
  renderScenery(current);
  for (const key of Object.keys(names)) $(key).hidden = key !== current;
  $('view-name').textContent = names[current];
  const disclosure = $(current).querySelector?.(':scope > details.workspace-disclosure');
  if (disclosure) disclosure.open = true;
  document.querySelectorAll?.('#workspace-nav a[href^="#"]').forEach(link => link.setAttribute('aria-current',link.getAttribute('href') === '#' + current ? 'page' : 'false'));
  document.querySelector?.('aside')?.setAttribute('data-menu-open','false');
  $('menu-toggle').setAttribute('aria-expanded','false');
}
function routeView() {
  const id = window.location?.hash.slice(1) || 'dashboard';
  activateView(id);
  if (id === 'lessons') { $('lesson-title').focus({preventScroll:true}); $('lesson-title').scrollIntoView({block:'start',behavior:'instant'}); }
  else document.querySelector?.('main')?.scrollIntoView({block:'start',behavior:'instant'});
}
window.addEventListener?.('hashchange',routeView);
$('menu-toggle').addEventListener('click',()=>{
  const expanded=$('menu-toggle').getAttribute('aria-expanded')==='true';
  $('menu-toggle').setAttribute('aria-expanded',String(!expanded));
  document.querySelector('aside').setAttribute('data-menu-open',String(!expanded));
});
routeView();
