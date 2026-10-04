const tasks = [
 ['Find your starting point','From the home page, find where someone who has never coded should begin. Say why you chose it. Observer: record any hesitation or misleading link.'],
 ['Explain a value changing','Read First steps and the health lesson. Before doing its quiz, explain in your own words what a variable is. Then, without looking at the walkthrough, predict: int health = 20; health = health - 5; Console.WriteLine(health);. Explain each step.'],
 ['Choose a branch','Read Make the game react. Imagine health starts at 1 instead of 0. Which message would print, and why? If a symbol is unclear, say which one before opening the glossary.'],
 ['Use the practice and resume','Try a quiz and code blank. Make one deliberate wrong attempt and explain whether the feedback helped. Refresh, then check your answer and progress. Finally, point out one sentence you would rewrite.']
];
const key='gameforge-beginner-feedback-v1';
let saved={};try{const value=JSON.parse(localStorage.getItem(key)||'{}');if(value && typeof value==='object' && !Array.isArray(value))saved=value;}catch{}
const $=id=>document.getElementById(id),fields=[];
$('test-host-note').textContent=['localhost','127.0.0.1','[::1]'].includes(location.hostname)?'Local preview: this address cannot be opened by your friend on another computer. This test page is ready to use after the site is hosted.':'Share this page’s address with your friend, then open the course together in a call.';
for(const [i,[title,prompt]] of tasks.entries()){
 const card=document.createElement('article');card.className='test-task';
 const heading=document.createElement('h2');heading.textContent=`${i+1}. ${title}`;
 const text=document.createElement('p');text.textContent=prompt;
 const label=document.createElement('label');label.htmlFor=`test-note-${i}`;label.textContent='What they said, where they got stuck, and any help given';
 const notes=document.createElement('textarea');notes.id=label.htmlFor;notes.rows=4;notes.maxLength=4000;notes.value=typeof saved[i]==='string'?saved[i].slice(0,4000):'';fields.push(notes);
 card.append(heading,text,label,notes);$('test-tasks').append(card);
}
$('test-summary').value=typeof saved.summary==='string'?saved.summary.slice(0,4000):'';
function report(){return 'GameForge beginner feedback — no learner names\n\n'+tasks.map(([title],i)=>`${i+1}. ${title}\n${fields[i].value || '(not observed)'}`).join('\n\n')+'\n\nSummary\n'+$('test-summary').value;}
function update(){const data=Object.fromEntries(fields.map((field,i)=>[i,field.value]));data.summary=$('test-summary').value;try{localStorage.setItem(key,JSON.stringify(data));$('test-status').textContent='Notes saved in this browser only.';}catch{$('test-status').textContent='Storage unavailable. Copy the feedback before closing this page.';}$('test-report').value=report();}
for(const field of [...fields,$('test-summary')])field.addEventListener('input',update);
$('test-report').value=report();
$('test-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(report());$('test-status').textContent='Feedback copied. You can paste it into our chat; nothing was sent automatically.';}catch{$('test-status').textContent='Copy unavailable. Open the plain-text report below and copy it manually.';}});
