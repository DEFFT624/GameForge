import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
test('learning tabs show one matching panel and support keyboard navigation',()=>{
 const panels=Array.from({length:4},()=>({hidden:true}));
 const tabs=panels.map((_,index)=>({events:{},attributes:{'aria-controls':String(index)},setAttribute(key,value){this.attributes[key]=value;},getAttribute(key){return this.attributes[key];},addEventListener(name,fn){this.events[name]=fn;},focus(){this.focused=true;}}));
 vm.runInNewContext(readFileSync(new URL('../public/home-tabs.js',import.meta.url),'utf8'),{document:{querySelectorAll:()=>tabs,getElementById:id=>panels[Number(id)]}});
 tabs[3].events.click();assert.deepEqual(panels.map(p=>p.hidden),[true,true,true,false]);
 let prevented=false;tabs[3].events.keydown({key:'ArrowRight',preventDefault(){prevented=true;}});
 assert.equal(prevented,true);assert.equal(tabs[0].focused,true);assert.deepEqual(panels.map(p=>p.hidden),[false,true,true,true]);
 assert.deepEqual(tabs.map(t=>t.tabIndex),[0,-1,-1,-1]);
 tabs[0].events.keydown({key:'End',preventDefault(){}});assert.equal(panels[3].hidden,false);
 tabs[3].events.keydown({key:'Home',preventDefault(){}});assert.equal(panels[0].hidden,false);
 tabs[0].events.keydown({key:'ArrowLeft',preventDefault(){}});assert.equal(panels[3].hidden,false);
});
