import {course} from './course-plan.js';
const tasks = [
 ['Getting started','Did First steps explain the symbols and vocabulary clearly? Describe where you first felt confident or confused.'],
 ['Values, decisions, and loops','Explain how health changes, how an if chooses a branch, and what makes a loop stop. Which example or hint needs a clearer explanation?'],
 ['Functions and objects','Explain calling a function versus returning a value, then describe why hero and rival can have separate health. You can revisit a lesson. Record any unclear words.'],
 ['Inventory, input, and game states','Describe how you would handle an invalid menu choice, an inventory item, and a change from exploring to battle. Where did the course move too quickly?'],
 ['Using the website','How did navigation, saved drafts, quizzes, code blanks, and feedback work for you? Mention phone layout or accessibility problems and steps to reproduce any bug.'],
 ['Your next project','Does the tiny RPG guide feel approachable? If you tried it, what happened? What would help you move into Unity or game art next? Building the RPG is optional.']
];
tasks.push(
 ['Object design and error handling','Explain one use for a private setter, an interface, or composition. Were the examples small enough? What was unclear about guards, exceptions, or namespaces?'],
 ['Saving and testing','What is the difference between JSON text and a saved file? Which checks protect against null or invalid data? Describe a boundary test without copying an answer.'],
 ['Finishing the course','How did the final project lessons connect earlier ideas? Did the module lengths, traces, and feedback support learning at your pace? Which lesson should we revise first?']
);
const key='gameforge-course-feedback-v2';
let saved={};try{const value=JSON.parse(localStorage.getItem(key)||'{}');if(value && typeof value==='object' && !Array.isArray(value))saved=value;}catch{}
const $=id=>document.getElementById(id),fields=[];
$('test-host-note').textContent=['localhost','127.0.0.1','[::1]'].includes(location.hostname)?'Local preview: your friend will need a hosted link to complete the course on their own computer.':'Your friend can use this site to complete the course, then open this review in the same browser during your call.';
function completedIds(key) { try { const value=JSON.parse(localStorage.getItem(key)||'[]'); return new Set(Array.isArray(value)?value:[]); } catch { return new Set(); } }
function updateAccess() {
 const quizzes=completedIds('gameforge-progress'), blanks=completedIds('gameforge-practice');
 const count=course.lessons.filter(lesson=>quizzes.has(lesson.id)&&blanks.has(lesson.id)).length;
 const ready=count===course.lessons.length;
 $('review-lock').hidden=ready; $('review-content').hidden=!ready;
 $('review-progress').textContent=`${count} / ${course.lessons.length} lessons complete. The review opens after all ${course.lessons.length}.`;
}
updateAccess();
window.addEventListener('storage',updateAccess);
window.addEventListener('pageshow',updateAccess);
for(const [i,[title,prompt]] of tasks.entries()){
 const card=document.createElement('article');card.className='test-task';
 const heading=document.createElement('h2');heading.textContent=`${i+1}. ${title}`;
 const text=document.createElement('p');text.textContent=prompt;
 const label=document.createElement('label');label.htmlFor=`test-note-${i}`;label.textContent='What they said, where they got stuck, and any help given';
 const notes=document.createElement('textarea');notes.id=label.htmlFor;notes.rows=4;notes.maxLength=4000;notes.value=typeof saved[i]==='string'?saved[i].slice(0,4000):'';fields.push(notes);
 card.append(heading,text,label,notes);$('test-tasks').append(card);
}
$('test-summary').value=typeof saved.summary==='string'?saved.summary.slice(0,4000):'';
function report(){return 'GameForge full C# foundations review — no learner names\n\n'+tasks.map(([title],i)=>`${i+1}. ${title}\n${fields[i].value || '(not observed)'}`).join('\n\n')+'\n\nSummary\n'+$('test-summary').value;}
function update(){const data=Object.fromEntries(fields.map((field,i)=>[i,field.value]));data.summary=$('test-summary').value;try{localStorage.setItem(key,JSON.stringify(data));$('test-status').textContent='Notes saved in this browser only.';}catch{$('test-status').textContent='Storage unavailable. Copy the feedback before closing this page.';}$('test-report').value=report();}
for(const field of [...fields,$('test-summary')])field.addEventListener('input',update);
$('test-report').value=report();
$('test-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(report());$('test-status').textContent='Feedback copied. You can paste it into our chat; nothing was sent automatically.';}catch{$('test-status').textContent='Copy unavailable. Open the plain-text report below and copy it manually.';}});
