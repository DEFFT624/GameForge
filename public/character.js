import {course} from './course-plan.js';
import {readCharacterProgress} from './character-progress.js';
const $ = id => document.getElementById(id);
const appearances = [
  {level:1, name:'New adventurer', art:String.raw`     .---.
     |o o|
     \_-_/
       |
      /|\
     / | \
       |
      / \
    _/   \_
  ~~~~~~~~~~~`},
  {level:4, name:'Trail explorer', art:String.raw`       ^
      / \
     /___\    _
     |o o|    |
     \_-_/    |
      /|\     |
     / | \____|
       |      |
      / \     |
    _/   \_   |
  ~~~~~~~~~~~~~~~`},
  {level:8, name:'Code guardian', art:String.raw`     [===]    /\
     |o o|    ||
     \_-_/    ||
 [#]__/|\_____||_
 [#]   |      ||
       |
      / \
    _/   \_
  ~~~~~~~~~~~~~~~`},
  {level:12, name:'Quest champion', art:String.raw`     \^ ^/    /\
     [===]    ||
     |o o|    ||
     \_-_/   _||_
 [#]__/|\_____||
 [#] / | \    ||
    /  |  \
   /___|___\
      / \
    _/   \_
  ~~~~~~~~~~~~~~~`}
];
function render() {
  let progress;
  try { progress = readCharacterProgress(localStorage); }
  catch { progress = readCharacterProgress({getItem: () => null}); }
  const appearance = appearances.filter(item => progress.level >= item.level).at(-1);
  $('character-art').textContent = appearance.art;
  $('character-art').setAttribute('aria-label', 'ASCII art: ' + appearance.name);
  $('character-title').textContent = appearance.name;
  $('character-level').textContent = 'LEVEL ' + progress.level;
  $('character-xp').textContent = progress.xp + ' XP earned';
  $('character-bar').value = progress.isMax ? 50 : progress.levelXP;
  $('character-bar').setAttribute('aria-valuetext', progress.isMax ? 'Course complete: maximum level reached' : progress.levelXP + ' of 50 XP toward level ' + (progress.level + 1));
  $('character-next').textContent = progress.isMax ? 'Course complete: maximum level reached!' : progress.nextLevelXP + ' XP to level ' + (progress.level + 1);
  $('character-lessons').textContent = progress.lessons.length + ' / ' + course.lessons.length;
  $('character-modules').textContent = progress.modules.length + ' / ' + course.modules.length;
  const completed = new Set(progress.lessons.map(lesson => lesson.id));
  const next = course.lessons.find(lesson => !completed.has(lesson.id));
  $('character-continue').href = next ? '/learn.html?lesson=' + encodeURIComponent(next.id) + '#lessons' : '/learn.html#capstone';
  $('character-continue').textContent = next ? 'Continue learning →' : 'Build your tiny RPG →';
  const nextAppearance = appearances.find(item => item.level > progress.level);
  $('character-unlock').textContent = nextAppearance ? nextAppearance.name + ' at level ' + nextAppearance.level : 'All four appearances unlocked!';
  $('character-milestones').replaceChildren();
  for (const item of appearances) {
    const row = document.createElement('li');
    const unlocked = progress.level >= item.level;
    const marker = document.createElement('span');
    marker.textContent = unlocked ? '[x] ' : '[ ] ';
    marker.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = (unlocked ? 'Unlocked: ' : 'Locked: ') + 'Level ' + item.level + ' · ' + item.name;
    row.append(marker, label);
    $('character-milestones').append(row);
  }
}
window.addEventListener('storage', event => {
  if (event.key === null || ['gameforge-progress','gameforge-practice'].includes(event.key)) render();
});
window.addEventListener('pageshow', render);
render();
