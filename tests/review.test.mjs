import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {course} from '../public/course-plan.js';
const source=readFileSync(new URL('../public/beginner-test.js',import.meta.url),'utf8').replace(/^import .*;\r?\n/gm,'');
function load(storage) {
 const nodes=new Map(), events={};
 const get=id=>{if(!nodes.has(id))nodes.set(id,{value:'',append(){},addEventListener(){}});return nodes.get(id);};
 vm.runInNewContext(source,{course,location:{hostname:'localhost'},document:{getElementById:get,createElement:()=>({append(){},addEventListener(){}})},localStorage:{getItem:key=>storage.get(key)||null},window:{addEventListener:(name,fn)=>events[name]=fn}});
 return {get,events};
}
test('full course review needs both exercises in every lesson and updates across tabs',()=>{
 const ids=course.lessons.map(l=>l.id);
 const storage=new Map([['gameforge-progress',JSON.stringify(ids)],['gameforge-practice',JSON.stringify(ids.slice(0,-1))]]);
 const page=load(storage);
 assert.equal(page.get('review-content').hidden,true);
 assert.equal(page.get('review-progress').textContent, `${ids.length-1} / ${ids.length} lessons complete. The review opens after all ${ids.length}.`);
 storage.set('gameforge-practice',JSON.stringify(ids));page.events.storage();
 assert.equal(page.get('review-content').hidden,false);
 storage.set('gameforge-progress','[]');page.events.storage();
 assert.equal(page.get('review-content').hidden,true);
});
test('malformed or unrelated progress does not unlock feedback',()=>{
 for(const value of ['null','{}','broken','["unrelated"]']){
  const page=load(new Map([['gameforge-progress',value],['gameforge-practice',value]]));
  assert.equal(page.get('review-content').hidden,true);
 }
});
test('the direct review page stays locked for the previously complete fourteen-lesson course',()=>{
 const newIds=new Set(['strings','booleans','combined-conditions','list-loop']);
 const oldIds=course.lessons.slice(0,18).filter(lesson=>!newIds.has(lesson.id)).map(lesson=>lesson.id);
 const page=load(new Map([['gameforge-progress',JSON.stringify(oldIds)],['gameforge-practice',JSON.stringify(oldIds)]]));
 assert.equal(page.get('review-content').hidden,true);
 assert.match(page.get('review-progress').textContent,/14 \/ 22/);
});

test('previously complete eighteen-lesson learners need the added toolbox lessons for the review',()=>{
 const oldIds=course.lessons.slice(0,18).map(lesson=>lesson.id);
 const page=load(new Map([['gameforge-progress',JSON.stringify(oldIds)],['gameforge-practice',JSON.stringify(oldIds)]]));
 assert.equal(page.get('review-content').hidden,true);
 assert.match(page.get('review-progress').textContent,/18 \/ 22/);
});
