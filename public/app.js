import {lessons,snippets,validateDraft} from './content.js';
const $ = id => document.getElementById(id);
function read(key,fallback) {try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;}}
function save(key,value) {try {localStorage.setItem(key,JSON.stringify(value));return true;} catch {$('storage-status').textContent='Browser storage is unavailable or full. Changes last only for this visit.';return false;}}
const stored = read('gameforge-progress',[]);
let completed = new Set(Array.isArray(stored) ? stored.filter(x=>lessons.some(l=>l.id===x)) : []);
const savedDrafts = read('gameforge-drafts',[]);
let drafts = Array.isArray(savedDrafts) ? savedDrafts.filter(d=>d && !validateDraft(d.title,d.code)).slice(0,20) : [];
let active = 0;
function element(tag,text,className) {const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
function renderProgress(){
 $('progress-count').textContent=`${completed.size} / ${lessons.length}`;$('progress').value=completed.size;
 $('lesson-list').replaceChildren(...lessons.map((lesson,index)=>{const button=element('button',undefined,'lesson-card');button.type='button';button.setAttribute('aria-pressed',String(index===active));button.append(element('span',`${completed.has(lesson.id)?'✓':String(index+1).padStart(2,'0')} / ${lesson.minutes} MIN`,'eyebrow'),element('strong',lesson.title),element('small',lesson.topic));button.addEventListener('click',()=>showLesson(index));return button;}));
}
function showLesson(index){active=index;const lesson=lessons[index];$('lesson-meta').textContent=lesson.topic;$('lesson-title').textContent=lesson.title;$('lesson-body').textContent=lesson.body;$('lesson-code').textContent=lesson.code;$('lesson-explanation').textContent=lesson.explanation;$('question').textContent=lesson.question;$('feedback').textContent='';$('answers').replaceChildren(...lesson.answers.map((answer,i)=>{const label=element('label',undefined,'answer');const input=element('input');input.type='radio';input.name='answer';input.value=String(i);input.required=true;label.append(input,document.createTextNode(answer));return label;}));renderProgress();}
$('challenge').addEventListener('submit',event=>{event.preventDefault();const value=new FormData(event.currentTarget).get('answer');if(value===null)return;const lesson=lessons[active];if(Number(value)===lesson.correct){completed.add(lesson.id);save('gameforge-progress',[...completed]);$('feedback').textContent='Correct! Lesson complete. Choose the next lesson or keep exploring.';renderProgress();}else{$('feedback').textContent=`Try again. ${lesson.hint}`;}});
$('continue').addEventListener('click',()=>{const next=lessons.findIndex(l=>!completed.has(l.id));showLesson(next<0?0:next);$('lessons').scrollIntoView({behavior:'smooth'});});
function snippetCard(snippet,draft=false,index=0){const card=element('article',undefined,'snippet');card.append(element('span',draft?'LOCAL DRAFT · NOT PUBLISHED':snippet.author,'eyebrow'),element('h3',snippet.title));const pre=element('pre');pre.append(element('code',snippet.code));card.append(pre);if(draft){const remove=element('button','Delete draft','link-button');remove.addEventListener('click',()=>{drafts.splice(index,1);save('gameforge-drafts',drafts);renderDrafts();});card.append(remove);}return card;}
function renderDrafts(){$('drafts').replaceChildren(...drafts.map((d,i)=>snippetCard(d,true,i)));}
$('snippets').replaceChildren(...snippets.map(s=>snippetCard(s)));
$('snippet-form').addEventListener('submit',event=>{event.preventDefault();const title=$('snippet-title').value;const code=$('snippet-code').value;const error=validateDraft(title,code);if(error||drafts.length>=20){$('draft-status').textContent=error||'Keep at most 20 local drafts. Delete one before adding another.';return;}drafts.push({title:title.trim(),code});const persisted=save('gameforge-drafts',drafts);renderDrafts();event.currentTarget.reset();$('draft-status').textContent=persisted?'Draft saved on this browser only.':'Draft available for this visit only; browser storage failed.';});
$('reset').addEventListener('click',()=>{if(window.confirm('Reset all lesson progress in this browser?')){completed.clear();save('gameforge-progress',[]);showLesson(0);}});
showLesson(lessons.findIndex(l=>!completed.has(l.id))<0?0:lessons.findIndex(l=>!completed.has(l.id)));renderDrafts();
