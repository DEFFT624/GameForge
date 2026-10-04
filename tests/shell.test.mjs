import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../public/shell.js', import.meta.url), 'utf8');
function boot({learning=false,narrow=false,preference}={}) {
  const saved = new Map(preference === undefined ? [] : [['gameforge-sidebar-collapsed',preference]]);
  const windowEvents = {}, documentEvents = {};
  const location = {pathname:learning ? '/learn.html' : '/home.html'};
  const element = tag => {
    const classes = new Set();
    return {tag,children:[],events:{},attributes:{},textContent:'',
      classList:{contains:name=>classes.has(name),add:name=>classes.add(name),toggle:(name,on)=>on?classes.add(name):classes.delete(name)},
      get href(){return new URL(this.path || '/', 'http://localhost'+location.pathname).href;},set href(path){this.path=path;},
      append(...items){for(const item of items){item.parent=this;this.children.push(item);}},
      prepend(item){item.parent=this;this.children.unshift(item);},
      replaceChildren(...items){this.children=[];this.append(...items);},
      setAttribute(name,value){this.attributes[name]=value;},
      querySelector(tag){return this.children.find(item=>item.tag===tag);},
      querySelectorAll(tag){return this.children.filter(item=>item.tag===tag);},
      addEventListener(event,handler){this.events[event]=handler;},
      contains(item){return item===this || this.children.some(child=>child.contains(item));},
      focus(){this.focused=true;}};
  };
  const body = element('body'); if(learning) body.classList.add('learning-page');
  const skip = element('a'); skip.after = item => {body.append(skip,item);};
  const context = {URL,location,localStorage:{getItem:key=>saved.get(key)??null,setItem:(key,value)=>saved.set(key,value)},
    document:{body,activeElement:null,createElement:element,querySelector:selector=>selector==='.skip-link'?skip:null,addEventListener:(name,handler)=>documentEvents[name]=handler},
    window:{matchMedia:()=>({matches:narrow}),addEventListener:(name,handler)=>windowEvents[name]=handler}};
  vm.runInNewContext(source,context);
  const sidebar = body.children.find(item=>item.tag==='aside');
  return {body,skip,sidebar,toggle:sidebar.children.find(item=>item.id==='sidebar-toggle'),nav:sidebar.querySelector('nav'),saved,windowEvents,documentEvents};
}
test('sidebar defaults fit Home, desktop lessons and mobile lessons, with skip link first',()=>{
  for(const [options,collapsed] of [[{},true],[{learning:true},false],[{learning:true,narrow:true},true]]){
    const state=boot(options);
    assert.equal(state.toggle.attributes['aria-expanded'],String(!collapsed));
    assert.equal(state.body.children[0],state.skip);
  }
});
test('sidebar preference persists and clearing storage restores the page default',()=>{
  const state=boot();state.toggle.events.click();
  assert.equal(state.saved.get('gameforge-sidebar-collapsed'),'false');
  assert.equal(boot({preference:'false'}).toggle.attributes['aria-expanded'],'true');
  state.saved.clear();state.windowEvents.storage({key:null});
  assert.equal(state.toggle.attributes['aria-expanded'],'false');
});
test('mobile navigation and outside clicks close the sidebar and Escape returns focus',()=>{
  const state=boot({learning:true,narrow:true});
  state.toggle.events.click();
  state.nav.events.click({target:{closest:()=>true}});
  assert.equal(state.toggle.attributes['aria-expanded'],'false');
  state.toggle.events.click();state.documentEvents.click({target:{}});
  assert.equal(state.toggle.attributes['aria-expanded'],'false');
  state.toggle.events.click();state.documentEvents.keydown({key:'Escape'});
  assert.equal(state.toggle.attributes['aria-expanded'],'false');
  assert.equal(state.toggle.focused,true);
});
