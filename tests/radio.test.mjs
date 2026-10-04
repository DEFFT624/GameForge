import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../public/radio.js',import.meta.url),'utf8');
function setup(){
 const nodes=new Map(), revoked=[]; let n=0;
 class Element {events={};value='';paused=true;children=[]; addEventListener(k,fn){this.events[k]=fn;} fire(k){return this.events[k]?.({target:this});} replaceChildren(...children){this.children=children;} setAttribute(k,v){this[k]=v;} removeAttribute(k){delete this[k];} load(){} pause(){this.paused=true;} async play(){this.paused=false;} }
 const get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
 const lifecycle={};vm.runInNewContext(source,{document:{getElementById:get,createElement:()=>new Element()},Option:class extends Element{constructor(text,value){super();this.textContent=text;this.value=value;}},URL:{createObjectURL:()=>`blob:test${++n}`,revokeObjectURL:url=>revoked.push(url)},window:{addEventListener:(k,fn)=>lifecycle[k]=fn}});
 return {get,revoked,lifecycle,choose(files){get('radio-files').files=files;get('radio-files').fire('change');}};
}
const song=name=>({name,type:'audio/wav',size:100});
test('radio waits for play, changes tracks, repeats and releases local object URLs', async()=>{
 const p=setup(),audio=p.get('radio-audio');p.choose([song('one.wav'),song('two.wav')]);
 assert.equal(audio.paused,true);assert.equal(audio.src,'blob:test1');
 await audio.play();await p.get('radio-next').fire('click');assert.equal(audio.src,'blob:test2');assert.equal(audio.paused,false);
 p.get('radio-repeat').fire('click');assert.equal(audio.loop,true);
 p.get('radio-volume').value='0.2';p.get('radio-volume').fire('input');assert.equal(audio.volume,0.2);
 p.get('radio-clear').fire('click');assert.equal(audio.paused,true);assert.equal(audio.src,undefined);assert.equal(p.revoked.length,2);assert.equal(p.get('radio-next').disabled,true);
});
test('invalid files preserve playlist; replacements release it; queue is bounded',()=>{
 const p=setup();p.choose([song('one.wav')]);p.choose([{name:'program.exe',type:'application/octet-stream',size:100}]);assert.equal(p.get('radio-audio').src,'blob:test1');
 p.choose(Array.from({length:35},(_,i)=>song(`${i}.wav`)));assert.equal(p.get('radio-queue').children.length,30);assert.equal(p.revoked.length,1);
 p.lifecycle.pagehide();assert.equal(p.revoked.length,31);
});
