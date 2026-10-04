import {course} from './course-plan.js';

// Derive rewards from course completion: there is no mutable XP wallet to farm.
export function characterProgress(quizzes, practices) {
  const passed = new Set(Array.isArray(quizzes) ? quizzes : []);
  const practiced = new Set(Array.isArray(practices) ? practices : []);
  const lessons = course.lessons.filter(lesson => passed.has(lesson.id) && practiced.has(lesson.id));
  const ids = new Set(lessons.map(lesson => lesson.id));
  const modules = course.modules.filter(module => module.ids.every(id => ids.has(id)));
  const xp = lessons.length * 10 + modules.length * 25;
  const maxXP = course.lessons.length * 10 + course.modules.length * 25;
  const isMax = xp === maxXP;
  return {lessons, modules, xp, maxXP, isMax, level: 1 + Math.floor(xp / 50), levelXP: xp % 50, nextLevelXP: isMax ? 0 : 50 - xp % 50};
}

export function readCharacterProgress(storage) {
  const read = key => {
    try { return JSON.parse(storage.getItem(key) || '[]'); } catch { return []; }
  };
  return characterProgress(read('gameforge-progress'), read('gameforge-practice'));
}
